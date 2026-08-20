// UI strings. Puzzle content carries its own translations in data/puzzles.js.
window.RH = window.RH || {};

RH.i18n = (function () {
  var strings = {
    sk: {
      appName: 'Futbalová nora',
      tagline: 'Sedem otázok. Každá odpoveď otvára ďalšiu.',
      howToTitle: 'Ako sa to hrá',
      howTo1: 'Odpoveď na otázku sa stáva témou tej ďalšej. Čím hlbšie, tým ťažšie.',
      howTo2: 'Za otázku sú 3 body. Nápoveda stojí 1 bod.',
      howTo3: 'Zlá odpoveď stojí 1 bod a dostaneš druhú šancu — výber zo štyroch možností.',
      play: 'Padáme dolu',
      resume: 'Pokračovať',
      puzzleNumber: 'Nora č.',
      freePlay: 'Voľná hra',
      depth: 'Hĺbka',
      topicLabel: 'Téma',
      answerPlaceholder: 'Tvoja odpoveď…',
      submit: 'Potvrdiť',
      hint: 'Nápoveda',
      hintCost: '−1 bod',
      hintLabel: 'Nápoveda:',
      pickOne: 'Skús to ešte raz — vyber jednu z možností:',
      correct: 'Správne!',
      wrongTryAgain: 'Nie je to ono. Vyber z možností:',
      wrongFinal: 'Ani jedna. Správna odpoveď:',
      correctAnswerWas: 'Správna odpoveď:',
      next: 'Ďalej',
      seeResults: 'Výsledky',
      points: 'b.',
      pointsFor: 'bodov za túto otázku',
      resultsTitle: 'Vynoril si sa',
      yourScore: 'Tvoje skóre',
      outOf: 'z',
      recap: 'Prehľad odpovedí',
      share: 'Zdieľať výsledok',
      copied: 'Skopírované!',
      copyFailed: 'Kopírovanie zlyhalo — text si označ ručne.',
      statsTitle: 'Štatistiky',
      statPlayed: 'Odohraných',
      statAverage: 'Priemer',
      statStreak: 'Séria',
      statPerfect: 'Bez chyby',
      archive: 'Archív nôr',
      archiveTitle: 'Vyber si noru',
      archiveNote: 'Voľná hra sa nezapočítava do štatistík.',
      back: 'Späť',
      alreadyPlayed: 'Dnešnú noru už máš za sebou.',
      playAnother: 'Zahrať si inú',
      perfectPraise: 'Perfektné! Ani škrabnutie.',
      goodPraise: 'Slušný zostup.',
      okPraise: 'Do cieľa si sa dostal.',
      poorPraise: 'Nabudúce hlbšie.',
      langLabel: 'English'
    },
    en: {
      appName: 'The Football Hole',
      tagline: 'Seven questions. Every answer opens the next.',
      howToTitle: 'How it works',
      howTo1: 'Each answer becomes the topic of the next question. The deeper you go, the harder it gets.',
      howTo2: 'Every question is worth 3 points. A hint costs 1 point.',
      howTo3: 'A wrong answer costs 1 point and gives you a second chance — pick from four options.',
      play: 'Start falling',
      resume: 'Resume',
      puzzleNumber: 'Hole No.',
      freePlay: 'Free play',
      depth: 'Depth',
      topicLabel: 'Topic',
      answerPlaceholder: 'Your answer…',
      submit: 'Submit',
      hint: 'Hint',
      hintCost: '−1 point',
      hintLabel: 'Hint:',
      pickOne: 'Try once more — pick an option:',
      correct: 'Correct!',
      wrongTryAgain: 'Not quite. Pick from these:',
      wrongFinal: 'Neither. The answer was:',
      correctAnswerWas: 'The answer:',
      next: 'Next',
      seeResults: 'See results',
      points: 'pts',
      pointsFor: 'points for this question',
      resultsTitle: 'You resurfaced',
      yourScore: 'Your score',
      outOf: 'of',
      recap: 'Answer recap',
      share: 'Share result',
      copied: 'Copied!',
      copyFailed: 'Copy failed — select the text manually.',
      statsTitle: 'Stats',
      statPlayed: 'Played',
      statAverage: 'Average',
      statStreak: 'Streak',
      statPerfect: 'Perfect',
      archive: 'Hole archive',
      archiveTitle: 'Pick a hole',
      archiveNote: 'Free play does not count towards your stats.',
      back: 'Back',
      alreadyPlayed: "You've already played today's hole.",
      playAnother: 'Play another one',
      perfectPraise: 'Flawless. Not a scratch.',
      goodPraise: 'A solid descent.',
      okPraise: 'You made it to the bottom.',
      poorPraise: 'Go deeper next time.',
      langLabel: 'Slovensky'
    }
  };

  var current = 'en';

  function setLang(lang) {
    current = strings[lang] ? lang : 'en';
    document.documentElement.setAttribute('lang', current);
    RH.storage.setLang(current);
  }

  function lang() { return current; }

  function other() { return current === 'sk' ? 'en' : 'sk'; }

  function t(key) {
    var table = strings[current] || strings.en;
    return table[key] != null ? table[key] : key;
  }

  // Pulls the right language out of a { en, sk } content field.
  function pick(field) {
    if (!field) return '';
    return field[current] != null ? field[current] : field.en;
  }

  return { setLang: setLang, lang: lang, other: other, t: t, pick: pick };
})();
