# Restart muze -- Design System

Vizualni instrukce pro udrzeni konzistence across stranky projektu Restart muze.

---

## 1. Brandove barvy

### Tmave pozadi (dark palette)
| Token | HEX | Pouziti |
|---|---|---|
| `--bg-deep` | `#050d17` | Nejhlubsi pozadi stranky (body) |
| `--bg-primary` | `#0b1929` | Hlavni pozadi sekci |
| `--bg-alt` | `#0f2236` | Alternativni sekce, karty, boxy |
| `--bg-card` | `#132d47` | Zvyraznene karty (tmavsi varianta) |

### Akcentni barvy
| Token | HEX | Pouziti |
|---|---|---|
| `--accent-orange` | `#e87722` | Hlavni akcentni barva -- zvyrazneni, podtrzeni, ikony, strong text |
| `--accent-green` | `#3f9626` | CTA tlacitka, pozitivni prvky (fajfky, bezpecnost) |
| `--accent-green-hover` | `#4db82e` | Hover stav zeleneho CTA |

### Textove barvy
| Token | HEX | Pouziti |
|---|---|---|
| `--text-white` | `#ffffff` | Nadpisy, dulezity text |
| `--text-light` | `#c8d6e5` | Hlavni body text |
| `--text-muted` | `#7f8fa6` | Sekundarni text, labels, subtitles |

### Bordery a efekty
| Token | Hodnota | Pouziti |
|---|---|---|
| `--border-subtle` | `rgba(255,255,255, 0.06)` | Jemne ohraniceni karet a sekci |
| `--glow-orange` | `rgba(232,119,34, 0.15)` | Jemna orange zare (glow efekty) |

---

## 2. Jak se barvy pouzivaji

### Oranzova (`#e87722`)
- **Zvyrazneni v textu**: `<strong>` uvnitr odstavcu je oranzove (trida `.t-orange` nebo CSS na `.about-book-text strong`)
- **Podtrzeni stetcem**: trida `.underline-brush` -- pod slovem se zobrazi rucne malovany oranzovy tah (obr. `img/podtrzeni_stetec.webp`)
- **Ikony v proof baru a features**: SVG ikony v social-proof a feature blocich jsou oranzove
- **Cisla desatera**: cislovani polozek v desateru je oranzove, tucne, Montserrat 800
- **Hover linky ve footeru**: `a:hover` prechazi na oranzovou
- **Jmena autoru**: `.authors-names` je cele oranzove, Montserrat 800

### Zelena (`#3f9626`)
- **Vyhradne pro CTA tlacitka** a pozitivni signaly (fajfky, "bezpecna platba" ikona)
- Nikdy se nepouziva pro text odstavcu nebo nadpisy
- Trust ikony (trophy, truck) ve sticky CTA jsou zelene

### Bila (`#ffffff`)
- Nadpisy H1, H2, H3
- Dulezity body text (`.about-book-text`, `.authors-text p`)
- Obsah FAQ a learn-item expandovanych polozek

### Svetle seda (`#c8d6e5`)
- Hlavni body text stranky
- Polozky v check-listech

### Tlumena seda (`#7f8fa6`)
- Subtitles, labels, trust-item text
- FAQ chevron ikony
- Footer sekundarni text pouziva `#8fa8be` (jeste svetlejsi varianta)

---

## 3. Pozadi stranky

Stranka **nema** plochy jednobarevny background. Pouziva se **radialni gradient fixovany na pozadi**:

```
body background: #050d17 (fallback)
body::before (fixed): radial-gradient(ellipse at 50% 30%, #0f2a42 0%, #0b1929 45%, #050d17 100%)
```

Vysledek: jemne svetlejsi "spotlight" v horni tretine stranky, ktery plynule prechazi do hlubokeho tmave modreho.

### Alternativni sekce
Kazda druha sekce pouziva tridu `.section-alt` s jemnym pretmavenimm:
```
background: rgba(15, 34, 54, 0.4)
```
To vytvari jemny vizualni rytmus -- strida se "pruhledna" a "lehce pretmavena" sekce.

---

## 4. Pisma — STANDARD pro vsechny stranky

### Montserrat (nadpisy, CTA, labels)
- **Self-hosted** z `/fonts/` — NIKDY Google Fonts (kvuli GDPR a rychlosti)
- **Vahy**: 400, 600, 700, 800
- **Fallback**: `'Montserrat', 'Montserrat Fallback', sans-serif`
- **Pouziti**:
  - H1, H2, H3: **weight 800**, line-height 1.2
  - CTA tlacitka: **weight 700**, uppercase, letter-spacing 0.5px
  - Subtitles/labels (section-label): **weight 600**, uppercase, letter-spacing 0.1em, 0.8rem
  - FAQ titulky: **weight 700**, 1.1rem
  - Cisla/statistiky (proof-trust-number): **weight 800**, 2rem
  - Pricing amount: **weight 800**, clamp(2.5rem, 6vw, 3.5rem)

### Open Sans (body text)
- **Self-hosted** z `/fonts/`
- **Vahy**: 400 (regular), 600 (semi-bold)
- **Fallback**: `'Open Sans', 'Open Sans Fallback', sans-serif`
- **Pouziti**:
  - Body: **weight 400**, font-size 1.1rem, line-height 1.8
  - Trust-item labels: **weight 600**, uppercase, 0.75rem
  - Proof-item: **weight 600**, 0.95rem
  - Program-item-promise (podpis pod bodem programu): 0.9rem, italic

### Font fallback metriky (pro eliminaci CLS)
```css
@font-face {
    font-family: 'Montserrat Fallback';
    src: local('Arial');
    size-adjust: 113.5%;
    ascent-override: 85%;
    descent-override: 22%;
    line-gap-override: 0%;
}
@font-face {
    font-family: 'Open Sans Fallback';
    src: local('Arial');
    size-adjust: 105%;
    ascent-override: 101%;
    descent-override: 28%;
    line-gap-override: 0%;
}
```

---

## 5. Typograficka skala — STANDARD

### Nadpisy
| Element | Velikost | Vaha | Line-height | Barva |
|---|---|---|---|---|
| H1 (hero) | `clamp(2.2rem, 5.5vw, 3.4rem)` | 800 | 1.15 | `--text-white` |
| H2 (section) | `clamp(1.8rem, 4vw, 2.4rem)` | 800 | 1.2 | `--text-white` |
| H3 (karta, blok) | `1.1rem – 1.2rem` | 700 | 1.2 | `--text-white` |
| Jmena autoru | `1.2rem` | 800 | 1.2 | `--accent-orange` |

### Body text
| Element | Velikost | Vaha | Line-height | Barva |
|---|---|---|---|---|
| Hlavni text (body) | `1.1rem` | 400 | 1.8 | `--text-light` |
| Lead/sub pod nadpisem | `1.15rem` | 400 | 1.7 | `--text-light` |
| Sekundarni text | `0.85rem – 0.9rem` | 400 | 1.7 | `--text-muted` |
| Drobny text (labels, trust) | `0.75rem` | 600 | 1 | `--text-muted` |
| Citace (italic bloky) | `1.1rem` | 400 | 1.8 | `--text-white` |

### Pravidla mezer
| Kontext | Hodnota |
|---|---|
| Mezera pod section-label | `1.5rem` |
| Mezera pod H2 | `2.5rem` |
| Mezera pod lead textem | `3rem` (margin: -1rem auto 3rem) |
| Padding sekce (desktop) | `7rem 0` |
| Padding sekce (mobil <768px) | `3.5rem 0` |
| Gap v gridu karet | `1.5rem` |
| Padding karty | `1.5rem – 2rem` |

### Pravidla pro nove stranky
1. **Vzdy pouzit self-hosted fonty** — nikdy Google Fonts CDN
2. **Vzdy pridat fallback @font-face** s metrikami (viz vyse)
3. **H1 pouzit jen jednou** — v hero sekci
4. **Fluid sizing** (clamp) pro H1 a H2 — H3 muze byt pevna velikost
5. **Line-height 1.8** pro body text je povinny minimum — citelnost na tmavem pozadi
6. **Letter-spacing 0.1em** pro vsechny uppercase labels

---

## 6. Sirka stranky a layout

- **Max-width contentu**: `960px` (trida `.container`)
- **Padding contentu**: `0 2rem` na obe strany
- **Footer max-width**: `1200px` (sirsi nez hlavni obsah)
- **Sekce padding**: `7rem 0` (desktop), `3.5rem 0` (mobil pod 768px)

### Hero layout
- Desktop: 2-sloupcovy grid `1fr 1fr`, gap 3rem
- Mobil: 1 sloupec, text vycentrovany

### Obecny pattern
- Obsahove bloky (learn-list, desatero, for-whom) maji vlastni `max-width: 800px` s `margin: 0 auto`

---

## 7. Styl boxu a karet

### Standardni karta (features, FAQ, learn-item, for-whom)
```
background: var(--bg-alt)          /* #0f2236 */
border: 1px solid var(--border-subtle)  /* rgba(255,255,255,0.06) */
border-radius: 12px                /* nebo 8px u mensich prvku */
padding: 2rem (nebo 1.5rem 2rem)
```
Zadny box-shadow. Karty jsou jemne oddelene od pozadi jen o neco svetlejsim tonem a tenkym borderem.

### Feature-item (ikonove boxy "O knize")
- Stejny zaklad jako standardni karta
- Ikona v kruhu: `56x56px`, oranzove pozadi `rgba(232,119,34, 0.12)`, `border-radius: 50%`
- Text pod ikonou: bila, bold 700, 1rem

### Testimonial karty (recenze)
- **VYJIMKA** -- jedine svetle karty na strance!
- `background: #ffffff`, `border-radius: 12px`, `padding: 2rem`
- Text: `color: #4a5568` (tmave seda), italic
- Autor: `color: #1a202c`, bold 700, oddeleny `border-top: 1px solid rgba(0,0,0,0.08)`
- Dekorativni uvozovka `"` -- `font-size: 4rem`, `color: rgba(0,0,0,0.06)`, absolutne pozicovana

### Desatero polozky
- Minimalni styl: `background: rgba(255,255,255, 0.02)`, `border-radius: 8px`, `padding: 1rem`
- Oranzove cislo vlevo + bily text vpravo

---

## 8. Podtrzeni stetcem (brush underline)

Signaturni vizualni prvek brandu. Pouziva se na klicova slova v H1.

```
.underline-brush::after {
    background-image: url('img/podtrzeni_stetec.webp');
    position: absolute;
    left: -4%;
    bottom: -0.30em;
    width: 108%;
    height: 0.35em;
    opacity: 0.85;
}
```

- Oranzovy rucne malovany tah pod slovem
- Presahuje slovo o 4% na kazdou stranu (sirka 108%)
- Jemne pruhledny (opacity 0.85)

---

## 9. CTA tlacitka

```
background: var(--accent-green)     /* #3f9626 */
color: #fff
font-family: Montserrat, 700
font-size: 1.1rem
text-transform: uppercase
letter-spacing: 0.5px
padding: 1rem 3rem
border-radius: 100px               /* plne zaoblene -- "pilulka" */
```

### Hover efekt
```
background: #4db82e
```
Pouze zmena barvy, zadne nadzvedavani ani glow.

### Trust row pod CTA (`.trust-row` + `.trust-item`)
Pod **kazdym** CTA tlacitkem na strance musi byt trust-row. Zadne vyjimky.
```
ikony: zelene (--accent-green) — signalizuji bezpeci
text: --text-muted, 0.75rem, weight 600, uppercase, letter-spacing 0.05em
obsah: vzdy "Max 20 muzu" + "24.–26. dubna 2026"
```

### Meta strip (`.hero-meta`, `.final-cta-meta`)
Informacni strip o akci — pouziva se v hero a v zaveru stranky.
```
ikony: oranzove (--accent-orange) — informacni
text: --text-muted, 0.85rem
strong: --text-white, weight 700
SVG: 1.1rem
gap: 0.5rem (uvnitr itemu), 2rem (mezi itemy)
obsah: datum, misto, kapacita, kontakt, cislo behu
```

### Pravidlo konzistence mikro-prvku
1. **Kazde CTA** = pod nim trust-row (zelene ikony)
2. **Hero a final CTA** = pod CTA navic meta-strip (oranzove ikony)
3. **Velikosti a barvy** musi byt shodne napric celou strankou — zadne vyjimky

---

## 10. Citace / highlight text

```
font-style: italic
border-left: 3px solid var(--accent-orange)
padding-left: 1.5rem
color: var(--text-white)
font-weight: 400
```
Pouziva se v sekci autoru pro zvyrazneny citat.

---

## 11. Social proof bar

Horizontalni pruh pres celou sirku stranky:
```
background: var(--bg-alt)
border-top: 1px solid var(--border-subtle)
border-bottom: 1px solid var(--border-subtle)
padding: 1.5rem 0
```
Polozky: ikona (oranzova SVG) + text (bila, semi-bold), centrovane, gap 3rem.

---

## 12. Footer

- Pozadi: `#070e18` (jeste tmavsi nez body)
- 3-sloupcovy grid (1fr 1fr 1fr), gap 3rem
- Nadpisy: Montserrat 700, uppercase, letter-spacing 0.05em, bila
- Text: `#8fa8be`, 0.85rem
- Linky: `#8fa8be`, hover -> oranzova
- Stripe badge: fialovy akcent `#a29bfe`, jemny border a pozadi
- Oddelovace: `border-top: 1px solid rgba(255,255,255, 0.07)`
- Disclaimer text: `#6b8299`, 0.78rem

---

## 13. Zaobleni (border-radius) -- prehled

| Prvek | Radius |
|---|---|
| CTA tlacitka | `100px` (plna pilulka) |
| Karty, boxy, FAQ | `12px` |
| Learn-item, desatero, preview img | `8px` |
| Feature ikona (kruh) | `50%` |
| Book preview img | `4px` |

---

## 14. Stiny

Stranka pouziva stiny strridme, vzdy cerne s vysokou pruhlednosti:

| Prvek | Shadow |
|---|---|
| Hero kniha | `0 20px 40px rgba(0,0,0, 0.5)` |
| Autori foto | `0 20px 40px rgba(0,0,0, 0.4)` |
| Book preview | `0 10px 20px rgba(0,0,0, 0.3)` |
| CTA hover | `0 12px 35px rgba(63,150,38, 0.35)` (zeleny glow) |
| Proof popup | `0 10px 30px rgba(0,0,0, 0.5)` |

---

## 15. Sticky CTA (fixni objednavaci prvek)

### Desktop
- Vertikalni "ousko" na pravem okraji obrazovky
- Zelene, Montserrat 700, uppercase, `writing-mode: vertical-rl`
- `border-radius: 0 12px 12px 0` (zaoblene jen na leve strane)

### Mobil (pod 768px)
- Plna sirka dole, `backdrop-filter: blur(10px)`
- Pozadi `rgba(5,13,23, 0.95)` s border-top
- Zelene CTA tlacitko na celou sirku + trust row pod nim

---

## 16. Kampanovy system (data-campaign-phase)

Prodejni stranky stupnuji tlak na koupi v prubehu kampane. Prvky se pridavaji postupne:

### Faze
| Faze | Popis | Prvky na strance |
|---|---|---|
| 1 | Start kampane | Zakladni stranka, zadna urgency |
| 2 | Urgency aktivni | Odpocet dnu do vikendu, zbyvajici mista, pocitadlo |
| 3 | Posledni mista | Intenzivnejsi urgency, cerveny/oranzovy akcent, "posledni X mist!" |

### Jak to funguje
- HTML prvky maji atribut `data-campaign-phase="2"` (nebo 3, 4...)
- CSS defaultne: `[data-campaign-phase] { display: none; }`
- JS na zacatku stranky cte promennou `CAMPAIGN_PHASE = 1` a zobrazuje prislusne prvky
- Pro zmenu faze staci zmenit jednu cisli v JS: `var CAMPAIGN_PHASE = 2;`
- Dalsipromenna: `var SPOTS_REMAINING = 14;` — pocet zbyvajicich mist

### Pravidla
1. **99 % stranky musi byt hotovo pred kampani** — nic se behem kampane nevymysli
2. **Faze 1 = kompletni stranka** — urgency prvky jsou bonus, ne zaklad
3. **Odpocet a mista** se aktualizuji rucne zmenou promennych v JS
4. **Nikdy falesna urgency** — cisla musi odpovidat realite

---

## Shrnuti -- klicove principy konzistence

1. **Tmave pozadi** -- vzdy tmave modre odtiny, nikdy cerne, nikdy sede
2. **Oranzova = zvyrazneni**, nikdy CTA. Pouziva se pro: strong text, ikony, podtrzeni, cisla, hover linky
3. **Zelena = akce/CTA**, nikdy pro bezny text. Pouze tlacitka a pozitivni signaly
4. **Bila = nadpisy a dulezity text**, `#c8d6e5` = body, `#7f8fa6` = sekundarni
5. **Boxy** jsou jemne -- minimalni kontrast oproti pozadi, tenky border, zadne vyrazne stiny
6. **Jedina vyjimka** jsou testimonial karty -- bile pozadi, aby vynikly jako "cizi hlas"
7. **Zaobleni** je konzistentne 12px (velke) nebo 8px (male), CTA je pilulka (100px)
8. **Brush underline** je signaturni vizualni prvek -- oranzovy rucni tah pod klicovymi slovy
9. **Montserrat 800** pro nadpisy, **Open Sans 400** pro body -- nemicha se to obracene
10. **Max-width 960px** pro obsah -- stranka je uzsi, citelna, neni roztazena na celou sirku
