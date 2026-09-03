/**
 * Worker Kovárny.
 *
 * Statické soubory z ./public servíruje Cloudflare sám (binding ASSETS).
 * Sem doběhnou jen požadavky na /api/* (viz `run_worker_first` ve wrangler.jsonc).
 *
 * Jediný endpoint:
 *   POST /api/registrace  { jmeno, prijmeni, email, termin }  →  kontakt + tagy v CliqSales
 *
 * Nastavení (wrangler.jsonc → vars, tajný údaj přes `npx wrangler secret put`):
 *   CLIQSALES_API_KEY      tajné – Private Integration token CliqSales (práva: kontakty číst i zapisovat).
 *                          Stejný název i token jako u Workeru webinar-stats.
 *   CLIQSALES_LOCATION_ID  var   – ID lokace (sub-accountu) v CliqSales
 *   TAGS_TERMINY           var   – povolené tagy termínů oddělené čárkou (např. webinar-06-09-26,…);
 *                                  formulář posílá v poli `termin` přesně jeden z nich. Prázdné = bez termínů.
 *   TAGS_REGISTRACE        var   – obecné tagy oddělené čárkou, přidají se každému registrovanému
 *   SOURCE                 var   – hodnota pole „Source“ u nově založeného kontaktu
 *   ALLOWED_ORIGINS        var   – volitelně; další weby (origin), které smí formulář posílat.
 *                                  Stejná doména je povolená vždy.
 *
 * Zápis do CliqSales jde stejnou cestou jako Worker webinar-stats: upsert podle e-mailu
 * (založí nový kontakt, nebo vrátí existující), pak tagy přes /contacts/{id}/tags.
 * Existujícímu kontaktu se nic nepřepisuje: jméno se doplní jen tam, kde chybí, původní
 * tagy a historie zůstávají. Výjimka: tagy ostatních termínů. Když se člověk přihlásí
 * znovu na jiný termín, starý termínový tag se odebere, aby byl vždy jen na jednom termínu.
 */

const GHL_API = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

const ZPRAVA_CHYBA = 'Registrace se nezdařila. Zkus to prosím znovu.';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/registrace') {
      return registrace(request, env);
    }
    if (url.pathname.startsWith('/api/')) {
      return json({ ok: false, message: 'Neznámý endpoint.' }, 404);
    }
    return env.ASSETS.fetch(request);
  },
};

/* ------------------------------------------------------------------ */
/* POST /api/registrace                                                */
/* ------------------------------------------------------------------ */

async function registrace(request, env) {
  const cors = corsHeaders(request, env);

  if (request.method === 'OPTIONS') {
    return cors ? new Response(null, { status: 204, headers: cors }) : new Response(null, { status: 403 });
  }
  if (request.method !== 'POST') {
    return json({ ok: false, message: 'Použij POST.' }, 405, { Allow: 'POST, OPTIONS' });
  }
  if (cors === null) {
    return json({ ok: false, message: 'Odesláno z nepovolené domény.' }, 403);
  }
  if (!env.CLIQSALES_API_KEY || !env.CLIQSALES_LOCATION_ID) {
    console.error('[registrace] chybí CLIQSALES_API_KEY (secret) nebo CLIQSALES_LOCATION_ID (var)');
    return json({ ok: false, message: 'Registrace zatím není nastavená.' }, 500, cors);
  }

  let vstup;
  try {
    vstup = await prectiVstup(request);
  } catch {
    return json({ ok: false, message: 'Nečitelná data formuláře.' }, 400, cors);
  }

  // Honeypot: pole „web“ vidí jen roboti, člověk ho nevyplní.
  if (vstup.web) {
    return json({ ok: true }, 200, cors);
  }

  const jmeno = ocisti(vstup.jmeno);
  const prijmeni = ocisti(vstup.prijmeni);
  const email = ocisti(vstup.email).toLowerCase();

  if (!jmeno) return json({ ok: false, message: 'Zadej prosím své křestní jméno.', pole: 'jmeno' }, 400, cors);
  if (!prijmeni) return json({ ok: false, message: 'Zadej prosím své příjmení.', pole: 'prijmeni' }, 400, cors);
  if (!platnyEmail(email)) return json({ ok: false, message: 'Zadej prosím platný e-mail.', pole: 'email' }, 400, cors);

  // Termín: hodnota z formuláře je přímo tag, ale jen z povoleného seznamu.
  const terminy = rozdelTagy(env.TAGS_TERMINY);
  let termin = '';
  if (terminy.length > 0) {
    termin = ocisti(vstup.termin);
    if (!terminy.includes(termin)) {
      return json({ ok: false, message: 'Vyber prosím termín.', pole: 'termin' }, 400, cors);
    }
  }

  const tags = rozdelTagy(env.TAGS_REGISTRACE);
  if (termin) tags.push(termin);
  if (tags.length === 0) {
    console.error('[registrace] TAGS_REGISTRACE i TAGS_TERMINY jsou prázdné – kontakt by vznikl bez tagu');
    return json({ ok: false, message: 'Registrace zatím není nastavená.' }, 500, cors);
  }
  const odebrat = termin ? terminy.filter((t) => t !== termin) : [];

  let vysledek;
  try {
    vysledek = await zapisDoCliqsales(env, { jmeno, prijmeni, email, tags, odebrat });
  } catch (err) {
    console.error('[registrace] CliqSales selhalo:', err && err.message ? err.message : err);
    return json({ ok: false, message: ZPRAVA_CHYBA }, 502, cors);
  }

  // Klasický (ne-JS) odeslaný formulář: po úspěchu přesměrovat na děkovačku.
  if (vstup._redirect && vstup._formular && bezpecnaCesta(vstup._redirect)) {
    return new Response(null, { status: 303, headers: { Location: vstup._redirect } });
  }

  return json({ ok: true, novy: vysledek.novy }, 200, cors);
}

/* ------------------------------------------------------------------ */
/* CliqSales (GoHighLevel API v2)                                      */
/* ------------------------------------------------------------------ */

async function zapisDoCliqsales(env, { jmeno, prijmeni, email, tags, odebrat }) {
  const locationId = env.CLIQSALES_LOCATION_ID;

  // 1) Upsert podle e-mailu: založí nový kontakt, nebo vrátí existující. Posíláme jen
  //    e-mail, aby se existujícímu kontaktu nic nepřepsalo. Odpověď: { new, contact }.
  const up = await ghl(env, 'POST', '/contacts/upsert', { locationId, email });
  const kontakt = up.ok && up.data ? up.data.contact : null;
  if (!kontakt || !kontakt.id) {
    throw new Error(`upsert kontaktu selhal (${up.status}): ${popis(up.data)}`);
  }
  const novy = up.data.new === true;

  // 2) Změna termínu: existujícímu kontaktu odebrat tagy ostatních termínů. Když odpověď
  //    tagy kontaktu obsahuje, odebíráme jen ty, které má; jinak všechny ostatní termíny.
  if (!novy && odebrat.length > 0) {
    const maTagy = Array.isArray(kontakt.tags) ? kontakt.tags.map((t) => String(t).toLowerCase()) : null;
    const kOdebrani = maTagy ? odebrat.filter((t) => maTagy.includes(t.toLowerCase())) : odebrat;
    if (kOdebrani.length > 0) {
      const d = await ghl(env, 'DELETE', `/contacts/${kontakt.id}/tags`, { tags: kOdebrani });
      if (!d.ok) console.warn('[registrace] odebrání starého termínu selhalo', d.status, popis(d.data));
    }
  }

  // 3) Přidat tagy. Endpoint /tags tagy přidává, existující nechává.
  const t = await ghl(env, 'POST', `/contacts/${kontakt.id}/tags`, { tags });
  if (!t.ok) {
    throw new Error(`přidání tagů selhalo (${t.status}): ${popis(t.data)}`);
  }

  // 4) Jméno: novému kontaktu zapsat celé i se zdrojem, existujícímu doplnit jen chybějící.
  //    Bez pole `tags`, aby se nepřepsaly.
  const doplnit = {};
  if (novy) {
    doplnit.firstName = jmeno;
    doplnit.lastName = prijmeni;
    if (env.SOURCE) doplnit.source = env.SOURCE;
  } else {
    if (!kontakt.firstName && jmeno) doplnit.firstName = jmeno;
    if (!kontakt.lastName && prijmeni) doplnit.lastName = prijmeni;
  }
  if (Object.keys(doplnit).length > 0) {
    const u = await ghl(env, 'PUT', `/contacts/${kontakt.id}`, doplnit);
    if (!u.ok) console.warn('[registrace] zápis jména selhal', u.status, popis(u.data));
  }
  return { novy };
}

async function ghl(env, method, path, body) {
  const res = await fetch(GHL_API + path, {
    method,
    headers: {
      Authorization: `Bearer ${env.CLIQSALES_API_KEY}`,
      Version: GHL_VERSION,
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = { raw: text.slice(0, 300) }; }
  }
  return { ok: res.ok, status: res.status, data };
}

/* ------------------------------------------------------------------ */
/* Pomocné funkce                                                      */
/* ------------------------------------------------------------------ */

async function prectiVstup(request) {
  const typ = (request.headers.get('Content-Type') || '').toLowerCase();
  if (typ.includes('application/json')) {
    const data = await request.json();
    return data && typeof data === 'object' ? data : {};
  }
  // application/x-www-form-urlencoded i multipart/form-data
  const fd = await request.formData();
  const out = { _formular: true };
  for (const [k, v] of fd.entries()) {
    if (typeof v === 'string') out[k] = v;
  }
  return out;
}

function ocisti(hodnota) {
  return typeof hodnota === 'string' ? hodnota.trim().replace(/\s+/g, ' ').slice(0, 100) : '';
}

function platnyEmail(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function rozdelTagy(hodnota) {
  return String(hodnota || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Přesměrovat jen v rámci webu – žádné absolutní URL ani `//jinam`. */
function bezpecnaCesta(cesta) {
  return typeof cesta === 'string' && /^\/(?!\/)[^\s]*$/.test(cesta);
}

function popis(data) {
  if (!data) return '';
  if (typeof data.message === 'string') return data.message;
  if (Array.isArray(data.message)) return data.message.join('; ');
  return JSON.stringify(data).slice(0, 300);
}

/**
 * Vrátí CORS hlavičky pro povolený původ, {} pro stejnou doménu bez hlavičky Origin,
 * a null, když požadavek přišel z cizí nepovolené domény.
 */
function corsHeaders(request, env) {
  const origin = request.headers.get('Origin');
  if (!origin) return {};

  const vlastni = new URL(request.url).origin;
  const povolene = new Set([vlastni, ...rozdelTagy(env.ALLOWED_ORIGINS)]);
  if (!povolene.has(origin)) return null;

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}
