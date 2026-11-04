/* WIUC 2026 Bratislava: schedule helper. Plain JS, no build step. */
(function () {
  "use strict";

  var DATA = window.WIUC_DATA || { schools: [], events: [] };
  var EXTRA = window.WIUC_EXTRA || [];

  // ------------------------------------------------------------ static data
  var VENUES = {
    "gopass":       { name: "GOPASS Aréna",                         addr: "Trnavská cesta 29" },
    "domsportu":    { name: "Dom športu",                           addr: "Junácka 8" },
    "peugeot":      { name: "PEUGEOT Aréna (Aegon Arena)",          addr: "Príkopova 6" },
    "padel":        { name: "Aurial Padel Bratislava",              addr: "Bajkalská 7" },
    "pasienky":     { name: "Pasienky / Jama",                      addr: "Trnavská cesta 33" },
    "tk-inter":     { name: "Tenisový klub Inter Bratislava",       addr: "Trnavská cesta 33" },
    "tk-slovan":    { name: "TK Slovan Bratislava",                 addr: "Odbojárov 3" },
    "kalinciakova": { name: "ZŠ Kalinčiakova, futbalové ihrisko",   addr: "Kalinčiakova 12" },
    "stu-cas":      { name: "STU Centrum akademického športu (Mladá Garda)", addr: "Račianska 103" },
    "rovny":        { name: "Hala prof. Rovného, FTVŠ UK",          addr: "Nábr. arm. gen. L. Svobodu 9" },
    "mlynska-lf":   { name: "Mlynská dolina LF / ŠKP",              addr: "Staré Grunty 36" },
    "mlynska-prif": { name: "Mlynská dolina PRIF / MATFYZ (telocvičňa FMFI UK)", addr: "Staré Grunty 36" },
    "pionierska":   { name: "Hala Pionierska",                      addr: "Pionierska 16" },
    "plavaren":     { name: "Plaváreň Pasienky",                    addr: "Junácka 4" }
  };

  var SPORTS = {
    basketball:  { sk: "Basketbal",    en: "Basketball",   c: "#e8731a" },
    floorball:   { sk: "Florbal",      en: "Floorball",    c: "#3b6fd6" },
    football:    { sk: "Futbal",       en: "Football",     c: "#2e9e44" },
    futsal:      { sk: "Futsal",       en: "Futsal",       c: "#c9a227" },
    handball:    { sk: "Hádzaná",      en: "Handball",     c: "#8e44ad" },
    rugby:       { sk: "Rugby 7s",     en: "Rugby 7s",     c: "#6d4c41" },
    volleyball:  { sk: "Volejbal",     en: "Volleyball",   c: "#d6232b" },
    tennis:      { sk: "Tenis",        en: "Tennis",       c: "#2a9d8f" },
    padel:       { sk: "Padel",        en: "Padel",        c: "#0d7a4f" },
    badminton:   { sk: "Bedminton",    en: "Badminton",    c: "#6b7280" },
    tabletennis: { sk: "Stolný tenis", en: "Table tennis", c: "#b23a48" },
    swimming:    { sk: "Plávanie",     en: "Swimming",     c: "#0ea5e9" },
    athletics:   { sk: "Atletika",     en: "Athletics",    c: "#16a34a" },
    ceremony:    { sk: "Ceremoniál",   en: "Ceremony",     c: "#0f2342" }
  };

  var DAYS = [
    { d: "2026-11-04", sk: "Streda",  en: "Wed", skShort: "St", num: "4. 11." },
    { d: "2026-11-05", sk: "Štvrtok", en: "Thu", skShort: "Št", num: "5. 11." },
    { d: "2026-11-06", sk: "Piatok",  en: "Fri", skShort: "Pi", num: "6. 11." },
    { d: "2026-11-07", sk: "Sobota",  en: "Sat", skShort: "So", num: "7. 11." }
  ];

  // organiser PDFs for sports that are not in the sheets
  var PDFS = [
    { sport: "badminton",   sk: "Bedminton: rozpis (PDF)",       en: "Badminton schedule (PDF)",   url: "https://drive.google.com/file/d/1EdxLuea1NPzeKq2XtPV2qebw3dt3Ujnj/view" },
    { sport: "tabletennis", sk: "Stolný tenis: rozpis (PDF)",    en: "Table tennis timetable (PDF)", url: "https://drive.google.com/file/d/1kEBQwLrrpMUpSL5WpCIWMJbyYrlPzDxN/view" },
    { sport: "swimming",    sk: "Plávanie: štartová listina 5. 11. (PDF)", en: "Swimming start list 5 Nov (PDF)", url: "https://drive.google.com/file/d/1P8Ox7-PUbO2oysOwBJkIKaTnIDJ-CLQN/view" },
    { sport: "swimming",    sk: "Plávanie: štartová listina 6. 11. (PDF)", en: "Swimming start list 6 Nov (PDF)", url: "https://drive.google.com/file/d/1HynBruuPasKHimUrNcHxunIbeAtYFRvj/view" },
    { sport: "athletics",   sk: "Atletika: štartové listiny (PDF)", en: "Athletics entry lists (PDF)", url: "https://drive.google.com/file/d/1WJp2ut4cz7t-wqiyX7NtEt3lwX5nALOW/view" }
  ];
  var SOURCE_URL = "https://drive.google.com/drive/folders/1g98fxlj3ZIp15Tsytcrvea8Z9117FwRZ";
  var OFFICIAL_URL = "https://www.wiusc.com/11th-wiuc-bratislava-2026/";

  var CEREMONY = { sport: "ceremony", cat: "X", day: "2026-11-05", time: "19:00", venue: "gopass", court: null,
    a: { label: "", school: null }, b: { label: "", school: null }, pool: "", stage: "", game: "", resA: "", resB: "", all: true };

  var I18N = {
    sk: {
      pickTitle: "Vyberte svoju univerzitu",
      pickLead: "Uvidíte všetky jej zápasy, športy a miesta. Výber si stránka zapamätá.",
      search: "Hľadať univerzitu alebo krajinu",
      slovak: "Slovenské univerzity",
      all: "Všetky univerzity",
      noSchool: "Žiadna univerzita nezodpovedá hľadaniu.",
      allMatches: "Celý rozpis",
      venues: "Miesta",
      change: "Zmeniť",
      today: "Dnes",
      now: "Teraz",
      live: "Prebieha",
      next: "Nasleduje",
      done: "Odohrané",
      men: "muži", women: "ženy", mixed: "mix",
      court: "kurt", pitch: "ihrisko", hall: "hala",
      group: "Skupina",
      map: "Mapa",
      noEvents: "V tento deň nemá vaša univerzita žiadny zápas v rozpise.",
      noEventsSport: "V tento deň nemá vaša univerzita zápas v tomto športe.",
      playoff: "Play-off podľa postupu",
      playoffNote: "Súperi sa doplnia podľa výsledkov v skupinách. Toto sú všetky zápasy, ktoré sa v tomto športe hrajú.",
      squad: "tím",
      sportsOf: "Športy",
      pdfTitle: "Individuálne športy (len PDF organizátora)",
      pdfLead: "Bedminton, stolný tenis, plávanie a atletiku organizátor zverejnil len ako PDF. Pre STU sú tieto riadky doplnené ručne.",
      venuesLead: "Všetky športoviská turnaja. Kliknutím na Mapa otvoríte navigáciu.",
      playsHere: "Hrá sa tu",
      allLead: "Všetky zápasy turnaja. Filtrujte podľa dňa a športu.",
      source: "Zdroj: verejné rozpisy organizátora (Google Sheets). Vygenerované",
      official: "Oficiálna stránka WIUC",
      results: "Výsledky a prípadné zmeny časov sú v rozpisoch organizátora.",
      back: "Späť na výber",
      mine: "Moja univerzita",
      ceremony: "Otvárací ceremoniál a spoločná fotografia",
      allSchools: "všetky univerzity",
      count: "zápasov"
    },
    en: {
      pickTitle: "Pick your university",
      pickLead: "You will see all its matches, sports and venues. The page remembers your choice.",
      search: "Search university or country",
      slovak: "Slovak universities",
      all: "All universities",
      noSchool: "No university matches your search.",
      allMatches: "Full schedule",
      venues: "Venues",
      change: "Change",
      today: "Today",
      now: "Now",
      live: "Live",
      next: "Up next",
      done: "Played",
      men: "men", women: "women", mixed: "mixed",
      court: "court", pitch: "pitch", hall: "hall",
      group: "Pool",
      map: "Map",
      noEvents: "Your university has no scheduled match on this day.",
      noEventsSport: "Your university has no match in this sport on this day.",
      playoff: "Play-off, depending on progression",
      playoffNote: "Opponents are filled in from the pool results. These are all matches played in this sport.",
      squad: "team",
      sportsOf: "Sports",
      pdfTitle: "Individual sports (organiser PDFs only)",
      pdfLead: "Badminton, table tennis, swimming and athletics were published only as PDFs. For STU the rows are entered by hand.",
      venuesLead: "All venues of the championship. Tap Map to open navigation.",
      playsHere: "Played here",
      allLead: "All matches of the championship. Filter by day and sport.",
      source: "Source: organiser's public schedules (Google Sheets). Generated",
      official: "Official WIUC page",
      results: "Results and time changes are in the organiser's schedules.",
      back: "Back to the list",
      mine: "My university",
      ceremony: "Opening ceremony and group photo",
      allSchools: "all universities",
      count: "matches"
    }
  };

  // ------------------------------------------------------------ state
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var state = {
    lang: store.get("wiuc.lang") || "sk",
    school: store.get("wiuc.school") || null,
    day: null,
    sport: store.get("wiuc.sport") || "all"
  };
  function t(k) { return (I18N[state.lang] && I18N[state.lang][k]) || I18N.sk[k] || k; }
  function nMatches(n) {
    if (state.lang !== "sk") return n + " " + (n === 1 ? "match" : "matches");
    return n + " " + (n === 1 ? "zápas" : n >= 2 && n <= 4 ? "zápasy" : "zápasov");
  }
  function sportName(k) { var s = SPORTS[k]; return s ? s[state.lang] || s.sk : k; }
  function dayName(d) { var x = DAYS.filter(function (q) { return q.d === d; })[0]; return x ? (state.lang === "sk" ? x.sk : x.en) : d; }

  var EVENTS = DATA.events.concat(EXTRA).concat([CEREMONY]);
  EVENTS.sort(function (a, b) { return (a.day + a.time).localeCompare(b.day + b.time) || a.sport.localeCompare(b.sport); });
  var SCHOOLS = {};
  DATA.schools.forEach(function (s) { SCHOOLS[s.id] = s; });

  function todayISO() {
    var n = new Date();
    return n.getFullYear() + "-" + pad(n.getMonth() + 1) + "-" + pad(n.getDate());
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function nowHM() { var n = new Date(); return pad(n.getHours()) + ":" + pad(n.getMinutes()); }
  function defaultDay() {
    var td = todayISO();
    if (DAYS.some(function (d) { return d.d === td; })) return td;
    if (td < DAYS[0].d) return DAYS[0].d;
    return DAYS[DAYS.length - 1].d;
  }

  // ------------------------------------------------------------ helpers
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function h(strings) {
    // tiny tagged template: values are escaped unless wrapped in raw()
    var out = strings[0];
    for (var i = 1; i < arguments.length; i++) {
      var v = arguments[i];
      out += (v && v.__raw) ? v.v : esc(v);
      out += strings[i];
    }
    return out;
  }
  function raw(v) { return { __raw: true, v: v }; }
  function mapsUrl(vid) {
    var v = VENUES[vid];
    if (!v) return "#";
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v.addr + ", Bratislava");
  }
  function involves(ev, sid) {
    return !!sid && ((ev.a && ev.a.school === sid) || (ev.b && ev.b.school === sid));
  }
  function schoolSports(sid) {
    var set = {};
    EVENTS.forEach(function (e) { if (involves(e, sid)) set[e.sport] = true; });
    return Object.keys(set);
  }
  function catLabel(cat) {
    return cat === "M" ? t("men") : cat === "W" ? t("women") : cat === "X" ? t("mixed") : "";
  }
  function courtLabel(ev) {
    if (!ev.court) return "";
    var word = (ev.sport === "tennis" || ev.sport === "padel") ? t("court") :
               (ev.sport === "football" || ev.sport === "rugby") ? t("pitch") : t("hall");
    return word + " " + ev.court;
  }
  function durationMin(sport) {
    return { football: 60, rugby: 30, basketball: 40, volleyball: 60, handball: 40, futsal: 30, floorball: 40, tennis: 60, padel: 45, badminton: 30, tabletennis: 60, swimming: 270, athletics: 45, ceremony: 120 }[sport] || 45;
  }
  function addMin(hm, m) {
    var p = hm.split(":"), x = (+p[0]) * 60 + (+p[1]) + m;
    return pad(Math.floor(x / 60) % 24) + ":" + pad(x % 60);
  }
  function statusOf(ev) {
    if (ev.day !== todayISO()) return ev.day < todayISO() ? "past" : "";
    var now = nowHM();
    if (now >= addMin(ev.time, durationMin(ev.sport))) return "past";
    if (now >= ev.time) return "live";
    return "";
  }
  function sideLabel(side, sid, ev) {
    if (!side) return "";
    var individual = ev && (ev.sport === "tennis" || ev.sport === "padel");
    if (side.school && SCHOOLS[side.school]) {
      var name = SCHOOLS[side.school].name;
      if (side.school === sid) name = shortName(name);
      else if (individual) {
        // the organiser's short label ("Victor Babeș 1 - Name") reads better than the full name
        var m = /^(.*?)\s*-\s*/.exec(side.label || "");
        if (m) name = m[1].replace(/\s*\d$/, "").trim() || name;
      }
      var extra = [];
      if (side.squad && !individual) extra.push(t("squad") + " " + side.squad);
      return { name: name, player: side.player || "", extra: extra.join(", "), me: side.school === sid };
    }
    return { name: side.label || "", player: side.player || "", extra: "", me: false };
  }
  function shortName(name) {
    var m = {
      "Slovak University of Technology in Bratislava": "STU Bratislava",
      "Comenius University Bratislava": "UK Bratislava",
      "Bratislava University of Economics and Business": "EUBA"
    };
    return m[name] || name;
  }

  // ------------------------------------------------------------ routing
  function route() {
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/").filter(Boolean);
    if (parts[0] === "s" && parts[1] && SCHOOLS[parts[1]]) {
      state.school = parts[1];
      store.set("wiuc.school", parts[1]);
      return { view: parts[2] || "school", school: parts[1] };
    }
    if (parts[0] === "all") return { view: "all" };
    if (parts[0] === "venues") return { view: "venues" };
    if (parts[0] === "pick") return { view: "pick" };
    if (state.school && SCHOOLS[state.school]) return { view: "school", school: state.school };
    return { view: "pick" };
  }
  function go(path) { location.hash = "#/" + path; }

  // ------------------------------------------------------------ views
  var app = document.getElementById("app");

  function render(keepScroll) {
    if (!state.day) state.day = defaultDay();
    var r = route();
    document.documentElement.lang = state.lang;
    document.getElementById("langBtn").textContent = state.lang === "sk" ? "EN" : "SK";
    if (r.view === "pick") renderPick();
    else if (r.view === "all") renderAll();
    else if (r.view === "venues") renderVenues();
    else renderSchool(r.school);
    renderFoot();
    if (keepScroll !== true) window.scrollTo(0, 0);
  }

  function renderFoot() {
    document.getElementById("footSource").innerHTML =
      h`${t("source")} ${DATA.generated || ""}. <a href="${SOURCE_URL}" target="_blank" rel="noopener">Google Drive</a> · <a href="${OFFICIAL_URL}" target="_blank" rel="noopener">${t("official")}</a>. ${t("results")}`;
  }

  // ---- school picker
  function renderPick() {
    var q = "";
    app.innerHTML = h`
      <h1>${t("pickTitle")}</h1>
      <p class="lead">${t("pickLead")}</p>
      <input class="search" id="q" type="search" placeholder="${t("search")}" autocomplete="off">
      <div id="schoolList"></div>
      <div class="quick-links">
        <a class="btn" href="#/all">${t("allMatches")}</a>
        <a class="btn" href="#/venues">${t("venues")}</a>
      </div>`;
    var input = document.getElementById("q");
    function draw() {
      var ql = q.trim().toLowerCase();
      var list = DATA.schools.filter(function (s) {
        return !ql || (s.name + " " + s.country + " " + shortName(s.name)).toLowerCase().indexOf(ql) >= 0;
      });
      var sk = list.filter(function (s) { return s.country === "Slovakia"; });
      var rest = list.filter(function (s) { return s.country !== "Slovakia"; });
      var html = "";
      function item(s) {
        var cls = "school-btn" + (s.id === state.school ? " home" : "");
        return h`<li><button class="${cls}" data-id="${s.id}" type="button"><span class="name">${s.name}</span><span class="country">${s.country}</span></button></li>`;
      }
      if (!list.length) html = h`<p class="empty">${t("noSchool")}</p>`;
      if (sk.length) html += h`<h2>${t("slovak")}</h2><ul class="school-list">${raw(sk.map(item).join(""))}</ul>`;
      if (rest.length) html += h`<h2>${t("all")}</h2><ul class="school-list">${raw(rest.map(item).join(""))}</ul>`;
      document.getElementById("schoolList").innerHTML = html;
    }
    input.addEventListener("input", function () { q = input.value; draw(); });
    document.getElementById("schoolList").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-id]");
      if (b) go("s/" + b.getAttribute("data-id"));
    });
    draw();
  }

  // ---- shared: day tabs + sport chips + event list
  function dayTabs(countFn) {
    return h`<div class="tabs" role="tablist">${raw(DAYS.map(function (d) {
      var n = countFn ? countFn(d.d) : null;
      var isToday = d.d === todayISO();
      return h`<button class="tab${d.d === state.day ? " on" : ""}" data-day="${d.d}" role="tab" type="button">
        <span>${state.lang === "sk" ? d.skShort : d.en}${isToday ? " · " + t("today") : ""}</span><small>${d.num}</small>${n != null ? raw('<span class="n">' + n + '</span>') : ""}</button>`;
    }).join(""))}</div>`;
  }
  function sportChips(sports, counts) {
    var all = h`<button class="chip${state.sport === "all" ? " on" : ""}" data-sport="all" type="button">${state.lang === "sk" ? "Všetko" : "All"}</button>`;
    return h`<div class="chips">${raw(all)}${raw(sports.map(function (s) {
      var c = SPORTS[s] ? SPORTS[s].c : "#888";
      var n = counts && counts[s] ? h`<span class="cnt">${counts[s]}</span>` : "";
      return h`<button class="chip${state.sport === s ? " on" : ""}" data-sport="${s}" type="button" style="--c:${c}"><span class="dot"></span>${sportName(s)}${raw(n)}</button>`;
    }).join(""))}</div>`;
  }
  // one delegated handler for day tabs and sport chips (registered once at boot)
  app.addEventListener("click", function (e) {
    var tb = e.target.closest("[data-day]");
    var ch = e.target.closest("[data-sport]");
    if (!tb && !ch) return;
    if (tb) state.day = tb.getAttribute("data-day");
    if (ch) { state.sport = ch.getAttribute("data-sport"); store.set("wiuc.sport", state.sport); }
    var y = window.scrollY;
    render(true);
    window.scrollTo(0, y);
  });

  function eventCard(ev, sid, markNext) {
    var st = statusOf(ev);
    if (markNext && !st) st = "next";
    var A = sideLabel(ev.a, sid, ev), B = sideLabel(ev.b, sid, ev);
    var c = SPORTS[ev.sport] ? SPORTS[ev.sport].c : "#888";
    var badge = st === "live" ? h`<span class="badge live">${t("live")}</span>` :
                st === "next" ? h`<span class="badge next">${t("next")}</span>` : "";
    var cat = catLabel(ev.cat);
    var meta = [];
    var v = VENUES[ev.venue];
    if (v) meta.push(h`<a href="${mapsUrl(ev.venue)}" target="_blank" rel="noopener">📍 ${v.name}</a>`);
    var cl = courtLabel(ev); if (cl) meta.push(esc(cl));
    if (ev.pool && !ev.extra) meta.push(esc(t("group") + " " + ev.pool));
    if (ev.stage && !ev.extra) meta.push(esc(ev.stage));
    var match;
    if (ev.sport === "ceremony") {
      match = h`<div class="match">${t("ceremony")}</div>`;
    } else if (!B.name && !B.player) {
      match = h`<div class="match"><span class="${A.me ? "me" : ""}">${A.name}</span>${A.player ? raw(' <span class="player">' + esc(A.player) + "</span>") : ""}</div>` +
              (ev.stage ? h`<div class="note">${ev.stage}</div>` : "");
    } else {
      function side(S) {
        var s = h`<span class="${S.me ? "me" : ""}">${S.name || "?"}</span>`;
        if (S.extra) s += h` <span class="player">(${S.extra})</span>`;
        if (S.player) s += h` <span class="player">${S.player}</span>`;
        return s;
      }
      var res = (ev.resA !== "" && ev.resB !== "") ? h`<span class="res">${ev.resA}:${ev.resB}</span>` : "";
      match = h`<div class="match">${raw(side(A))}<span class="vs">vs</span>${raw(side(B))}${raw(res)}</div>`;
    }
    return h`<li class="ev ${st}" style="--c:${c}">
      <div class="time">${ev.time}<small>${cat}</small></div>
      <div class="main">
        <div class="sport">${sportName(ev.sport)} ${raw(badge)}</div>
        ${raw(match)}
        <div class="meta">${raw(meta.join(" · "))}</div>
      </div></li>`;
  }

  function eventList(list, sid) {
    if (!list.length) return "";
    var nextIdx = -1;
    if (state.day === todayISO()) {
      for (var i = 0; i < list.length; i++) { if (!statusOf(list[i])) { nextIdx = i; break; } }
    }
    return h`<ul class="events">${raw(list.map(function (e, i) { return eventCard(e, sid, i === nextIdx); }).join(""))}</ul>`;
  }

  // ---- school view
  function renderSchool(sid) {
    var s = SCHOOLS[sid];
    var sports = schoolSports(sid);
    var mine = EVENTS.filter(function (e) { return involves(e, sid) || e.all; });
    // knockout placeholder events: no school on either side, in a sport+cat the school plays
    var myCats = {};
    mine.forEach(function (e) { myCats[e.sport + "/" + e.cat] = true; });
    var playoff = EVENTS.filter(function (e) {
      return !e.extra && !e.all && !e.a.school && !e.b.school && myCats[e.sport + "/" + e.cat];
    });
    if (state.sport !== "all" && sports.indexOf(state.sport) < 0) state.sport = "all";

    function dayCount(d) {
      var n = mine.filter(function (e) { return e.day === d; }).length;
      if (!n && playoff.some(function (e) { return e.day === d; })) return "play-off";
      return n;
    }
    var sportCounts = {};
    mine.forEach(function (e) { if (e.day === state.day) sportCounts[e.sport] = (sportCounts[e.sport] || 0) + 1; });

    var dayList = mine.filter(function (e) { return e.day === state.day && (state.sport === "all" || e.sport === state.sport || e.all); });
    var poList = playoff.filter(function (e) { return e.day === state.day && (state.sport === "all" || e.sport === state.sport); });

    var body;
    if (!dayList.length && !poList.length) {
      body = h`<p class="empty">${state.sport === "all" ? t("noEvents") : t("noEventsSport")}</p>`;
    } else {
      body = eventList(dayList, sid);
      if (poList.length) {
        var groups = {};
        poList.forEach(function (e) { var k = e.sport + "/" + e.cat; (groups[k] = groups[k] || []).push(e); });
        body += Object.keys(groups).map(function (k) {
          var g = groups[k], first = g[0], v = VENUES[first.venue];
          return h`<details class="playoff"><summary>${t("playoff")}: ${sportName(first.sport)} ${catLabel(first.cat)} · ${nMatches(g.length)}, ${v ? v.name : ""} ${state.lang === "sk" ? "od" : "from"} ${first.time}</summary>
            <p class="day-note">${t("playoffNote")}</p>${raw(eventList(g, sid))}</details>`;
        }).join("");
      }
    }

    var pdfs = PDFS;

    app.innerHTML = h`
      <div class="school-head">
        <div><h1>${s.name}</h1><div class="country">${s.country} · ${t("sportsOf")}: ${sports.map(sportName).join(", ")}</div></div>
        <a class="btn" href="#/pick">${t("change")}</a>
      </div>
      ${raw(dayTabs(dayCount))}
      ${raw(sportChips(sports, sportCounts))}
      <div id="list">${raw(body)}</div>
      ${pdfs.length ? raw(h`<h2>${t("pdfTitle")}</h2><p class="day-note">${t("pdfLead")}</p><ul class="pdf-list">${raw(pdfs.map(function (p) {
        return h`<li><a href="${p.url}" target="_blank" rel="noopener">${state.lang === "sk" ? p.sk : p.en}</a></li>`; }).join(""))}</ul>`) : ""}
      <div class="sticky-bar">
        <a class="btn" href="#/venues">📍 ${t("venues")}</a>
        <a class="btn" href="#/all">${t("allMatches")}</a>
      </div>`;
  }

  // ---- all matches
  function renderAll() {
    var sports = Object.keys(SPORTS).filter(function (k) { return EVENTS.some(function (e) { return e.sport === k && !e.extra; }); });
    var dayEvents = EVENTS.filter(function (e) { return e.day === state.day && !e.extra; });
    var counts = {};
    dayEvents.forEach(function (e) { counts[e.sport] = (counts[e.sport] || 0) + 1; });
    var list = dayEvents.filter(function (e) { return state.sport === "all" || e.sport === state.sport; });
    // group by venue for readability
    var byVenue = {};
    list.forEach(function (e) { var k = e.venue || "?"; (byVenue[k] = byVenue[k] || []).push(e); });
    var body = Object.keys(byVenue).map(function (k) {
      var v = VENUES[k];
      return h`<h2>${v ? v.name : "?"} <small>(${byVenue[k].length})</small></h2>${raw(eventList(byVenue[k], state.school))}`;
    }).join("");
    app.innerHTML = h`
      <div class="school-head"><div><h1>${t("allMatches")}</h1><div class="country">${t("allLead")}</div></div>
        <a class="btn" href="#/${state.school ? "s/" + state.school : "pick"}">${state.school ? t("mine") : t("back")}</a></div>
      ${raw(dayTabs(function (d) { return EVENTS.filter(function (e) { return e.day === d && !e.extra; }).length; }))}
      ${raw(sportChips(sports, counts))}
      ${raw(body || h`<p class="empty">${t("noEvents")}</p>`)}`;
  }

  // ---- venues
  function renderVenues() {
    var body = Object.keys(VENUES).map(function (k) {
      var v = VENUES[k];
      var sports = {};
      EVENTS.forEach(function (e) { if (e.venue === k) sports[e.sport] = true; });
      var todayN = EVENTS.filter(function (e) { return e.venue === k && e.day === state.day; }).length;
      return h`<div class="venue">
        <div class="vname">${v.name}</div>
        <div class="addr">${v.addr}, Bratislava</div>
        <div class="vsports">${t("playsHere")}: ${Object.keys(sports).map(sportName).join(", ")}${todayN ? " · " + dayName(state.day) + ": " + nMatches(todayN) : ""}</div>
        <div class="vlinks"><a class="btn" href="${mapsUrl(k)}" target="_blank" rel="noopener">📍 ${t("map")}</a></div>
      </div>`;
    }).join("");
    app.innerHTML = h`
      <div class="school-head"><div><h1>${t("venues")}</h1><div class="country">${t("venuesLead")}</div></div>
        <a class="btn" href="#/${state.school ? "s/" + state.school : "pick"}">${state.school ? t("mine") : t("back")}</a></div>
      ${raw(body)}`;
  }

  // ------------------------------------------------------------ boot
  document.getElementById("langBtn").addEventListener("click", function () {
    state.lang = state.lang === "sk" ? "en" : "sk";
    store.set("wiuc.lang", state.lang);
    render();
  });
  window.addEventListener("hashchange", function () { render(); });
  render();
  setInterval(function () { if (route().view !== "pick") { var y = window.scrollY; render(true); window.scrollTo(0, y); } }, 60000);
})();
