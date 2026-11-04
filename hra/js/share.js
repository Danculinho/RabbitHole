// Wordle-style shareable result.
window.RH = window.RH || {};

RH.share = (function () {
  function emojiFor(points) {
    if (points >= 3) return '🟢';
    if (points >= 1) return '🟡';
    return '🔴';
  }

  function buildText(state) {
    var grid = '';
    for (var i = 0; i < RH.game.QUESTION_COUNT; i++) {
      grid += emojiFor(RH.game.questionScore(state, i));
    }
    var label = state.freePlay
      ? RH.i18n.pick(RH.game.chain(state).title)
      : RH.i18n.t('puzzleNumber') + ' ' + state.puzzleNumber;
    var header = '⚽ ' + RH.i18n.t('appName') + ' — ' + label;
    var score = RH.game.bankedScore(state) + '/' + RH.game.MAX_SCORE;

    var lines = [header, score, grid];
    if (!state.freePlay) {
      var stats = RH.storage.getStats();
      var rank = RH.i18n.t('rank.' + RH.awards.rankFor(stats.totalScore).rank.id);
      var tail = rank;
      if (stats.streak > 1) tail += ' · 🔥 ' + stats.streak;
      lines.push(tail);
    }
    return lines.join('\n');
  }

  // Clipboard API needs a secure context, which file:// is not — hence the
  // execCommand fallback so sharing still works when testing locally.
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '-1000px';
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(area);
      ok ? resolve() : reject(new Error('copy failed'));
    });
  }

  return { buildText: buildText, copy: copy, emojiFor: emojiFor };
})();
