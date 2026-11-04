// localStorage wrapper. Everything degrades to in-memory if storage is blocked.
window.RH = window.RH || {};

RH.storage = (function () {
  var PREFIX = 'rh.';
  var memory = {};
  var available = (function () {
    try {
      var probe = PREFIX + 'probe';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      return true;
    } catch (err) {
      return false;
    }
  })();

  function read(key) {
    if (!available) return memory[key] != null ? memory[key] : null;
    try { return window.localStorage.getItem(PREFIX + key); } catch (err) { return null; }
  }

  function write(key, value) {
    if (!available) { memory[key] = value; return; }
    try { window.localStorage.setItem(PREFIX + key, value); } catch (err) { /* quota or private mode */ }
  }

  function readJSON(key, fallback) {
    var raw = read(key);
    if (!raw) return fallback;
    try { return JSON.parse(raw); } catch (err) { return fallback; }
  }

  function writeJSON(key, value) {
    write(key, JSON.stringify(value));
  }

  function getLang() {
    var stored = read('lang');
    if (stored === 'sk' || stored === 'en') return stored;
    var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.indexOf('sk') === 0 || nav.indexOf('cs') === 0 ? 'sk' : 'en';
  }

  function setLang(lang) { write('lang', lang); }

  function getDay(dateKey) { return readJSON('day.' + dateKey, null); }
  function setDay(dateKey, state) { writeJSON('day.' + dateKey, state); }

  function defaultStats() {
    return { played: 0, totalScore: 0, perfect: 0, streak: 0, maxStreak: 0, lastPlayedDateKey: null };
  }

  function getStats() {
    var s = readJSON('stats', null);
    if (!s || typeof s !== 'object') return defaultStats();
    var base = defaultStats();
    Object.keys(base).forEach(function (k) { if (s[k] == null) s[k] = base[k]; });
    return s;
  }

  // Called once per completed daily puzzle; free play never gets here.
  function recordResult(dateKey, score, maxScore) {
    var stats = getStats();
    if (stats.lastPlayedDateKey === dateKey) return stats;

    var yesterday = null;
    var d = RH.daily.parseDateKey(dateKey);
    if (d) {
      d.setDate(d.getDate() - 1);
      yesterday = RH.daily.toDateKey(d);
    }

    stats.streak = stats.lastPlayedDateKey === yesterday ? stats.streak + 1 : 1;
    stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
    stats.played += 1;
    stats.totalScore += score;
    if (score === maxScore) stats.perfect += 1;
    stats.lastPlayedDateKey = dateKey;
    writeJSON('stats', stats);
    return stats;
  }

  function getAwards() { return readJSON('awards', {}) || {}; }

  function unlockAward(id) {
    var awards = getAwards();
    if (awards[id]) return false;
    // Stored as a date key rather than `true` so the cabinet can show when
    // each trophy was won.
    awards[id] = RH.daily.toDateKey(new Date());
    writeJSON('awards', awards);
    return true;
  }

  function readList(key) {
    var list = readJSON(key, []);
    return Array.isArray(list) ? list : [];
  }

  function addToList(key, value) {
    var list = readList(key);
    if (list.indexOf(value) !== -1) return list;
    list.push(value);
    writeJSON(key, list);
    return list;
  }

  function getChainsPlayed() { return readList('chainsPlayed'); }
  function markChainPlayed(chainId) { return addToList('chainsPlayed', chainId); }

  function getLangsPlayed() { return readList('langsPlayed'); }
  function markLangPlayed(lang) { return addToList('langsPlayed', lang); }

  return {
    available: available,
    getLang: getLang,
    setLang: setLang,
    getDay: getDay,
    setDay: setDay,
    getStats: getStats,
    recordResult: recordResult,
    getAwards: getAwards,
    unlockAward: unlockAward,
    getChainsPlayed: getChainsPlayed,
    markChainPlayed: markChainPlayed,
    getLangsPlayed: getLangsPlayed,
    markLangPlayed: markLangPlayed
  };
})();
