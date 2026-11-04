# -*- coding: utf-8 -*-
"""
Build wiuc/data.js from the organiser's public Google Sheets.

    python build.py            # download fresh sheets + rebuild
    python build.py --offline  # reuse cached xlsx in tools/cache/

The organiser publishes the schedules as public Google Sheets
(https://www.wiusc.com/11th-wiuc-bratislava-2026/ -> SCHEDULES -> Google Drive).
"""
import sys, os, re, json, datetime, urllib.request
import openpyxl

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")
OUT = os.path.join(HERE, "..", "data.js")

SHEETS = {
    # sport key: (google sheet id, kind)
    "basketball": ("1t1r3BNlEEtoeU7jfDzXuyq-pN2N3OZH7wa2WEfxL9wE", "team"),
    "floorball":  ("1fP8jGdeYAfVvILa-r6sw2Bb5Bw-jPUKsLdCbCYJnSH4", "team"),
    "football":   ("1ICPxilMXdnXPDrU6U5jIspyDMB58yg8B_W4UjTAqTj4", "team"),
    "futsal":     ("109vc1i-CXPeDh6NMJNqqBrVzOy0WDSw3yX-Fkrz0zns", "team"),
    "handball":   ("1_WgTY_lMm76DnRdxGESQ-r9cYXaXCKI9pfctliA-Heg", "team"),
    "rugby":      ("1jW8vzFPJMborrjFudPQjVPiWjKK1gRCrELxsETtNGCw", "team"),
    "volleyball": ("1sN-vdzMuwivDclRtvqn75PZL47kLcJAPbX_h4Knwze4", "team"),
    "tennis":     ("1PQSMkXFohTrxm3I-2o1H1S4yEqqHtRNjw91xRNQ94p0", "grid"),
    "padel":      ("1eNWTN3NSdgstsbCXtD5eH-kzp0m3Ghyo0_V_gHxA_3g", "grid"),
}

DAYS = {
    "wednesday": "2026-11-04", "thursday": "2026-11-05", "friday": "2026-11-06",
    "saturday": "2026-11-07", "sunday": "2026-11-08",
}


def log(*a):
    print(*a, file=sys.stderr)


def download():
    os.makedirs(CACHE, exist_ok=True)
    for key, (sid, _) in SHEETS.items():
        url = f"https://docs.google.com/spreadsheets/d/{sid}/export?format=xlsx"
        dest = os.path.join(CACHE, key + ".xlsx")
        log("download", key)
        with urllib.request.urlopen(url, timeout=60) as r, open(dest, "wb") as f:
            f.write(r.read())


def cell(v):
    if v is None:
        return ""
    if isinstance(v, (datetime.time, datetime.datetime)):
        return v.strftime("%H:%M")
    if isinstance(v, float) and v.is_integer():
        return str(int(v))
    return re.sub(r"\s+", " ", str(v)).strip()


TIME_RE = re.compile(r"^(\d{1,2})[:.](\d{2})(?::\d{2})?$")


def as_time(s):
    m = TIME_RE.match(s)
    if not m:
        return None
    return f"{int(m.group(1)):02d}:{m.group(2)}"


def day_of(sheet_title):
    return DAYS.get(sheet_title.strip().lower())


# --------------------------------------------------------------------- venues
# (canonical id, regex on the sheet's venue text) - order matters
VENUE_PATTERNS = [
    ("gopass", r"gopass"),
    ("domsportu", r"dom .?portu"),
    ("rovny", r"rovn|physical education"),
    ("stu-cas", r"centrum akademick|mlad. garda"),
    ("kalinciakova", r"kalin"),
    ("pionierska", r"pionier"),
    ("mlynska-prif", r"prif|matfyz|fmfi"),
    ("mlynska-lf", r"lf/|skp|polic"),
    ("pasienky", r"pasienky|jama"),
    ("tk-slovan", r"slovan"),
    ("tk-inter", r"inter"),
    ("padel", r"padel"),
    ("peugeot", r"peugeot|aegon"),
    ("plavaren", r"plav"),
]


def venue_of(text):
    t = text.lower()
    court = None
    m = re.search(r"\s(\d)\s*$", text)
    if m:
        court = m.group(1)
    for vid, pat in VENUE_PATTERNS:
        if re.search(pat, t):
            return vid, court
    return None, court


# -------------------------------------------------------------------- schools
def norm(s):
    s = s.casefold().strip()
    s = s.replace("’", "'").replace("–", "-")
    s = re.sub(r"[^\w\s]", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def slug(s):
    s = norm(s)
    s = (s.replace("ä", "a").replace("ö", "o").replace("ü", "u").replace("à", "a").replace("è", "e")
         .replace("é", "e").replace("ş", "s").replace("ș", "s").replace("ı", "i").replace("ô", "o"))
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def load_master(path):
    """List sheet: COUNTRY | UNIVERSITY | FLAG | POOL M | POOL W"""
    ws = openpyxl.load_workbook(path, data_only=True)["List"]
    schools = {}   # id -> dict
    alias = {}     # norm(name) -> (id, squad)
    for row in ws.iter_rows(values_only=True):
        vals = [cell(v) for v in row]
        if len(vals) < 2 or not vals[1] or vals[0] == "COUNTRY":
            continue
        country, name = vals[0], vals[1]
        m = re.match(r"^(.*?)\s+(\d)$", name)
        base, squad = (m.group(1), m.group(2)) if m else (name, None)
        sid = slug(base)
        if sid not in schools:
            schools[sid] = {"id": sid, "name": base, "country": country.title()}
        alias[norm(name)] = (sid, squad)
    return schools, alias


# extra spellings used in the daily sheets / tennis / padel grids -> school id
ALIASES = {
    "isep": "isep", "isep paris": "isep",
    "universite saint joseph de beirut": "universite-saint-joseph-de-beirut",
    "saint joseph university of beirut": "universite-saint-joseph-de-beirut",
    "usj beirut": "universite-saint-joseph-de-beirut",
    "comenius": "comenius-university-bratislava",
    "comenius university bratislava": "comenius-university-bratislava",
    "slovak tu": "slovak-university-of-technology-in-bratislava",
    "euba": "bratislava-university-of-economics-and-business",
    "lebanese au": "lebanese-american-university",
    "lebanese american university": "lebanese-american-university",
    "au beirut": "american-university-of-beirut",
    "au cairo": "the-american-university-in-cairo",
    "american university in cairo": "the-american-university-in-cairo",
    "ctu prague": "czech-technical-university",
    "czu prague": "czech-university-of-life-sciences-in-prague",
    "west bohemia": "university-of-west-bohemia",
    "tc dublin": "trinity-college-dublin",
    "uc dublin": "university-college-dublin",
    "st gallen": "universitat-st-gallen",
    "plovdiv": "medical-university-of-plovdiv",
    "bucharest ase": "bucharest-university-of-economic-studies",
    "ase bucharest": "bucharest-university-of-economic-studies",
    "victor babes": "victor-babes-university-of-medicine-and-pharmacy-timisoara",
    "victor babes univ": "victor-babes-university-of-medicine-and-pharmacy-timisoara",
    "victor babes timisoara": "victor-babes-university-of-medicine-and-pharmacy-timisoara",
    "sse stockholm": "stockholm-school-of-economics",
    "stockholm school of economics": "stockholm-school-of-economics",
    "cus statale": "universita-degli-studi-di-milano-statale",
    "milano statale": "universita-degli-studi-di-milano-statale",
    "la sapienza": "sapienza-universita-di-roma",
    "sapienza universita di roma": "sapienza-universita-di-roma",
    "san raffaele": "universita-vita-salute-san-raffaele",
    "foro italico": "universita-degli-studi-di-roma-foro-italico",
    "universita foro italico roma": "universita-degli-studi-di-roma-foro-italico",
    "roma tre": "universita-degli-studi-roma-tre",
    "uni roma tre": "universita-degli-studi-roma-tre",
    "universita degli studi roma tre": "universita-degli-studi-roma-tre",
    "campus bio roma": "university-campus-bio-medico-of-rome",
    "john cabot uni": "john-cabot-university",
    "sms": "sports-managements-school",
    "sports management school": "sports-managements-school",
    "kth": "kth-royal-institute-of-technology",
    "technion": "technion",
    "epfl": "epfl",
    "ieseg paris": "ieseg-paris", "ieseg lille": "ieseg-lille",
    "esade business school": "esade-business-school",
    "philipps universitat marburg": "philipps-universitat-marburg",
    "politecnico di milano": "politecnico-di-milano",
    "carol davila bucharest": "carol-davila-university-of-medicine-and-pharmacy",
    "tubingen": "eberhard-karls-universitat-tubingen",
    "campus": "university-campus-bio-medico-of-rome",
    "campus bio": "university-campus-bio-medico-of-rome",
    "pu marburg": "philipps-universitat-marburg",
    "up comillas": "universidad-pontificia-comillas",
    "university of zagreb": "university-of-zagreb",
}

# schools that only appear in tennis/padel (not in the team List sheet)
EXTRA_SCHOOLS = {
    "bucharest-university-of-economic-studies": ("Bucharest University of Economic Studies", "Romania"),
    "victor-babes-university-of-medicine-and-pharmacy-timisoara": ("Victor Babeș University of Medicine and Pharmacy Timișoara", "Romania"),
    "universita-degli-studi-di-roma-foro-italico": ("Università degli Studi di Roma \"Foro Italico\"", "Italy"),
    "universita-degli-studi-roma-tre": ("Università degli Studi Roma Tre", "Italy"),
    "carol-davila-university-of-medicine-and-pharmacy": ("Carol Davila University of Medicine and Pharmacy", "Romania"),
    "bratislava-university-of-economics-and-business": ("Bratislava University of Economics and Business", "Slovakia"),
    "university-of-zagreb": ("University of Zagreb", "Croatia"),
}


class Schools:
    def __init__(self, master_path):
        self.schools, self.alias = load_master(master_path)
        for sid, (name, country) in EXTRA_SCHOOLS.items():
            self.schools.setdefault(sid, {"id": sid, "name": name, "country": country})
        self.unmatched = {}
        self.alias_slug = {slug(k): v for k, v in ALIASES.items()}

    def resolve(self, name, ctx=""):
        """returns (school_id or None, squad or None)"""
        n = norm(name)
        if n in self.alias:
            return self.alias[n]
        m = re.match(r"^(.*?) (\d)$", n)
        base, squad = (m.group(1), m.group(2)) if m else (n, None)
        if base in self.alias:
            return self.alias[base][0], squad
        if slug(base) in self.alias_slug:
            return self.alias_slug[slug(base)], squad
        hits = {v[0] for k, v in self.alias.items() if k.startswith(base) or base.startswith(k)}
        if len(hits) == 1:
            return hits.pop(), squad
        self.unmatched.setdefault(name, ctx)
        return None, squad


# --------------------------------------------------------------- team sports
PLACEHOLDER_RE = re.compile(r"^(\(\d+\)|\d[A-Z]\**|\d+(st|nd|rd|th|dn)|best(\s|$)|W\d+$|L\d+$|winner(\s|$)|loser(\s|$))", re.I)


def parse_team(path, sport, sch, events):
    wb = openpyxl.load_workbook(path, data_only=True)
    for ws in wb.worksheets:
        day = day_of(ws.title)
        if not day:
            continue
        venue, court, stage = None, None, None
        for row in ws.iter_rows(values_only=True):
            vals = [cell(v) for v in row]
            nonempty = [(i, v) for i, v in enumerate(vals) if v]
            if not nonempty:
                continue
            if len(nonempty) == 1:
                txt = nonempty[0][1]
                vid, c = venue_of(txt)
                if vid:
                    venue, court, stage = vid, c, None
                elif re.search(r"final|qualif|semi|quarter|play|place", txt.lower()):
                    stage = txt
                continue
            vs = [i for i, v in nonempty if v.lower() == "vs"]
            if not vs:
                continue
            vs_i = vs[0]
            idx = [i for i, _ in nonempty]
            pos = idx.index(vs_i)
            # time: first time-looking value before vs
            t = None
            for i, v in nonempty[:pos]:
                tt = as_time(v)
                if tt:
                    t = tt
                    break
            if not t:
                continue
            before = [v for i, v in nonempty[:pos] if not as_time(v)]
            a_cell = before[-1] if before else ""
            game = ""
            for v in before[:-1]:
                if re.match(r"^\(?\d+\)?$", v):
                    game = v.strip("()")
            if re.match(r"^\d+$", a_cell):      # only a game number, no team
                game, a_cell = a_cell, ""
            after = [v for i, v in nonempty[pos + 1:]]
            b_cell = after[0] if after else ""
            pool, res = "", []
            for v in after[1:]:
                if re.match(r"^(men|women|mixed)\b", v.lower()):
                    pool = v
                elif re.match(r"^\d+$", v):
                    res.append(v)
            if b_cell.lower().startswith(("men", "women")):
                pool, b_cell = b_cell, ""
            pl = pool.lower()
            cat = "W" if pl.startswith("women") else ("M" if pl.startswith("men") else "X")
            pool_letter = pool.split()[-1] if len(pool.split()) > 1 else ""

            def side(txt):
                txt = txt.strip()
                if not txt or PLACEHOLDER_RE.match(txt):
                    return {"label": txt, "school": None, "squad": None}
                sid, squad = sch.resolve(txt, f"{sport}/{ws.title}")
                return {"label": txt, "school": sid, "squad": squad}

            events.append({
                "sport": sport, "cat": cat, "day": day, "time": t,
                "venue": venue, "court": court,
                "a": side(a_cell), "b": side(b_cell),
                "pool": pool_letter, "stage": "" if pool_letter else (stage or ""),
                "game": game,
                "resA": res[0] if len(res) > 0 else "",
                "resB": res[1] if len(res) > 1 else "",
            })


# ------------------------------------------------------------- grid sports
def parse_grid(path, sport, sheet_name, sch, events):
    """tennis / padel: venues side by side, per venue courts as (Court|Pool|Score) triples,
    a match = row with time+name(+pool), next row 'VS', next row opponent."""
    ws = openpyxl.load_workbook(path, data_only=True)[sheet_name]
    rows = [[cell(v) for v in r] for r in ws.iter_rows(values_only=True)]
    day = None
    venues = []   # list of (court_col, venue_id, court_no)
    i = 0
    while i < len(rows):
        r = rows[i]
        filled = [v for v in r if v]
        joined = " ".join(filled).strip().lower()
        m = re.match(r"^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b", joined)
        if m and len(filled) == 1:
            day = DAYS[m.group(1)]
            i += 1
            continue
        if i + 1 < len(rows) and "court" in [v.lower() for v in rows[i + 1]]:
            hdr = rows[i + 1]
            cols = [j for j, v in enumerate(hdr) if v.lower() == "court"]
            names = [(j, v) for j, v in enumerate(r) if v]
            venues = []
            for k, (j, name) in enumerate(names):
                vid, _ = venue_of(name)
                nxt = names[k + 1][0] if k + 1 < len(names) else 10 ** 6
                my_cols = [c for c in cols if j <= c < nxt]
                for n, c in enumerate(my_cols, 1):
                    venues.append((c, vid, n))
            i += 2
            continue
        if day and venues and i + 2 < len(rows):
            times = {j: as_time(v) for j, v in enumerate(r) if as_time(v)}
            vs_row = rows[i + 1]
            if times and any(v.lower() == "vs" for v in vs_row):
                opp = rows[i + 2]
                for c, vid, court in venues:
                    a = r[c] if c < len(r) else ""
                    b = opp[c] if c < len(opp) else ""
                    pool = r[c + 1] if c + 1 < len(r) else ""
                    if not a or not b or a.lower() == "stop":
                        continue
                    t = None
                    for j in sorted(times):
                        if j < c:
                            t = times[j]
                    if not t:
                        continue
                    cat = "W" if re.match(r"^[A-Z]$", pool) else ("M" if re.match(r"^\d+$", pool) else "X")
                    mw = re.match(r"^(m|w|mix)\s*\(", pool, re.I) or re.match(r"^winner\s+(m|w|mix)\b", a, re.I)
                    if mw:
                        cat = {"m": "M", "w": "W", "mix": "X"}[mw.group(1).lower()]

                    def side(txt):
                        if PLACEHOLDER_RE.match(txt):
                            return {"label": txt, "school": None, "squad": None, "player": ""}
                        m2 = re.match(r"^(.*?)\s*-\s*(.*)$", txt)
                        team, player = (m2.group(1), m2.group(2)) if m2 else (txt, "")
                        sid, squad = sch.resolve(team, f"{sport}/{sheet_name}")
                        if re.match(r"^\d$", player):
                            squad, player = player, ""
                        return {"label": txt, "school": sid, "squad": squad, "player": player}

                    events.append({
                        "sport": sport, "cat": cat, "day": day, "time": t,
                        "venue": vid, "court": str(court),
                        "a": side(a), "b": side(b),
                        "pool": pool, "stage": "", "game": "",
                        "resA": "", "resB": "",
                    })
                i += 3
                continue
        i += 1


# -------------------------------------------------------------------- main
def main():
    offline = "--offline" in sys.argv
    if not offline:
        download()
    sch = Schools(os.path.join(CACHE, "basketball.xlsx"))
    for sid in set(ALIASES.values()):
        if sid not in sch.schools:
            log("ALIAS TARGET MISSING:", sid)

    events = []
    for key, (sid, kind) in SHEETS.items():
        path = os.path.join(CACHE, key + ".xlsx")
        if kind == "team":
            parse_team(path, key, sch, events)
        elif key == "tennis":
            parse_grid(path, key, "Tennis Schedule", sch, events)
        elif key == "padel":
            parse_grid(path, key, "Padel Schedule", sch, events)

    if sch.unmatched:
        log("UNMATCHED TEAM NAMES:")
        for k, v in sorted(sch.unmatched.items()):
            log(f"   {k!r}  ({v})")

    used = {e["a"]["school"] for e in events} | {e["b"]["school"] for e in events}
    used.discard(None)
    schools = [s for s in sch.schools.values() if s["id"] in used]
    schools.sort(key=lambda s: s["name"].casefold())
    events.sort(key=lambda e: (e["day"], e["time"], e["sport"], e["venue"] or "", e["court"] or ""))
    for n, e in enumerate(events, 1):
        e["id"] = f"{e['sport'][:3]}-{n}"

    data = {
        "generated": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
        "schools": schools,
        "events": events,
    }
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// Generated by tools/build.py from the organiser's Google Sheets. Do not edit by hand.\n")
        f.write("window.WIUC_DATA = ")
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    log(f"events: {len(events)}  schools: {len(schools)}  -> {os.path.relpath(OUT)}")
    by = {}
    for e in events:
        by[(e["sport"], e["day"])] = by.get((e["sport"], e["day"]), 0) + 1
    for k in sorted(by):
        log("  ", k, by[k])
    noven = [e for e in events if not e["venue"]]
    if noven:
        log("EVENTS WITHOUT VENUE:", len(noven), noven[0])


if __name__ == "__main__":
    main()
