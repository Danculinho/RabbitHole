// Career ranks and the trophy cabinet — the reasons to come back tomorrow.
window.RH = window.RH || {};

RH.awards = (function () {
  // Career ladder, driven by all-time points. Thresholds are spaced so the
  // first few ranks arrive quickly and the last one takes real commitment.
  var RANKS = [
    { id: 'ballboy', min: 0 },
    { id: 'reserve', min: 25 },
    { id: 'sub', min: 70 },
    { id: 'starter', min: 140 },
    { id: 'regular', min: 240 },
    { id: 'captain', min: 380 },
    { id: 'international', min: 560 },
    { id: 'legend', min: 800 }
  ];

  // Each test receives the summary built by summarise() below.
  var ACHIEVEMENTS = [
    { id: 'first-goal', icon: '⚽', test: function (c) { return c.stats.played >= 1; } },
    { id: 'clean-sheet', icon: '🧤', test: function (c) { return c.score === RH.game.MAX_SCORE; } },
    { id: 'no-var', icon: '🎯', test: function (c) { return c.hintsUsed === 0; } },
    { id: 'solo-run', icon: '🏃', test: function (c) { return c.firstTry >= 5; } },
    { id: 'hat-trick', icon: '🎩', test: function (c) { return c.stats.streak >= 3; } },
    { id: 'week-in-squad', icon: '📅', test: function (c) { return c.stats.streak >= 7; } },
    { id: 'comeback', icon: '💪', test: function (c) { return c.zeroes > 0 && c.score >= 15; } },
    { id: 'golden-boot', icon: '👟', test: function (c) { return c.stats.totalScore >= 100; } },
    { id: 'club-legend', icon: '🏆', test: function (c) { return c.stats.totalScore >= 500; } },
    { id: 'polyglot', icon: '🌍', test: function (c) { return c.langs.length >= 2; } },
    { id: 'marathon', icon: '🏅', test: function (c) { return c.stats.played >= 10; } },
    { id: 'archivist', icon: '📚', test: function (c) { return c.chains.length >= RH_PUZZLES.chains.length; } }
  ];

  function rankFor(totalScore) {
    var index = 0;
    for (var i = 0; i < RANKS.length; i++) {
      if (totalScore >= RANKS[i].min) index = i;
    }
    var next = RANKS[index + 1] || null;
    var floor = RANKS[index].min;
    return {
      rank: RANKS[index],
      index: index,
      next: next,
      pointsToNext: next ? next.min - totalScore : 0,
      // Fraction of the way from this rank's threshold to the next one.
      progress: next ? Math.min(1, (totalScore - floor) / (next.min - floor)) : 1
    };
  }

  // Flattens a finished game plus lifetime stats into the shape the tests read.
  function summarise(state, stats) {
    var hintsUsed = 0;
    var firstTry = 0;
    var zeroes = 0;
    for (var i = 0; i < RH.game.QUESTION_COUNT; i++) {
      if (state.hintUsed[i]) hintsUsed++;
      if (state.solved[i] && !state.usedChoice[i]) firstTry++;
      if (RH.game.questionScore(state, i) === 0) zeroes++;
    }
    return {
      state: state,
      stats: stats,
      score: RH.game.bankedScore(state),
      hintsUsed: hintsUsed,
      firstTry: firstTry,
      zeroes: zeroes,
      langs: RH.storage.getLangsPlayed(),
      chains: RH.storage.getChainsPlayed()
    };
  }

  // Runs every test and persists anything newly earned. Returns only the
  // achievements unlocked by this game, so the results screen can call them out.
  function evaluate(state, stats) {
    var context = summarise(state, stats);
    var owned = RH.storage.getAwards();
    var fresh = [];
    ACHIEVEMENTS.forEach(function (award) {
      if (owned[award.id]) return;
      var passed = false;
      try { passed = !!award.test(context); } catch (err) { passed = false; }
      if (!passed) return;
      RH.storage.unlockAward(award.id);
      fresh.push(award);
    });
    return fresh;
  }

  function all() { return ACHIEVEMENTS.slice(); }

  function byId(id) {
    for (var i = 0; i < ACHIEVEMENTS.length; i++) {
      if (ACHIEVEMENTS[i].id === id) return ACHIEVEMENTS[i];
    }
    return null;
  }

  // Milliseconds until the next local midnight, when a new hole opens.
  function msUntilNextPuzzle(now) {
    var d = now || new Date();
    var next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    return next.getTime() - d.getTime();
  }

  function formatCountdown(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    var pad = function (n) { return String(n).padStart(2, '0'); };
    return pad(h) + ':' + pad(m) + ':' + pad(s);
  }

  return {
    RANKS: RANKS,
    ACHIEVEMENTS: ACHIEVEMENTS,
    rankFor: rankFor,
    evaluate: evaluate,
    all: all,
    byId: byId,
    msUntilNextPuzzle: msUntilNextPuzzle,
    formatCountdown: formatCountdown
  };
})();
