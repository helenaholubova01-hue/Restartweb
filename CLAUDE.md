# Restart muže — technické standardy pro HTML prodejky

Tento soubor obsahuje závazné standardy pro všechny HTML stránky projektu Restart muže.
Referenční vzor pro většinu standardů: `Webinář restart vztahu 4 kroky/index4kroky.html`

---

## 1. Viewport a safe-area (iPhone)

Každá stránka musí mít `viewport-fit=cover` a používat `env(safe-area-inset-*)` na prvcích u okrajů displeje.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

Kde použít safe-area v CSS:
```css
/* Hero sekce — odsazení od notche nahoře */
.hero {
    padding-top: calc(4rem + env(safe-area-inset-top));
}

/* Sticky CTA lišta dole (mobil) — nad home barem */
.sticky-cta {
    bottom: max(0.5rem, env(safe-area-inset-bottom));
    padding-bottom: calc(0.4rem + env(safe-area-inset-bottom));
}

/* Footer — odsazení od home baru */
.footer-bottom {
    padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
}

/* Lightbox zavírací tlačítko — pod výřezem */
.lightbox-close {
    top: max(1rem, env(safe-area-inset-top));
    right: max(1rem, env(safe-area-inset-right));
}
```

---

## 2. Typografie

```css
:root {
    --font-heading: 'Montserrat', 'Montserrat Fallback', sans-serif;
    --font-body:    'Open Sans', 'Open Sans Fallback', sans-serif;

    --text-white: #ffffff;
    --text-light: #e2eaf2;
    --text-muted: #c8d6e5;   /* nikdy tmavší */

    --fs-body:  1.1rem;
    --fs-lead:  1.035rem;
    --fs-label: 0.95rem;
    --fs-small: 0.85rem;
    --fs-trust: 0.8rem;
}
```

- Fonty jsou **self-hosted** (woff2 v podsložce `fonts/`) — žádné Google Fonts CDN
- Žádná kurzíva (`font-style: italic`) nikdy
- Open Sans minimum `1.1rem` — menší je špatně čitelné
- Lead texty a FAQ odpovědi: `#ffffff`, ne `var(--text-light)`
- Značková modrá (pro prvky odlišené od CTA): `#002338`

---

## 3. CTA tlačítka

```css
.cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 3rem;
    background: #3f9626;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    text-decoration: none;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: center;
}

@media (hover: hover) {
    .cta-btn:hover {
        background: #4db82e;
        transform: scale(1.04);
    }
}
```

- Pod **každým** CTA musí být `.trust-row` se zelenými ikonami
- Hover: pouze barva + scale(1.04) — žádný translateY ani box-shadow
- Pill tvar (border-radius: 100px) — nikdy 8px ani 12px

---

## 4. Provely bubliny

Každá prodejka musí mít Provely zapojené takto — **nikdy ne natvrdo při načtení**.

**`<head>` — CSS lazy load:**
```html
<link rel="stylesheet" href="https://restartmuze.cz/wp-content/plugins/mp-provely/assets/style.css?ver=1.0"
    media="print" onload="this.media='all'">
```

**CSS — skrýt dokud uživatel nescrollne za hero:**
```css
#mioprovely-root {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}
body.show-provely #mioprovely-root {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}

@media (max-width: 768px) {
    #mioprovely-root { bottom: 80px !important; } /* nad sticky CTA lištou */
}
```

**JS + skripty (před `</body>`):**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js" defer></script>
<script>
    (function () {
        var M = window.MioPlugin = window.MioPlugin || {};
        var B = M.Bubbles = M.Bubbles || {};
        B.opts = { "ep": "https://restartmuze.cz/wp-json/mioprovely/v1", "d": 4000, "s": 7000, "k": "cde57dd5d19033149656abe1634b6880" };
    })();

    // Aktivovat až po scrollu za hero
    (function () {
        var provelyActivated = false;
        var heroEl = document.getElementById('hero');
        if (!heroEl) return;
        function activateProvely() {
            if (provelyActivated) return;
            provelyActivated = true;
            document.body.classList.add('show-provely');
        }
        window.addEventListener('scroll', function () {
            if (provelyActivated) return;
            var heroEnd = heroEl.offsetTop + heroEl.offsetHeight;
            if ((window.pageYOffset || window.scrollY) > heroEnd) activateProvely();
        }, { passive: true });
    })();
</script>
<script src="https://restartmuze.cz/wp-content/plugins/mp-provely/assets/script.js?ver=1.4" defer></script>
```

---

## 5. Cookie banner

Použít **orestbida/cookieconsent v2.9.2 INLINE** — přesná kopie z `index4kroky.html:2152–2318`.

**`<head>` — CSS lazy load (ne inline, ne CDN):**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.9.2/dist/cookieconsent.css"
    media="print" onload="this.media='all'">
```

**Na konci `<body>` — JS inicializace + inline CSS + minifikovaný core:**
```html
<script>window.dataLayer = window.dataLayer || [];</script>
<script>
    window.addEventListener('load', function () {
        var cookieconsent = initCookieConsent();
        cookieconsent.run({
            autorun: true,
            revision: 2,
            current_lang: document.documentElement.getAttribute('lang'),
            autoclear_cookies: true,
            page_scripts: true,
            onAccept: function (cookie) {
                dataLayer.push({ 'event': 'cc_update', 'cookie': JSON.stringify(cookie) });
                cookieconsent.hide();
            },
            onChange: function (cookie) {
                dataLayer.push({ 'event': 'cc_update', 'cookie': JSON.stringify(cookie) });
            },
            languages: { cs: { /* ... texty z index4kroky.html:2174–2207 ... */ } }
        });
    });
</script>
<!-- inline CSS override pro zelené tlačítko -->
<style>
    :root { --cc-btn-primary-bg: #3f9626; }
</style>
<!-- minifikovaný cookieconsent core — zkopírovat z index4kroky.html:2318 -->
<script>!function(){...}</script>
```

Plné texty a minifikovaný core vždy kopírovat z `index4kroky.html:2152–2318` — nevypisovat ručně.

**Pravidla:**
- JS i CSS přímo v HTML (žádný CDN s SRI hashe)
- 3 kategorie: Nutné (readonly), Analytické (opt-in), Marketingové (opt-in)
- Komunikace s GTM výhradně přes `dataLayer.push({ event: 'cc_update' })`
- Zelené tlačítko: `--cc-btn-primary-bg: #3f9626`
- **Nikdy:** `gtag('consent','default')` v hlavičce, `applyConsent()` funkce, CDN s SRI hashe

---

## 6. og:image

Každá HTML stránka musí mít og:image — jinak sdílení na sociálních sítích vypadá špatně.

```html
<meta property="og:image" content="https://restartmuze.cz/...nahled.webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="...">
```

---

## 7. Kotvy na FAPI formulář

```css
html { scroll-behavior: auto; } /* nikdy smooth — rozbíjí FAPI kotvy */
```

```js
link.addEventListener('click', function (e) {
    e.preventDefault();
    loadFapiForm();
    document.getElementById('sekce').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
```

FAPI div musí mít `min-height` (např. `280px`) dokud se formulář nenačte.

---

## 8. Texty a jazyk

- Žádné AI fráze — Helena je okamžitě pozná
- Oslovovací zájmena VŽDY velkým písmenem: **Ty, Tobě, Tvůj, Tě, Ti**
- Formuláře: pouze **Jméno + Email** (příjmení a telefon snižují konverzi)
- Nikdy nevymýšlet text který není v podkladech od klienta
- Žádné externí odkazy na prodejce v obsahu stránky

---

## 9. Divi Code modul — hero sekce

Referenční implementace: `kvíz-vztahu/kviz-homepage-divi.html`

### Fotka
- Fotku nahrát do WP Media Library a použít absolutní URL (ne relativní cestu)
- Fotku nastavit přímo v **Divi sekci → Design → Background → Background Image** — ne v kódu
- Fotka kvízu: `https://restartmuze.cz/wp-content/uploads/2026/06/kviz_pro_muze_hero.webp`

### Overlay
- Overlay **nelze nastavit v Divi** spolehlivě — dělat přes CSS `::before`
- Přidat CSS třídu `rm-hero-section` na Divi sekci (Advanced → CSS Class)
- Overlay pak cílí na `.rm-hero-section::before` a pokryje celou sekci včetně spodní části
- Na mobilu schovat spodní gradient `.rm-hero-fade { display: none }`

### Layout
- Divi sekce: **Make Section Fullwidth = ON**, Row: **Make Row Fullwidth = ON**, Max Width = 100%
- Text v Code modulu: `padding: 5rem 4rem 5rem 5rem` (stejné jako `hero-homepage.html:91`)
- Žádné `width: 100vw` hacky — Divi fullwidth nastavení to řeší samo
- `max-width: 1440px; margin: 0 auto` na `.rm-hero` kontejneru

### Co nefunguje v Divi
- Overlay přes Divi Background Color — pokryje jen row, ne celou sekci
- `position: fixed` na overlay — zůstane při scrollu na místě
- `left: -9999px; right: -9999px` — nefunguje spolehlivě přes všechny prohlížeče

---

## 10. Obecná pravidla

- FTP cesty ověřit před psaním relativních cest — lokální struktura ≠ serverová
- Hero fotka: `::before` + `mask-image` gradient + `background-size XX% auto` — nikdy `<img>` tag
- Lazy load: vždy upozornit na side-effecty v návazných funkcích
- Žádné API klíče ani credentials v HTML/JS
- Žádné nové vizuální prvky mimo existující systém (barvy, velikosti písem)
