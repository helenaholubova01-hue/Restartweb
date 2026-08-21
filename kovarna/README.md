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

## Adresáře

```
kovarna/
├── wrangler.jsonc      konfigurace deploye
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

## Deploy

```bash
cd kovarna
npx wrangler login     # jednorázově
npx wrangler deploy
```

Náhled lokálně: `npx wrangler dev`

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

- [ ] doména — doplnit do kanonických URL, `robots.txt` a `sitemap.xml`
- [ ] jméno akce → finální slug místo `/vyzva/`
- [ ] homepage — zatím neexistuje
- [ ] prodejka: přenést z hostingu (`vibe-pages/kovarnafable/`) na `/kovarna/`, přepsat
      placeholder `ZMEN-DOMENU.cz` a vyměnit GTM kontejner za vlastní
- [ ] landing výzvy a zbytek funnelu
- [ ] rezervační systém na 15minutový vstupní rozhovor
- [ ] po ustálení analytiky zúžit seznam zdrojů v CSP
