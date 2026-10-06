/**
 * DOM & Event Simulation Test: Clicking Play Opens Level Select
 */
const fs = require('fs');
const path = require('path');

// Simulate basic DOM environment
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
    this.innerHTML = '';
    this.dataset = {};
    this.style = {};
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

// Setup fake window & document
global.window = global;
global.window.addEventListener = (event, fn) => {};
global.window.removeEventListener = (event, fn) => {};
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

const elements = {};

// Pre-create known HTML elements from index.html
const elementIds = [
  'screen-home',
  'screen-levels',
  'screen-game',
  'modal-hint',
  'modal-settings',
  'btn-play-continue',
  'btn-goto-levels',
  'btn-back-home',
  'btn-back-to-levels',
  'btn-play-text',
  'stat-solved',
  'stat-level',
  'level-select-solved',
  'levels-grid-container',
  'virtual-keypad',
  'options-grid',
  'answer-text',
  'btn-clear-answer',
  'inline-success',
  'btn-inline-next'
];
elementIds.forEach(id => {
  elements[id] = new FakeElement(id);
});

// Home screen starts active
elements['screen-home'].classList.add('active');

// Load scripts in order
require('../js/data/levels.js');
require('../js/core/audio.js');
require('../js/core/storage.js');
require('../js/core/validator.js');
require('../js/ui/effects.js');
require('../js/ui/keypad.js');
require('../js/ui/puzzleRenderer.js');
require('../js/ui/screenManager.js');
require('../js/app.js');

// Initialize app
const app = new MathRiddlesApp();

console.log('--- TEST: PLAY BUTTON CLICK SIMULATION ---');
console.log('Initial screen states:');
console.log('  #screen-home.active:', elements['screen-home'].classList.contains('active'));
console.log('  #screen-levels.active:', elements['screen-levels'].classList.contains('active'));

console.log('\nSimulating click on #btn-play-continue...');
elements['btn-play-continue'].dispatchEvent({ type: 'click' });

console.log('Screen states after clicking Play:');
console.log('  #screen-home.active:', elements['screen-home'].classList.contains('active'));
console.log('  #screen-levels.active:', elements['screen-levels'].classList.contains('active'));

if (elements['screen-levels'].classList.contains('active') && !elements['screen-home'].classList.contains('active')) {
  console.log('\n✅ VERIFIED: Clicking Play opens the level select screen successfully!');
  process.exit(0);
} else {
  console.error('\n❌ FAILURE: Play button did not activate #screen-levels');
  process.exit(1);
}
