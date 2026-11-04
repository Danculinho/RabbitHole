# -*- coding: utf-8 -*-
"""Checks on the parsed schedule. Run after `python tools/build.py` (or with --offline cache):

    python tools/test_build.py
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
txt = open(os.path.join(HERE, "..", "data.js"), encoding="utf-8").read()
data = json.loads(re.search(r"window\.WIUC_DATA = (.*);\s*$", txt, re.S).group(1))
events = data["events"]
failed = 0


def check(name, ok, detail=""):
    global failed
    if not ok:
        failed += 1
    print(("PASS " if ok else "FAIL ") + name + (" " + detail if detail else ""))


# a set score typed as "6-1" turns into a date in the sheet; it must never be read as a match time
early = [e for e in events if e["time"] < "07:00"]
check("no match starts before 07:00", not early,
      f"({len(early)}, e.g. {early[0]['sport']} {early[0]['day']} {early[0]['time']} {early[0]['a']['label']})" if early else "")

tennis = [e for e in events if e["sport"] == "tennis"]
check("tennis matches parsed", len(tennis) > 100, f"({len(tennis)})")

scored = [e for e in events if e["resA"] or e["resB"]]
bad = [e for e in scored if re.match(r"^\d\d:\d\d$", e["resA"] or "") or re.match(r"^\d\d:\d\d$", e["resB"] or "")]
check("no result looks like a clock time", not bad, f"({len(bad)})" if bad else "")

sys.exit(1 if failed else 0)
