---
name: WIUC 2026 Bratislava schedule helper
description: Stadium wayfinding signage in the WIUC stripe palette, built so a match time and hall number read while walking.
colors:
  navy-signboard: "#051c2c"
  gate-blue: "#1f40e6"
  gate-blue-pressed: "#1836c4"
  signal-cyan: "#22b8f0"
  stripe-yellow: "#ffc315"
  stripe-orange: "#ee792c"
  stripe-red: "#e93a3f"
  stripe-pink: "#ee1953"
  stripe-purple: "#674381"
  stripe-green: "#24a75b"
  stripe-lime: "#88b54e"
  stripe-blue: "#0e5ea5"
  stripe-cyan: "#008fb3"
  ink: "#051c2c"
  ink-2: "#3f5064"
  muted: "#5c6b7d"
  line: "#d9e0e8"
  ground: "#eef1f5"
  card: "#ffffff"
  card-2: "#f6f8fb"
  sign-ink: "#ffffff"
  sign-muted: "rgba(255,255,255,.72)"
  live-ink: "#e93a3f"
  night-ground: "#07131d"
  night-card: "#0f2232"
  night-card-2: "#142b3e"
  night-sign: "#020d16"
  night-line: "#243648"
  night-ink: "#eef3f8"
  night-ink-2: "#c3cedb"
  night-muted: "#93a3b5"
typography:
  display:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  numeral:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "24px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tabular-nums"
  headline:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "17px"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
    fontFeature: "tabular-nums"
  label:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "12px"
    fontWeight: 800
    letterSpacing: "0.07em"
  caption:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
  body-small:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
  title-large:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.25
  plate-numeral:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  plate-numeral-large:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  numeral-large:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "27px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontFeature: "tabular-nums"
  gate-numeral-large:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "28px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  display-large:
    fontFamily: "Work Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
rounded:
  plate: "12px"
  capsule: "999px"
  focus: "6px"
spacing:
  gutter: "16px"
  row-gap: "8px"
  list-gap: "6px"
  row-pad: "10px"
  card-pad: "12px 14px"
  button-pad: "9px 16px"
  chip-pad: "7px 12px 7px 10px"
  section-top: "26px"
  bar-clearance: "92px"
components:
  button:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.capsule}"
    padding: "{spacing.button-pad}"
  button-hover:
    backgroundColor: "{colors.card-2}"
  button-primary:
    backgroundColor: "{colors.gate-blue}"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.capsule}"
    padding: "{spacing.button-pad}"
  button-primary-hover:
    backgroundColor: "{colors.gate-blue-pressed}"
  button-on-sign:
    backgroundColor: "rgba(255,255,255,.12)"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.capsule}"
    padding: "{spacing.button-pad}"
  lang-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.capsule}"
    padding: "4px 11px"
  chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.capsule}"
    padding: "{spacing.chip-pad}"
  chip-on:
    backgroundColor: "{colors.navy-signboard}"
    textColor: "{colors.sign-ink}"
  gate:
    backgroundColor: "transparent"
    textColor: "rgba(255,255,255,.62)"
    padding: "8px 4px 9px"
  gate-on:
    backgroundColor: "{colors.gate-blue}"
    textColor: "{colors.sign-ink}"
  sign-row:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "{spacing.row-pad}"
  hall-plate:
    backgroundColor: "{colors.navy-signboard}"
    textColor: "{colors.sign-ink}"
    typography: "{typography.numeral}"
    width: "60px"
  hall-plate-hover:
    backgroundColor: "{colors.gate-blue}"
  badge-live:
    backgroundColor: "{colors.stripe-yellow}"
    textColor: "{colors.navy-signboard}"
    rounded: "{rounded.capsule}"
    padding: "2px 7px"
  badge-next:
    backgroundColor: "{colors.stripe-green}"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.capsule}"
    padding: "2px 7px"
  search-input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "13px 14px 13px 42px"
  school-button:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "{spacing.card-pad}"
  venue-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "{spacing.card-pad}"
  signboard:
    backgroundColor: "{colors.navy-signboard}"
    textColor: "{colors.sign-ink}"
    padding: "7px 16px"
  empty-state:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted}"
    rounded: "{rounded.plate}"
    padding: "22px 18px"
---

# Design System: WIUC 2026 Bratislava schedule helper

## Overview

**Creative North Star: "The Hall Signboard"** (Slovak surfaces may call it "Tabuľa pred halou")

Every screen is a wayfinding sign on the way to a hall. The page is read while walking between Bratislava venues, on a phone, often outdoors or in a loud hall, by someone who has seconds to decide where to go next. So the system borrows the grammar of stadium signage: a deep navy signboard shell with white type for everything that names a destination (header, university name, day gates, hall plates), a flat light ground for the rows, and the WIUC stripe palette as the colour of the sport zones, never as decoration. Big tabular numerals (time, day number, hall number) are the loudest thing on the page; prose is small and grey and stays out of the way.

The voice is fast, legible while walking, tournament-coloured, and never official-looking. It is an unofficial helper and must not read as the organiser's site: it uses the organiser's colour language and stripe motif, not their logo or photography. Density is high but every row has the same anatomy, so the eye learns the column positions once and then scans top to bottom like a departure board. The one moving thing on the page is the live row, which lifts and glows yellow; everything else is still.

Confirmed rejections: no same-size white cards with a coloured left border and a small time label (the category default the build refuses); no glyph or icon-font icons. (Entrance motion and the one hero photograph were added in Revision 2.)

## Revision 2 (2026-11-04, tasteskill pass)

This section supersedes any rule below that contradicts it. The signboard idea, palette, Work Sans and the four-column row anatomy stay; the surface treatment changed.

- **Flat fields, square corners.** No shadows at rest or on state, no rounded plates or pills, no hairline rules or borders. Separation comes from field colour and a 6px gap between bars. Chips are flat card fields with a square zone dot.
- **The board** is a stack of bars, not one plate: columns 80 / 48 / 1fr / 64px, 96 / 56 / 1fr / 72px from 640px, 116 / 64 / 1fr / 84px from 1024px. The zone column is the solid sport colour with the white pictogram.
- **States are fields, not rings.** Live row: `live-field` #fff3c4 (night: deep amber) with a pulsing yellow badge; next row: `next-field` #dcf3e5 (night: deep green). Past rows fade to 50%.
- **Type ramp:** 15 / 16 / 20 / 24 / 28 / 32 / 64px. Body text is never under 15px (16px for running text). Page h1 24px, 28px from 640px, 32px on the picker; the picker hero h1 is 64px from 1024px. Hall and time numerals 24px, 28px from 640px. The footer mark is 32px.
- **Sentence case.** No uppercase labels; the unit word under the hall number (hala, kurt, ihrisko, mapa) is sentence case at 15px. The category sits on the sport line ("Volejbal · ženy").
- **One photograph.** The picker hero carries the Bratislava panorama (`assets/panoramic-view-from-bratislava-castle.jpg`, Lukáš Perný, CC BY-SA 4.0, credited in the footer) under a navy scrim, with a slow drift. No other photography; the schedule views stay type and colour only.
- **Motion.** Rows and picker blocks enter with a short staggered rise; the hero photo drifts; the live badge pulses. `prefers-reduced-motion` switches all of it off.
- **Curtain footer.** The navy footer is sticky at the bottom under the app layer, so it is uncovered as the page ends. It holds the 32px "WIUC 2026 Bratislava" mark, the data source and the photo credit.
- **No fixed bottom bar.** "Celý rozpis" and "Miesta" sit under the sport chips on every size.

**Key Characteristics:**
- Navy signboard surfaces carry white type only; the light grey ground carries lifted white rows.
- Colour is content: a sport's zone colour appears as the row's full-height zone band, the capsule dot and the sport line, never as a card background.
- Numbers lead the type ramp: times and day numbers at 24 to 28px, hall numbers at 22 to 26px, all weight 800, tabular, tight.
- One glowing state: only live rows lift with a pulsing Stripe Yellow ring; past rows dim to 50%.
- Capsules for filters and actions, plates for destinations: 999px pills on the ground, square navy plates inside 12px rows.
- Light by day, navy-black by night: both schemes are required and both are tokenised on `:root`.

## Colors

A navy signboard, a white row, a light grey ground, and the nine stripe colours of the Bratislava 2026 banner used as sport zones.

### Primary
- **Navy Signboard** (`navy-signboard`): the signboard shell. Header, destination panel, gate strip, hall plates, the selected sport capsule, and body ink in the light scheme. Anything navy carries white type; navy is never a tint or a border colour.
- **Gate Blue** (`gate-blue`): the one action colour. The selected day gate, the primary button, links, hall plate hover, and the light-scheme focus ring. It presses to **Gate Blue Pressed** (`gate-blue-pressed`) on the primary button only.
- **Signal Cyan** (`signal-cyan`): the WIUC site cyan. In the build it is the dark-scheme focus ring and the swimming zone colour; it is not used as chrome in the light scheme.

### Secondary
The stripe palette, sampled from the official banner and named after it. Each colour has one job: it is the zone colour of one or more sports, the segment of the 6px stripe under the header, and, for three of them, a status colour.
- **Stripe Yellow** (`stripe-yellow`): futsal zone; the live colour (live badge, live ring, today dot, selected-gate underline, text selection, home-school ring).
- **Stripe Orange** (`stripe-orange`): basketball zone.
- **Stripe Red** (`stripe-red`): volleyball zone; also **Live Ink** (`live-ink`), the colour of the live row's time and of a result score in the light scheme.
- **Stripe Pink** (`stripe-pink`): rugby 7s zone.
- **Stripe Purple** (`stripe-purple`): handball zone.
- **Stripe Green** (`stripe-green`): football zone; the "up next" colour (next badge, next ring).
- **Stripe Lime** (`stripe-lime`): padel zone.
- **Stripe Blue** (`stripe-blue`): floorball zone.
- **Stripe Cyan** (`stripe-cyan`): tennis zone.

Sports outside the banner reuse brand colours (badminton takes Gate Blue, swimming Signal Cyan, the ceremony Navy Signboard) or carry their own one-off zone colour (table tennis `#c2185b`, athletics `#c98a00`); the full sport map lives in `.impeccable/design.json` under `extensions.sportZones`.

### Neutral
- **Ink** (`ink`): body text, row text, chip text. Navy in daylight, near-white at night.
- **Ink 2** (`ink-2`): secondary text: venue links in a row, addresses, notes, player names, the sport line fallback colour.
- **Muted** (`muted`): tertiary text: leads, meta lines, counts, captions, the "vs" word, placeholder text, the footer.
- **Line** (`line`): the only border colour. 1.5px capsule and chip borders, the search field stroke, the dashed play-off divider, the sticky bar's top rule.
- **Ground** (`ground`): the page background. Rows sit on it; nothing else is this colour.
- **Card** (`card`) and **Card 2** (`card-2`): the row and panel surface, and its hover / badge tint.
- **Sign Ink** (`sign-ink`) and **Sign Muted** (`sign-muted`): white and 72% white, the only two text colours on navy.

### Named Rules
**The Zone Band Rule.** A sport's colour is content, not chrome. It appears in exactly three places: the 8px full-height zone band inside the row, the 10px dot in the sport capsule, and the sport line's text and icon. It never fills a card, a button or a badge, and it never colours body text.

**The Readable Zone Rule.** Light zone colours (yellow, orange, lime, green, cyan, pink, red) are too pale for 12px text on white, so each carries a darker label colour (`t` in the sport map, set as `--zt`) used for the sport line in the light scheme. At night the sport line switches to the raw zone colour (`--z`), which reads on navy. Dark zones (purple, floorball blue, Gate Blue, navy) use themselves in both schemes.

**The Signboard Rule.** Navy surfaces carry white type only (Sign Ink at full strength, Sign Muted for the second line). Controls on a navy surface are transparent or 12% white with a 35 to 50% white border; the selected one turns Gate Blue. Nothing on navy is grey.

**The Status Trio Rule.** Three stripe colours double as status: Stripe Yellow means "now / yours" (live row, today dot, remembered home school), Stripe Green means "up next", Stripe Red means "the live time and a score". No fourth status colour; everything else is Muted.

**The Night Flip Rule.** The dark scheme flips the neutrals (ground `#07131d`, card `#0f2232`, card-2 `#142b3e`, line `#243648`, ink `#eef3f8`, ink-2 `#c3cedb`, muted `#93a3b5`), deepens the signboard to `#020d16`, moves Live Ink to Stripe Yellow and the focus ring to Signal Cyan. The stripe palette, Gate Blue and the two badge colours do not change. The flip follows `prefers-color-scheme` and can be forced with `data-theme` on `<html>`.

## Typography

**Display Font:** Work Sans (with system-ui, Segoe UI, Roboto, sans-serif)
**Body Font:** Work Sans
**Label/Mono Font:** none; numerals are Work Sans with tabular figures set on `body`

**Character:** one grotesque at five weights (400, 500, 600, 700, 800), used like signage: heavy and tight for anything you read from a distance, medium and open for anything you read up close. There is no second face and no italics.

### Hierarchy
- **Display** (800, 22px, line-height 1.1, -0.02em; 30px from 640px): the destination. The university name on the signboard, the picker title, the "Celý rozpis" and "Miesta" panel titles. Balanced wrapping.
- **Numeral** (800, 24px, line-height 1, -0.03em, tabular; 27 to 28px from 640px): the loudest text on the page. Match time in the row, the day number in the gate strip, the hall or court number on the plate (22px, 26px from 640px).
- **Headline** (800, 17px, -0.01em): section titles on the ground: venue groups in the full schedule, "Slovenské univerzity", the PDF section. A Muted 13px / 600 count may follow in `<small>`.
- **Title** (600, 15px, line-height 1.25; 16px from 640px): the match line. The visitor's own university is 800 inside it; the "vs" word is Muted, 500, 12px, uppercase; a player name is Ink 2 at 500. School names in the picker use 700 at the same size; venue names use 800 at 16px.
- **Body** (400 to 600, 13 to 14px, line-height 1.4): leads (14px), notes (13px, Ink 2), meta lines (12.5px, Muted, 600 for venue links), buttons (14px, 700), capsules (13px, 700).
- **Label** (800, 12px, uppercase, 0.07em): the sport line that heads every row, in the zone label colour, with its 15px icon and the status badge. Variants at the same size: the gate weekday (600, 0.04em, uppercase) and the picker country (600, 0.06em, uppercase).
- **Caption** (700, 11px, 0.08em): the unit word under the plate number (HALA / KURT / IHRISKO / MAPA) and the venue plate's MAPA (0.1em). Same size at 600 for the category under the time (muži / ženy / mix, 0.02em) and at 800 for badges (0.04em).

### Named Rules
**The Big Number Rule.** On a mobile screen the match time and the day number (24px) are the largest type, ahead of the destination and the hall number (both 22px); only the desktop destination (30px) outranks them. Prose never reaches numeral size: the biggest non-numeric text below the destination is the 17px headline.

**The Tabular Rule.** `font-variant-numeric: tabular-nums` is set on `body` and inherited everywhere, so times, counts and scores line up in columns and do not shift as the minute changes.

**The Tight-Then-Open Rule.** Tracking tightens as size grows (-0.03em on numerals, -0.02em on display, -0.01em on headlines) and opens as size shrinks (0.04 to 0.1em on uppercase labels and captions). Body text stays at normal tracking.

## Layout

Below 1024px the page is a single column with a 16px gutter: a stack of full-bleed navy bands (header, destination panel, gate strip) followed by content on the ground. The header, destination and gate bands centre their inner content at 1720px at most.

From 1024px the page becomes a two-column grid (`340px minmax(0, 1fr)`, 32px gap, 1720px max, 28px side padding): a sticky left panel (destination panel with 12px top corners, the gate strip as a vertical list with 12px bottom corners, the sport capsules wrapped, then the action buttons stacked) and the board on the right. The organiser PDF links sit under the panel in the left column. The sticky bottom action pair is hidden at this size.

The sign rows form one continuous board: a single white 12px plate per list, rows separated by 1px Line rules, the first and last row carrying the corners. Each row is a fixed four-column grid: time column (72px), zone field (44px, the sport colour as a solid field with the sport pictogram in white at 26px), flexible main column (`minmax(0, 1fr)`), hall plate (60px). From 640px the columns grow (90px, 56px, 1fr, 68px; pictogram 30px) and the type steps up one size; from 1024px they grow again (104px, 60px, 1fr, 76px) and the main column splits into match line left and meta line right (320px). Rows are at least 76px tall (80px from 1024px), 10px inner padding. Row content has three lines on phones: sport line, match line, meta line; a note line may follow.

The gate strip is a four-column grid of equal day gates, full width, with no gaps. The sport capsules scroll horizontally in one line with 6px gaps, snap to the start of a capsule, hide their scrollbar and fade out over the last 40px with a mask so the overflow is visible. Lists (schools, PDFs, venues) stack with 6 to 8px gaps. Section headlines sit 26px below the previous block and 8px above their list.

The header is sticky at the top (z-index 10) and the action pair is fixed at the bottom (z-index 9) on a 90% ground tint with a 10px blur and a safe-area inset; the page keeps 92px of bottom padding so the last row clears it. Both bars are navy or ground, never white.

Breakpoints: 640px (type and row columns step up) and 1024px (two-column desktop layout). Reduced-motion users get all transitions and the live pulse switched off.

## Elevation & Depth

Lifted rows on a flat ground. The ground is flat and untextured; the navy bands are flat; every row and card is a white plate lifted off the ground by one small neutral shadow. Depth is never conveyed by borders on cards (rows have none) and never by tinted shadows; the coloured outlines on live, next and home rows are rings that signal state, not elevation, and they are always drawn together with a neutral shadow.

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 2px 8px rgba(0,0,0,.08)`; night `0 2px 10px rgba(0,0,0,.35)`): every row, school button, venue card, PDF link and the next row.
- **Lift** (`box-shadow: 0 10px 24px rgba(0,0,0,.18)`; night `0 10px 24px rgba(0,0,0,.5)`): a row or school button raised in response to state: the live row and a hovered school button, both with `translateY(-2px)` or `-1px`.
- **Live ring** (`0 0 0 2.5px var(--live), var(--shadow-lift)`): the live row at rest, pulsing to `0 0 0 6px` at 45% yellow over a 2s ease-out loop.
- **Next ring** (`0 0 0 2px var(--next), var(--shadow)`): the next row, static.
- **Home ring** (`0 0 0 2px var(--live), var(--shadow)`): the remembered university in the picker, static.
- **Field focus** (`0 0 0 3px rgba(31,64,230,.18)` with a Gate Blue border): the search field only. All other controls use the 3px solid focus outline.

### Named Rules
**The Lifted Row Rule.** Rows rest at the Rest shadow and lift only in response to state: live, or a pointer over a school button. Nothing lifts on page load, and nothing else lifts on hover.

**The One Glow Rule.** Glow means lift plus a pulsing ring, and only a live row has it; when several matches overlap, each live row glows and nothing else does. The next row and the home school share the ring device at rest (2px, static, Rest shadow) but never the lift or the pulse. A pulsing or lifted element that is not a live row is a defect.

**The Neutral Shadow Rule.** Shadows are black alpha only. Colour sits in rings and bands, never in a shadow.

## Shapes

Sign plates and capsules, solid and tactile. Two radii do nearly all the work: the plate radius (12px) on every row, card, panel, field and empty state, and the capsule radius (999px) on every button, chip, badge and the language toggle. Rows clip their children (`overflow: hidden`), so the zone band and the navy hall plate are square-cornered rectangles that take the row's rounded silhouette at the edges; the plate itself has no radius of its own.

Borders are rare and thin: 1.5px Line on capsules, chips and the search field; 1.5px dashed Line on the play-off divider and the empty state; 1px 12% white between the destination panel and the gate strip; a 4px bottom bar under the selected day gate. Rows, cards and plates have no border. Small circles (50%) appear only as the 10px capsule dot and the 7px today dot. The focus outline is 3px solid at a 6px radius, 2px off the element. Icons are a single authored 24-unit stroke set (2px round stroke, no fill), sized 15px in the sport line, 18px in the search field, 20 to 22px on plates.

## Components

### Buttons
Capsules with one weight of voice. Shape: full pill (999px), 9px 16px padding, 14px / 700, inline-flex with a 7px gap for an icon.
- **Default:** Card surface, Ink text, 1.5px Line border. Hover tints to Card 2; press moves it 1px down (180ms ease-out).
- **Primary:** Gate Blue surface and border, white text; hover deepens to Gate Blue Pressed. One per screen: "Celý rozpis" in the sticky bar.
- **On a signboard:** 12% white surface, 35% white border, white text; hover to 20% white. Used for "Zmeniť" / "Späť" in the destination panel.
- **Language toggle:** transparent, 1.5px 50% white border, white 13px / 700, 4px 11px, min-width 46px; hover 12% white.
- **Focus:** 3px solid Gate Blue outline (Signal Cyan at night), 2px offset, 6px radius.

### Chips
The sport capsules. Style: Card surface, 1.5px Line border, Ink 13px / 700, 7px 12px 7px 10px padding, a 10px zone-colour dot with a 1px 8% black inset ring, and a Muted 600 count after the name. Hover darkens the border to Muted.
- **Selected:** Navy Signboard surface and border, white text, count at 70% white. "Všetko" / "All" has no dot.
- **Behaviour:** one horizontal snapping row, fade-masked at the right edge; selecting a chip re-renders the list in place without scrolling.

### Cards / Containers
- **Corner Style:** plate radius (12px), children clipped.
- **Background:** Card; the empty state is Card with a 1.5px dashed Line border and Muted centred 14px text, 22px 18px padding.
- **Shadow Strategy:** Rest shadow, see Elevation & Depth.
- **Border:** none on rows, cards and panels.
- **Internal Padding:** rows 10px (11px on the text side); school buttons and venue bodies 12px 14px; PDF links 10px 12px.

### Inputs / Fields
The university search. Style: Card surface, 1.5px Line stroke, plate radius, 16px text, 13px 14px padding with 42px on the left for the 18px Muted search icon placed inside. Placeholder is Muted.
- **Focus:** stroke turns Gate Blue with a 3px 18% blue halo; no outline.
- **Error / Disabled:** not present; an empty result shows the empty state instead.

### Navigation
- **Signboard header:** sticky navy band, 7px 16px, brand title 15px / 800 with 0.02em tracking and a 12px Sign Muted subtitle ("Neoficiálny pomocník"), language toggle at the right; the 6px seven-segment stripe (yellow, orange, red, pink, purple, green, blue) under it is the only decorative element in the system.
- **Destination panel:** navy band under the header carrying the Display title and a Sign Muted lead ("Slovakia · 9 športov · 14 zápasov"), with the on-signboard button at the right.
- **Gate strip:** four equal gates on navy, 1px 12% white rule above. Each gate stacks the weekday (12px / 600 uppercase 0.04em), the day number (Numeral, 24px, 28px from 640px) and a count (11px / 600). Idle gates are 62% white; hover 100% white on 6% white; the selected gate is Gate Blue with a 4px Stripe Yellow bottom bar; today's gate is white with a 7px yellow dot before its count. `role="tablist"` / `role="tab"`.
- **Sticky action pair:** fixed bottom bar, two capsules side by side, each up to 260px: "Miesta" default with the pin icon, "Celý rozpis" primary.
- **Mobile treatment:** the layout is mobile-first; at 1024px the gate strip turns into a vertical list inside the left panel (day number first, weekday, count at the right, 4px Stripe Yellow left bar on the selected day).

### Sign Row (signature)
One match as a wayfinding sign, one row of a continuous board (white 12px plate per list, 1px Line rules between rows), four fixed columns, minimum 76px tall:
- **Time column:** Numeral time, with the category (muži / ženy / mix) as an 11px Muted caption under it.
- **Zone field:** a 44px full-height field in the sport's zone colour (56px from 640px, 60px from 1024px) carrying the authored sport pictogram in white (26px, 30px from 640px).
- **Main column:** the sport line (Label in the zone label colour, then the live or next badge), the match line (Title, own university at 800, "vs" muted, player names Ink 2, score at 800 in Live Ink), and the meta line (Muted 12.5px: venue as an Ink 2 link with a pin icon that turns Gate Blue on hover, then "Skupina X" or the stage, separated by middots).
- **Hall plate:** a navy column at the right (60px, 68px from 640px) with the court number in Numeral (22px, 26px from 640px) over the unit word in Caption (HALA / KURT / IHRISKO) followed by a 12px Stripe Yellow north-east arrow as the direction cue; if no number, the arrow icon over MAPA. It is a link to the venue map; hover turns it Gate Blue.
- **States:** live adds the live badge, Live Ink time, the Live ring, the Lift shadow, a 2px rise and the pulse; next adds the next badge and the Next ring; past dims the whole row to 50% opacity. Transitions 180ms ease-out.

### Status Badges
Capsules at 11px / 800 with 0.04em tracking and 2px 7px padding: **Live** ("Prebieha" / "Live") is Stripe Yellow with Navy text; **Next** ("Nasleduje" / "Up next") is Stripe Green with white text. A neutral badge variant (Card 2 surface, Ink 2 text) exists in the stylesheet for other states.

### School Button and Venue Card
- **School button:** a full-width white plate (12px 14px, Rest shadow, no border) with the name (15px / 700) left and the country (12px / 600 uppercase 0.06em Muted) right; hover lifts it 1px with the Lift shadow; the remembered university carries the Home ring.
- **Venue card:** the same plate split into a text body (name 16px / 800, address Ink 2 13px, sports line Muted 12.5px) and a 64px navy map plate at the right (pin icon over MAPA at 11px / 700 / 0.1em), hover Gate Blue.

### Play-off Disclosure
A `<details>` block below the day's rows, separated by a 1.5px dashed Line rule. The summary is 14px / 700 with a Muted chevron that rotates 90 degrees when open (180ms); its note is 13px Muted. The rows inside are ordinary sign rows.

## Do's and Don'ts

### Do:
- **Do** put every destination on navy and every list on the ground: header, destination panel, gate strip and hall plates are Navy Signboard with white type; rows and cards are white plates on Ground.
- **Do** carry a sport's colour as the 8px zone band, the capsule dot and the sport line, with the darker label colour (`--zt`) for light zones in the light scheme and the raw zone colour at night.
- **Do** set times and day numbers in Numeral (800, 24px, -0.03em, tabular, line-height 1) and hall numbers in the same style at 22px, and keep them ahead of every line of prose.
- **Do** use the Rest shadow (`0 2px 8px rgba(0,0,0,.08)`) on every plate and the Lift shadow only for the live row and a hovered school button.
- **Do** reserve Stripe Yellow for "now / yours", Stripe Green for "up next" and Gate Blue for the single selected or primary control on a screen.
- **Do** use the two radii only: 12px plates for surfaces, 999px capsules for controls and badges; let plates and bands inside a row stay square and be clipped by the row.
- **Do** draw icons from the authored 24-unit stroke set (2px round stroke, no fill) at 15, 18, 20 or 22px.
- **Do** animate only state changes, at 180ms ease-out, and switch everything off under `prefers-reduced-motion`.
- **Do** separate meta values with a spaced middot (venue · group · count) and never with an em-dash in UI text.

### Don't:
- **Don't** fill a card, button or badge with a sport's zone colour, or colour body text with it.
- **Don't** pulse or lift anything that is not a live row; live is the one glowing state.
- **Don't** put grey text on navy; use Sign Ink or Sign Muted (72% white) only.
- **Don't** tint a shadow or use a shadow in place of the state rings; shadows are black alpha, rings are colour.
- **Don't** add borders to rows, cards or plates; the 1.5px Line border belongs to capsules, chips and the search field.
- **Don't** change the sign row's four-column anatomy between views or days; the full schedule and the university view share the same row.
- **Don't** introduce a second typeface, italics, a display face, icon fonts or glyph icons, or photography and the organiser's logo.
- **Don't** add entrance animations, parallax or scroll effects; the page must work on older phones and read instantly.
