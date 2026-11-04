// Game rules and scoring. Deliberately DOM-free so it can be reasoned about
// (and poked at from the console) on its own; js/main.js renders from it.
window.RH = window.RH || {};

RH.game = (function () {
  var POINTS_PER_QUESTION = 3;
  var QUESTION_COUNT = 7;
  var MAX_SCORE = POINTS_PER_QUESTION * QUESTION_COUNT;

  // Phases within one question: typing, second-chance multiple choice,
  // and the settled state (right or revealed) before moving deeper.
  var PHASE = { INPUT: 'INPUT', CHOICE: 'CHOICE', SETTLED: 'SETTLED' };

  function create(resolved) {
    return {
      chainId: resolved.chain.id,
      dateKey: resolved.dateKey,
      puzzleNumber: resolved.puzzleNumber,
      freePlay: !!resolved.freePlay,
      qIndex: 0,
      phase: PHASE.INPUT,
      scores: new Array(QUESTION_COUNT).fill(POINTS_PER_QUESTION),
      hintUsed: new Array(QUESTION_COUNT).fill(false),
      usedChoice: new Array(QUESTION_COUNT).fill(false),
      solved: new Array(QUESTION_COUNT).fill(false),
      // Option order is drawn once per question and kept, so a language switch
      // or a refresh does not reshuffle the buttons under the player's finger.
      choiceOrder: new Array(QUESTION_COUNT).fill(null),
      done: false
    };
  }

  function chain(state) {
    return RH.daily.chainById(state.chainId);
  }

  function question(state, index) {
    var i = index == null ? state.qIndex : index;
    return chain(state).questions[i];
  }

  // Score actually banked so far: unanswered questions count as zero.
  function bankedScore(state) {
    var total = 0;
    for (var i = 0; i < QUESTION_COUNT; i++) {
      if (state.solved[i]) total += state.scores[i];
    }
    return total;
  }

  function questionScore(state, index) {
    return state.solved[index] ? state.scores[index] : 0;
  }

  function useHint(state) {
    if (state.hintUsed[state.qIndex] || state.phase === PHASE.SETTLED) return false;
    state.hintUsed[state.qIndex] = true;
    state.scores[state.qIndex] = Math.max(0, state.scores[state.qIndex] - 1);
    return true;
  }

  function shuffledChoices(state) {
    var i = state.qIndex;
    if (state.choiceOrder[i]) return state.choiceOrder[i];
    // Store indices, not text, so the same slots work in both languages:
    // -1 is the correct answer, 0..2 index into the distractor list.
    var order = [-1, 0, 1, 2];
    for (var j = order.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = order[j]; order[j] = order[k]; order[k] = tmp;
    }
    state.choiceOrder[i] = order;
    return order;
  }

  // Free-text guess. Correct settles the question; wrong costs a point and
  // drops the player into the multiple-choice second chance.
  function submitAnswer(state, input) {
    if (state.phase !== PHASE.INPUT) return { accepted: false };
    var i = state.qIndex;
    if (RH.answers.isCorrect(input, question(state))) {
      state.solved[i] = true;
      state.phase = PHASE.SETTLED;
      return { accepted: true, correct: true, points: state.scores[i] };
    }
    state.scores[i] = Math.max(0, state.scores[i] - 1);
    state.usedChoice[i] = true;
    state.phase = PHASE.CHOICE;
    shuffledChoices(state);
    return { accepted: true, correct: false, points: 0 };
  }

  // Second chance. Wrong here ends the question at zero and reveals the answer.
  function submitChoice(state, slot) {
    if (state.phase !== PHASE.CHOICE) return { accepted: false };
    var i = state.qIndex;
    state.phase = PHASE.SETTLED;
    if (slot === -1) {
      state.solved[i] = true;
      return { accepted: true, correct: true, points: state.scores[i] };
    }
    state.scores[i] = 0;
    return { accepted: true, correct: false, points: 0 };
  }

  function isLastQuestion(state) {
    return state.qIndex >= QUESTION_COUNT - 1;
  }

  function advance(state) {
    if (state.phase !== PHASE.SETTLED) return false;
    if (isLastQuestion(state)) {
      state.done = true;
      return true;
    }
    state.qIndex += 1;
    state.phase = PHASE.INPUT;
    return true;
  }

  return {
    PHASE: PHASE,
    POINTS_PER_QUESTION: POINTS_PER_QUESTION,
    QUESTION_COUNT: QUESTION_COUNT,
    MAX_SCORE: MAX_SCORE,
    create: create,
    chain: chain,
    question: question,
    bankedScore: bankedScore,
    questionScore: questionScore,
    useHint: useHint,
    shuffledChoices: shuffledChoices,
    submitAnswer: submitAnswer,
    submitChoice: submitChoice,
    isLastQuestion: isLastQuestion,
    advance: advance
  };
})();
