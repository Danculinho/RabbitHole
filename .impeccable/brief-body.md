# Surface: wiuc/index.html (schedule helper, all views)

Mode: Operate. Audience: student athletes and fans of ~85 universities at WIUC 2026, on phones
between Bratislava venues; task: find the next match (time, venue, hall, opponent) in seconds.
Content: organiser's schedule data (data.js), hand-entered STU rows (extra.js), 14 venues.
Constraints: static vanilla JS, SK/EN, vykanie, no em-dashes, light and dark, WIUC identity
(Work Sans, navy #051c2c, blue #1f40e6, cyan #22b8f0, stripe palette). Unofficial helper.

## Direction contract

THESIS: Every match is a wayfinding sign on the way to the hall: time, hall number and
direction readable while walking. Refuses the category default of same-size white cards
with a coloured left border and a small time label.

OWN-WORLD: Deep navy signboard shell (#051c2c) with reflective white type; the WIUC stripe
palette as sport zone colours (yellow, orange, red, pink, purple, green, blue, cyan) carried
as a full-height zone band inside each sign row and as the thin colour stripe under the
header; hall/court numbers as navy number plates; Work Sans 600/800, tabular numerals; light
grey ground (#eef1f5) in daylight, navy-black ground at night. Controls: day tabs as a gate
strip (big day number, small weekday), sport filter as capsules with the zone colour dot.

STORY: The visitor picks their university once, reads today's rows top to bottom like a
departure board, sees the live row glow and the next row marked, taps the hall plate or the
venue to open the map, and trusts that Saturday's play-off rows are placeholders.

FIRST VIEWPORT (390 wide): navy header with university name as the destination, country and
sport list under it, SK/EN control top right; six-colour stripe; gate strip of four days with
counts; sport capsules; then sign rows: time (22px, tabular) left, zone band, sport label in
zone colour, match line with own university emphasised, venue + group line, hall plate right
with the unit word (HALA/KURT/IHRISKO). Live row lifts with a yellow ring, past rows dim.
Primary action: the sticky bottom pair "Miesta" and "Celý rozpis" (blue filled).

FORM: Stadium wayfinding signage (candidate 4 of 7 on the ordered grounded list; assigned by
the roll). seed:5f22e5b711d6b530. Raised by the hand it beat: time-ranked fixed columns
(split-flap), colour as content not chrome (metro), live row lifts while others dim
(streaming wall), capsule filters with a live chip (zoo map), same scale every day (folio).

Signature interaction: the live match row lifts and glows; tapping a hall plate opens the map.
Motion grammar: 180 ms ease-out on tab/filter changes and plate press; no entrance choreography.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
verdict, DESIGN.md, and every shipping raster carrying its provenance.
