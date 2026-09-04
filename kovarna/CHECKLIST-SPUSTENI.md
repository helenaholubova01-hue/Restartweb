# Kovárna — checklist před ostrým spuštěním

Společný soupis pro všechny konverzace, které pracují nad složkou `kovarna/`.
Když něco vyřešíš, odškrtni to tady — ať to nežije jen v konverzacích.
Založeno 1. 9. 2026.

---

## 0. ČEKÁ NA HELENU (stav k 1. 9. 2026, ~7:30)

Krátký soupis toho, co blokuje ostatní. Odškrtávat sem, ne do konverzací.

- [x] ~~**Kde poběží prodej**~~ — **ROZHODNUTO 1. 9.: prodej jede na `kovarna.restartmuze.cz`.**
      Odkazy v `deploy/` přepsané (canonical i og:url na kořen, og:image 5×, texty obchodních
      podmínek 2× a zásad zpracování 1×). Detaily v bodu 1.
- [ ] **Schválit přestavěnou stránku návodů** — blokuje společný deploy.
      Náhled: `http://localhost:8123/deploy/navody/index.html` (náhledy videí se v lokálním
      náhledu nenačtou, viz bod 4 — to není chyba stránky).
- [ ] **Povolit sync sandboxu** — `kovarnafable/` je veřejná adresa, konverzace na ni
      bez pokynu nesahá. Jde o nahrání nového `cookie-banner.css` a smazání jsdelivr
      odkazu ze stránky tréninku; bez toho je na sandboxu pořád bílý posuvník v okně
      „Nastavení cookies".
- [x] ~~**Odkaz „Nastavení cookies" do patičky prodejky?**~~ — **UZAVŘENO 1. 9.:
      Helena ho tam NECHCE** („odkazy přidávat nechci"). Prodejka má v patičce jen
      Obchodní podmínky · Cookies · Zásady zpracování. Odebráno ze všech čtyř kopií, ověřeno.

      **Znovu to prosím neotevírejte** — ten odkaz šel tam a zpátky třikrát za jeden den.
      Odvolat souhlas jde přes patičku → Cookies → „Otevřít nastavení cookies", ověřeno funkční.
      Odkaz si PONECHÁVAJÍ: `navody/`, `cookies/`, `gdpr/`, `obchodni-podminky/`,
      `odstoupeni-od-smlouvy/`. Děkovačky ho nemají (odebráno 1. 9. záměrně).
- [ ] **Předat konverzaci „Podmínky mentoringu SČ"** (ta nasazuje) — žádná jiná konverzace
      ji neumí adresovat přes SendMessage. Potřebuje vědět: nový `cookie-banner.css`
      (22 261 B, kompletní knihovna v2.9.2 + motiv) musí jít ven SPOLU s `?v=5`
      na všech stránkách v `deploy/`; `cookie-banner.js` se nemění.
      **VYŘEŠENO deployem 1. 9. v 7:28** — živě je `cookie-banner.css?v=5`, kompletní
      knihovna (22 261 B) a jsdelivr odkaz je pryč. Bílý posuvník už na Workers není.
      Zbývá jen sandbox (viz bod výš).
- [ ] **Má být „Odmítnout" plnohodnotné tlačítko na první vrstvě?** — dnes je odmítnutí
      jen odkaz v odstavci („přijmout jen nezbytné", funguje, viz „Ověřeno" níže).
      Změna se dotkne textů lišty, což je projektový standard z `index4kroky.html`
      — propsalo by se to i na Restart, proto to nikdo nemění sám.

### Ověřeno, není potřeba řešit

- **Odkaz „Nastavení cookies" se z prodejky neztratil** — nikdy tam nebyl. Ve starých
  verzích se „c-settings" vyskytuje jen jako vnitřek minifikované knihovny (`r("c-settings")`),
  skutečný atribut `data-cc="c-settings"` má napříč všemi verzemi prodejky hodnotu 0.
- **Odmítnutí na první vrstvě funguje**, i když tam není tlačítko „Odmítnout" — je to odkaz
  v textu (`id="nastavitnutne"`), obsluha v `cookie-banner.js`, volá `accept([])`.
  V grepu na `data-cc` nevyskočí, proto vypadá jako chybějící.
- **Past při ověřování lišty:** `getComputedStyle(#s-cnt).visibility` hlásí „hidden",
  i když je panel viditelný — řídí se přes `#s-inr`. Ověřovat screenshotem, ne computed
  stylem, jinak z toho vyjde falešná chyba.

---

## 1. HOTOVO: prodej jede na kovarna.restartmuze.cz

**Rozhodla Helena 1. 9. 2026.** Vlastní doména `chlapskakovarna.cz` k tomu datu neexistovala
(NXDOMAIN, ověřeno nezávisle dvěma konverzacemi přes systémové DNS i 8.8.8.8) a čekat se na ni
nemuselo — Lenka má v mailu zkracovač, takže odkaz jde vyměnit kdykoliv.

### Co se kvůli tomu přepsalo (1. 9.)

| Kde | Počet | Nová hodnota |
|---|---|---|
| `rel=canonical` | 2× | `https://kovarna.restartmuze.cz/` — **kořen**, u obou kopií |
| `og:url` | 2× | totéž |
| `og:image` | 5× | `https://kovarna.restartmuze.cz/img/trenink-og.jpg` |
| text obchodních podmínek | 2× | „na webovém rozhraní https://kovarna.restartmuze.cz" |
| text zásad zpracování údajů | 1× | „na internetové adrese https://kovarna.restartmuze.cz" |

- **Canonical míří na kořen i ze stránky `/trenink/`.** Obě adresy servírují tentýž obsah;
  kanonická je ta, kde běží prodej. Bez toho by po sejmutí `noindex` vznikl duplicitní obsah.
- **Texty právních dokumentů se změnily záměrně** — dokument musí uvádět adresu, kde prodej
  opravdu běží. Kdyby zákazník odsouhlasil podmínky odkazující na neexistující web, byla by
  to vada. Změna je jen v adrese, nikde jinde do textu nikdo nesahal.
- **Nedotčeno zůstalo:** `UID:…@chlapskakovarna.cz` v kalendářových souborech obou děkovaček
  (je to jen jednoznačný identifikátor události, nemusí se dát otevřít — a změna by rozbila
  identitu události těm, kdo si ji už přidali) a komentáře v `navody/`.
- Na sandboxu `kovarnafable/` zůstávají staré odkazy — sandbox se možná úplně opustí, viz
  „Zjednodušení souborů" níže.

---

## 2. ČEKÁ SE: video od Slávy

**Sláva ho zatím nenatočil** (stav k 1. 9. 2026). Na prodejce tréninku ani na obou
děkovačkách proto video není — ověřeno, není tam ani zakomentované místo, kam by patřilo.

- Helena 31. 8. Slávovi psala, že **stačí jedno video** pro prodejku i děkovačky —
  pokud nebude chtít mluvit zvlášť k VIP členům. Pak by byla potřeba dvě.
- Na video čeká i Dan kvůli uvítacímu příspěvku ve skupině v komunitě.

**Až video přijde:** nahrát do Bunny (knihovna `371834`, stejná jako návody) a vložit
stejným způsobem jako na stránce návodů — náhledový obrázek s `data-video`, přehrávač se
načte až po kliknutí (`iframe.mediadelivery.net/embed/371834/<ID>?autoplay=true&responsive=true`).
Kvůli tomu se nenačítá Bunny hned při otevření stránky.
Pozor na povolené referrery v Bunny — viz bod „Bunny" v části 5.

Kam video patří: prodejka tréninku (`deploy/index.html` **i** `deploy/trenink/index.html`
— jsou to dvě kopie téže stránky) a obě děkovačky.

## 3. Před spuštěním prodeje

- [ ] **Pustit web do vyhledávačů — POZOR, jsou to DVĚ místa, ne jedno:**
      1. Smazat `noindex` z `deploy/_headers` (teď `X-Robots-Tag: noindex, nofollow`
         na celém webu).
      2. V `deploy/index.html` přepsat `<meta name="robots">` z `noindex, nofollow`
         na `index, follow, max-image-preview:large` (a stejně v `deploy-trenink/index.html`
         a `trenink-3-dny-v7.html`, aby se kopie nerozešly).

      **Samotné smazání `_headers` nestačí** — stránka by zůstala neviditelná kvůli té
      metaznačce v HTML. Tohle je nejpravděpodobnější chyba při spuštění.

      **Ostatní stránky si `noindex` PONECHAJÍ**, je to záměr:
      `trenink/` (druhá adresa téhož obsahu, canonical míří na kořen), `navody/`
      (stránka pro zaplacené), obě děkovačky, `odstoupeni-od-smlouvy/`.
      Právní dokumenty (`cookies/`, `gdpr/`, `obchodni-podminky/`) metaznačku nemají,
      takže se odemknou samy smazáním `_headers`.

      Až v okamžiku ostrého startu, ne dřív.
- [ ] **FAPI: nastavit děkovačku** na `/trenink/dekujeme/` — jednu jedinou.
      VIP se řeší na stránce: objednávka s VIP položkou se pozná přes `getOrdersData`
      ještě před měřením a přesměruje se na `/trenink/dekujeme-vip/`, kde se nákup teprve
      změří (proto se nepočítá dvakrát).
- [ ] **Společný deploy** — viz níže.

## 4. Po deployi ověřit stránku návodů

Stránka `/navody/` se **nedá ověřit z localhostu** — Bunny pull zone
(`vz-0c3a91ec-d57.b-cdn.net`) má stejný zámek na referrer jako přehrávač,
takže z lokálního serveru vrací 403 a místo náhledů se ukáže záložní karta.
Ověřit se to dá až na ostré adrese:

- [ ] Otevřít `kovarna.restartmuze.cz/navody/` a projít všechny tři záložky
      (Počítač / Android / iPhone) — u čtyř zoomových videí se musí načíst
      náhled a po kliknutí naskočit přehrávač.
- [ ] Zkontrolovat i páté video v sekci Uzavřená skupina (průvodce komunitou,
      `f80f155b…`) — to je jediné na šířku, ostatní jsou na výšku.
- [ ] Náhled toho nového videa je v Bunny **pořád barevný** (oranžové logo,
      modrá tlačítka), i když video má být přebarvené načerno­bíle. Stránka to
      maskuje šedým CSS filtrem, ale stojí za ověření v Bunny, jestli se
      přebarvení uložilo a jestli nemá přegenerovat náhled.

## 5. Když se připojí ostrá doména (chlapskakovarna.cz)

- [ ] Přidat doménu do Cloudflare účtu a připojit k Workeru (`wrangler.jsonc` → `routes`).
- [ ] **Bunny: doplnit `www.chlapskakovarna.cz`** mezi povolené referrery. Helena 31. 8.
      doplnila `chlapskakovarna.cz` i `kovarna.restartmuze.cz`, ale **www varianta vrací 403** —
      bez toho budou na stránce návodů místo videí prázdné karty.
- [ ] Vrátit og:image / og:url / canonical z kovarna.restartmuze.cz zpátky na ostrou doménu
      (pokud se mezitím přepisovaly — viz bod 1).
- [ ] Dát vědět Lence, ať přesměruje zkracovač v mailu.

---

## Hotovo (ať se to nedělá dvakrát)

- [x] **GTM zůstává `GTM-MZ6KX3VV`** — Helena 1. 9. potvrdila, že stránka pojede pod IČem
      Restartu muže, takže restartovský kontejner je správně. Neměnit.
- [x] **Provozovatel = Restart muže s.r.o.** (IČO 10947116, DIČ CZ10947116, sp. zn. C 40854,
      podpora@restartmuze.cz). Rozhodl Sláva 31. 8., protože FAPI nešlo převést na Mentoring SČ
      (dohoda s likvidátorkou). Přepsáno všude: patičky, právní dokumenty, děkovačky.
      Verze s Mentoring SČ jsou uložené v `archiv-mentoring-sc/`.
- [x] **Ostrý FAPI formulář** `904cedda-23a1-4a6a-b243-726bd75fae6a` (účet Restart muže,
      od Dana 31. 8.) — Standard 297 Kč / VIP 997 Kč, limit 10 VIP.
- [x] **Homepage = 3denní trénink** (rozhodnutí Heleny 31. 8.). Prodejka ročního programu
      z `deploy/` odebraná, leží jako `kovarna/prodejka-kovarna-aktualni.html`.
      **Nevracet ji do `deploy/`** — na nový web zatím nepatří.
- [x] Cookie lišta sjednocená do sdíleného `cookie-banner.css` + `cookie-banner.js`
      (černobílá kovárenská, bez odkazů na cookies/gdpr — rozhodnutí 31. 8., texty jsou
      projektový standard z `index4kroky.html`).

---

## Pravidla pro nasazování

- Nasazuje se příkazem `npx wrangler deploy` ze složky `kovarna/`. **Nasadí se CELÁ složka
  `deploy/`**, ne jen soubory jedné konverzace — proto se domluvil jeden společný deploy
  až bude hotovo všechno.
- Cíl je **kovarna.restartmuze.cz** (custom domain v `wrangler.jsonc`), účet Cloudflare
  „Restart muže". Poslední deploy: 31. 8. 2026 23:26.
- `.vibe` sandbox (`restartmuze.cz/kovarnafable/…`) je **jiný cíl** — nasazuje se přes MCP
  konektor, wrangleru se netýká. Obsah obou se může lišit, není to chyba.
- Stránka tréninku je v `deploy/` **dvakrát**: `deploy/index.html` (homepage, cesty bez `../`)
  a `deploy/trenink/index.html` (stálá URL pro reklamy, cesty s `../`). Obojí se generuje
  z `deploy-trenink/index.html` — **při změně v7 se musí přegenerovat obě**.
- Finální leadovka je `trenink-3-dny-v7.html`. Varianty v2–v6 jsou designový archiv,
  v `deploy/` nikdy nebyly.
