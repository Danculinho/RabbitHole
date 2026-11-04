// Hand-entered rows that are NOT in the organiser's Google Sheets
// (individual sports published only as PDF). Source: STU BA "Rozlosovanie" sheets.
// Same shape as events in data.js. Edit by hand.
window.WIUC_EXTRA = (function () {
  var STU = "slovak-university-of-technology-in-bratislava";
  function stu(player) { return { label: "STU BA", school: STU, squad: null, player: player || "" }; }
  function opp(label) { return { label: label, school: null, squad: null, player: "" }; }
  function ev(day, time, sport, cat, venue, a, b, note) {
    return { sport: sport, cat: cat, day: day, time: time, venue: venue, court: null,
      a: a, b: b, pool: "", stage: note || "", game: "", resA: "", resB: "", extra: true };
  }
  var TH = "2026-11-05", FR = "2026-11-06";
  return [
    // ---- Thursday 5.11 ----
    ev(TH, "09:00", "swimming", "X", "plavaren", stu("AD, OP, ML, TG, BI, JZ, DD, MŠ, NH, LĎ, MR"), opp(""), "50 m voľný spôsob, kvalifikácia + finále (09:00 až 13:30)"),
    ev(TH, "09:00", "swimming", "X", "plavaren", stu("Semanko, Škodný"), opp(""), "50 m znak, kvalifikácia + finále (09:00 až 13:30)"),
    ev(TH, "09:00", "swimming", "X", "plavaren", stu("Jablčník, Labanič"), opp(""), "200 m polohové preteky, kvalifikácia + finále (09:00 až 13:30)"),
    ev(TH, "09:00", "swimming", "X", "plavaren", stu("Jablčník, Labanič, Bartolčičová, Hlavatá"), opp(""), "4x50 m voľný spôsob MIX, kvalifikácia + finále (09:00 až 13:30)"),
    ev(TH, "11:00", "athletics", "X", "stu-cas", stu("Tési, Beladič, Záborská, Medveczky"), opp(""), "Švédska štafeta, rozbehy"),
    ev(TH, "11:45", "athletics", "X", "stu-cas", stu("Medveczky, Semančák, Matrka, Adamovičová"), opp(""), "Beh na 1 míľu, rozbehy"),
    ev(TH, "12:45", "athletics", "X", "stu-cas", stu(""), opp(""), "Švédska štafeta, finále (podľa postupu)"),
    ev(TH, "09:00", "tabletennis", "M", "peugeot", stu("O. Homa"), opp("Skupina G, 3 zápasy")),
    ev(TH, "09:00", "tabletennis", "M", "peugeot", stu("Š. Bunček"), opp("Skupina H, 3 zápasy")),
    ev(TH, "09:00", "tabletennis", "M", "peugeot", stu("M. Hulík"), opp("Skupina I, 3 zápasy")),
    ev(TH, "09:00", "tabletennis", "M", "peugeot", stu("T. Sádecký"), opp("Skupina J, 3 zápasy")),
    ev(TH, "09:00", "tabletennis", "M", "peugeot", stu("F. Hradecký"), opp("Skupina K, 4 zápasy")),
    ev(TH, "09:00", "tabletennis", "M", "peugeot", stu("S. Nagy"), opp("Skupina L, 4 zápasy")),
    ev(TH, "09:00", "badminton", "M", "peugeot", stu("L. Bandič"), opp("Uni of Doha (M.G. Wijaya)")),
    ev(TH, "09:00", "badminton", "M", "peugeot", stu("J. Guláš"), opp("KU Leuven (M. Devos)")),
    ev(TH, "09:00", "badminton", "M", "peugeot", stu("L. Kudláč"), opp("KU Leuven (L. Adriansens)")),
    ev(TH, "09:30", "badminton", "M", "peugeot", stu("T. Adamko"), opp("KTH (M. Lele)")),
    ev(TH, "09:30", "badminton", "M", "peugeot", stu("M. Kacvinský"), opp("Czech Technical Uni (P. Hnilica)")),
    ev(TH, "10:30", "badminton", "M", "peugeot", stu("Š. Bystrický"), opp("Lebanese AU (I. Salloum)")),
    ev(TH, "11:30", "badminton", "W", "peugeot", stu("T. Kolárová"), opp("AU Cairo (N. Fawzy)")),
    ev(TH, "11:30", "badminton", "W", "peugeot", stu("M. Múdra"), opp("BU Egypt (F.M. Fikry)")),
    ev(TH, "12:00", "badminton", "M", "peugeot", stu("J. Guláš"), opp("Czech Technical Uni (A. Šulc)")),
    ev(TH, "12:00", "badminton", "M", "peugeot", stu("L. Bandič"), opp("KTH (I.A. Funcke)")),
    ev(TH, "12:30", "badminton", "M", "peugeot", stu("L. Kudláč"), opp("AU Cairo (O. Fawzy)")),
    ev(TH, "12:30", "badminton", "M", "peugeot", stu("T. Adamko"), opp("Uni St. Joseph de Beirut (CH.A. Younes)")),
    ev(TH, "13:00", "badminton", "M", "peugeot", stu("M. Kacvinský"), opp("EU BA (R. Nevlaha)")),
    ev(TH, "14:30", "badminton", "W", "peugeot", stu("T. Kolárová"), opp("Medical Uni of Plovdiv (H.A. Wellahewage)")),
    ev(TH, "15:30", "badminton", "X", "peugeot", stu("Š. Bystrický, M. Múdra"), opp("UK BA (S. Páleník, S. Šillingová)")),
    ev(TH, "16:00", "badminton", "X", "peugeot", stu("J. Guláš, T. Kolárová"), opp("EU BA (F. Mikulák, S. Cheriarina)")),
    ev(TH, "17:00", "badminton", "M", "peugeot", stu("Š. Bystrický"), opp("Bucharest Uni ES (A.C. Constantinof)")),
    ev(TH, "17:30", "badminton", "M", "peugeot", stu("J. Guláš"), opp("ISEP Paris (N. Clement)")),
    ev(TH, "17:30", "badminton", "W", "peugeot", stu("M. Múdra"), opp("UK BA (L. Kyselicová)")),
    // ---- Friday 6.11 ----
    ev(FR, "09:00", "swimming", "X", "plavaren", stu("OP, DL, TG, BI, SS, JZ, EB, LĎ, MR"), opp(""), "50 m motýlik, kvalifikácia + finále (09:00 až 14:30)"),
    ev(FR, "09:00", "swimming", "X", "plavaren", stu("Danis, Labanič, Babchenko, Luksaj, Rosul"), opp(""), "50 m prsia, kvalifikácia + finále (09:00 až 14:30)"),
    ev(FR, "09:00", "swimming", "X", "plavaren", stu("Jablčník, Labanič"), opp(""), "200 m voľný spôsob, kvalifikácia + finále (09:00 až 14:30)"),
    ev(FR, "09:00", "swimming", "X", "plavaren", stu("Semanko, Labanič, Jablčník, Danis"), opp(""), "4x50 m polohová štafeta, kvalifikácia + finále (09:00 až 14:30)"),
    ev(FR, "09:00", "swimming", "X", "plavaren", stu("ML, SS, JZ, FJ; MŠ, OP, BI, AD"), opp(""), "4x50 m voľný spôsob štafeta, kvalifikácia + finále (09:00 až 14:30)"),
    ev(FR, "09:00", "swimming", "X", "plavaren", stu("Bartolčičová, Rosul, Ďurišová, Hlavatá"), opp(""), "4x50 m voľný spôsob štafeta, kvalifikácia + finále (09:00 až 14:30)"),
    ev(FR, "11:00", "athletics", "X", "stu-cas", stu("FS, MM, TS, LM, VA"), opp(""), "Beh na 800 m, rozbehy"),
    ev(FR, "12:00", "athletics", "X", "stu-cas", stu("ET, FS, DZ, SB; LM, ZG, VA, TS"), opp(""), "Štafeta 4x400 m, rozbehy"),
    ev(FR, "16:45", "athletics", "X", "stu-cas", stu(""), opp(""), "Beh na 800 m, finále (podľa postupu)"),
    ev(FR, "09:30", "badminton", "M", "peugeot", stu("L. Kudláč"), opp("P-U Marburg (J. Schneider)")),
    ev(FR, "10:30", "badminton", "M", "peugeot", stu("M. Kacvinský"), opp("Uni St. Joseph de Beirut (A.B. Ghosn)")),
    ev(FR, "11:00", "badminton", "M", "peugeot", stu("L. Bandič"), opp("UK BA (M. Svoreň)")),
    ev(FR, "11:00", "badminton", "M", "peugeot", stu("T. Adamko"), opp("Lebanese AU (H. El Hajj)")),
    ev(FR, "11:30", "badminton", "M", "peugeot", stu("Š. Bystrický"), opp("UK BA (S. Páleník)")),
    ev(FR, "12:30", "badminton", "W", "peugeot", stu("T. Kolárová"), opp("Uni St. Joseph de Beirut (S.A. Ghosn)")),
    ev(FR, "13:00", "badminton", "M", "peugeot", stu("J. Guláš"), opp("P-U Marburg (J. Steinert)")),
    ev(FR, "13:00", "badminton", "W", "peugeot", stu("M. Múdra"), opp("KTH (S. Ronnquist)"))
  ];
})();
