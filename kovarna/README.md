# Kovárna — samostatný web

Roční program pro ženaté podnikatele s dětmi. Vede Sláva Černý.
Vlastní doména, statický web hostovaný přes **Cloudflare Workers se static
assets** (ne Pages — ty jsou od roku 2026 v režimu údržby).

## Struktura webu

```
/                        Krátká homepage — dvoje dveře
│
├── /kovarna/            Prodejka ročního programu
│
├── /vyzva/              Landing 3denní výzvy — sem míří reklama a maily
│   ├── /vyzva/dekujeme/ Potvrzení registrace              [noindex]
│   ├── /vyzva/den-1/    Obsah dne 1                       [noindex]
│   ├── /vyzva/den-2/    Obsah dne 2                       [noindex]
│   ├── /vyzva/den-3/    Obsah dne 3                       [noindex]
│   └── /vyzva/pozvanka/ Most z výzvy do Kovárny           [noindex]
│
├── /ochrana-udaju/      GDPR
├── /obchodni-podminky/  VOP
└── 404.html
```

Slug `/vyzva/` je zástupný — nahradí ho jméno, které ta akce dostane.
Vybrat ho je potřeba před spuštěním: pozdější změna znamená přesměrování
a přepisování odkazů v reklamách a mailech.

Samostatné `/rozhovor/` s rezervačním embedem má smysl přidat, až bude jasné,
přes co se rezervuje — odkazuje se na něj prodejka i pozvánka.

### Proč root = homepage, a ne rovnou prodejka
Na root se lidé dostanou dvěma cestami, které nikdo neřídí: ustřihnou URL
výzvy, nebo doménu prostě napíšou, protože ji někde slyšeli. Kdyby tam byla
prodejka, spadne účastník bezplatné výzvy rovnou na nabídku za 50 000 Kč
a člověk, který slyšel o výzvě, ji na webu vůbec nenajde.

Homepage je proto jedna obrazovka, ne další velká stránka: co je Kovárna,
pro koho je, kdo ji vede. Hlavní tlačítko vede na výzvu (nízký práh, tam má
jít většina lidí), vedlejší odkaz na roční program. Nic víc.

### Proč je výzva sourozenec, a ne podstránka prodejky
Reklama a maily míří přímo na `/vyzva/`, přes root tam nikdo nechodí. Landing
má být „hluchý" — bez navigace pryč, s jedinou cestou ven: registrací.

### Proč `/vyzva/pozvanka/`
Po třech dnech výzvy je člověk v jiném rozpoložení než cizí návštěvník. Poslat
ho z posledního mailu rovnou na prodejku znamená skok z obsahu zdarma na
50 000 Kč bez mezikroku. Pozvánka naváže na to, co ve výzvě zažil.

### Landing výzvy musí přežít i mimo termín
Výzva běží v termínech, ale `/vyzva/` existuje pořád — odkazy z reklam, mailů
a sdílení nezmizí. Mimo termín stránka nesmí být slepá: místo registrace
nabídne zápis na další běh.

## Indexace

Řízená hlavičkou podle cesty v `public/_headers`, ne meta tagem v souborech —
ať to nestojí na tom, jestli si na něj někdo vzpomene.

| Cesta | Indexovat |
|---|---|
| `/` | ano |
| `/kovarna/` | ano |
| `/vyzva/` | ano |
| zbytek funnelu | ne |

## Vlastnictví a účty

Kovárnu provozuje **Mentoring SČ s.r.o.** — jiná firma než Restart muže s.r.o.
(IČO 10947116), pod kterou běží restartmuze.cz. Všechno kolem tohohle webu
proto patří pod Mentoring SČ, ne pod Restart muže.

| Vrstva | Komu patří |
|---|---|
| Doména — držitel u CZ.NIC | Mentoring SČ s.r.o. |
| Účet u registrátora (Wedos) | vlastní, vedený na Mentoring SČ s.r.o. |
| Účet na Cloudflare | vlastní, vedený na Mentoring SČ s.r.o. |
| GTM kontejner a GA4 | vlastní, ne sdílený s Restart mužem |
| Fakturace programu | Mentoring SČ s.r.o. |

Držitel domény a majitel účtu u registrátora jsou dvě různé věci — jeden účet
umí držet domény pro různé držitele. Faktury za registraci ale chodí na
fakturační údaje **účtu**, ne podle držitele jednotlivé domény. Proto vlastní
účet: jinak by za doménu Kovárny platil Restart muže a muselo by se to mezi
firmami přefakturovávat.

Analytika se ze stejného důvodu nesdílí. Správcem osobních údajů na tomhle
webu je Mentoring SČ s.r.o., takže potřebuje vlastní kontejner i vlastní
zásady zpracování — ne kontejner Restart muže, který je na stránce zděděný
z předlohy.

## Adresáře

```
kovarna/
├── wrangler.jsonc      konfigurace deploye + vars (tagy, source)
├── src/
│   └── index.js        Worker: POST /api/registrace → CliqSales; ostatní cesty jdou na statické soubory
├── snippets/
│   └── registrace-webinar.html   formulář registrace k vložení do stránky webináře
├── public/             všechno, co se servíruje na web
│   ├── index.html
│   ├── 404.html        placeholder, dodělá se s designem
│   ├── _headers        bezpečnostní hlavičky, CSP, indexace
│   ├── _redirects      volitelně, přesměrování
│   ├── img/
│   └── fonts/
└── README.md
```

`_headers` a `_redirects` se samy neservírují — Cloudflare je jen přečte
a aplikuje jejich pravidla na odpovědi.

## Registrace na webinář → CliqSales

Webinář běží přes Zoom, registrace jde mimo WebinarJam: vlastní formulář na
stránce pošle jméno, příjmení a e-mail na Worker (`POST /api/registrace`) a ten
přes API CliqSales založí nebo doplní kontakt a přidá mu tag. API klíč leží jen
ve Workeru jako secret, v HTML ani JS není.

```
formulář (snippets/registrace-webinar.html)
   └─ POST /api/registrace  { jmeno, prijmeni, email }
        └─ src/index.js
             ├─ kontakt s e-mailem existuje → jen přidá tagy (jméno doplní, kde chybí)
             └─ neexistuje → upsert: založí kontakt s tagy a source
```

### Nastavení (jednorázově, Ondra)

```bash
cd kovarna
npx wrangler secret put GHL_API_KEY       # Private Integration token CliqSales: kontakty číst + zapisovat
npx wrangler secret put GHL_LOCATION_ID   # ID lokace (sub-accountu) v CliqSales
npx wrangler deploy
```

Secrets patří k Workeru podle `name` ve `wrangler.jsonc`. Pro ostrý Worker je
nastav z adresáře, odkud se nasazuje, nebo přidej `--name chlapska-kovarna`.
Viz upozornění v části Deploy níže.

Token vznikne v CliqSales: Settings → Private Integrations → New. Práva stačí
„View Contacts“ a „Edit Contacts“.

Tagy a source jsou ve `wrangler.jsonc` → `vars`:

| Proměnná | Význam | Výchozí |
|---|---|---|
| `TAGS_REGISTRACE` | tagy oddělené čárkou, dostane je každý registrovaný | `kovarna_webinar_registrace` |
| `SOURCE` | pole Source u nově založeného kontaktu | `Web Kovárna – webinář` |
| `ALLOWED_ORIGINS` | volitelně další weby, které smí formulář posílat (origin, čárkou) | – (stejná doména je povolená vždy) |

### Ověření

```bash
npx wrangler dev            # lokálně; secrets pro dev do .dev.vars (GHL_API_KEY=…, GHL_LOCATION_ID=…)
curl -s -X POST http://localhost:8787/api/registrace \
  -H 'Content-Type: application/json' \
  -d '{"jmeno":"Test","prijmeni":"Testovací","email":"test@example.cz"}'
# → {"ok":true,"novy":true}   a v CliqSales kontakt s tagem kovarna_webinar_registrace
```

Chyby vrací Worker jako `{"ok":false,"message":"…"}` s českou hláškou, kterou
formulář rovnou zobrazí. Podrobnosti o selhání CliqSales jsou v logu
(`npx wrangler tail` nebo dashboard → Observability), e-maily se nelogují.

### Formulář ve stránce

Blok `snippets/registrace-webinar.html` (styl + HTML + JS) se vloží do stránky
webináře tam, kde má být formulář. Počítá s proměnnými Kovárny, bez nich má
fallbacky. Děkovačka se nastaví ve skrytém poli `_redirect`; prázdné = potvrzení
se zobrazí na místě formuláře. Po úspěchu odejde `dataLayer` event
`webinar_registrace` pro konverzi v GTM. Texty (tlačítko, potvrzení, GDPR věta)
jsou převzaté ze stávající webinářové stránky Restart muže; odkaz na GDPR míří
na `/ochrana-udaju/`.

### Návazně v CliqSales

Potvrzovací e-mail se Zoom odkazem a připomínky řeší workflow v CliqSales se
spouštěčem „přidán tag `kovarna_webinar_registrace`“. Koncept workflow
„Webinář Kovárna – registrace z webu → tag“ existuje, publikuje se ručně.

## Deploy

```bash
cd kovarna
npx wrangler login     # jednorázově
npx wrangler deploy
```

Náhled lokálně: `npx wrangler dev`

> **Pozor, než spustíš deploy z tohohle adresáře.** Ostrý web běží ve Workeru
> `chlapska-kovarna` na účtu Cloudflare Kovárny a je nasazený odjinud. Zdejší
> `public/` má jen `404.html` a `_headers`, ostrý web v něm není. `wrangler deploy`
> nahrazuje statické soubory Workeru celým obsahem `public/`, takže deploy odsud
> pod jménem `chlapska-kovarna` by web přepsal na samotnou 404. Proto tu zůstává
> `name: "kovarna"`: deploy odsud založí oddělený Worker a ostrého webu se nedotkne.
>
> Endpoint registrace se do ostrého webu dostane jedním z těchto postupů:
>
> 1. do adresáře, odkud se `chlapska-kovarna` nasazuje, přenést `src/index.js`
>    a z `wrangler.jsonc` klíče `main`, `assets.binding`, `assets.run_worker_first`
>    a `vars`; tam nastavit secrets a nasadit, nebo
> 2. přenést ostrý web do zdejšího `public/`, přejmenovat `name` na
>    `chlapska-kovarna` a nasazovat už jen odsud. To je cílový stav, aby byl
>    web ve verzování.

## Doména

Aby šla nová doména připojit na Worker, musí být zóna na Cloudflare:

1. při registraci nastavit **Cloudflare nameservery**
2. v dashboardu otevřít Worker → **Settings → Custom Domains**
3. přidat doménu i variantu s `www`

## Rozdíly proti Apache hostingu

Metodika v `../instrukce-web.md` počítá s `.htaccess`. Na Workers neexistuje:

| Na Apache             | Na Workers                                    |
|-----------------------|-----------------------------------------------|
| `ErrorDocument 404`   | `not_found_handling: "404-page"` ve wrangleru |
| hlavičky v `.htaccess`| soubor `public/_headers`                      |
| `Redirect` / rewrite  | soubor `public/_redirects`                    |

## Co ještě chybí

- [ ] doména — registrovat na Mentoring SČ s.r.o., pak doplnit do kanonických
      URL, `robots.txt` a `sitemap.xml`
- [ ] jméno akce → finální slug místo `/vyzva/`
- [ ] homepage — zatím neexistuje
- [ ] prodejka: přenést z hostingu (`vibe-pages/kovarnafable/`) na `/kovarna/`, přepsat
      placeholder `ZMEN-DOMENU.cz` a vyměnit zděděný GTM kontejner
      Restart muže (`GTM-MZ6KX3VV`) za vlastní
- [ ] landing výzvy a zbytek funnelu
- [ ] rezervační systém na 15minutový vstupní rozhovor
- [ ] registrace na webinář: nastavit secrets `GHL_API_KEY` a `GHL_LOCATION_ID`,
      vložit `snippets/registrace-webinar.html` do stránky webináře, ověřit první
      registraci v CliqSales, publikovat workflow s e-mailem (Zoom odkaz)
- [ ] právní stránky — IČ, sídlo a zápis v rejstříku Mentoring SČ s.r.o.
- [ ] po ustálení analytiky zúžit seznam zdrojů v CSP
