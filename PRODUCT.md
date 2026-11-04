# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Student athletes, team captains and fans from any of the ~85 universities competing at the
11th World InterUniversities Championships (WIUC), Bratislava, 4 to 8 November 2026.
Situation: on a phone, between venues spread across the city, often outdoors or in a noisy
hall, with minutes to decide where to go next. Job: "when and where is my next match, and
who do we play". Secondary: organisers, volunteers and coaches checking a venue's day.
Confirmed 2026-11-04: primary audience is all universities, not one school.

## Product Purpose

A schedule helper that turns the organiser's per-sport spreadsheets into a per-university
view: pick your university once, then see all its matches, sports and venues per day, with
the current and next match highlighted. Success: a student finds their next match, venue
and opponent in under ten seconds without opening a PDF.

## Positioning

The organiser publishes schedules per sport (one Google Sheet per sport, PDFs for
individual sports). This is the only view organised by university and by time of day,
across all sports at once, with venues resolved to addresses and map links.

## Operating Context

- Static site at the repo root (index.html, app.js, styles.css, data.js, extra.js), hosted on
  GitHub Pages at https://danculinho.github.io/WIUC/ and as a claude.ai Artifact.
- `tools/build.py` regenerates `data.js` from the organiser's public Google Sheets;
  rerun during the tournament for results, time changes and filled-in play-off brackets.
- Days: Wed 4.11 to Sat 7.11 (Sun 8.11 departures). Opening ceremony Thu 5.11 19:00, GOPASS Aréna.
- 14 venues across Bratislava; several have numbered halls, courts or pitches.
- Users share the page by link or QR in team WhatsApp groups.

## Capabilities and Constraints

- Views: university picker (search, Slovak universities first), per-university day view
  with sport filter, full schedule by venue, venue list with addresses and Google Maps links.
- Slovak and English UI (toggle); Slovak uses formal address (vykanie), diacritics kept,
  no em-dashes in UI strings.
- Selection, language and sport filter remembered in localStorage; deep link per university.
- Knockout rows on Saturday are placeholders until pools finish; shown as "play-off,
  depending on progression".
- Results are not yet published by the organiser; result columns exist and render when filled.
- Individual sports (badminton, table tennis, swimming, athletics) exist only as organiser
  PDFs; STU rows were entered by hand, other universities get PDF links.
- No build step, no framework; vanilla JS, must work on older phones; data file ~330 kB.
- Light and dark colour scheme both required (phones outdoors in daylight, halls at night).

## Brand Commitments

Confirmed 2026-11-04: follow the official WIUC / organiser visual identity (wiusc.com):
- Typeface: Work Sans (400/600/700 on wiusc.com; this page also uses 800 for display and numerals).
- Site colours: deep navy #051c2c, blue #1f40e6, cyan #22b8f0, light grey #f0f2f5.
- Event mark "Bratislava 2026": Bratislava castle drawn in painterly diagonal colour
  stripes; stripe palette sampled from the official banner: yellow #ffc315, orange #ee792c,
  red #e93a3f, pink #ee1953, purple #674381, green #24a75b, lime #88b54e, blue #0e5ea5,
  cyan #008fb3. Wordmark: "BRATISLAVA" in red, "2026" in green.
- The official logo and photos are the organiser's assets; this page is an unofficial
  helper and must not present itself as the organiser's site. Use the colour language and
  stripe motif, not the logo or their photography.

## Evidence on Hand

- Organiser's Google Sheets (team sports, tennis, padel) and PDFs, linked from
  https://www.wiusc.com/11th-wiuc-bratislava-2026/ (SCHEDULES). Venue addresses from the same page.
- STU BA "Rozlosovanie" sheets (screenshots) for the hand-entered individual sports.
- No results, standings or photos available to the page yet; do not fabricate them.

## Product Principles

1. The next match first: time, place and opponent before anything else.
2. One tap to orient: day, sport and venue are filters, never navigation mazes.
3. Truthful about uncertainty: placeholders and hand-entered rows are labelled as such.
4. Readable in sunlight and at night, one-handed, on slow connections.
5. Neutral host: every university gets the same treatment; the tournament's identity, not a school's.
