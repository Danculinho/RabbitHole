// Which chain belongs to which day, plus ?date= / ?chain= overrides for testing.
window.RH = window.RH || {};

RH.daily = (function () {
  var DAY_MS = 86400000;

  function midnight(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  }

  function parseDateKey(key) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(key || ''));
    if (!m) return null;
    var d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return isNaN(d.getTime()) ? null : d;
  }

  function toDateKey(date) {
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var dd = String(date.getDate()).padStart(2, '0');
    return date.getFullYear() + '-' + mm + '-' + dd;
  }

  function dayNumber(date) {
    var epoch = parseDateKey(RH_PUZZLES.epoch) || new Date(2026, 7, 19);
    return Math.floor((midnight(date) - midnight(epoch)) / DAY_MS);
  }

  function chainById(id) {
    for (var i = 0; i < RH_PUZZLES.chains.length; i++) {
      if (RH_PUZZLES.chains[i].id === id) return RH_PUZZLES.chains[i];
    }
    return null;
  }

  function chainForDate(date) {
    var n = RH_PUZZLES.chains.length;
    var idx = ((dayNumber(date) % n) + n) % n;
    return RH_PUZZLES.chains[idx];
  }

  // Resolves what the player should be served right now: today's puzzle, a
  // date override, or a free-play chain that never touches stats.
  function resolve(search) {
    var params = new URLSearchParams(search || window.location.search);
    var freeId = params.get('chain');
    if (freeId) {
      var free = chainById(freeId);
      if (free) return { chain: free, dateKey: null, puzzleNumber: null, freePlay: true };
    }
    var date = parseDateKey(params.get('date')) || new Date();
    return {
      chain: chainForDate(date),
      dateKey: toDateKey(date),
      puzzleNumber: dayNumber(date) + 1,
      freePlay: false
    };
  }

  return {
    resolve: resolve,
    chainById: chainById,
    chainForDate: chainForDate,
    dayNumber: dayNumber,
    toDateKey: toDateKey,
    parseDateKey: parseDateKey
  };
})();
