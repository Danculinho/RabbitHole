// DOM rendering and event wiring. All game rules live in js/game.js.
(function () {
  var $ = function (id) { return document.getElementById(id); };

  var el = {
    screens: {
      intro: $('screen-intro'),
      question: $('screen-question'),
      results: $('screen-results'),
      archive: $('screen-archive')
    },
    langToggle: $('lang-toggle'),
    introNumber: $('intro-number'),
    introNotice: $('intro-notice'),
    btnPlay: $('btn-play'),
    btnArchiveIntro: $('btn-archive-intro'),
    depth: $('depth'),
    depthCount: $('depth-count'),
    card: $('question-card'),
    topicValue: $('topic-value'),
    questionText: $('question-text'),
    hintBox: $('hint-box'),
    hintText: $('hint-text'),
    answerForm: $('answer-form'),
    answerInput: $('answer-input'),
    choices: $('choices'),
    verdict: $('verdict'),
    btnHint: $('btn-hint'),
    btnNext: $('btn-next'),
    resultsNumber: $('results-number'),
    scoreValue: $('score-value'),
    scoreMax: $('score-max'),
    praise: $('praise'),
    resultGrid: $('result-grid'),
    btnShare: $('btn-share'),
    stats: $('stats'),
    statPlayed: $('stat-played'),
    statAverage: $('stat-average'),
    statStreak: $('stat-streak'),
    statPerfect: $('stat-perfect'),
    recap: $('recap'),
    btnArchiveResults: $('btn-archive-results'),
    archiveList: $('archive-list'),
    btnArchiveBack: $('btn-archive-back'),
    toast: $('toast')
  };

  var state = null;
  var currentScreen = 'intro';
  var resolved = null;
  var lastRenderedIndex = -1;

  var reducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  function persist() {
    if (state && !state.freePlay && state.dateKey) {
      RH.storage.setDay(state.dateKey, state);
    }
  }

  function showScreen(name) {
    currentScreen = name;
    Object.keys(el.screens).forEach(function (key) {
      el.screens[key].classList.toggle('hidden', key !== name);
    });
    window.scrollTo(0, 0);
  }

  function toast(message) {
    el.toast.textContent = message;
    el.toast.classList.add('toast--on');
    window.setTimeout(function () { el.toast.classList.remove('toast--on'); }, 2200);
  }

  function applyStaticStrings() {
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = RH.i18n.t(nodes[i].getAttribute('data-i18n'));
    }
    el.answerInput.setAttribute('placeholder', RH.i18n.t('answerPlaceholder'));
    document.title = RH.i18n.t('appName');
  }

  // --- Intro -------------------------------------------------------------

  function renderIntro() {
    var finished = state && state.done;
    el.introNumber.textContent = resolved.freePlay
      ? RH.i18n.pick(resolved.chain.title)
      : RH.i18n.t('puzzleNumber') + ' ' + resolved.puzzleNumber;

    var inProgress = state && !state.done && (state.qIndex > 0 || state.phase !== RH.game.PHASE.INPUT);
    el.btnPlay.textContent = finished
      ? RH.i18n.t('seeResults')
      : (inProgress ? RH.i18n.t('resume') : RH.i18n.t('play'));
    el.introNotice.classList.toggle('hidden', !finished);
    el.btnArchiveIntro.textContent = RH.i18n.t('archive');
  }

  // --- Question ----------------------------------------------------------

  function renderDepth() {
    var html = '';
    for (var i = 0; i < RH.game.QUESTION_COUNT; i++) {
      var cls = 'depth__seg';
      if (i < state.qIndex) cls += ' is-past';
      else if (i === state.qIndex) cls += ' is-now';
      html += '<span class="' + cls + '"></span>';
    }
    el.depth.innerHTML = html;
    el.depthCount.textContent = (state.qIndex + 1) + '/' + RH.game.QUESTION_COUNT;
  }

  function renderChoices() {
    var q = RH.game.question(state);
    var order = RH.game.shuffledChoices(state);
    var lang = RH.i18n.lang();
    el.choices.innerHTML = '';
    order.forEach(function (slot) {
      var label = slot === -1
        ? RH.i18n.pick(q.answer.display)
        : q.distractors[lang][slot];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice';
      btn.textContent = label;
      btn.setAttribute('data-slot', String(slot));
      el.choices.appendChild(btn);
    });
  }

  function renderQuestion() {
    var q = RH.game.question(state);
    var phase = state.phase;
    var settled = phase === RH.game.PHASE.SETTLED;

    renderDepth();
    el.topicValue.textContent = RH.i18n.pick(q.topic);
    el.questionText.textContent = RH.i18n.pick(q.question);

    var hinted = state.hintUsed[state.qIndex];
    el.hintBox.classList.toggle('hidden', !hinted);
    if (hinted) el.hintText.textContent = RH.i18n.pick(q.hint);

    el.answerForm.classList.toggle('hidden', phase !== RH.game.PHASE.INPUT);
    el.choices.classList.toggle('hidden', phase !== RH.game.PHASE.CHOICE);
    if (phase === RH.game.PHASE.CHOICE) renderChoices();

    el.btnHint.classList.toggle('hidden', settled || hinted);
    el.btnNext.classList.toggle('hidden', !settled);
    el.btnNext.textContent = RH.game.isLastQuestion(state)
      ? RH.i18n.t('seeResults')
      : RH.i18n.t('next');

    el.verdict.classList.toggle('hidden', phase === RH.game.PHASE.INPUT);
    if (phase === RH.game.PHASE.CHOICE) {
      el.verdict.className = 'verdict verdict--warn';
      el.verdict.textContent = RH.i18n.t('wrongTryAgain');
    } else if (settled) {
      var points = RH.game.questionScore(state, state.qIndex);
      if (state.solved[state.qIndex]) {
        el.verdict.className = 'verdict verdict--good';
        el.verdict.textContent = RH.i18n.t('correct') + ' +' + points + ' ' + RH.i18n.t('points');
      } else {
        el.verdict.className = 'verdict verdict--bad';
        el.verdict.textContent = RH.i18n.t('wrongFinal') + ' ' + RH.i18n.pick(q.answer.display);
      }
    }

    // Only wipe the field when a new question arrives — re-rendering for a
    // hint or a language switch must not eat what the player has typed.
    if (phase === RH.game.PHASE.INPUT && lastRenderedIndex !== state.qIndex) {
      el.answerInput.value = '';
    }
    lastRenderedIndex = state.qIndex;
    el.answerInput.setAttribute('placeholder', RH.i18n.t('answerPlaceholder'));
  }

  function focusInput() {
    if (state.phase === RH.game.PHASE.INPUT && !('ontouchstart' in window)) {
      el.answerInput.focus();
    }
  }

  function flashCard(kind) {
    if (reducedMotion) return;
    var cls = kind === 'good' ? 'card--good' : 'card--bad';
    el.card.classList.remove('card--good', 'card--bad');
    void el.card.offsetWidth;
    el.card.classList.add(cls);
    window.setTimeout(function () { el.card.classList.remove(cls); }, 600);
  }

  // Drop animation between questions; skipped entirely under reduced motion.
  function descend(callback) {
    if (reducedMotion) { callback(); return; }
    document.body.classList.add('is-falling');
    window.setTimeout(function () {
      callback();
      document.body.classList.remove('is-falling');
    }, 480);
  }

  // --- Results -----------------------------------------------------------

  function praiseFor(score) {
    if (score === RH.game.MAX_SCORE) return RH.i18n.t('perfectPraise');
    if (score >= 15) return RH.i18n.t('goodPraise');
    if (score >= 8) return RH.i18n.t('okPraise');
    return RH.i18n.t('poorPraise');
  }

  function renderStats() {
    if (state.freePlay) { el.stats.classList.add('hidden'); return; }
    var s = RH.storage.getStats();
    if (!s.played) { el.stats.classList.add('hidden'); return; }
    el.stats.classList.remove('hidden');
    el.statPlayed.textContent = s.played;
    el.statAverage.textContent = (s.totalScore / s.played).toFixed(1);
    el.statStreak.textContent = s.streak;
    el.statPerfect.textContent = s.perfect;
  }

  function renderResults() {
    var score = RH.game.bankedScore(state);
    var chain = RH.game.chain(state);

    el.resultsNumber.textContent = state.freePlay
      ? RH.i18n.t('freePlay') + ' — ' + RH.i18n.pick(chain.title)
      : RH.i18n.t('puzzleNumber') + ' ' + state.puzzleNumber;
    el.scoreValue.textContent = score;
    el.scoreMax.textContent = RH.game.MAX_SCORE;
    el.praise.textContent = praiseFor(score);

    var grid = '';
    for (var i = 0; i < RH.game.QUESTION_COUNT; i++) {
      grid += RH.share.emojiFor(RH.game.questionScore(state, i));
    }
    el.resultGrid.textContent = grid;

    el.recap.innerHTML = '';
    chain.questions.forEach(function (q, i) {
      var li = document.createElement('li');
      li.className = 'recap__item' + (state.solved[i] ? '' : ' is-missed');

      var qText = document.createElement('p');
      qText.className = 'recap__q';
      qText.textContent = RH.i18n.pick(q.question);

      var aText = document.createElement('p');
      aText.className = 'recap__a';
      aText.textContent = RH.i18n.pick(q.answer.display);

      var pts = document.createElement('span');
      pts.className = 'recap__pts';
      pts.textContent = RH.game.questionScore(state, i) + ' ' + RH.i18n.t('points');

      li.appendChild(qText);
      li.appendChild(aText);
      li.appendChild(pts);
      el.recap.appendChild(li);
    });

    el.btnShare.textContent = RH.i18n.t('share');
    el.btnArchiveResults.textContent = RH.i18n.t('playAnother');
    renderStats();
  }

  // --- Archive -----------------------------------------------------------

  function renderArchive() {
    el.archiveList.innerHTML = '';
    RH_PUZZLES.chains.forEach(function (chain) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'archive__item';
      btn.setAttribute('data-chain', chain.id);
      btn.textContent = RH.i18n.pick(chain.title);
      li.appendChild(btn);
      el.archiveList.appendChild(li);
    });
  }

  // --- Rendering entry point ---------------------------------------------

  function render() {
    applyStaticStrings();
    el.langToggle.textContent = RH.i18n.t('langLabel');
    if (currentScreen === 'intro') renderIntro();
    else if (currentScreen === 'question') renderQuestion();
    else if (currentScreen === 'results') renderResults();
    else if (currentScreen === 'archive') renderArchive();
  }

  // --- Flow --------------------------------------------------------------

  function finish() {
    state.done = true;
    persist();
    if (!state.freePlay && state.dateKey) {
      RH.storage.recordResult(state.dateKey, RH.game.bankedScore(state), RH.game.MAX_SCORE);
    }
    showScreen('results');
    render();
  }

  function startOrResume() {
    if (state.done) { showScreen('results'); render(); return; }
    showScreen('question');
    render();
    focusInput();
  }

  function loadChain(resolution) {
    resolved = resolution;
    var saved = !resolution.freePlay && resolution.dateKey
      ? RH.storage.getDay(resolution.dateKey)
      : null;

    // A saved game from an older data version could point at a chain that no
    // longer exists, so fall back to a fresh one rather than crashing.
    state = saved && RH.daily.chainById(saved.chainId) ? saved : RH.game.create(resolution);
    lastRenderedIndex = -1;
  }

  // --- Events ------------------------------------------------------------

  el.langToggle.addEventListener('click', function () {
    RH.i18n.setLang(RH.i18n.other());
    render();
  });

  el.btnPlay.addEventListener('click', startOrResume);

  el.answerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var value = el.answerInput.value.trim();
    if (!value) return;
    var result = RH.game.submitAnswer(state, value);
    if (!result.accepted) return;
    flashCard(result.correct ? 'good' : 'bad');
    persist();
    render();
  });

  el.choices.addEventListener('click', function (event) {
    var btn = event.target.closest('.choice');
    if (!btn) return;
    var result = RH.game.submitChoice(state, Number(btn.getAttribute('data-slot')));
    if (!result.accepted) return;
    flashCard(result.correct ? 'good' : 'bad');
    persist();
    render();
  });

  el.btnHint.addEventListener('click', function () {
    if (!RH.game.useHint(state)) return;
    persist();
    render();
    focusInput();
  });

  el.btnNext.addEventListener('click', function () {
    var wasLast = RH.game.isLastQuestion(state);
    descend(function () {
      RH.game.advance(state);
      persist();
      if (wasLast) { finish(); return; }
      render();
      focusInput();
    });
  });

  el.btnShare.addEventListener('click', function () {
    var text = RH.share.buildText(state);
    RH.share.copy(text).then(
      function () { toast(RH.i18n.t('copied')); },
      function () { toast(RH.i18n.t('copyFailed')); }
    );
  });

  function openArchive() { showScreen('archive'); render(); }
  el.btnArchiveIntro.addEventListener('click', openArchive);
  el.btnArchiveResults.addEventListener('click', openArchive);

  el.btnArchiveBack.addEventListener('click', function () {
    showScreen(state && state.done && !state.freePlay ? 'results' : 'intro');
    render();
  });

  el.archiveList.addEventListener('click', function (event) {
    var btn = event.target.closest('.archive__item');
    if (!btn) return;
    var chain = RH.daily.chainById(btn.getAttribute('data-chain'));
    if (!chain) return;
    loadChain({ chain: chain, dateKey: null, puzzleNumber: null, freePlay: true });
    showScreen('question');
    render();
    focusInput();
  });

  // --- Boot --------------------------------------------------------------

  RH.i18n.setLang(RH.storage.getLang());
  loadChain(RH.daily.resolve());
  showScreen('intro');
  render();
})();
