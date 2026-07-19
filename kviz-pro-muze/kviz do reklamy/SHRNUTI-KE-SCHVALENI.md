# Shrnutí ke schválení — AI Email Prompt v2.1 (kvíz pro muže)

Tohle je výtah z `AI-EMAIL-PROMPT-v2.1-final.md` — jen to, co je potřeba
odsouhlasit: kam který text vede (větev/cíl), jak se jmenuje diagnostikovaná
"bolest", a text VSTUPU B (přechod na nabídku), který se do e-mailu vkládá
před tlačítkem/CTA. Kompletní znění diagnostických textů (VSTUP A oblast)
je v hlavním souboru — tady jsou jen schvalovací body.

---

## TEXT 1 — Konflikt

- **Bolest:** Neumíš dobře řešit konflikt se ženou.
- **Větev / cíl:** restart_vztahu → bezplatný webinář „Restart vztahu — 4 kroky"
  (`restartmuze.cz/jak-zachranit-vztah/`)
- **VSTUP B (přechod na nabídku):**
  > Přesně o tomhle je bezplatný webinář **Restart vztahu — 4 kroky**.
  > Ukážu Ti na něm, jak se z hádky, která nikam nevede, dostat do rozhovoru,
  > který vztah posouvá dál — a proč tahle změna začíná u Tebe.

---

## TEXT 2 — Směr

- **Bolest:** Chybí Ti směr, vize a vedení.
- **Větev / cíl:** hodny_kluk → bezplatný webinář „Skoncuj s hodným klukem"
  (`restartmuze.cz/webinare/skoncuj-s-hodnym-klukem/`)
- **VSTUP B (přechod na nabídku):**
  > Přesně o tomhle je bezplatný webinář **Skoncuj s hodným klukem**.
  > Ukážu Ti na něm 4 vzorce, kvůli kterým muž ztrácí směr a nechává svůj
  > život řídit potřebami druhých — a jak si vzít vedení zpátky do
  > vlastních rukou.

---

## TEXT 3 — Vnímání

- **Bolest:** Málo vnímáš prožívání své ženy.
- **Větev / cíl:** restart_vztahu → bezplatný webinář „Restart vztahu — 4 kroky"
  (`restartmuze.cz/jak-zachranit-vztah/`)
- **VSTUP B (přechod na nabídku):**
  > Přesně o tomhle je bezplatný webinář **Restart vztahu — 4 kroky**.
  > Ukážu Ti na něm, jak se naučit ženu skutečně vnímat — a proč je to
  > nejrychlejší cesta zpátky k blízkosti, kterou jste na začátku měli.

---

## TEXT 4 — Hranice

- **Bolest:** Nemáš jasné hranice, nebo je komunikuješ pozdě.
- **Větev / cíl:** hodny_kluk → bezplatný webinář „Skoncuj s hodným klukem"
  (`restartmuze.cz/webinare/skoncuj-s-hodnym-klukem/`)
- **VSTUP B (přechod na nabídku):**
  > Přesně o tomhle je bezplatný webinář **Skoncuj s hodným klukem**.
  > Ukážu Ti na něm, jak si nastavit hranice včas a klidně — bez výbuchu
  > i bez uhýbání — a proč je to vzorec, který se dá odnaučit.

---

## TEXT 5 — Autorita

- **Bolest:** Podrýváš svoji autoritu sám před sebou.
- **Větev / cíl:** koch_primo → přímá prodejka KOCH Základ
  (`restartmuze.cz/kviz-pro-muze/koch-zaklad/`)
- **VSTUP B (přechod na nabídku) — ZMĚNĚNO, doplněny konkrétní přínosy
  místo obecné fráze o "vnitřní pevnosti":**
  > Je to roční členství v Klubu odvážných chlapů. Dostaneš chlapské
  > prostředí, kde se řeší skutečné věci — ne hospodské kecy. Tréninky
  > a nástroje na komunikaci, hranice a mužskou pevnost. Pravidelné živé
  > vedení, abys na to nebyl sám. A zrcadlo od chlapů, kteří ti pomůžou
  > vidět vlastní slepá místa.
  >
  > Ne proto, aby ses stal tvrdším.
  > Ale proto, aby ses znovu stal mužem, kterému můžeš věřit Ty sám.

---

## TEXT 6 — Všechny odpovědi C (vztahově zralý muž)

- **Diagnóza:** žádná — respondent nemá "bolest" k řešení, dostává jiný typ
  e-mailu (uznání + pozvánka dál, ne diagnóza problému).
- **VSTUP A / B / C se u TEXTU 6 vůbec nepoužívají.** Celý text je napevno
  ve zdroji, AI ho jen převezme beze změny (žádné vstupy, žádné
  personalizované doplňování).

### Co se u TEXTU 6 změnilo (2026-07-11):

Původně měl TEXT 6 stejné dynamické CTA tlačítko jako TEXT 1–5 (VSTUP C,
vedlo na KOCH Základ). Nově má **dvě pevná tlačítka přímo ve zdroji**,
protože respondent bez diagnózy nesedí na stejnou nabídku jako "problémoví"
respondenti:

1. **Sdílení kvízu s kamarádem** (beze změny) — tlačítko
   „Pošli kvíz kamarádovi →" na `restartmuze.cz/kviz-pro-muze/?ref=...`

2. **Nakouknutí do KOCHu — růstová varianta** (NOVÉ) — tlačítko
   „Nakouknout do KOCHu →" vede na **novou stránku**
   `restartmuze.cz/kviz-pro-muze/koch-zaklad3/`, ne na běžnou prodejku
   KOCH Základ. Text v e-mailu explicitně říká, že nejde o opravu problému:
   > Pevné základy neznamenají, že není kam růst. Jestli chceš na sobě
   > pracovat dál — a předávat, co umíš, chlapům, kteří tak daleko ještě
   > nejsou — nakoukni do **KOCHu, Klubu odvážných chlapů**. Chlap jako
   > Ty tam má co získat i co dát.

   ⚠️ **Stránka `koch-zaklad3.html` musí existovat a mít jiný úhel copy**
   než `koch-zaklad.html`/`koch-zaklad2.html` — cílí na zralého muže, který
   chce růst a předávat dál, ne na muže, který právě objevil problém.
   Ověřit, že stránka žije, než se prompt nasadí do Cliqsales.

3. **Kniha Restart muže** (NOVÉ) — tlačítko „Chci knihu Restart muže →"
   vede na `restartmuze.cz/knihy/restart-muze/` jako lehčí alternativa
   ke klubu:
   > A jestli je Ti bližší kniha než klub, mrkni na moji knihu
   > **Restart muže**. Má ji doma přes 15 000 chlapů.

---

## Otevřené body k potvrzení

- [ ] **Stránka `koch-zaklad3.html`** — existuje a je nasazená na
  `restartmuze.cz/kviz-pro-muze/koch-zaklad3/`? Bez ní tlačítko v TEXTU 6
  vede na 404.
- [ ] **VSTUP B v TEXTU 5** — souhlasí Sláva/Dan s doplněním konkrétních
  4 přínosů (chlapské prostředí / tréninky / živé vedení / zrcadlo od
  chlapů) místo původní obecnější formulace?
- [ ] **Struktura TEXTU 6** — souhlasí s dvěma pevnými tlačítky (KOCH
  růstová varianta + kniha) místo jednoho dynamického CTA jako u ostatních
  textů?
