// Answer matching: forgiving about case, diacritics, punctuation and small typos.
window.RH = window.RH || {};

RH.answers = (function () {
  // Keep in sync with normalize() in tools/validate.mjs.
  function normalize(input) {
    return String(input == null ? '' : input)
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^(the|fc|ac|as|sk|ss|ssc)\s+/, '');
  }

  // Two-row Levenshtein; bails out as soon as the whole row exceeds max.
  function levenshtein(a, b, max) {
    if (a === b) return 0;
    if (Math.abs(a.length - b.length) > max) return max + 1;

    let prev = new Array(b.length + 1);
    let curr = new Array(b.length + 1);
    for (let j = 0; j <= b.length; j++) prev[j] = j;

    for (let i = 1; i <= a.length; i++) {
      curr[0] = i;
      let rowMin = curr[0];
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
        if (curr[j] < rowMin) rowMin = curr[j];
      }
      if (rowMin > max) return max + 1;
      const swap = prev; prev = curr; curr = swap;
    }
    return prev[b.length];
  }

  // Every spelling we will accept, in either language, for one question.
  function acceptSet(question) {
    const set = new Set();
    ['en', 'sk'].forEach(function (lang) {
      (question.answer.accept[lang] || []).forEach(function (v) { set.add(normalize(v)); });
      set.add(normalize(question.answer.display[lang]));
    });
    set.delete('');
    return Array.from(set);
  }

  // Longer answers tolerate one typo; short ones must be exact, otherwise
  // "Xavi" would accept "Javi" and similar near-misses.
  function isCorrect(input, question) {
    const guess = normalize(input);
    if (!guess) return false;
    const candidates = acceptSet(question);
    if (candidates.indexOf(guess) !== -1) return true;
    if (guess.length < 6) return false;
    return candidates.some(function (c) {
      return c.length >= 6 && levenshtein(guess, c, 1) <= 1;
    });
  }

  return { normalize: normalize, levenshtein: levenshtein, acceptSet: acceptSet, isCorrect: isCorrect };
})();
