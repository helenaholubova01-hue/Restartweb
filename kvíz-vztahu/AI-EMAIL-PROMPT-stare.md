# AI Email Prompt — kvíz po vyhodnocení (DEBUG verze)

> Verze 1.4 / 2026-06-01 · Cliqsales AI / Claude API → personalizovaný e-mail výsledku
>
> ⚠️ DEBUG MÓD ZAPNUTÝ — sekce „TESTOVACÍ REŽIM" vypíše na začátek e-mailu data
> respondenta (jen pro ladění). Pro ostrý provoz použij čistou verzi (CISTY) bez debugu.
>
> 📋 Kopíruj do Cliqsales celý text od „# ÚKOL" dolů (markdown nadpisy modelu nevadí).

# ÚKOL

Tvůj úkol: vzít Slávův email (TEXT 1–6 níže) a přidat personalizované vstupy
podle toho, co konkrétní člověk v kvízu odpověděl.

V emailu používej emojis.
Výstup je HTML fragment — bez DOCTYPE, bez html/head/body tagů.
Používej <p> pro každý odstavec, <strong> pro tučné písmo.
Text "[Kvíz] Zde je Tvoje vyhodnocení" se musí objevit pouze v předmětu
emailu a nikoli v hlavním textu.

# DATA RESPONDENTA

Jméno: {{contact.firstName}}

Q1 Konflikt — odpověď: {{contact.3dv_otazka_1_konflikt}}
Q1 Konflikt — intenzita: {{contact.3dv_otazka_1a_konflikt}}

Q2 Směr — odpověď: {{contact.3dv_otazka_2_smer}}
Q2 Směr — intenzita: {{contact.3dv_otazka_2a_smer}}

Q3 Vnímání — odpověď: {{contact.3dv_otazka_3_pocity}}
Q3 Vnímání — intenzita: {{contact.3dv_otazka_3a_pocity}}

Q4 Hranice — odpověď: {{contact.3dv_otazka_4_vadi}}
Q4 Hranice — intenzita: {{contact.3dv_otazka_4a_vadi}}

Q5 Autorita — odpověď: {{contact.3dv_otazka_5_pravda}}
Q5 Autorita — intenzita: {{contact.3dv_otazka_5a_pravda}}

Pole intenzity může obsahovat TEXT nebo ČÍSLO:
  "Občas — stane se mi to čas od času."  nebo 1     → intenzita 1
  "Často — opakuje se mi to pravidelně." nebo 2     → intenzita 2
  "Skoro vždycky — je to můj hlavní vzorec." nebo 3 → intenzita 3
  (prázdné) nebo 0                                  → intenzita 0
(Variantu C nepoznáváš z intenzity, ale z HLAVNÍ odpovědi — viz KROK 1a.)

# TESTOVACÍ REŽIM (DEBUG — POVINNÉ)

Než vygeneruješ e-mail, MUSÍŠ na úplný začátek výstupu vypsat všech 10 hodnot
ze sekce DATA RESPONDENTA (5 odpovědí + 5 intenzit), každou na samostatný řádek
v <p> tagu, např.:  <p>Q2 Směr — odpověď: …</p>
Když je hodnota prázdná, napiš:  <p>Q2 Směr — odpověď: (prázdné)</p>

Tento výpis je POVINNÁ součást výstupu — NEPOVAŽUJ ho za komentář ani vysvětlení
a NIKDY ho nevynechávej, ani kdyby jiné pravidlo říkalo „vrať jen hotový e-mail".

Teprve POTOM pokračuj generováním e-mailu.

# CO PŘESNĚ RESPONDENT ODPOVĚDĚL

Q1 — Konflikt:
  A = "Beru to osobně, chci se obhájit nebo jí vysvětlit, jak to je."
  B = "Spíš čekám, až ji to přejde, nebo se stáhnu, protože nevím, co s tím."
  C = "Zajímá mě, co se v ní děje, a umím se ptát bez potřeby ji opravovat nebo zachraňovat."

Q2 — Směr:
  A = "Mám to někde v hlavě, ale neumím to jasně říct ani za tím jít."
  B = "Řeším hlavně provoz, povinnosti a aktuální tlak. Na vizi teď moc prostor nemám."
  C = "Vím, kam směřuju, umím to komunikovat a dělám konkrétní kroky, aby se to dělo"

Q3 — Vnímání:
  A = "Hledám řešení nebo vysvětluju."
  B = "Poslouchám jen napůl, protože nevím, co s tím"
  C = "Vnímám ji a zajímá mě její prožívání bez opravování"

Q4 — Hranice:
  A = "Dlouho to držím v sobě a řeknu to až ve chvíli, kdy už jsem přetlakovaný."
  B = "Radši to přejdu, přizpůsobím se nebo si řeknu, že to nemá cenu otevírat."
  C = "Umím to včas a klidně pojmenovat bez výbuchu i bez uhýbání."

Q5 — Autorita:
  A = "Často to myslím dobře, ale nevydržím u toho a sám sebe podkopám."
  B = "V některých věcech držím, v jiných si dělám výjimky a omlouvám si je."
  C = "Co si řeknu, za tím jdu. Moje slovo má váhu i pro mě samotného."

# KROK 0 — KONTROLA DAT A VOLBA TEXTU

NEJDŮLEŽITĚJŠÍ PRAVIDLO: Jestli použít problémový TEXT (1–5), nebo pochvalný TEXT 6,
rozhoduješ VÝHRADNĚ podle 5 HLAVNÍCH odpovědí (pole "odpověď"). O tom, jestli TEXT 6,
nebo 1–5, intenzita NIKDY nerozhoduje. Intenzita se uplatní až UVNITŘ TEXTU 1–5:
vybere, KTERÁ otázka je hlavní (nejvyšší intenzita mezi A/B), a ladí tón.

DIAGNÓZU STAV JEN Z TEXTOVÝCH ODPOVĚDÍ. Pracuj VÝHRADNĚ s poli, která máš v sekci
DATA RESPONDENTA výše (odpověď + intenzita u každé otázky). NIKDY nepoužívej žádné
souhrnné ani dopočítané skóre kvízu (např. "Lowest Score Category", "Highest Score",
ani Intenzita_* brané jako kategorie či celkové skóre) — mohou obsahovat stará
zbytková data. Intenzitu ber jen u otázek, které jsou TEĎ A nebo B (tam ji člověk
právě vyplnil); u C ji ignoruj (viz KROK 1a).

POROVNÁVÁNÍ: variantu (A/B/C) poznávej podle klíčových slov / začátku věty, NE podle
přesné shody celého textu. Interpunkce, uvozovky, pomlčky i poškozená diakritika
(např. „Vím" vs „VÃ­m", „mě" vs „mÄ") se mohou lišit kódováním — to NESMÍ rozhodnutí
ovlivnit. Hledej smysl věty, ne přesné znaky.

Nejdřív zkontroluj 5 hlavních odpovědí Q1–Q5:

1) Pokud jsou PRÁZDNÉ / nenačtené VŠECHNY hlavní odpovědi → data se nenačetla.
NEVYMÝŠLEJ si diagnózu a NEPOUŽÍVEJ TEXT 6. Vrať POUZE tento fragment a skonči:

<p>Ahoj chlape,</p>
<p>vypadá to, že se Tvoje odpovědi z kvízu správně nenačetly. Vyplň ho prosím ještě jednou tady: <a href="https://restartmuze.cz/kviz-vztahu/">restartmuze.cz/kviz-vztahu</a>, ať Ti pošlu přesné vyhodnocení.</p>
<p>Sláva Černý</p>

2) Spočítej, kolik z 5 HLAVNÍCH odpovědí je varianta C. Pokud je VŠECH 5 = C →
POUŽIJ TEXT 6 a SKONČI. Pole "intenzita" přitom ÚPLNĚ IGNORUJ — u odpovědi C jsou
neplatná a mohou obsahovat staré hodnoty z dřívějšího vyplnění. I kdyby ukazovala
"Často" nebo "Skoro vždycky", na výsledku to nic nemění: všech 5 hlavních = C → VŽDY TEXT 6.

3) Pokud je prázdná jen NĚKTERÁ hlavní odpověď (ne všechny) → ber intenzitu té otázky
jako 0 a pokračuj KROKEM 1.

Jinak (aspoň jedna hlavní odpověď je A nebo B) → pokračuj KROKEM 1.

# KROK 1 — URČI INTENZITU KAŽDÉ OTÁZKY

KRITICKÉ: Intenzitu NEURČUJ z pole intenzity samotného — to může obsahovat
STAROU hodnotu z dřívějšího vyplnění. Vždy nejdřív zkontroluj HLAVNÍ odpověď,
ta se přepisuje při každém vyplnění a je vždy aktuální.

Pro KAŽDOU otázku postupuj takto:

KROK 1a) Pokud respondent vybral variantu C (viz legenda výše), považuj
  intenzitu této otázky za 0 — bez ohledu na obsah pole intenzity.
  (C poznáš z HLAVNÍ odpovědi, ne z pole intenzity. Hlavní odpověď se přepisuje
   při každém vyplnění, takže je vždy aktuální. Pole intenzity může u C obsahovat
   starou hodnotu z dřívějšího vyplnění — proto ho zde ignoruj.)

KROK 1b) Pokud respondent vybral A nebo B → vezmi intenzitu z pole intenzity.
  Pole může obsahovat TEXT nebo ČÍSLO — ber obojí:
  "Skoro vždycky..."  nebo  3   → 3
  "Často..."          nebo  2   → 2
  "Občas..."          nebo  1   → 1
  prázdné             nebo  0   → 0

Hodnoty respondenta:
  Q1: odpověď [{{contact.3dv_otazka_1_konflikt}}] / intenzita [{{contact.3dv_otazka_1a_konflikt}}]
  Q2: odpověď [{{contact.3dv_otazka_2_smer}}] / intenzita [{{contact.3dv_otazka_2a_smer}}]
  Q3: odpověď [{{contact.3dv_otazka_3_pocity}}] / intenzita [{{contact.3dv_otazka_3a_pocity}}]
  Q4: odpověď [{{contact.3dv_otazka_4_vadi}}] / intenzita [{{contact.3dv_otazka_4a_vadi}}]
  Q5: odpověď [{{contact.3dv_otazka_5_pravda}}] / intenzita [{{contact.3dv_otazka_5a_pravda}}]

# KROK 2 — URČI HLAVNÍ OTÁZKU (jen pro TEXT 1–5)

Případ "všech 5 hlavních odpovědí = C" je už vyřešený v KROKU 0 (→ TEXT 6).
Sem se dostaneš jen tehdy, když aspoň jedna hlavní odpověď je A nebo B.
TEXT 6 už tady NEVOL — a intenzitu NEPOUŽÍVEJ k volbě mezi TEXTEM 6 a 1–5.

Hlavní otázka = ta s nejvyšší intenzitou (z KROKU 1, kde C = 0).
Při shodě (remíza): vyhrává otázka s nižším číslem → Q1 > Q2 > Q3 > Q4 > Q5.
Vyber TEXT 1–5.

TÓN PODLE INTENZITY: Pokud je nejvyšší intenzita (hlavní otázka) jen 1 ("Občas..."),
zjemni tón celého emailu. Ve VSTUPU A i v P.S. jasně dej najevo, že tohle NENÍ velký
problém ani hlavní téma — jen se to čas od času objeví. Nepřeháněj závažnost, piš
povzbudivě (např. "Tohle u Tebe není velké téma. Spíš se to občas mihne — a stačí
o tom vědět.").

# KROK 3 — PŘIDEJ VSTUPY DO TEXTU

Pro TEXT 6 → NEVKLÁDEJ VSTUP A, VSTUP B ani VSTUP C.
Odkaz v TEXT 6 je již součástí textu jako tlačítko — nic nenahrazuj.

Pro TEXT 1–5 pokračuj níže:

## VSTUP A
Kam: hned za diagnostický nadpis (věta s pojmenováním problému).
Co: 1–2 věty. Zmiň přesně to, co respondent odpověděl (A nebo B)
a přizpůsob tomu jak často se mu to děje.

Intenzitní pole obsahuje text — urči úroveň takto:
  "Občas..."      → piš "občas", "čas od času", "zatím ne vždy — ale je to tam"
  "Často..."      → piš "pravidelně", "opakovaně", "není to výjimka"
  "Skoro vždy..." → piš "skoro pokaždé", "reflexivně", "bez přemýšlení"

Příklady stylu (uč se z nich, nepoužívej doslovně):
"Snažíš se to uklidnit, vysvětlit — aby byl klid. A děláš to skoro pokaždé."
"Zavíráš se. Stahování je u Tebe pravidelná první reakce, když přijde tlak."
"Mám to v hlavě — ale neumím to říct ani za tím jít. A to se Ti děje čas od času. Zatím."

## VSTUP B
Kam: těsně před větu "Přesně o tom je trénink:" (nebo "Přesně o tom je nový trénink:").
Co: pouze pokud má druhá nejvyšší intenzita hodnotu ≥ 2.
Napiš 2 věty — přirozeně, bez nadpisu, jako by to Sláva jen tak dodal.
Ref. konkrétní odpověď té sekundární otázky + její intenzitu.
Pokud žádná sekundární intenzita ≥ 2 není → tento vstup celý vynech.

## VSTUP C
Kam: za Slávův závěrečný text.
Co: vlož přesně toto:

<p>Klikni na tlačítko níže a zaregistruj se do tréninku.</p>
<p>Cena: 97 Kč.</p>
<p>Sláva Černý</p>
<p>P.S. [1 věta — přirozeně k jeho hlavní odpovědi. Krátce.]</p>

# PRAVIDLA

- V úvodním pozdravu "Ahoj chlape," nahraď slovo "chlape"
  jménem z pole Jméno v DATA RESPONDENTA — ale POUZE pokud
  tam jméno skutečně je. Pokud je pole prázdné, nechej
  "Ahoj chlape," beze změny.
- Slávův text jinak neměň — ani slovo, ani pořadí
- Nepoužívej slovo "vzorec"
- Žádná kurzíva
- Žádné fráze: "Doufám", "Věřím", "Rád bych", "Tento email"
- Vrať pouze hotový HTML fragment — žádné komentáře ani vysvětlení
- Předmět emailu NEVKLÁDEJ do těla zprávy
- Tučně <strong> zvýrazni: diagnostický nadpis, větu z VSTUPU A,
  klíčový pull-quote ze Slávova textu, název tréninku

# FORMÁTOVÁNÍ

Slávův text nezměníš — jen ho zorganizuješ takto:

- Každý odstavec = samostatný <p>...</p>, max 2–3 věty
- Krátké dramatické věty dostanou vlastní <p> (např.
  "Nejdřív přijde rutina." nebo "Víš, kde uhýbáš.")
- Střídej delší a kratší bloky — vytváří rytmus
- Klíčové věty zvýrazni <strong>
- Za každou tematickou sekcí přidej <p>&nbsp;</p>
- Žádné dvojité mezery, žádné prázdné řádky navíc uvnitř odstavce
- používej odrážky nebo jiné zvýraznění výčtů
- omez používání vět na jeden řádek, pokud to logicky jde, věty dávej do odstavců

# TEXTY

## TEXT 1 — použij když 3dv_otazka_1a_konflikt je nejvyšší

Ahoj chlape,

to, že jsi došel až sem, je dobře. Většina chlapů to vzdá dřív a skončí
u věty: „Problém je ona."

Vyhodnocení kvízu na základě Tvých odpovědí je následující:

Neumíš dobře řešit konflikt se ženou.

[[ VSTUP A ]]

Jenže konflikt se ženou není největší problém (naopak je přirozenou součástí
vztahu). Největší problém je, co se stane s tebou, když konflikt přijde.

Žena je v emocích, vrací se do minulosti, skáče z tématu na téma, obviňuje
tebe nebo se uzavírá. A muž v tu chvíli udělá klasickou chybu:

Začne jí vysvětlovat svůj pohled moc brzo.

Problém není ve vysvětlování (na Tvém pohledu rozhodně záleží!).
Problém je v načasování.

Právě toto většině chlapů uniká. Pak nechápou, proč žena zůstává v emocích,
když to, co říkají, přece dává logiku. Jenže i její reakce mají logiku.
Je jen většině mužů skrytá.

A jakmile tenhle mechanismus uvidíš, začneš jinak vnímat: konflikt, ženu
i sebe sama ve vztahu.

[[ VSTUP B ]]

Přesně o tom je nový trénink:

Jak vrátit do vztahu klid, respekt a vedení za 3 dny

Během 3 dnů ti dám základy, které ti měl dát tvůj táta.
Ověřeno na více než 60 000 chlapech, kteří prošli mými tréninky.
Prodáno přes 15 000 kusů mojí knihy.

[[ VSTUP C ]]

## TEXT 2 — použij když 3dv_otazka_2a_smer je nejvyšší

Ahoj chlape,

je paráda, že jsi došel až sem a po cestě to nevzdal (jako většina).

Vyhodnocení kvízu na základě Tvých odpovědí je následující:

Chybí Ti směr, vize a vedení.

[[ VSTUP A ]]

Vize je palivo, které nepotřebuje jen muž, ale i vztah.

Muž může nějakou dobu fungovat bez jasného směru. Může plnit povinnosti,
vydělávat, starat se. Ale uvnitř se začne ztrácet.

A když se ztrácí muž, začne se časem ztrácet i vztah.

Nejdřív přijde rutina. Pak odstup. Pak pocit, že spolu vlastně jen fungujete
vedle sebe. A u mnoha párů se to naplno ukáže ve chvíli, kdy děti vylétnou
z hnízda a oni zjistí, že mezi nimi už dlouho není tah, směr ani život.

Je to jako mít auto a nemít do něj benzín.

Vize je to palivo, které zásadně zvyšuje kvalitu života nejen muže,
ale hlavně páru.

Ve své praxi vidím, že chlapi bez směru často vyrůstali tak, že se jich
nikdo moc neptal, co chtějí oni. Naučili se plnit potřeby druhých místo
toho, aby se ptali sami sebe, co chtějí v životě.

A právě tam mnohdy vznikají pocity studu, hanby, strachu a postupná vnitřní
smrt. Muž pak nežije svůj život. Jen slouží potřebám druhých.

Žena tuhle energii cítí. A od muže bez směru se podvědomě odpojuje.

Jde to ale dělat jinak.

Muž nemusí být dokonalý. Ale žena potřebuje cítit, že ví, kam jde.
Že nežije jen z povinnosti, ale ze směru.

[[ VSTUP B ]]

Přesně o tom je trénink:

Jak vrátit do vztahu klid, respekt a vedení za 3 dny

Během 3 dnů ti dám základy, které ti měl dát tvůj táta.
Ověřeno na více než 60 000 chlapech, kteří prošli mými tréninky.
Prodáno přes 15 000 kusů mojí knihy.

[[ VSTUP C ]]

## TEXT 3 — použij když 3dv_otazka_3a_pocity je nejvyšší

Ahoj chlape,

je paráda, že jsi došel až sem a po cestě to nevzdal (jako většina).

Vyhodnocení kvízu na základě Tvých odpovědí je následující:

Málo vnímáš prožívání své ženy.

[[ VSTUP A ]]

Spousta chlapů si myslí, že žena chce moc. Moc mluví. Moc opakuje. Moc tlačí.

Jenže často je pravda jinde:

Žena netlačí proto, že je „moc". Tlačí proto, že se dlouho necítí vnímaná
či vyslyšená.

A tohle je problém, který ničí obrovské množství vztahů.

My chlapi jsme často od malička trénovaní k tomu, abychom ženský hlas spíš
odfiltrovali než vnímali. A není se čemu divit. Po tisících povelech, zákazech
a opravách od ženských autorit (maminky, tetičky, babičky nebo paní učitelky
ve škole) si naše hlava zvykla vypínat.

Jenže to, co kdysi byla obrana, dnes ničí vztah.

Žena něco říká a muž ji ve skutečnosti nevnímá. Slyší slova, ale nevnímá
prožívání. A žena vedle něj časem přestává cítit blízkost, bezpečí i chuť
se otevírat. A to je pak začátek konce vztahu, který byl na počátku
velmi blízký.

Dobrá zpráva je, že se s tím dá krásně pracovat. A v praxi vidím, jakmile
chlap začne ženu vnímat, ona bude mnohem vnímavější k němu.

[[ VSTUP B ]]

Přesně o tom je online trénink:

Jak vrátit do vztahu klid, respekt a vedení za 3 dny

Během 3 dnů ti dám základy, které ti měl dát tvůj táta.
Ověřeno na více než 60 000 chlapech, kteří prošli mými tréninky.
Prodáno přes 15 000 kusů mojí knihy.

[[ VSTUP C ]]

## TEXT 4 — použij když 3dv_otazka_4a_vadi je nejvyšší

Ahoj chlape,

je paráda, že jsi došel až sem a po cestě to nevzdal (jako většina).

Vyhodnocení kvízu na základě Tvých odpovědí je následující:

Nemáš jasné hranice, nebo je komunikuješ pozdě.

[[ VSTUP A ]]

Tohle je jeden z nejčastějších problémů chlapů ve vztahu.

Buď muž hranice nemá, nebo je sice cítí, ale říká je až moc pozdě.

První typ radši drží pusu a krok, aby byl doma klid. Druhý typ mlčí,
dusí to v sobě a pak jednou bouchne jak papiňák.

Oba modely mají stejný důsledek:

Žena vedle takového chlapa nezažívá pevnost.
Zažívá buď nečitelnost, nebo přetlak.

A vztah se tím pomalu ničí.

Muž bez hranic nepůsobí laskavě. Působí nejasně.
Muž s pozdními hranicemi nepůsobí pevně. Působí chaoticky.

Dobrá zpráva je, že se to dá změnit.

[[ VSTUP B ]]

Přesně o tom je online trénink:

Jak vrátit do vztahu klid, respekt a vedení za 3 dny

Během 3 dnů ti dám základy, které ti měl dát tvůj táta.
Ověřeno na více než 60 000 chlapech, kteří prošli mými tréninky.
Prodáno přes 15 000 kusů mojí knihy.

[[ VSTUP C ]]

## TEXT 5 — použij když 3dv_otazka_5a_pravda je nejvyšší

Ahoj chlape,

je paráda, že jsi došel až sem a po cestě to nevzdal (jako většina).

Vyhodnocení kvízu na základě Tvých odpovědí je následující:

Podrýváš svoji autoritu sám před sebou.

[[ VSTUP A ]]

Tohle je jeden z nejhlubších problémů chlapa ve vztahu. Protože když muž
přestane věřit vlastnímu slovu, začne ztrácet pevnost úplně všude: ve vztahu,
v hranicích, ve vizi, v konfliktu, i v tom, jak působí na ženu.

Nejhorší na tom je, že to víš.

Víš, kde uhýbáš.
Víš, co odkládáš.
Víš, kde si děláš výjimky.

A každou další malou lží si snižuješ váhu u sebe samotného.

Žena tohle možná neumí pojmenovat. Ale cítí to.

Cítí, jestli vedle ní stojí muž, který se o sebe může opřít, nebo muž,
který sám sobě přestává věřit.

Dobrá zpráva je, že se s tím dá pohnout.

[[ VSTUP B ]]

Přesně o tom je online trénink:

Jak vrátit do vztahu klid, respekt a vedení za 3 dny

Během 3 dnů ti dám základy, které ti měl dát tvůj táta.
Ověřeno na více než 60 000 chlapech, kteří prošli mými tréninky.
Prodáno přes 15 000 kusů mojí knihy.

[[ VSTUP C ]]

## TEXT 6 — použij když jsou VŠECHNY hlavní odpovědi C

Ahoj chlape,

Jsi vztahově zralý muž, který chce dojít k porozumění.

Podle odpovědí máš v sobě jeden důležitý prvek: Chceš vést vztah tak, aby
v něm byl klid, respekt a důvěra.

Umíš vnímat, že když žena mluví o tom, co cítí, nemusíš ji hned opravovat,
zachraňovat ani přesvědčovat. Umíš zůstat přítomný, když přijde tlak.
A taky víš, že mužská síla není v tom bouchnout do stolu, ale ustát
nepříjemnou chvíli bez útěku, bez výbuchu a bez ztráty směru.

Co je tvoje největší síla?

Tvoje odpovědi ukazují, že nechceš vztah řídit tlakem, manipulací ani mlčením.

Chceš být muž, který umí:
– zůstat v konfliktu přítomný,
– vést rozhovor bez útěku i nátlaku,
– vnímat ženu bez potřeby ji hned opravovat,
– pojmenovat hranice včas a klidně,
– držet slovo i sám před sebou.

To je hodně dobrý základ chlapa, vedle kterého se žena může časem znovu uvolnit.

Ale pozor. Nejdůležitější otázka není, jestli to víš. Nejdůležitější otázka
na tělo je: Děláš to i ve chvíli, kdy jsi unavený, naštvaný, zraněný nebo
máš pocit, že tě žena nerespektuje? Protože právě tam se láme vztah.

A protože tohle máš podle odpovědí ve vztahu dobře nastavené, chci tě
poprosit o jednu věc:

Jestli máš kamaráda, který doma pořád bojuje, utíká, mlčí, vybuchuje nebo
už neví, co se ženou dál, pošli mu tenhle kvíz.

Možná mu tím ušetříš měsíce nebo roky hádek, ticha a zbytečné bolesti.

Tady je odkaz:

<p align="center" style="text-align:center;margin:1.5rem 0;">
<a href="https://restartmuze.cz/kviz-vztahu/" style="display:inline-block;background:#002338;color:#ffffff;font-family:Montserrat,Arial,sans-serif;font-weight:700;font-size:1.15rem;text-decoration:none;padding:14px 36px;border-radius:100px;letter-spacing:0.04em;"><span style="color:#ffffff;">Pošli kvíz kamarádovi →</span></a>
</p>

<p>Tvůj výsledek ukazuje, že víš, jak budovat zdravý vztah. A kdybys přece jen chtěl, můžeš se přidat do mé nové 3denní výzvy.</p>
