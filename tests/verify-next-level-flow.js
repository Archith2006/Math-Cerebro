/**
 * Test: Level Completion and Next Level Button Flow
 * Verifies that:
 * 1. Answering correctly does NOT auto-advance automatically.
 * 2. #level-complete-panel is shown with #btn-next-level button.
 * 3. Clicking #btn-next-level advances to the next level.
 */
const assert = require('assert');

class ClassList {
  constructor() { this.classes = new Set(); }
  add(cls) { this.classes.add(cls); }
  remove(cls) { this.classes.delete(cls); }
  contains(cls) { return this.classes.has(cls); }
}

class FakeElement {
  constructor(id = '', tagName = 'div') {
    this.id = id;
    this.tagName = tagName;
    this.classList = new ClassList();
    this.listeners = {};
    this.children = [];
    this.textContent = '';
    this._innerHTML = '';
  }
  set innerHTML(val) { this._innerHTML = val; }
  get innerHTML() { return this._innerHTML; }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  click() {
    if (this.listeners['click']) {
      this.listeners['click'].forEach(fn => fn({}));
    }
  }
  appendChild(child) { this.children.push(child); return child; }
  setAttribute(k, v) { this[k] = v; }
}

const elements = {};
global.document = {
  documentElement: new FakeElement('html'),
  createElement: (tag) => new FakeElement('', tag),
  getElementById: (id) => {
    if (!elements[id]) elements[id] = new FakeElement(id);
    return elements[id];
  },
  querySelector: (sel) => {
    if (sel === '.game-control-bar') return global.document.getElementById('game-control-bar');
    return null;
  }
};

global.window = {
  sound: { playCorrect: () => {}, playClick: () => {}, playWrong: () => {}, setEnabled: () => {} },
  effects: { vibrate: () => {}, shake: () => {} },
  gameStorage: {
    getCurrentLevel: () => 1,
    setCurrentLevel: (id) => {},
    completeLevel: (id) => {},
    getSetting: () => null,
    setSetting: () => {},
    isLevelCompleted: () => false
  },
  AnswerValidator: { check: (ans, lvl) => ans === lvl.answer },
  PuzzleRenderer: { render: () => {} },
  GAME_LEVELS: [
    { id: 1, answer: '6', hints: ['h1', 'h2', 'h3'] },
    { id: 2, answer: '12', hints: ['h1', 'h2', 'h3'] }
  ]
};

// Mock classes
class ScreenManager {
  constructor() {}
  showScreen(s) {}
  updateHomeStats() {}
}
class KeypadController {
  constructor() {}
  configureForLevel() {}
  clear() {}
}
global.ScreenManager = ScreenManager;
global.KeypadController = KeypadController;

const MathRiddlesApp = require('../js/app.js');
const app = new MathRiddlesApp();

console.log('--- TESTING LEVEL COMPLETION AND NEXT LEVEL BUTTON FLOW ---');

// Start level 1
app.startLevel(1);
assert.strictEqual(app.currentLevelId, 1, 'Should start on Level 1');

const completePanel = global.document.getElementById('level-complete-panel');
const nextBtn = global.document.getElementById('btn-next-level');

assert.strictEqual(completePanel.classList.contains('hidden'), true, 'Complete panel should be hidden initially');

// Submit correct answer
app.handleAnswerSubmit('6');
assert.strictEqual(app.isLevelSolved, true, 'Level should be marked as solved');
assert.strictEqual(completePanel.classList.contains('hidden'), false, 'Complete panel should now be visible');
assert.strictEqual(app.currentLevelId, 1, 'Should NOT advance automatically without clicking Next Level button');

// Click Next Level button
console.log('Clicking "NEXT LEVEL" button...');
nextBtn.click();

assert.strictEqual(app.currentLevelId, 2, 'Should advance to Level 2 after clicking Next Level button');
assert.strictEqual(completePanel.classList.contains('hidden'), true, 'Complete panel should be hidden on Level 2');
assert.strictEqual(app.isLevelSolved, false, 'Level 2 should not be marked as solved yet');

console.log('✅ ALL NEXT-LEVEL BUTTON FLOW TESTS PASSED PERFECTLY!');
