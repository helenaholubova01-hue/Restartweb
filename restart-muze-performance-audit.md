# Restart Muže – Kniha stránka: Performance Audit

**Stránka:** `restartweb.odborneweby.cz` (bude přesunuta na doménu restartmuze.cz)  
**Datum auditu:** 6. 3. 2026  
**Zdroj:** PageSpeed Insights (Lighthouse 13.0.1)

---

## Aktuální stav – mobilní výsledky

| Metrika | Hodnota | Stav |
|---|---|---|
| First Contentful Paint | 3,9 s | 🔴 |
| Largest Contentful Paint | 3,9 s | 🟠 |
| Total Blocking Time | 410 ms | 🟠 |
| Cumulative Layout Shift | 0,486 | 🔴 |
| Speed Index | 3,9 s | 🟠 |

Desktop: Performance 95, FCP 2,0 s, LCP 2,0 s, TBT 180 ms, CLS 0,008

---

## Prioritní opravy (seřazeno podle dopadu)

### 1. Render-blocking resources (úspora ~3 260 ms na mobilu)

**Font Awesome (`css/all.min.css` – 19,3 KiB, 900 ms blokování):**
- Nejlepší řešení: nahradit používané ikony inline SVG a Font Awesome kompletně odstranit
- Alternativa: načíst asynchronně přes preload pattern:
```html
<link rel="preload" href="css/all.min.css" as="style" 
      onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/all.min.css"></noscript>
```

**Google Fonts (2,6 KiB, 750 ms blokování):**
- Nejlepší řešení: stáhnout WOFF2 soubory a hostovat lokálně na vlastním serveru
- Přidat preconnect (pokud zůstanou na Google):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```
- Použít `font-display: swap` v `@font-face` (nebo v URL Google Fonts: `&display=swap`)
- Fonty na stránce: Montserrat (400, 600, 700, 800, 900) a Open Sans (400, 600)

### 2. Obrázky (úspora ~411 KiB)

Převést na moderní formáty (WebP/AVIF):
- `kniha-restart-muze-slava-milan(1).jpg` – 367 KiB → potřebuje zmenšit rozměry + WebP
- `kniha-mockup-bestseller.jpg` – 71 KiB → WebP
- `Artboard2.png` – 66 KiB → WebP

Hero obrázek (obálka knihy):
- Přidat `fetchpriority="high"`
- Odstranit `loading="lazy"` (pokud je nastaveno)
- Ostatní obrázky pod foldem nechat `loading="lazy"`
- Přidat `width` a `height` atributy na všechny `<img>` (pomůže i s CLS)

### 3. CLS 0,486 – kritické

Příčiny:
- Obrázky bez explicitních rozměrů (`width`, `height` atributy)
- Font swap způsobující přeskládání layoutu
- Řešení: definovat rozměry na všech `<img>`, použít `font-display: swap`

### 4. Stripe JS (230 KiB) – odložit načítání

- `stripe.js` (213 KiB) a `out-4.5.45.js` (16 KiB) se načítají okamžitě
- Pokud platební tlačítko není above-the-fold, načítat až po interakci uživatele nebo s `defer`

### 5. Fapi JS (91 KiB starší JS)

- `chunk-vendors.536cf758.js` z form.fapi.cz obsahuje Babel polyfilly
- Na obsah nemáme vliv (třetí strana), ale skript načítat s `defer`

### 6. Cache headers (úspora ~729 KiB při opakované návštěvě)

Server vrací TTL "None" – přidat do `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
```

---

## Diagnostika (menší dopad)

- **Nepoužívané CSS** – úspora 36 KiB
- **Nepoužívaný JavaScript** – úspora 402 KiB
- **Minifikace CSS** – úspora 3 KiB

---

## Poznámky od IT technika

- Přesun na doménu Restart Muže zlepší zbylé problémy
- Preconnect na Google Fonts jako rychlý win
- Ideálně fonty hostovat lokálně
- Doporučuje `display=swap` (pozn.: `optional` je agresivnější varianta – na sales page lepší zůstat u `swap` kvůli vizuální konzistenci)

---

## Cílový stav po optimalizaci

- FCP pod 2 s na mobilu
- CLS pod 0,1
- Performance skóre 90+ na mobilu
