# WIUC 2026 Bratislava – schedule helper

**Live:** https://danculinho.github.io/WIUC/

An unofficial companion for the World InterUniversities Championships (WIUC 2026, Bratislava, 4–8 November 2026).
Pick your university and see every match it plays: time, sport, venue, hall or court, and the result once it is in.
Built for students who are walking between venues and need the answer in a few seconds on a phone.

## Features

- **My matches:** all matches of your university by day, or all days at once, with a filter per sport.
  The page remembers your university.
- **Live state:** the match in progress and the next one are highlighted; results appear as the organisers enter them.
- **Full schedule:** every match of the day, grouped by venue.
- **Venues:** all 14 venues with addresses and one-tap navigation.
- **Rules:** the key points of the organisers' General Rules plus the full text (Slovak and English) and the original PDF.
- **Parties:** the official WIUC parties, venues and the booking link.
- **Slovak and English** interface, light and dark mode, works on any phone.
- **Game:** a football trivia game, [Futbalová nora](https://danculinho.github.io/WIUC/hra/), for the breaks between matches.

## Data

The schedule comes from the organisers' public Google Sheets
(linked from https://www.wiusc.com/11th-wiuc-bratislava-2026/, section SCHEDULES).

- Team sports, tennis and padel are read from the sheets into `data.js`.
- Badminton, table tennis, swimming and athletics are published only as PDFs;
  the rows for Slovak University of Technology are entered by hand in `extra.js`.
- During the tournament a GitHub Action (`.github/workflows/wiuc-refresh.yml`) rebuilds `data.js`
  every 10 minutes and commits it only when matches, times or results changed.
  An open page offers a reload when a newer schedule is published.

## Project layout

| Path | What it is |
| --- | --- |
| `index.html`, `styles.css`, `app.js` | The page. Static, no build step, no dependencies. |
| `data.js` | Generated schedule (do not edit by hand). |
| `extra.js` | Hand-entered rows for sports published only as PDFs. |
| `assets/` | Photographs (with credits) and the organisers' rules PDF. |
| `tools/build.py` | Downloads the sheets and rebuilds `data.js`. |
| `tools/test_layout.mjs`, `tools/test_nav.mjs` | Browser tests for the desktop layout and navigation. |
| `hra/` | The football trivia game. |

## Run locally

```bash
python -m http.server 8765
```

Then open http://127.0.0.1:8765/. Add `?now=2026-11-05T12:10` to the URL to preview the page at a given moment.

## Refresh the data by hand

```bash
pip install openpyxl
python tools/build.py
```

The script prints university names it cannot match; add them to `ALIASES` in `tools/build.py`.
It refuses to write if the number of matches drops by more than 30 % (use `--force` if that is expected).

## Tests

With the local server running (Node 22+, Chrome or Edge, and the `cdp.mjs` helper from the design-taste-frontend skill; set `CDP_LIB` if it is not in the default skills folder):

```bash
node tools/test_layout.mjs
node tools/test_nav.mjs
```

## Credits

Made by Daniel Floris. Not affiliated with the organisers (IUSF / WIUSF).
Bratislava panorama: Lukáš Perný, CC BY-SA 4.0, via Wikimedia Commons.
