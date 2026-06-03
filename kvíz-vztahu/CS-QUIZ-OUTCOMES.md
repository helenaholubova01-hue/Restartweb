# CS Quiz — nastavení Outcomes (výsledků)

## Stav k 2026-05-26

Kolega Dan přidal:
- A odpovědi → intenzita 1 nebo 2 pro danou kategorii
- B odpovědi → intenzita 2 nebo 3 pro danou kategorii  
- C odpovědi → intenzita 0 pro danou kategorii

**Bug:** při samém C vychází výsledek 5 (Autorita) místo výsledku 6 (Silný základ).

---

## Co ještě chybí udělat

### 1) Přidat kategorii `typ_zaklad`

Manage Categories → + Add Category → název: `typ_zaklad`

### 2) Na každé C odpovědi přidat score 1 pro `typ_zaklad`

| Otázka | Odpověď C | Category | Score |
|---|---|---|---|
| Q1 | Zůstanu přítomný, vnímám ji... | `typ_zaklad` | 1 |
| Q2 | Vím, kam směřuju... | `typ_zaklad` | 1 |
| Q3 | Zajímá mě, co se v ní děje... | `typ_zaklad` | 1 |
| Q4 | Umím to včas a klidně pojmenovat... | `typ_zaklad` | 1 |
| Q5 | Co si řeknu, za tím jdu... | `typ_zaklad` | 1 |

Výsledek při samém C: `typ_zaklad = 5`, všechny intenzity = 0.

### 3) Nastavit Outcomes (Results)

Najdi Outcomes sekci (Settings kvízu → ozubené kolečko nahoře).

| Outcome | Podmínka | Winning category |
|---|---|---|
| 1 — Konflikt | `Intenzita_konflikt` is highest | Intenzita_konflikt |
| 2 — Směr | `Intenzita_smer` is highest | Intenzita_smer |
| 3 — Vnímání | `Intenzita_vnimani` is highest | Intenzita_vnimani |
| 4 — Hranice | `Intenzita_hranice` is highest | Intenzita_hranice |
| 5 — Autorita | `Intenzita_autorita` is highest | Intenzita_autorita |
| **6 — Silný základ** | `typ_zaklad` is highest | typ_zaklad |

**Pořadí při shodě (tie-breaker):** Konflikt > Směr > Vnímání > Hranice > Autorita > Silný základ.

---

## Logika skórování (pro kontrolu)

| Odpověď | Intenzita (příslušná kategorie) | typ_zaklad |
|---|---|---|
| A | 1 nebo 2 | 0 |
| B | 2 nebo 3 | 0 |
| C | 0 | **1** |

### Příklady vyhodnocení

| Odpovědi | Výsledek |
|---|---|
| C, C, C, C, C | `typ_zaklad=5` → **Výsledek 6** |
| B/3, C, C, C, C | `Intenzita_konflikt=3, typ_zaklad=4` → **Výsledek 1** |
| C, C, C, C, B/2 | `Intenzita_autorita=2, typ_zaklad=4` → **Výsledek 5** |
| B/3, C, A/2, C, C | `Intenzita_konflikt=3, Intenzita_vnimani=2, typ_zaklad=3` → **Výsledek 1** |

---

## Workflow v Cliqsales (po dokončení kvízu)

Po odeslání kvízu se spustí workflow "Kvíz dvoufazovy":
- Create/Update Contact
- Add Tag podle výsledku

Tagy pro výsledek 6: `kviz_typ_6_zaklad` (vytvořit v Tags)

---

*Zpracovala: Helena / 2026-05-26*
