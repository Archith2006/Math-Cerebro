/**
 * Comprehensive Automated Test: Step-by-Step Single Hint Display
 * Verifies that hints are NOT displayed all at once:
 * 1. First only Hint 1 shows.
 * 2. When clicking Hint 2, then only Hint 2 shows.
 * 3. When clicking Hint 3, then only Hint 3 shows.
 */
const fs = require('fs');
const path = require('path');

// Simulate DOM environment
class ClassList {
  constructor() {
    this.classes = new Set();
  }
  add(cls) { this.classes.add(cls); }
  remove(cls) { this.classes.delete(cls); }
  contains(cls) { return this.classes.has(cls); }
  toString() { return Array.from(this.classes).join(' '); }
}

class FakeElement {
  constructor(id = '', tagName = 'div') {
    this.id = id;
    this.tagName = tagName;
    this.classList = new ClassList();
    this.listeners = {};
    this.children = [];
    this.textContent = '';
    this.dataset = {};
    this.style = {};
  }
  get className() {
    return Array.from(this.classList.classes).join(' ');
  }
  set className(val) {
    this.classList.classes.clear();
    (val || '').split(/\s+/).filter(Boolean).forEach(c => this.classList.add(c));
  }
  set innerHTML(val) {
    if (val === '') {
      this.children = [];
    }
  }
  get innerHTML() {
    return '';
  }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  dispatchEvent(event) {
    if (this.listeners[event.type]) {
      this.listeners[event.type].forEach(fn => fn(event));
    }
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  setAttribute(k, v) { this[k] = v; }
  removeAttribute(k) { delete this[k]; }
  closest() { return this; }
}

global.window = global;
global.window.addEventListener = (event, fn) => {};
global.window.removeEventListener = (event, fn) => {};

const elements = {};
global.document = {
  createElement: (tagName) => new FakeElement('', tagName),
  getElementById: (id) => {
    if (!elements[id]) {
      elements[id] = new FakeElement(id);
    }
    return elements[id];
  },
  querySelectorAll: (selector) => [],
  querySelector: (selector) => null,
  documentElement: new FakeElement('html')
};

global.localStorage = {
  store: {},
  getItem: (k) => global.localStorage.store[k] || null,
  setItem: (k, v) => { global.localStorage.store[k] = String(v); },
  removeItem: (k) => { delete global.localStorage.store[k]; }
};

// Elements required
const elementIds = [
  'app',
  'screen-home',
  'screen-levels',
  'screen-game',
  'modal-hint',
  'modal-settings',
  'btn-open-hint',
  'btn-close-hint',
  'hint-steps-container',
  'btn-play-continue',
  'btn-goto-levels',
  'btn-back-home',
  'btn-back-to-levels',
  'btn-skip-level',
  'btn-submit-answer',
  'btn-clear-answer',
  'answer-bar',
  'answer-text',
  'virtual-keypad',
  'puzzle-card',
  'puzzle-content-box',
  'game-level-num'
];
elementIds.forEach(id => {
  elements[id] = new FakeElement(id);
});

// Load modules
require('../js/data/levels.js');
require('../js/core/audio.js');
require('../js/core/storage.js');
require('../js/core/validator.js');
require('../js/ui/effects.js');
require('../js/ui/keypad.js');
require('../js/ui/puzzleRenderer.js');
require('../js/ui/screenManager.js');
require('../js/app.js');

console.log('--- TEST: SINGLE-HINT STEP-BY-STEP DISPLAY ---');

const app = new MathRiddlesApp();
app.startLevel(1);

const hint1Text = app.currentLevel.hints[0];
const hint2Text = app.currentLevel.hints[1];
const hint3Text = app.currentLevel.hints[2];

// Step 1: Open Hint Modal
console.log('1. Opening Hint Modal...');
elements['btn-open-hint'].dispatchEvent({ type: 'click' });

const container = elements['hint-steps-container'];
const tabsRow = container.children.find(c => c.classList.contains('hint-tabs-nav'));
const hintCards = container.children.filter(c => c.classList.contains('hint-single-card'));
const navRow = container.children.find(c => c.classList.contains('hint-nav-row'));

if (!tabsRow || !navRow || hintCards.length !== 1) {
  console.error(`❌ Expected exactly 1 single hint card on screen, got ${hintCards.length}`);
  process.exit(1);
}
console.log('✅ Exactly ONE hint card rendered on screen (not all 3 at once).');

// Verify only Hint 1 is displayed
const card1 = hintCards[0];
const card1Body = card1.children.find(c => c.classList.contains('hint-body-text'));
const card1Label = card1.children.find(c => c.classList.contains('hint-step-label'));

if (!card1Body.textContent.includes(hint1Text)) {
  console.error('❌ Expected Hint 1 content to be displayed');
  process.exit(1);
}
if (card1Body.textContent.includes(hint2Text) || card1Body.textContent.includes(hint3Text)) {
  console.error('❌ Hint 2 or Hint 3 text should NOT be present in Hint 1 view');
  process.exit(1);
}
console.log('✅ Screen 1 shows HINT 1 ONLY:', card1Label.textContent, '->', card1Body.textContent);

// Step 2: Click Show Hint 2 button
console.log('\n2. Clicking "Show Hint 2" button...');
const nextBtn1 = navRow.children.find(c => c.classList.contains('btn-hint-next'));
nextBtn1.dispatchEvent({ type: 'click' });

// Check state after clicking Hint 2
const hintCardsAfter2 = container.children.filter(c => c.classList.contains('hint-single-card'));
if (hintCardsAfter2.length !== 1) {
  console.error(`❌ Expected exactly 1 hint card on screen after clicking Hint 2, got ${hintCardsAfter2.length}`);
  process.exit(1);
}
const card2 = hintCardsAfter2[0];
const card2Body = card2.children.find(c => c.classList.contains('hint-body-text'));
const card2Label = card2.children.find(c => c.classList.contains('hint-step-label'));

if (!card2Body.textContent.includes(hint2Text)) {
  console.error('❌ Expected Hint 2 content to be displayed');
  process.exit(1);
}
if (card2Body.textContent.includes(hint1Text) || card2Body.textContent.includes(hint3Text)) {
  console.error('❌ Hint 1 or Hint 3 text should NOT be present in Hint 2 view');
  process.exit(1);
}
console.log('✅ Screen 2 shows HINT 2 ONLY:', card2Label.textContent, '->', card2Body.textContent);

// Step 3: Click Show Hint 3 button
console.log('\n3. Clicking "Show Hint 3" button...');
const navRowAfter2 = container.children.find(c => c.classList.contains('hint-nav-row'));
const nextBtn2 = navRowAfter2.children.find(c => c.classList.contains('btn-hint-next'));
nextBtn2.dispatchEvent({ type: 'click' });

// Check state after clicking Hint 3
const hintCardsAfter3 = container.children.filter(c => c.classList.contains('hint-single-card'));
if (hintCardsAfter3.length !== 1) {
  console.error(`❌ Expected exactly 1 hint card on screen after clicking Hint 3, got ${hintCardsAfter3.length}`);
  process.exit(1);
}
const card3 = hintCardsAfter3[0];
const card3Body = card3.children.find(c => c.classList.contains('hint-body-text'));
const card3Label = card3.children.find(c => c.classList.contains('hint-step-label'));

if (!card3Body.textContent.includes(hint3Text)) {
  console.error('❌ Expected Hint 3 content to be displayed');
  process.exit(1);
}
if (card3Body.textContent.includes(hint1Text) || card3Body.textContent.includes(hint2Text)) {
  console.error('❌ Hint 1 or Hint 2 text should NOT be present in Hint 3 view');
  process.exit(1);
}
console.log('✅ Screen 3 shows HINT 3 ONLY:', card3Label.textContent, '->', card3Body.textContent);

// Step 4: Click tab for Hint 1 to review
console.log('\n4. Clicking Hint 1 tab to review...');
const tabsRowAfter3 = container.children.find(c => c.classList.contains('hint-tabs-nav'));
const tab1Btn = tabsRowAfter3.children[0];
tab1Btn.dispatchEvent({ type: 'click' });

const reviewCards = container.children.filter(c => c.classList.contains('hint-single-card'));
const reviewBody = reviewCards[0].children.find(c => c.classList.contains('hint-body-text'));
if (!reviewBody.textContent.includes(hint1Text)) {
  console.error('❌ Expected switching back to Hint 1 tab to show Hint 1 only');
  process.exit(1);
}
console.log('✅ Switched back to HINT 1 ONLY via tab successfully.');

console.log('\n🎉 ALL STEP-BY-STEP SINGLE HINT TESTS PASSED PERFECTLY!');
process.exit(0);
