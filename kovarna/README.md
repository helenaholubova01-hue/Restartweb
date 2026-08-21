# Kovárna — web na Cloudflare Workers

Statický web hostovaný přes **Cloudflare Workers se static assets**.
Ne Pages: ty jsou od roku 2026 v režimu údržby, Workers mají plnou feature
paritu pro statiku, SSR i vlastní domény a jde do nich veškerý další vývoj.

## Struktura

```
kovarna/
├── wrangler.jsonc      konfigurace deploye
├── public/             všechno, co se servíruje na web
│   ├── index.html
│   ├── 404.html        placeholder, dodělá se s designem
│   ├── _headers        bezpečnostní hlavičky a CSP
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

Náhled lokálně před nasazením:

```bash
npx wrangler dev
```

## Doména

Aby šla nová doména připojit na Worker, musí být zóna na Cloudflare:

1. při registraci nastavit **Cloudflare nameservery**
2. v dashboardu otevřít Worker → **Settings → Custom Domains**
3. přidat doménu i variantu s `www`

## Rozdíly proti Apache hostingu

Metodika v `../instrukce-web.md` počítá s `.htaccess`. Na Workers neexistuje,
tyhle tři věci se řeší jinak:

| Na Apache             | Na Workers                                    |
|-----------------------|-----------------------------------------------|
| `ErrorDocument 404`   | `not_found_handling: "404-page"` ve wrangleru |
| hlavičky v `.htaccess`| soubor `public/_headers`                      |
| `Redirect` / rewrite  | soubor `public/_redirects`                    |

## Co ještě chybí

- [ ] doména — doplnit do `wrangler.jsonc`, kanonických URL, `robots.txt` a `sitemap.xml`
- [ ] potvrdit formulářovou službu a podle ní doladit `script-src` a `form-action` v `_headers`
- [ ] obsah, texty a fotky
