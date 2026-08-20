# Futbalová nora / The Football Hole

Denná futbalová trivia hra inšpirovaná hrou *Rabbithole* od The Atlantic.
Sedem otázok tvorí reťaz — odpoveď na každú otázku sa stáva témou tej ďalšej.
Čím hlbšie padáš, tým ťažšie to je.

Rozhranie aj otázky sú dvojjazyčné (slovensky / anglicky), prepínač je vpravo hore.

## Pravidlá

| Situácia | Body |
|---|---|
| Správne na prvý pokus | 3 |
| S nápovedou | 2 |
| Zle, potom správne z možností | 2 |
| S nápovedou, zle, potom správne z možností | 1 |
| Zle aj z možností | 0 |

Maximum je **21 bodov** za sedem otázok.

## Odmeny

Hra si pamätá tvoju kariéru, takže je dôvod vrátiť sa aj zajtra:

- **Hodnosti** — z nazbieraných bodov rastie kariéra od *Zberača lôpt* až po
  *Legendu*. Na výsledkovej obrazovke vidíš, koľko bodov chýba do ďalšej.
- **Trofeje** — dvanásť odomykateľných úspechov vo vitríne (čisté konto,
  hra bez nápovedy, séria siedmich dní, prejdenie celého archívu a ďalšie).
- **Séria** — koľko dní po sebe si hral; vynechaný deň ju vynuluje.
- **Odpočet** — po dohraní beží čas do polnoci, keď sa otvorí ďalšia nora.

Trofeje a hodnosti sa počítajú len z dennej nory. Voľná hra z archívu sa do
štatistík nezapočítava (okrem trofeje *Archivár*, ktorá sleduje prejdené reťaze).

## Spustenie

Netreba build ani inštaláciu — sú to statické súbory.

Dvojklik na `index.html`, alebo cez lokálny server (zrkadlí prostredie GitHub Pages):

```bash
python -m http.server 4173
```

Potom otvor `http://localhost:4173/index.html`.

### Parametre v URL

| Parameter | Účel |
|---|---|
| `?date=2026-08-25` | Zahrá noru pre konkrétny dátum (testovanie) |
| `?chain=slovak-01` | Voľná hra konkrétnej reťaze; nezapočíta sa do štatistík |

## Štruktúra

```
index.html          # jedna stránka, obrazovky ako sekcie
css/styles.css      # tunelová téma, mobile-first
data/puzzles.js     # obsah — reťaze otázok (RH_PUZZLES)
js/i18n.js          # texty rozhrania SK/EN
js/answers.js       # porovnávanie odpovedí (diakritika, preklepy)
js/daily.js         # výber reťaze podľa dátumu
js/storage.js       # localStorage — jazyk, rozohraná hra, štatistiky, trofeje
js/share.js         # zdieľateľný výsledok s emoji
js/game.js          # pravidlá a skórovanie (bez DOM)
js/awards.js        # hodnosti, trofeje, odpočet do ďalšej nory
js/main.js          # renderovanie a obsluha udalostí
tools/validate.mjs  # kontrola obsahu
```

## Pridanie novej reťaze otázok

Do poľa `chains` v `data/puzzles.js` pridaj objekt so **siedmimi** otázkami.
Téma každej otázky musí nadväzovať na odpoveď tej predchádzajúcej.

```js
{
  "id": "moja-retaz-01",
  "title": { "en": "...", "sk": "..." },
  "questions": [
    {
      "topic":    { "en": "The World Cup", "sk": "Majstrovstvá sveta" },
      "question": { "en": "...", "sk": "..." },
      "answer": {
        "display": { "en": "Brazil", "sk": "Brazília" },
        "accept":  { "en": ["brazil"], "sk": ["brazilia"] }
      },
      "hint": { "en": "...", "sk": "..." },
      "distractors": {
        "en": ["Germany", "Argentina", "Italy"],
        "sk": ["Nemecko", "Argentína", "Taliansko"]
      }
    }
  ]
}
```

Pravidlá pre obsah:

- Hodnoty v `accept` musia byť **normalizované** — malé písmená, bez diakritiky
  a bez interpunkcie. Predpony ako `the`, `fc`, `ac` sa strihajú automaticky,
  takže `"fc porto"` píš ako `"porto"`.
- Hráč môže odpovedať v ktoromkoľvek jazyku — obidva zoznamy `accept` platia
  vždy naraz.
- Odpovede dlhšie ako 5 znakov tolerujú jeden preklep.
- `distractors` musia byť presne tri a žiadny nesmie byť správnou odpoveďou.
- V rámci jednej reťaze sa odpoveď nesmie zopakovať.
- Vyhýbaj sa faktom, ktoré zastarajú (napr. „v ktorom klube momentálne hrá…“).

Po každej zmene obsahu spusti kontrolu:

```bash
node tools/validate.mjs
```

Reťaze sa striedajú podľa dátumu, takže so štrnástimi reťazami sa cyklus
opakuje každé dva týždne — čím viac ich pridáš, tým dlhšie hra vydrží.

## Nasadenie na GitHub Pages

Keďže tu nie je build, stačí pushnúť repozitár a v *Settings → Pages* zvoliť
vetvu a koreňový priečinok.

## Známe obmedzenia

- Odpovede sú v zdrojovom kóde stránky, takže hru sa dá „ošvindľovať“.
  Rovnaký kompromis má aj Wordle.
- Zmena dňa sa riadi lokálnym časom zariadenia.
