# WIUC 2026 Bratislava: rozpis zápasov

Statická stránka pre študentov: vyberiete univerzitu a vidíte všetky jej zápasy,
športy a miesta. Bez buildu, stačí otvoriť `index.html` alebo nasadiť priečinok
na akýkoľvek statický hosting.

## Súbory

- `index.html`, `styles.css`, `app.js`: stránka (SK/EN, výber školy sa pamätá v prehliadači).
- `data.js`: generované z verejných Google Sheets organizátora (kolektívne športy, tenis, padel).
- `extra.js`: ručne doplnené riadky pre STU (bedminton, stolný tenis, plávanie, atletika),
  ktoré organizátor zverejnil len ako PDF.
- `tools/build.py`: stiahne aktuálne rozpisy a prepíše `data.js`.

## Aktualizácia rozpisu (výsledky, zmeny časov, doplnené play-off)

```bash
python tools/build.py
```

Potrebuje Python 3 a `openpyxl` (`pip install openpyxl`). Skript vypíše
nespárované názvy univerzít, ak organizátor pridá nový tvar mena; doplňte ho
do `ALIASES` v `build.py`.

Zdroj: https://www.wiusc.com/11th-wiuc-bratislava-2026/ (sekcia SCHEDULES, Google Drive).
