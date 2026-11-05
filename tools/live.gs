/** @OnlyCurrentDoc */
// Live match log for the WIUC 2026 helper (STU football): a Google Apps Script web app on a Sheet.
//
// Setup (once):
//   1. In a new Google Sheet: Extensions > Apps Script, paste this whole file, save.
//      (@OnlyCurrentDoc keeps the script's access to that one Sheet.)
//   2. Run setup() once. It adds the tabs and a random 6-digit PIN, and writes the PIN into the
//      "nastavenia" tab (only you see the Sheet). A standalone script creates its own Sheet instead.
//      To choose your own PIN, add a script property PIN before running setup().
//   3. Deploy > New deployment > Web app: Execute as "Me", Who has access "Anyone". Copy the /exec URL.
//   4. Put that URL into LIVE_URL in app.js.
// Anyone can read the log; only someone with the PIN can write. Rows are never removed, only marked deleted.

var TYPES = ["lineup", "k1", "h1", "k2", "ft", "goal", "ogoal", "yellow", "red", "sub"];
var COLS = ["id", "ts", "match", "type", "minute", "a", "b", "note", "deleted"];

// the Sheet made by setup(), or the one this script is attached to
function book_() {
  var own = SpreadsheetApp.getActiveSpreadsheet();
  if (own) return own;
  return SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("SHEET_ID"));
}
function setup() {
  var props = PropertiesService.getScriptProperties();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss) { /* the Sheet this script belongs to */ }
  else if (props.getProperty("SHEET_ID")) ss = SpreadsheetApp.openById(props.getProperty("SHEET_ID"));
  else {
    ss = SpreadsheetApp.create("WIUC 2026 - zapis STU futbal");
    props.setProperty("SHEET_ID", ss.getId());
  }
  var pin = props.getProperty("PIN");
  if (!pin) {
    pin = String(100000 + Math.floor(Math.random() * 900000));
    props.setProperty("PIN", pin);
  }
  var st = ss.getSheetByName("nastavenia") || ss.insertSheet("nastavenia");
  st.clearContents();
  st.appendRow(["PIN pre zápis", pin]);
  st.appendRow(["Zmena PIN", "Apps Script > Nastavenia projektu > Vlastnosti skriptu > PIN"]);
  sheet_("log", COLS);
  sheet_("roster", ["n", "name"]);
  return ss.getUrl();
}

function sheet_(name, header) {
  var ss = book_();
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0) sh.appendRow(header);
  return sh;
}
function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function clip_(v, n) { return String(v == null ? "" : v).slice(0, n); }

// one incoming row -> a clean row, or null when it is not a known event
function normalise_(r) {
  if (!r || typeof r !== "object") return null;
  var type = clip_(r.type, 12);
  if (TYPES.indexOf(type) < 0) return null;
  var id = clip_(r.id, 40);
  if (!/^[A-Za-z0-9_-]+$/.test(id)) return null;
  var ts = Number(r.ts);
  if (!isFinite(ts)) ts = Date.now();
  return { id: id, ts: ts, match: clip_(r.match, 60), type: type, minute: clip_(r.minute, 10),
           a: clip_(r.a, 80), b: clip_(r.b, 80), note: clip_(r.note, 200), deleted: 0 };
}

function readRows_() {
  var sh = sheet_("log", COLS);
  var n = sh.getLastRow() - 1;
  if (n <= 0) return [];
  return sh.getRange(2, 1, n, COLS.length).getValues().map(function (v) {
    return { id: String(v[0]), ts: Number(v[1]), match: String(v[2]), type: String(v[3]), minute: String(v[4]),
             a: String(v[5]), b: String(v[6]), note: String(v[7]), deleted: Number(v[8]) ? 1 : 0 };
  });
}
function readRoster_() {
  var sh = sheet_("roster", ["n", "name"]);
  var n = sh.getLastRow() - 1;
  if (n <= 0) return null;
  return sh.getRange(2, 1, n, 2).getValues()
    .filter(function (v) { return String(v[0]) !== ""; })
    .map(function (v) { return { n: String(v[0]), name: String(v[1]) }; });
}

function doGet() {
  return out_({ ok: true, rows: readRows_(), roster: readRoster_() });
}

function doPost(e) {
  var body;
  try { body = JSON.parse((e && e.postData && e.postData.contents) || ""); } catch (err) { return out_({ ok: false, error: "json" }); }
  var pin = PropertiesService.getScriptProperties().getProperty("PIN");
  if (!pin || !body || String(body.pin) !== String(pin)) return out_({ ok: false, error: "pin" });
  if (body.op === "check") return out_({ ok: true });

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (body.op === "add") {
      var sh = sheet_("log", COLS);
      var seen = {};
      readRows_().forEach(function (r) { seen[r.id] = true; });
      (body.rows || []).slice(0, 50).forEach(function (raw) {
        var r = normalise_(raw);
        if (!r || seen[r.id]) return;
        seen[r.id] = true;
        sh.appendRow(COLS.map(function (k) { return r[k]; }));
      });
      return out_({ ok: true });
    }
    if (body.op === "del") {
      var ids = (body.ids || []).map(String);
      var log = sheet_("log", COLS);
      readRows_().forEach(function (r, i) {
        if (ids.indexOf(r.id) >= 0) log.getRange(i + 2, COLS.indexOf("deleted") + 1).setValue(1);
      });
      return out_({ ok: true });
    }
    if (body.op === "roster") {
      var list = (body.roster || []).slice(0, 60).map(function (p) { return [clip_(p.n, 4), clip_(p.name, 60)]; })
        .filter(function (p) { return /^\d{1,3}$/.test(p[0]); });
      var rs = sheet_("roster", ["n", "name"]);
      rs.clearContents();
      rs.appendRow(["n", "name"]);
      list.forEach(function (p) { rs.appendRow(p); });
      return out_({ ok: true });
    }
    return out_({ ok: false, error: "op" });
  } finally {
    lock.releaseLock();
  }
}
