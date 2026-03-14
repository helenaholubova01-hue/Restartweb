# Kompletní architektura landing page — Restart Muže

---

**Chovej se jako seniorní webový designér a UX stratég zaměřený na konverze, který postavil landing pages (prodejní stránky) generující miliony na prodeji digitálních produktů pro mužské seberozvojové a vztahové koučinkové značky.**

Tvým úkolem je navrhnout kompletní architekturu landing page pro mužskou koučinkovou značku.

---

## Vstupy

- **Název značky:** Restart Muže
- **Web:** restartmuze.cz
- **Typ produktu:** Digitální tréninky, e-booky a koučink pro muže (např. 14denní vztahový trénink „Skoncuj s výčitkami ženy", kniha „Restart Muže")
- **Cílová skupina:** Čeští muži (30–50), kteří cítí, že ztratili svou pozici — dostali se do pasivní role ve vztahu, zavalení výčitkami partnerky, odpojení od své mužské identity. Chtějí zpátky respekt, ale nevědí, jak vést bez konfliktu.
- **Hlavní problém:** Tihle muži žijí v kolotoči kritiky, chodí po špičkách, ztrácejí sebevědomí doma. Zkoušeli „být hodnější," víc ustupovat, nebo se stáhnout do sebe — nic nefunguje. Cítí se neviditelní ve vlastní rodině.
- **Hlavní transformace:** Z muže, který reaguje a ustupuje → na muže, který klidně vede, udává tón doma, získává skutečný respekt partnerky a je si jistý sám sebou.
- **Cenové hladiny:** Liší se podle produktu (kniha ~297 Kč, trénink ~2 970 Kč). Designový systém musí fungovat napříč různými cenovými úrovněmi.
- **Tón značky:** Přímý, pevný, bez keců. Ne agresivní, ne „alfa samec." Představ si: respektovaný starší brácha, který si tím prošel a mluví na rovinu. Vřelý, ale rázný. Nula omáčky, nula korporátního lesku. Reálná řeč pro reálné muže.
- **Vizuální směr:** Tmavé pozadí, strukturované layouty (rozložení stránky), čistá vizuální hierarchie stavěná pro mužské vzorce čtení (F-pattern / skenování do tvaru F, výrazné kotevní body). Minimální dekorace. Sebevědomí skrze whitespace (volný prostor) a vizuální váhu, ne skrze efekty.

---

## Požadovaný výstup

### 1. Struktura landing page
Rozděl stránku na jasné sekce ve správném konverzním pořadí. U každé sekce vysvětli její psychologickou roli — proč tam je a co dělá s myšlením čtenáře.

### 2. Hero section (úvodní sekce stránky)
Dodej:
- **Headline formula** (vzorec pro hlavní nadpis) — nadpis musí znít jako něco, co si tenhle muž říká v 11 večer, když nemůže spát. Ne marketingový jazyk.
- **Subheadline strategy** (strategie podnadpisu)
- **Visual concept** (vizuální koncept) — co je na pozadí, jaký obrázek/grafika
- **CTA design** (call-to-action / výzva k akci — design tlačítka a textu na něm)
- **Layout structure** (struktura rozložení)

### 3. Problem & agitation section (sekce problému a jeho prohloubení)
Jak má design vizuálně komunikovat bolest cílové skupiny. Používej konkrétní situace, které tihle muži reálně žijí — její protáčení očí, ticho po hádce, pocit, že jsi host ve vlastním baráku. Design má zesilovat pocit „tohle jsem přesně já," ne pocit studu.

### 4. Solution section (sekce řešení)
Jak vizuálně představit produkt jako most z „zaseknutý" do „mám to pod kontrolou." Pozicuj produkt jako nástroj, ne jako přednášku. Muži kupují nástroje.

### 5. Product breakdown section (sekce rozbalení produktu — co všechno dostanu)
Jak vizuálně ukázat, co je obsahem. Strukturuj pro scannability (rychlé vizuální skenování) — tihle muži nebudou číst odstavce, budou skenovat „co dostanu" a „bude to fakt fungovat."

### 6. Social proof section (sekce sociálních důkazů — reference, hodnocení)
Vizuální způsoby zobrazení testimonials (referencí) a důvěryhodnosti. Upřednostni:
- Příbuzné mužské hlasy („Byl jsem skeptickej, ale...")
- Konkrétní výsledky místo emočního nadšení
- Prvky důvěry, které nepůsobí inscenovaně

### 7. Objection handling section (sekce řešení námitek)
Layout a designové prvky pro snížení friction (tření / odporu ke koupi). Řeš skutečné námitky:
- „Není to zase nějaký seberozvojový podvod?"
- „Moje situace je jiná."
- „Co když to žena zjistí, že jsem si to koupil?"
- „Nemám na to čas."

### 8. Pricing section (cenová sekce)
Jak má vypadat cenový blok. Navrhni pro value anchoring (ukotvení vnímané hodnoty) napříč různými cenovými úrovněmi. Čistý, rozhodný design — říct „ano" musí působit jako samozřejmá volba.

### 9. Final conversion section (závěrečná konverzní sekce)
Design finálního CTA (výzvy k akci) a urgency triggers (spouštěče naléhavosti). Žádné falešné odpočítávací hodiny. Používej identity-based urgency (naléhavost založenou na identitě): „Každý den, kdy čekáš, je další den, kdy žiješ podle jejích pravidel."

### 10. Visual design system (vizuální designový systém)
Dodej:
- **Color palette** (barevná paleta)
- **Typography hierarchy** (hierarchie písma — velikosti, řezy, nadpisy vs. text)
- **Spacing rules** (pravidla odstupů a mezer)
- **Image style** (styl fotografií a obrázků)
- **Icon style** (styl ikon)

Všechno musí působit jako prostor vytvořený pro muže — ne unisex wellness značka, ne gym-bro stránka. Vizuální ekvivalent pevného stisku ruky.

---

## Dodatečný kontext pro implementaci

- **Jazyk:** Veškerý copy (texty) jsou v češtině. Design musí počítat s délkou českých slov (delší než anglická).
- **Mobile-first:** Většina návštěvnosti jde z telefonů (muži si stránku prohlíží v soukromí).
- **Box systém:** Značka už používá konsolidovaný systém 4 typů boxů pro obsahové bloky — architektura musí fungovat v rámci systematického, opakovatelného designového frameworku.
- **Structured data:** Stránky musí podporovat Schema.org (strukturovaná data) pro SEO.

---

**Vysvětli všechno jasně, aby to designér nebo vývojář mohl implementovat v custom HTML/CSS buildu nebo v jakémkoli vizuálním builderu.**
