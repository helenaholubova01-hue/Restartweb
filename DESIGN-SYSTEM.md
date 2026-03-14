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

## 4. Pisma

### Montserrat (nadpisy, CTA, labels)
- **Vahy**: 400, 600, 700, 800
- **Pouziti**:
  - H1, H2, H3: **weight 800**, line-height 1.2
  - CTA tlacitka: **weight 700**, uppercase, letter-spacing 0.5px
  - Subtitles/labels: **weight 600**, uppercase, letter-spacing 0.1em
  - FAQ titulky, learn-title: **weight 700**
  - Desatero cisla: **weight 800**, 1.2rem

### Open Sans (body text)
- **Vahy**: 400 (regular), 600 (semi-bold)
- **Pouziti**:
  - Body: **weight 400**, font-size 1.1rem, line-height 1.8
  - Trust-item labels: **weight 600**, uppercase, 0.75rem
  - Proof-item: **weight 600**, 0.95rem

---

## 5. Velikosti nadpisu

| Element | Desktop | Metoda |
|---|---|---|
| H1 (hero) | `clamp(2.2rem, 5.5vw, 3.4rem)` | Fluid, line-height 1.15 |
| H2 (section) | `clamp(1.8rem, 4vw, 2.4rem)` | Fluid, margin-bottom 2.5rem |
| H3 (for-whom col) | `1.4rem` | Pevna velikost |
| Jmena autoru | `1.8rem` (desktop), `1.4rem` (mobil) | Montserrat 800, oranzova |

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
transform: translateY(-2px)
box-shadow: 0 12px 35px rgba(63,150,38, 0.35)
```
Tlacitko se lehce nadzvedne a dostane zeleny glow.

### Trust row pod CTA
Pod kazdym CTA jsou drobne trust signaly: ikona + text, uppercase, `0.75rem`, `--text-muted`, zelene SVG ikony.

---

## 10. Citace / highlight text

```
border-left: 3px solid var(--accent-orange)
padding-left: 1.5rem
color: var(--text-white)
font-weight: 400
```
Pouziva se v sekci autoru pro zvyrazneny citat.

**PRAVIDLO: Na webu se NEPOUZIVA kurziva (font-style: italic). Spatne se cte. Zadny element nesmi mit italic.**

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
