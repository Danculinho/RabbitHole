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
    "stu-cas":      { name: "Mladá Garda (STU CAŠ)",                 addr: "Račianska 103" },
    "rovny":        { name: "Hala prof. Rovného (FTVŠ UK)",         addr: "Nábr. arm. gen. L. Svobodu 9" },
    "mlynska-lf":   { name: "Mlynská dolina LF / ŠKP",              addr: "Staré Grunty 36" },
    "mlynska-prif": { name: "Mlynská dolina PRIF / MATFYZ",         addr: "Staré Grunty 36" },
    "pionierska":   { name: "Hala Pionierska",                      addr: "Pionierska 16" },
    "plavaren":     { name: "Plaváreň Pasienky",                    addr: "Junácka 4" }
  };

  // zone colour c (stripe palette), optional darker text colour t for light zones
  var SPORTS = {
    football:    { sk: "Futbal",       en: "Football",     c: "#24a75b", t: "#1b7d44" },
    futsal:      { sk: "Futsal",       en: "Futsal",       c: "#ffc315", t: "#8a6a00" },
    basketball:  { sk: "Basketbal",    en: "Basketball",   c: "#ee792c", t: "#b4530f" },
    volleyball:  { sk: "Volejbal",     en: "Volleyball",   c: "#e93a3f", t: "#c0232a" },
    handball:    { sk: "Hádzaná",      en: "Handball",     c: "#674381" },
    rugby:       { sk: "Rugby 7s",     en: "Rugby 7s",     c: "#ee1953", t: "#c20f42" },
    floorball:   { sk: "Florbal",      en: "Floorball",    c: "#0e5ea5" },
    tennis:      { sk: "Tenis",        en: "Tennis",       c: "#008fb3", t: "#007392" },
    padel:       { sk: "Padel",        en: "Padel",        c: "#88b54e", t: "#4f7a1d" },
    badminton:   { sk: "Bedminton",    en: "Badminton",    c: "#1f40e6" },
    tabletennis: { sk: "Stolný tenis", en: "Table tennis", c: "#c2185b" },
    swimming:    { sk: "Plávanie",     en: "Swimming",     c: "#22b8f0", t: "#0b7fa8" },
    athletics:   { sk: "Atletika",     en: "Athletics",    c: "#c98a00", t: "#8a5f00" },
    ceremony:    { sk: "Ceremoniál",   en: "Ceremony",     c: "#051c2c" }
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
  // ------------------------------------------------------------ rules (from the organiser's General Rules PDF) and parties
  var RULES_PDF = "assets/General_Rules_WIUC_2026.pdf";
  var RULES_KEY = {
    sk: [
      "Na športovisko príďte aspoň 30 minút pred začiatkom a nahláste sa u oficiála súťaže.",
      "Uvedené časy sú časy začiatku. Pri meškaní môže byť zápas automaticky kontumovaný.",
      "Akreditačnú kartu noste viditeľne. Bez nej vás na športovisko nepustia.",
      "Poistenie si zabezpečte sami, organizátor ho neposkytuje.",
      "Na športoviskách je zakázaný alkohol aj fajčenie.",
      "Noste si fľašu z uvítacieho balíčka. Plastové fľaše sa nerozdávajú, voda z kohútika je pitná."
    ],
    en: [
      "Arrive at the venue at least 30 minutes before the start and report to the competition official.",
      "Published times are starting times. Late arrival may mean automatic forfeit.",
      "Wear your accreditation card visibly. Without it you cannot enter the sports centres.",
      "Arrange your own insurance; the organisers do not provide it.",
      "Alcohol and smoking are prohibited at sports venues.",
      "Bring the bottle from your welcome pack. No plastic bottles are handed out; tap water is safe to drink."
    ]
  };
  var RULES = [
    { sk: { t: "Pravidlá súťaže", li: [
        "Hráč nesmie v tej istej súťaži reprezentovať viac ako jeden tím. Porušenie znamená kontumáciu oboch zápasov, v ktorých hral.",
        "Tímy musia prísť na určené športovisko aspoň 30 minút pred plánovaným začiatkom a nahlásiť sa príslušnému oficiálovi súťaže.",
        "Zverejnené časy sú časy začiatku. Meškanie môže znamenať automatickú kontumáciu zápasu.",
        "Pre nabitý program sa zápasy môžu hrať na hrubý čas (hodiny sa nezastavujú).",
        "Neúctivé správanie k rozhodcom, zapisovateľom alebo súperom môže viesť ku kontumácii zápasu.",
        "Organizačný výbor môže za porušenie pravidiel diskvalifikovať hráčov, trénerov, funkcionárov, fanúšikov alebo aj celú univerzitu.",
        "Politické vyhlásenia a demonštrácie sú počas podujatia zakázané.",
        "Obťažovanie a diskriminácia na základe pohlavia, rodovej identity, sexuálnej orientácie, fyzických vlastností, zdravotného postihnutia, etnického či národného pôvodu alebo politických názorov sa netolerujú."] },
      en: { t: "Competition rules", li: [
        "Players may not represent more than one team in the same competition. A breach results in forfeiture of both matches in which the player took part.",
        "Teams must arrive at their assigned venue at least 30 minutes before the scheduled start and report to the relevant competition official.",
        "Published match times are starting times. Late arrival may result in automatic forfeiture of the match.",
        "Matches may be played with a running clock due to the tight schedule.",
        "Disrespectful behaviour towards referees, table officials or opponents may result in forfeiture of the match.",
        "The Organising Committee may disqualify players, coaches, officials, supporters or, where appropriate, an entire university for breaches of the rules.",
        "Political statements or demonstrations are prohibited during the event.",
        "Harassment or discrimination based on sex, gender identity, sexual orientation, physical characteristics, disability, ethnicity, national origin or political views will not be tolerated."] } },
    { sk: { t: "Akreditačné karty", p: ["Akreditačnú kartu vydáva IUSF po akreditácii. Potvrdzuje vašu totožnosť a to, kam máte prístup."], li: [
        "Kartu noste viditeľne, aby ju ochranka a personál vedeli rýchlo skontrolovať.",
        "Na športoviská sa dostanú len držitelia oficiálnej akreditačnej karty WIUC 2026.",
        "Karta je osobná a neprenosná."] },
      en: { t: "Accreditation cards", p: ["An accreditation card is an official document issued by IUSF after accreditation. It confirms your identity and access entitlements."], li: [
        "Wear your card visibly so security and event staff can check access quickly.",
        "Only holders of an official WIUC 2026 accreditation card may enter sports centres.",
        "Cards are personal and non-transferable."] } },
    { sk: { t: "Vstup na športoviská", p: ["Z bezpečnostných a kapacitných dôvodov môže byť vstup do niektorých športovísk obmedzený. Prednosť majú športovci, ktorí práve hrajú. Keď je športovisko plné, ďalších ľudí už nemusia pustiť dnu. Po zápase prosím uvoľnite hraciu plochu aj športovisko pre ďalšie tímy. Vstup na vonkajšie športoviská môže byť z bezpečnostných dôvodov obmedzený."] },
      en: { t: "Access to sports venues", p: ["For safety and capacity reasons, admission to some sports centres may be limited. Priority goes to athletes scheduled to compete. Once a venue is full, further admission may be refused. After your match, please leave the playing area or venue to make room for the next teams. Access to outdoor venues may also be restricted for safety reasons."] } },
    { sk: { t: "Poistenie a zdravotná pomoc", p: ["IUSF ani organizátori WIUC neposkytujú zdravotné poistenie. Každý účastník musí mať poistenie sám alebo cez svoju univerzitu či tím. Počas zápasov je na športoviskách prítomná záchranka, zdravotníci alebo prvá pomoc."] },
      en: { t: "Insurance and medical assistance", p: ["IUSF and the WIUC organisers do not provide medical insurance. Every participant must be insured, individually or through their university or team. Ambulance, medical or first-aid staff are present at venues during matches."] } },
    { sk: { t: "Rešpekt, fair play a spoločné priestory", li: [
        "Správajte sa slušne k súperom, rozhodcom, dobrovoľníkom, personálu hotelov aj ostatným hosťom.",
        "Hrajte férovo, myslite na bezpečnosť a rešpektujte rozhodnutia rozhodcov a pravidlá jednotlivých športov.",
        "Pri návrate do ubytovania buďte potichu. Šetrite izby, vybavenie a spoločné priestory.",
        "Na športoviskách je zakázané piť alkohol a fajčiť. Dodržiavajte pravidlá každého športoviska."] },
      en: { t: "Respect, sportsmanship and shared spaces", li: [
        "Treat opponents, referees, volunteers, hotel staff and other guests with courtesy.",
        "Play fairly, put safety first and follow referees' decisions and sport-specific regulations.",
        "Keep noise down when returning to your accommodation. Respect rooms, equipment and shared facilities.",
        "Alcohol and smoking are prohibited at sports venues. Follow all venue rules."] } },
    { sk: { t: "Rešpekt k personálu", p: ["Všetky tímy sa musia k rozhodcom, zapisovateľom, dobrovoľníkom a organizátorom správať s rešpektom. Rovnaký rešpekt očakávame od personálu voči všetkým účastníkom. O sankciách za porušenie pravidiel rozhoduje organizačný výbor."] },
      en: { t: "Respect for staff", p: ["All teams must treat referees, table officials, volunteers and organising staff with respect. Staff are expected to show the same respect to all participants. The Organising Committee decides sanctions for rule violations."] } },
    { sk: { t: "Udržujte športoviská čisté", p: ["Čistota je zodpovednosť každého. Nechajte športoviská, šatne, toalety a všetky priestory WIUC čisté a upratané. Používajte koše, odneste si fľaše aj obaly od jedla a šatňu nechajte pripravenú pre ďalší tím."] },
      en: { t: "Keep our sports centres clean", p: ["Keeping the facilities clean is everyone's job. Leave sports centres, changing rooms, toilets and all WIUC areas clean and tidy. Use the bins, take away bottles and food packaging, and leave changing rooms ready for the next teams."] } },
    { sk: { t: "Najprv voda", p: ["Voda z kohútika je na Slovensku veľmi kvalitná a bezpečne pitná. Kvôli udržateľnosti organizátori nerozdávajú plastové fľaše. Každý účastník dostane v uvítacom balíčku znovupoužiteľnú fľašu. Noste si ju so sebou a naplňte ju pred zápasom."] },
      en: { t: "Water first", p: ["Tap water in Slovakia is of very high quality and safe to drink. With sustainability in mind, the organisers do not hand out plastic bottles. Everyone gets a reusable bottle in the welcome pack. Bring it along and fill it before your matches."] } },
    { sk: { t: "Osobné veci", p: ["Cennosti si dobre strážte a každú udalosť nahláste personálu podujatia."] },
      en: { t: "Personal belongings", p: ["Keep your valuables secure and report any incident to event staff."] } },
    { sk: { t: "Informácie a kontakty", p: ["Každá delegácia vyplní súbor „Entry List Accreditation“ s telefónnym číslom s WhatsAppom pre vedúceho delegácie a pre zodpovednú osobu za každý šport. Informácie počas turnaja chodia na tieto kontakty. IUSF nezodpovedá za nesprávne alebo chýbajúce čísla."] },
      en: { t: "Information and contacts", p: ["Each delegation completes the \u201cEntry List Accreditation\u201d file with a WhatsApp number for the head of delegation and for the person responsible for each sport. Tournament messages go to these contacts. IUSF is not responsible for wrong or missing numbers."] } },
    { sk: { t: "Priateľstvo a flexibilita", p: ["WIUC má spájať univerzity, budovať priateľstvá a vzájomné porozumenie. Prichádzajte načas a buďte trpezliví, ak sa program alebo organizácia nečakane zmení.", "Organizátori môžu vylúčiť účastníka, ktorý tieto pravidlá vážne poruší, aby podujatie zostalo bezpečné a príjemné pre všetkých."] },
      en: { t: "Friendship and flexibility", p: ["WIUC aims to foster friendship and understanding among universities. Arrive on time and stay patient and flexible if the schedule or organisation changes unexpectedly.", "The organisers may exclude anyone who seriously breaks these rules, to keep the event safe, respectful and welcoming for everyone."] } },
    { sk: { t: "Reklama a organizácia", p: ["Propagovať športové či iné podujatia univerzity, klubu alebo tretej strany na športoviskách WIUC 2026 sa dá len s predchádzajúcim súhlasom IUSF.", "Za organizáciu zodpovedá IUSC Committee a WIUSF Federation SSD a r.l. Registráciou súhlasíte s týmito pravidlami. Rozhodcov určujú organizátori."] },
      en: { t: "Advertising and organisation", p: ["Promoting sporting or other events of a university, club or third party at WIUC 2026 venues requires prior consent from IUSF.", "The IUSC Committee and WIUSF Federation SSD a r.l. are responsible for the Championships. Registration means acceptance of these rules. Referees are appointed by the organising staff."] } }
  ];

  var PARTY_URL = "https://site.fourvenues.com/en/wiuc-official-party-2026";
  var PARTIES = [
    { d: "2026-11-05", club: "Neptune Club Bratislava", addr: "Kolárska 473/3, Bratislava" },
    { d: "2026-11-06", club: "Neptune Club Bratislava", addr: "Kolárska 473/3, Bratislava" },
    { d: "2026-11-07", club: "A4 Studio Bratislava", addr: "Trnavská cesta 39, Bratislava", final: true }
  ];


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
      navMine: "Moje zápasy",
      navAll: "Celý rozpis",
      navVenues: "Miesta",
      navPick: "Univerzity",
      navRules: "Pravidlá",
      navGame: "Hra",
      result: "Výsledok",
      updated: "Rozpis sa zmenil.",
      reload: "Načítať nový",
      navParty: "Párty",
      rulesTitle: "Pravidlá WIUC 2026",
      rulesLead: "Všeobecné pravidlá organizátora v skratke a celé. Záväzné je anglické znenie v PDF.",
      rulesKey: "Najdôležitejšie",
      rulesAll: "Všetky pravidlá",
      rulesPdf: "Pôvodné pravidlá v angličtine (PDF)",
      partyTitle: "Oficiálne párty WIUC",
      partyLead: "Vstup do klubov treba rezervovať a zaplatiť vopred. Počet miest je obmedzený.",
      partyBook: "Rezervovať vstupenky",
      partyBring: "Na vstup si prineste",
      partyBringList: ["doklad totožnosti", "akreditačnú kartu WIUC", "QR kód rezervácie"],
      partyFinal: "Veľká záverečná párty",
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
      navMine: "My matches",
      navAll: "Full schedule",
      navVenues: "Venues",
      navPick: "Universities",
      navRules: "Rules",
      navGame: "Game",
      result: "Result",
      updated: "The schedule has changed.",
      reload: "Load the new one",
      navParty: "Parties",
      rulesTitle: "WIUC 2026 rules",
      rulesLead: "The organiser's general rules, in short and in full. The PDF is the binding version.",
      rulesKey: "Most important",
      rulesAll: "All rules",
      rulesPdf: "Original rules (PDF)",
      partyTitle: "Official WIUC parties",
      partyLead: "Club entry has to be booked and paid in advance. Places are limited.",
      partyBook: "Book tickets",
      partyBring: "Bring to the door",
      partyBringList: ["your ID", "your WIUC badge", "the reservation QR code"],
      partyFinal: "The big final party",
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
  function nSports(n) {
    if (state.lang !== "sk") return n + " " + (n === 1 ? "sport" : "sports");
    return n + " " + (n === 1 ? "šport" : n >= 2 && n <= 4 ? "športy" : "športov");
  }
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

  var NOW_OVERRIDE = (function () {
    var m = /[?&]now=(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(location.search);
    return m ? { d: m[1], t: m[2] } : null;
  })();
  function todayISO() {
    if (NOW_OVERRIDE) return NOW_OVERRIDE.d;
    var n = new Date();
    return n.getFullYear() + "-" + pad(n.getMonth() + 1) + "-" + pad(n.getDate());
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function nowHM() { if (NOW_OVERRIDE) return NOW_OVERRIDE.t; var n = new Date(); return pad(n.getHours()) + ":" + pad(n.getMinutes()); }
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
    if (parts[0] === "rules") return { view: "rules" };
    if (parts[0] === "party") return { view: "party" };
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
    document.getElementById("brandSub").textContent = state.lang === "sk" ? "Neoficiálny pomocník · 4. až 8. 11." : "Unofficial helper · 4 to 8 Nov";
    renderMenu(r.view);
    if (r.view === "pick") renderPick();
    else if (r.view === "all") renderAll();
    else if (r.view === "venues") renderVenues();
    else if (r.view === "rules") renderRules();
    else if (r.view === "party") renderParty();
    else renderSchool(r.school);
    renderFoot();
    if (keepScroll !== true) window.scrollTo(0, 0);
  }

  // header menu: always one tap back to your matches, the full schedule, venues or the list
  function renderMenu(view) {
    var items = [];
    if (state.school && SCHOOLS[state.school]) items.push(["school", "#/s/" + state.school, t("navMine")]);
    items.push(["all", "#/all", t("navAll")], ["venues", "#/venues", t("navVenues")], ["rules", "#/rules", t("navRules")], ["party", "#/party", t("navParty")], ["game", "hra/", t("navGame")], ["pick", "#/pick", t("navPick")]);
    var menu = document.getElementById("menu");
    if (!menu) return;
    menu.innerHTML = items.map(function (it) {
      var on = it[0] === view;
      return h`<a href="${it[1]}" class="m-${it[0]}${on ? " on" : ""}"${raw(on ? ' aria-current="page"' : "")}>${it[2]}</a>`;
    }).join("");
  }

  function renderFoot() {
    document.getElementById("footSource").innerHTML =
      h`${t("source")} ${DATA.generated || ""}. <a href="${SOURCE_URL}" target="_blank" rel="noopener">Google Drive</a> · <a href="${OFFICIAL_URL}" target="_blank" rel="noopener">${t("official")}</a>. ${t("results")}`;
    var author = document.getElementById("footAuthor");
    if (author) author.textContent = state.lang === "sk" ? "Vytvoril Daniel Floris." : "Made by Daniel Floris.";
    document.getElementById("footCredit").innerHTML =
      h`${state.lang === "sk" ? "Fotografia" : "Photograph"}: <a href="https://commons.wikimedia.org/w/index.php?curid=119460999" target="_blank" rel="noopener">Panoramic view from Bratislava castle</a>, Lukáš Perný, CC BY-SA 4.0, Wikimedia Commons.`;
  }

  // ------------------------------------------------------------ icons (authored SVG, one stroke weight)
  var ICON = {
    pin: '<path d="M12 21s-6-5.4-6-11a6 6 0 0 1 12 0c0 5.6-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
    back: '<path d="M15 6l-6 6 6 6"/>',
    dir: '<path d="M7 17L17 7M9 7h8v8"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    flag: '<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
    football: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5l4.3 3.1-1.6 5h-5.4l-1.6-5z"/>',
    futsal: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
    basketball: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18M6 5.5c3 3 3 10 0 13M18 5.5c-3 3-3 10 0 13"/>',
    volleyball: '<circle cx="12" cy="12" r="9"/><path d="M12 3c-4 4-4 10 0 18M4.5 8.5c5 .5 10 3 14.5 8M4.5 15.5c5-.5 10-3 14.5-8"/>',
    handball: '<circle cx="12" cy="12" r="9"/><path d="M8 8l8 8M16 8l-8 8"/>',
    rugby: '<path d="M4 20C4 10 14 4 20 4c0 6-6 16-16 16z"/><path d="M9 15l6-6M10 12l2 2M12 10l2 2"/>',
    floorball: '<circle cx="12" cy="12" r="9"/><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01M12 12h.01" stroke-width="3"/>',
    tennis: '<circle cx="10" cy="9" r="6"/><path d="M14.5 13.5L20 19M7 6.5c2 1 4 3.5 5 6.5"/>',
    padel: '<rect x="5" y="3" width="10" height="12" rx="5"/><path d="M10 15v6M8 8h.01M12 8h.01M10 11h.01" stroke-width="3"/>',
    badminton: '<path d="M14 4l6 6-8 8-4-4z"/><circle cx="8" cy="16" r="2"/><path d="M6 18l-2 2"/>',
    tabletennis: '<circle cx="10" cy="10" r="6"/><path d="M14 14l5 5"/><circle cx="19" cy="7" r="1.5"/>',
    swimming: '<path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><circle cx="16" cy="7" r="2"/><path d="M4 11l5-3 4 3"/>',
    athletics: '<rect x="3" y="7" width="18" height="10" rx="5"/><rect x="7" y="10" width="10" height="4" rx="2"/>',
    ceremony: '<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>'
  };
  function icon(name, cls) {
    return '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICON[name] || "") + '</svg>';
  }
  function unitWord(ev) {
    if (!ev.court) return "";
    var w = (ev.sport === "tennis" || ev.sport === "padel") ? t("court") :
            (ev.sport === "football" || ev.sport === "rugby") ? t("pitch") : t("hall");
    return w;
  }

  // ---- school picker
  function renderPick() {
    var q = "";
    app.innerHTML = h`
      <div class="pick-head">
        <img src="assets/panoramic-view-from-bratislava-castle.jpg" width="1920" height="864" alt="${state.lang === "sk" ? "Bratislava od hradu: Most SNP, Dunaj a Petržalka" : "Bratislava from the castle: the SNP bridge, the Danube and Petržalka"}" decoding="async">
        <div class="scrim" aria-hidden="true"></div>
        <div class="page page-plain"><h1>${t("pickTitle")}</h1><p class="lead">${t("pickLead")}</p></div>
      </div>
      <div class="page page-plain">
      <div class="search-wrap">${raw(icon("search"))}<input class="search" id="q" type="search" placeholder="${t("search")}" autocomplete="off" aria-label="${t("search")}"></div>
      <div id="schoolList"></div>
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

  // ---- shared: gate strip (days) + capsule filters (sports) + sign rows
  function dayTabs(countFn) {
    return h`<div class="gates"><div class="gates-inner" role="tablist">${raw(DAYS.map(function (d) {
      var n = countFn ? countFn(d.d) : null;
      var isToday = d.d === todayISO();
      var cls = "gate" + (d.d === state.day ? " on" : "") + (isToday ? " today" : "");
      return h`<button class="${cls}" data-day="${d.d}" role="tab" aria-selected="${d.d === state.day}" type="button">
        <span>${state.lang === "sk" ? d.sk : d.en}</span><b>${d.num.split(".")[0]}.</b><span class="n">${n != null ? n : ""}</span></button>`;
    }).join(""))}</div></div>`;
  }
  function sportChips(sports, counts) {
    var all = h`<button class="chip${state.sport === "all" ? " on" : ""}" data-sport="all" type="button">${state.lang === "sk" ? "Všetko" : "All"}</button>`;
    return h`<div class="chips">${raw(all)}${raw(sports.map(function (s) {
      var c = SPORTS[s] ? SPORTS[s].c : "#888";
      var n = counts && counts[s] ? h`<span class="cnt">${counts[s]}</span>` : "";
      return h`<button class="chip${state.sport === s ? " on" : ""}" data-sport="${s}" type="button" style="--z:${c}"><span class="dot"></span>${sportName(s)}${raw(n)}</button>`;
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

  function resultOf(ev) {
    var a = ev.resA || "", b = ev.resB || "";
    if (a && b) return a + " : " + b;
    return a || b;
  }
  function eventCard(ev, sid, markNext) {
    var st = statusOf(ev);
    if (markNext && !st) st = "next";
    var result = resultOf(ev);
    if (result) st = "done";
    var A = sideLabel(ev.a, sid, ev), B = sideLabel(ev.b, sid, ev);
    var sp = SPORTS[ev.sport] || { c: "#888" };
    var badge = result ? h`<span class="badge score">${t("result")} ${result}</span>` :
                st === "live" ? h`<span class="badge live">${t("live")}</span>` :
                st === "next" ? h`<span class="badge next">${t("next")}</span>` : "";
    var cat = catLabel(ev.cat);
    var meta = [];
    var v = VENUES[ev.venue];
    if (v) meta.push(h`<a href="${mapsUrl(ev.venue)}" target="_blank" rel="noopener">${raw(icon("pin"))}${v.name}</a>`);
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
        if (S.extra) s += h` <span class="player squad">(${S.extra})</span>`;
        if (S.player) s += h` <span class="player">${S.player}</span>`;
        return s;
      }
      match = h`<div class="match">${raw(side(A))} <span class="vs">vs</span> ${raw(side(B))}</div>`;
    }
    var plate = ev.court
      ? h`<a class="plate" href="${mapsUrl(ev.venue)}" target="_blank" rel="noopener" aria-label="${unitWord(ev)} ${ev.court}, ${t("map")}">${ev.court}<small>${unitWord(ev)}${raw(icon("dir"))}</small></a>`
      : h`<a class="plate" href="${mapsUrl(ev.venue)}" target="_blank" rel="noopener" aria-label="${t("map")}">${raw(icon("arrow"))}<small>${t("map")}</small></a>`;
    return h`<li class="ev ${st}" style="--z:${sp.c};--zt:${sp.t || sp.c}">
      <div class="time">${ev.time}</div>
      <div class="zone" style="background:${sp.c}">${raw(icon(ev.sport))}</div>
      <div class="main">
        <div class="sport">${sportName(ev.sport)}${cat ? raw(' <span class="cat">· ' + esc(cat) + '</span>') : ""} ${raw(badge)}</div>
        ${raw(match)}
        <div class="meta">${raw(meta.join(" · "))}</div>
      </div>
      ${raw(plate)}</li>`;
  }

  function eventList(list, sid) {
    if (!list.length) return "";
    var nextIdx = -1;
    if (state.day === todayISO()) {
      for (var i = 0; i < list.length; i++) { if (!statusOf(list[i]) && !resultOf(list[i])) { nextIdx = i; break; } }
    }
    return h`<ul class="events">${raw(list.map(function (e, i) { return eventCard(e, sid, i === nextIdx); }).join(""))}</ul>`;
  }

  // ---- rules
  function renderRules() {
    var L = state.lang;
    var keys = RULES_KEY[L].map(function (k) { return h`<li>${k}</li>`; }).join("");
    var secs = RULES.map(function (r) {
      var x = r[L];
      return h`<section class="rule">
        <h2>${x.t}</h2>
        ${raw((x.p || []).map(function (q) { return h`<p>${q}</p>`; }).join(""))}
        ${raw(x.li ? "<ul>" + x.li.map(function (q) { return h`<li>${q}</li>`; }).join("") + "</ul>" : "")}
      </section>`;
    }).join("");
    var back = "#/" + (state.school ? "s/" + state.school : "pick");
    app.innerHTML = h`
      ${raw(destPanel(t("rulesTitle"), t("rulesLead"), back, state.school ? t("mine") : t("back")))}
      <div class="page page-plain">
        <h2 class="sec-title">${t("rulesKey")}</h2>
        <ul class="keys">${raw(keys)}</ul>
        <h2 class="sec-title">${t("rulesAll")}</h2>
        <div class="rules">${raw(secs)}</div>
        <p class="rules-pdf"><a href="${RULES_PDF}" target="_blank" rel="noopener">${t("rulesPdf")}</a></p>
      </div>`;
  }

  // ---- parties
  function renderParty() {
    var L = state.lang;
    var nights = PARTIES.map(function (n) {
      var day = DAYS.filter(function (q) { return q.d === n.d; })[0];
      var num = n.d.slice(8).replace(/^0/, "");
      var map = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(n.club + ", " + n.addr);
      return h`<div class="night${n.final ? " final" : ""}">
        <div class="ndate"><b>${num}.</b><span>${day ? (L === "sk" ? day.sk : day.en) : ""}</span></div>
        <div class="nbody">
          ${raw(n.final ? h`<div class="nfinal">${t("partyFinal")}</div>` : "")}
          <div class="vname">${n.club}</div>
          <div class="addr">${n.addr}</div>
        </div>
        <a class="plate" href="${map}" target="_blank" rel="noopener" aria-label="${n.club}, ${t("map")}">${raw(icon("pin"))}${t("map")}</a>
      </div>`;
    }).join("");
    var back = "#/" + (state.school ? "s/" + state.school : "pick");
    app.innerHTML = h`
      ${raw(destPanel(t("partyTitle"), t("partyLead"), back, state.school ? t("mine") : t("back")))}
      <div class="page page-plain">
        <div class="party">
          <div class="nights">${raw(nights)}</div>
          <div class="party-side">
            <a class="btn primary big" href="${PARTY_URL}" target="_blank" rel="noopener">${t("partyBook")} ${raw(icon("arrow"))}</a>
            <h2 class="sec-title">${t("partyBring")}</h2>
            <ul class="bring">${raw(t("partyBringList").map(function (q) { return h`<li>${q}</li>`; }).join(""))}</ul>
          </div>
        </div>
      </div>`;
  }
  function destPanel(title, lead, backHref, backLabel) {
    return h`<div class="dest"><div class="dest-inner">
      <div><h1>${title}</h1><p class="lead">${lead}</p></div>
      <a class="btn" href="${backHref}">${backLabel}</a>
    </div></div>`;
  }

  // ---- school view
  function renderSchool(sid) {
    var s = SCHOOLS[sid];
    var sports = schoolSports(sid);
    var mine = EVENTS.filter(function (e) { return involves(e, sid) || e.all; });
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
          return h`<details class="playoff"><summary>${raw(icon("chev"))}${t("playoff")}: ${sportName(first.sport)} ${catLabel(first.cat)} · ${nMatches(g.length)}, ${v ? v.name : ""} ${state.lang === "sk" ? "od" : "from"} ${first.time}</summary>
            <p class="day-note">${t("playoffNote")}</p>${raw(eventList(g, sid))}</details>`;
        }).join("");
      }
    }

    var todayN = mine.filter(function (e) { return e.day === state.day; }).length;
    var lead = s.country + " · " + nSports(sports.length) + " · " + nMatches(todayN);
    var links = "";
    app.innerHTML = h`
      <div class="page">
      <aside class="side"><div class="side-in">
      ${raw(destPanel(shortName(s.name), shortName(s.name) === s.name ? lead : s.name + " · " + lead, "#/pick", t("change")))}
      ${raw(dayTabs(dayCount))}
      ${raw(sportChips(sports, sportCounts))}
      ${raw(links)}
      </div></aside>
      <div id="list" class="board">${raw(body)}</div>
      <div class="pdf-block">
      <h2>${t("pdfTitle")}</h2><p class="day-note">${t("pdfLead")}</p>
      <ul class="pdf-list">${raw(PDFS.map(function (p) {
        return h`<li><a href="${p.url}" target="_blank" rel="noopener">${state.lang === "sk" ? p.sk : p.en}</a></li>`; }).join(""))}</ul>
      </div>
      </div>`;
  }

  // ---- all matches
  function renderAll() {
    var sports = Object.keys(SPORTS).filter(function (k) { return EVENTS.some(function (e) { return e.sport === k && !e.extra; }); });
    var dayEvents = EVENTS.filter(function (e) { return e.day === state.day && !e.extra; });
    var counts = {};
    dayEvents.forEach(function (e) { counts[e.sport] = (counts[e.sport] || 0) + 1; });
    var list = dayEvents.filter(function (e) { return state.sport === "all" || e.sport === state.sport; });
    var byVenue = {};
    list.forEach(function (e) { var k = e.venue || "?"; (byVenue[k] = byVenue[k] || []).push(e); });
    var body = Object.keys(byVenue).map(function (k) {
      var v = VENUES[k];
      return h`<h2>${v ? v.name : "?"} <small>(${nMatches(byVenue[k].length)})</small></h2>${raw(eventList(byVenue[k], state.school))}`;
    }).join("");
    var backHref = "#/" + (state.school ? "s/" + state.school : "pick");
    app.innerHTML = h`
      <div class="page">
      <aside class="side"><div class="side-in">
      ${raw(destPanel(t("allMatches"), t("allLead"), backHref, state.school ? t("mine") : t("back")))}
      ${raw(dayTabs(function (d) { return EVENTS.filter(function (e) { return e.day === d && !e.extra; }).length; }))}
      ${raw(sportChips(sports, counts))}
      </div></aside>
      <div class="board">${raw(body || h`<p class="empty">${t("noEvents")}</p>`)}</div>
      </div>`;
  }

  // ---- venues
  function renderVenues() {
    var body = Object.keys(VENUES).map(function (k) {
      var v = VENUES[k];
      var sports = {};
      EVENTS.forEach(function (e) { if (e.venue === k) sports[e.sport] = true; });
      var todayN = EVENTS.filter(function (e) { return e.venue === k && e.day === state.day; }).length;
      return h`<div class="venue">
        <div class="vbody">
          <div class="vname">${v.name}</div>
          <div class="addr">${v.addr}, Bratislava</div>
          <div class="vsports">${Object.keys(sports).map(sportName).join(", ")}${todayN ? " · " + dayName(state.day) + ": " + nMatches(todayN) : ""}</div>
        </div>
        <a class="plate" href="${mapsUrl(k)}" target="_blank" rel="noopener" aria-label="${v.name}, ${t("map")}">${raw(icon("pin"))}${t("map")}</a>
      </div>`;
    }).join("");
    app.innerHTML = h`
      ${raw(destPanel(t("venues"), t("venuesLead"), "#/" + (state.school ? "s/" + state.school : "pick"), state.school ? t("mine") : t("back")))}
      <div class="page page-plain"><div class="venue-grid">${raw(body)}</div></div>`;
  }

  // ------------------------------------------------------------ boot
  document.getElementById("langBtn").addEventListener("click", function () {
    state.lang = state.lang === "sk" ? "en" : "sk";
    store.set("wiuc.lang", state.lang);
    render();
  });
  window.addEventListener("hashchange", function () { render(); });
  render();
  function checkForUpdate() {
    if (document.hidden || !window.fetch || location.protocol === "file:") return;
    fetch("data.js?t=" + Date.now(), { cache: "no-store" }).then(function (r) { return r.ok ? r.text() : ""; }).then(function (txt) {
      var m = /"generated":"([^"]+)"/.exec(txt || "");
      if (!m || m[1] === DATA.generated || document.getElementById("updateBar")) return;
      var bar = document.createElement("div");
      bar.id = "updateBar";
      bar.className = "update-bar";
      bar.innerHTML = h`<span>${t("updated")}</span><button class="btn primary" type="button">${t("reload")}</button>`;
      bar.querySelector("button").addEventListener("click", function () { location.reload(); });
      document.body.appendChild(bar);
    }).catch(function () {});
  }
  setInterval(checkForUpdate, 5 * 60000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) checkForUpdate(); });

  setInterval(function () { if (route().view !== "pick") { var y = window.scrollY; render(true); window.scrollTo(0, y); } }, 60000);
})();
