# Kovárna — podklady na fotografie a grafiku (v-fable)

Prompty na vygenerování fotek pro `kovarna-fable.html` + brief pro reálné focení.
Stránka má **systém obrazových listů OBR. 01–04**: dnes v každém slotu drží místo
technická rytina (SVG přímo v kódu), fotka se doplní výměnou jednoho tagu —
přesný kód je v HTML komentáři `TODO FOTKA` u každého OBR.

## Jak to používat
- Prompty jsou psané **anglicky** (generátory na ně reagují líp), kontext česky.
- Doporučený nástroj: **Midjourney / DALL·E / Adobe Firefly** — fotorealistické černobílé motivy zvládají všechny tři.
- Po vygenerování: oříznout na cílový formát, převést na **.webp**, uložit do `kovarna/img/` pod přesným názvem níže, vyměnit podle komentáře v kódu.
- **Rytiny můžou zůstat natrvalo.** Nejsou to provizorní placeholdery — jsou součást katalogové identity. Klidně vyměň jen některé sloty (např. OBR. 02 za reálnou fotku z výhně) a zbytek nech kreslený. Mix funguje.
- Stejný seznam motivů = **brief pro fotografa**, až se bude fotit reálně. Reálné fotky mají vždy přednost před AI.

---

## 🎨 Vizuální identita — drž ve VŠECH promptech

| Prvek | Hodnota |
|---|---|
| Barevnost | **výhradně černobílá** — web fotky navíc přebarvuje přes `filter: grayscale(1) contrast(1.14) brightness(.85)`, takže i lehce barevná fotka zčernobílí, ale nejlepší výsledek dá rovnou ČB |
| Značková tmavá | **kovářská čerň `#12151a`** — grafitová černá s chladně ocelovým nádechem (okuje na kovaném železe); podklad celého webu, do grafik (og:image, bannery) používat místo čisté černé. (Jemnější záložní varianta: `#0d0f12`.) |
| Nálada | dokumentární, syrová, ticho a soustředění — NE patos, NE stock |
| Světlo | tvrdé boční světlo, hluboké stíny, jeden zdroj (okno / výheň) |
| Zrno | analogové filmové zrno (web má vlastní šumovou vrstvu, fotka smí mít taky) |
| Cílovka | muži 35–50, ČR — reálná postava, ne fitness model |
| Čemu se vyhnout | úsměvy do kamery, oblek/kravata, „alpha gym bro“ estetika, dokonalé zuby, moderní korporátní kancelář |

**Univerzální styl-blok na konec každého promptu:**
> `black and white documentary photography, analog film grain, deep blacks, high contrast, single hard side light, shot on 35mm, Tri-X 400 film aesthetic, photorealistic, no text, no watermark`

### ⚠️ Zásadní pravidlo: ŽÁDNÉ AI OBLIČEJE ZBLÍZKA
AI tváře jsou první věc, podle které lidi poznají generovaný obsah — a Kovárna nesmí
vypadat jako od AI. Proto všechny prompty pracují s **rukama, zády, siluetami a detaily**.
Obličeje patří jen na reálné fotky (Sláva už na stránce je, chlapi přijdou z reálného focení).

---

## OBR. 01 — Prázdné místo u stolu
**Kde v kódu:** za citací „Až bude firma stabilnější…“ — komentář `TODO FOTKA obr-01`
**Soubor:** `img/fig-01-stul.webp` · **Formát:** 1920×840 px (široký pás, ořez na šířku)
**Proč tenhle motiv:** citace nad ním říká „děti si zvykají, že táta není skutečně přítomný“ — fotka ukazuje přesně to prázdné místo. Rytina ve slotu (půdorys stolu, NEOBSAZENO) říká totéž jazykem výkresu.
```
Dinner table in a family home in the evening, photographed from a low angle across
the table top. Three place settings used, one chair empty and untouched place setting,
food still on serving plates. No people visible, or only blurred hands of a child in
the far background. Window light from the side, long shadows.
black and white documentary photography, analog film grain, deep blacks, high contrast,
single hard side light, shot on 35mm, Tri-X 400 film aesthetic, photorealistic, no text, no watermark
```

## OBR. 02 — Úder na kovadlinu
**Kde v kódu:** mezi sekcemi Kování a Metoda — komentář `TODO FOTKA obr-02`
**Soubor:** `img/fig-02-vyhen.webp` · **Formát:** 1920×840 px (široký pás)
**Proč tenhle motiv:** srdce celé metafory. Nejsilnější kandidát na reálné focení (skutečná kovárna se dá pronajmout na půldenní focení — jedna session pokryje OBR. 02, 04, og:image i zásobu na sociální sítě).
```
Blacksmith's hands hammering glowing steel on an anvil, sparks flying from the impact,
shot from the side at anvil height. Only hands, forearms and the hammer visible — no face.
Dark workshop, the glowing metal is the only light source. Motion blur on the hammer,
sharp sparks.
black and white documentary photography, analog film grain, deep blacks, high contrast,
shot on 35mm, Tri-X 400 film aesthetic, photorealistic, no text, no watermark
```

## OBR. 03 — Mastermind u stolu
**Kde v kódu:** sekce 06 Specifikace, vpravo vedle soupisu — komentář `TODO FOTKA obr-03`
**Soubor:** `img/fig-03-mastermind.webp` · **Formát:** 1200×1500 px (na výšku, 4:5)
**Proč tenhle motiv:** „4× ročně osobně“ je nejhmatatelnější položka specifikace — fotka ji dokazuje. Tady je AI nejrizikovější (skupina lidí = nejvíc artefaktů); pokud generovaná varianta nebude vypadat stoprocentně, nech rytinu a počkej na fotku z prvního reálného mastermindu.
```
Group of men in their 40s working around a heavy wooden table, photographed from behind
one man's shoulder — notebooks, pens, rolled-up sleeves, hands gesturing. Faces turned
away or out of focus, no one looking at camera. Serious working atmosphere, daylight
from one large window.
black and white documentary photography, analog film grain, deep blacks, high contrast,
single hard side light, shot on 35mm, Tri-X 400 film aesthetic, photorealistic, no text, no watermark
```

## OBR. 04 — Hotová čepel
**Kde v kódu:** před sekcí Závěr — komentář `TODO FOTKA obr-04`
**Soubor:** `img/fig-04-cepel.webp` · **Formát:** 1920×840 px (široký pás)
**Proč tenhle motiv:** klid po práci — výsledek. Uzavírá příběh černá→bílá (surové železo→čepel) těsně před závěrečnou výzvou.
```
A single finished hand-forged steel blade lying flat on a scarred anvil, hammer and
tongs resting beside it, workshop at rest after work. Overhead composition or low side
angle, quiet still-life mood, dust visible in a beam of light.
black and white documentary photography, analog film grain, deep blacks, high contrast,
single hard side light, shot on 35mm, Tri-X 400 film aesthetic, photorealistic, no text, no watermark
```

## OG:IMAGE — náhled pro sdílení (chybí, TODO v hlavičce HTML)
**Soubor:** `img/kovarna-og.jpg` · **Formát:** 1200×630 px (JPG — og:image nemá být webp kvůli starším scraperům)
**Postup:** vygenerovat/vyfotit podklad BEZ textu, nápis „KOVÁRNA“ + podtitul doplnit v Canvě (font Oswald Bold, verzálky, bílá na černé, prostrkání jako na webu).
```
Dark moody photograph of an anvil in a blacksmith workshop, single blade lying on it,
strong side light, large empty black negative space in the upper half for a headline.
black and white documentary photography, analog film grain, deep blacks, high contrast,
photorealistic, no text, no watermark
```

---

## Brief pro reálné focení (až bude termín)
Jedna půldenní session v pronajaté kovárně + jedna při mastermindu pokryje všechno:

1. **Výheň/úder** (→ OBR. 02, og:image): ruce + kladivo + jiskry, detail žhavého kovu, bez tváře
2. **Hotová čepel na kovadlině** (→ OBR. 04): klidné zátiší, odložené nářadí
3. **Prostřený stůl s prázdnou židlí** (→ OBR. 01): dá se nafotit kdekoli doma, večerní boční světlo
4. **Mastermind** (→ OBR. 03): přes rameno, ruce/zápisky/stůl, žádné pózování do kamery
5. **Sláva v kovárně** (rezerva pro hero/sekci 09): portrét u kovadliny, tvrdé boční světlo — jediný záběr, kde patří tvář

Technické zadání pro fotografa: černobílý výstup nebo ČB úprava, tvrdé jednozdrojové
světlo, dokumentární styl (žádné aranžované úsměvy), min. 2400 px na delší straně.
