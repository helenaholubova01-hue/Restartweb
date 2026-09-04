# Finální leadovka tréninku — rozhodnutí po sekcích (29. 8. 2026)

Číslování sekcí = seznam z konverzace (1–22, odshora dolů).
Varianty: v3 (prémiová serif), v3-vzduch, v4 (redakční), v5-rytmus / v5-galerie / v5-vecer,
v6-desky / v6-pasy (fable jazyk, ~17 % světlé).

Rámec (z 29. 8. po půlnoci): základ kovarnafable — tmavá, pravidelné světlé sekce
v poměru jako fable (~17 %), osobní vzkaz (20) na černé, žádné technické/blueprint
obrázky, žádné silné čáry.

**ZÁKLAD FINÁLU = v6** („je nejvíc tomu, co se mi líbí") s úpravami:
- písmo nadpisů určitě z v6 (Oswald)
- nadpisy sekcí zarovnat NA STŘED
- ZRUŠIT číslované hlavičky kapitol („01 Diagnóza" s rámečkem a linkou) — nechce je
- místo nich nadnadpisy (eyebrow/cap) z v5 — texty „Poznáváš to?", „Řeknu to narovinu",
  „Této hře říkám", „Kam před tím utíkáš", „Cesta ven", „Program tří večerů", „Výbava",
  „Co se mění", „Pro koho", „Kdo Tě povede", „Vstupenky", „Otázky", „Možná je pravda
  hlubší", „Osobní vzkaz" — centrovaně, BEZ vodorovné čárky před textem („to je na všech AI webech")
- barvy/rytmus světlé zatím NEURČENY („jde hlavně o rozložení, ne o barvy") — v7 má
  provizorně rytmus z v6-pasy (17 % jako fable); přepnutí sekce světlá/tmavá = třída .invert

**PRACOVNÍ FINÁL: `trenink-3-dny-v7.html`** (29. 8. dopoledne) — v6 základ + zapracováno:
hero se Slávou víc vlevo, Oswald nadpisy na střed (.shead), nadnadpisy z v5 (šikmá čárka,
centrované), zrušené číslované kapitoly, trojúhelník 640 px (v2), vstupenky dle v4,
závěr a dopis centrované bloky.

| č. | Sekce | Rozhodnutí |
|---|---|---|
| 1 | Hlavička | — |
| 2 | Hero | **z v6**, ale Slávovu postavu posunout více DOLEVA |
| 3 | Pás faktů | — |
| 4 | Diagnóza | nadpis NA STŘED jako ostatní sekce + text pod ním ve DVOU vyvážených sloupcích (časopisecky, žádná fotka); lístky hlášek: punch vlevo, rovné karty s plastickým stínem vpravo |
| 5 | Největší lež | — |
| 6 | Hra bez pravidel | sekce ČERNÁ, Naučili/Nenaučili jako dvě SVĚTLÉ plastické karty |
| 7 | Trojúhelník | **velikost jako ve v2** — max-width 640 px (v6 měl 500 px) |
| 8+9 | Útěk + Dům/Domov | SPOJENO do jedné tmavé sekce (v podkladu 2 nadpisy, ale krátké a navazují): citát Únik + štítky útěků, pak „Penězi můžeš zaplatit dům…" + dvojice |
| 9 | Dům/Domov | → sloučeno do 8 (viz výše) |
| 10 | Cesta ven | pozadí SVĚTLÉ; pozitivní karta „Ale proto, abys uviděl" zvýrazněná 2px černým rámem (jazyk VIP vstupenky) |
| 11 | Program večerů | pozadí SVĚTLÉ; **uspořádání z v2** — svislé číslované kroky pod sebou (velké číslo vlevo, datum s vlasovou linkou, nadpis, podtitul, text), ne tři karty vedle sebe |
| 12 | Výbava | — |
| 13 | Reference | — |
| 14 | CTA pás | — |
| 15 | Pro koho | — |
| 16 | Kdo Tě povede | portrét: hlava výš (object-position 50% 65%); fotka i text zarovnané k horní hraně sloupců (align start, ne center) |
| 17 | Vstupenky | **jako v4** — světlá sekce, obě karty bílé s vlasovým rámečkem, VIP jen se silnějším černým rámem (ne černá výplň), velká cena, hlavička karty podtržená vlasovou linkou, tlačítka na celou šířku karty, poměr sloupců .85/1.15 |
| 18 | FAQ | otázky byly malé (Oswald 1.05rem) → serif 1.22rem, větší proklad — čitelnost |
| 19 | Závěr | — |
| 20 | Osobní vzkaz | **orámovat jako v3** — papírová karta (#f2efe9, stín) na ČERNÉM pozadí sekce; obojí platí zároveň |
| 21 | Finální CTA | — |
| 22 | Patička | **z v3** — centrovaná, tmavší podklad #0b0d11, trust grid 3 sloupce, legal odkazy s podtržením, todo štítek čárkovaný |

Odrážky: všechny pomlčky ROVNÉ (žádné šikmé skew/rotate) — chisel, gains, marks.

Cookie lišta: kovárenské tmavé barvy z v3 (#cc--main override) + odkazy v textu bílé
(minifikovaný styl je barvil #253b48 — na tmavé nebyly vidět).

Poznámky:
- Formulace „jakým pracuji se svými nejdražšími podnikatelskými klienty" je doslova
  ze Slávova podkladu (3 denní on-line trénink (1).md, ř. 522) — případnou změnu
  musí odsouhlasit Sláva.
