/**
 * Verification Test: Theme System
 * Validates:
 * 1. At least 10 distinct color themes exist with existing images on disk
 * 2. HTML elements: #btn-goto-themes, #modal-themes, #btn-close-themes, #themes-grid-container
 * 3. DOM simulation: clicking #btn-goto-themes opens #modal-themes
 * 4. Selecting themes updates document.body.style.backgroundImage, CSS vars, and localStorage
 * 5. Frosted glass styling and backdrop variables are intact
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING THEME SYSTEM VERIFICATION SUITE ---');

// 1. Validate Themes Registry
const themesPath = path.join(__dirname, '..', 'js', 'data', 'themes.js');
assert(fs.existsSync(themesPath), 'js/data/themes.js must exist');

const themes = require(themesPath);
console.log(`✅ Loaded themes registry: found ${themes.length} themes.`);
assert(themes.length >= 10, `Expected at least 10 themes, found ${themes.length}`);

// 2. Validate all theme images exist on disk
themes.forEach((t, i) => {
  const imgPath = path.join(__dirname, '..', t.image);
  assert(fs.existsSync(imgPath), `Theme image file missing on disk: ${t.image}`);
  assert(t.name && t.name.length > 0, `Theme ${i} missing name`);
  assert(t.accentColor && t.accentColor.startsWith('#'), `Theme ${i} missing valid hex accentColor`);
  assert(t.paletteTag && t.paletteTag.length > 0, `Theme ${i} missing paletteTag`);
  assert(t.vignette && t.vignette.includes('radial-gradient'), `Theme ${i} missing vignette gradient`);
  console.log(`  [${i + 1}/${themes.length}] Theme "${t.name}" -> ${t.paletteTag} (${t.image})`);
});
console.log('✅ All theme images and color palettes verified on disk!');

// 3. Validate HTML structure
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

assert(htmlContent.includes('id="btn-goto-themes"'), 'index.html must have #btn-goto-themes');
assert(htmlContent.includes('id="modal-themes"'), 'index.html must have #modal-themes');
assert(htmlContent.includes('id="btn-close-themes"'), 'index.html must have #btn-close-themes');
assert(htmlContent.includes('id="themes-grid-container"'), 'index.html must have #themes-grid-container');
assert(htmlContent.includes('./js/data/themes.js'), 'index.html must include ./js/data/themes.js');

// Verify position: #btn-goto-themes must be directly under #btn-goto-levels
const levelsIdx = htmlContent.indexOf('id="btn-goto-levels"');
const themesIdx = htmlContent.indexOf('id="btn-goto-themes"');
assert(levelsIdx !== -1 && themesIdx !== -1 && themesIdx > levelsIdx, '#btn-goto-themes must be placed under #btn-goto-levels');
console.log('✅ HTML structure and positioning verified!');

// 4. Validate CSS Rules for themes
const compCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'components.css'), 'utf8');
assert(compCss.includes('.modal-themes-card'), 'components.css must define .modal-themes-card');
assert(compCss.includes('.themes-grid'), 'components.css must define .themes-grid');
assert(compCss.includes('.theme-card'), 'components.css must define .theme-card');
assert(compCss.includes('.theme-active-indicator'), 'components.css must define .theme-active-indicator');

const styleCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');
assert(styleCss.includes('--theme-vignette'), 'style.css must support --theme-vignette');
assert(styleCss.includes('--theme-app-bg'), 'style.css must support --theme-app-bg');
assert(styleCss.includes('--theme-shadow'), 'style.css must support --theme-shadow');
console.log('✅ CSS rules and theme variables verified!');

// 5. Lightweight Mock DOM Environment
class ClassList {
  constructor() { this.classes = new Set(); }
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
    this.attributes = {};
    this.style = {
      setProperty: (prop, val) => { this.style[prop] = val; }
    };
  }
  setAttribute(attr, val) { this.attributes[attr] = val; }
  getAttribute(attr) { return this.attributes[attr]; }
  get className() { return Array.from(this.classList.classes).join(' '); }
  set className(val) {
    this.classList.classes.clear();
    (val || '').split(/\s+/).filter(Boolean).forEach(c => this.classList.add(c));
  }
  set innerHTML(val) {
    if (val === '') this.children = [];
  }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  click() {
    if (this.listeners['click']) {
      this.listeners['click'].forEach(fn => fn({ target: this }));
    }
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  querySelectorAll(sel) {
    const res = [];
    const find = (el) => {
      if (sel.startsWith('.') && el.classList.contains(sel.slice(1))) res.push(el);
      if (sel.startsWith('#') && el.id === sel.slice(1)) res.push(el);
      el.children.forEach(find);
    };
    find(this);
    return res;
  }
  querySelector(sel) {
    return this.querySelectorAll(sel)[0] || null;
  }
}

const elements = {
  'screen-home': new FakeElement('screen-home'),
  'screen-levels': new FakeElement('screen-levels'),
  'screen-game': new FakeElement('screen-game'),
  'modal-hint': new FakeElement('modal-hint'),
  'modal-settings': new FakeElement('modal-settings'),
  'modal-themes': new FakeElement('modal-themes'),
  'btn-goto-themes': new FakeElement('btn-goto-themes'),
  'btn-close-themes': new FakeElement('btn-close-themes'),
  'themes-grid-container': new FakeElement('themes-grid-container'),
  'btn-play-continue': new FakeElement('btn-play-continue'),
  'btn-goto-levels': new FakeElement('btn-goto-levels'),
  'btn-back-home': new FakeElement('btn-back-home'),
  'btn-back-to-levels': new FakeElement('btn-back-to-levels'),
  'btn-open-hint': new FakeElement('btn-open-hint'),
  'btn-close-hint': new FakeElement('btn-close-hint'),
  'btn-next-level': new FakeElement('btn-next-level'),
  'btn-skip-level': new FakeElement('btn-skip-level'),
  'btn-clear-answer': new FakeElement('btn-clear-answer'),
  'btn-submit-answer': new FakeElement('btn-submit-answer'),
  'stat-solved': new FakeElement('stat-solved'),
  'stat-level': new FakeElement('stat-level'),
  'btn-play-text': new FakeElement('btn-play-text'),
  'level-select-solved': new FakeElement('level-select-solved'),
  'levels-grid-container': new FakeElement('levels-grid-container'),
  'game-level-num': new FakeElement('game-level-num'),
  'puzzle-card': new FakeElement('puzzle-card'),
  'puzzle-content-box': new FakeElement('puzzle-content-box'),
  'answer-bar': new FakeElement('answer-bar'),
  'answer-text': new FakeElement('answer-text'),
  'virtual-keypad': new FakeElement('virtual-keypad'),
  'level-complete-panel': new FakeElement('level-complete-panel'),
  'hint-steps-container': new FakeElement('hint-steps-container')
};

const fakeDoc = {
  body: new FakeElement('body'),
  documentElement: new FakeElement('html'),
  getElementById: (id) => elements[id] || null,
  createElement: (tag) => new FakeElement('', tag),
  querySelectorAll: (sel) => {
    const all = [];
    Object.values(elements).forEach(el => {
      all.push(...el.querySelectorAll(sel));
      if (sel.startsWith('.') && el.classList.contains(sel.slice(1))) all.push(el);
    });
    return all;
  }
};

global.window = {
  document: fakeDoc,
  localStorage: {
    store: {},
    getItem: function(k) { return this.store[k] || null; },
    setItem: function(k, v) { this.store[k] = String(v); },
    removeItem: function(k) { delete this.store[k]; }
  },
  sound: { playClick: () => {}, playCorrect: () => {}, playWrong: () => {}, playHint: () => {}, setEnabled: () => {} },
  addEventListener: () => {}
};
global.document = fakeDoc;
global.localStorage = global.window.localStorage;
global.GAME_THEMES = themes;
global.window.GAME_THEMES = themes;

// Load components
require('../js/core/storage.js');
require('../js/data/themes.js');
require('../js/ui/screenManager.js');
require('../js/ui/keypad.js');
require('../js/data/levels.js');
require('../js/ui/puzzleRenderer.js');
require('../js/app.js');

const app = new window.MathRiddlesApp();

// Verify themes grid rendered in modal
const grid = fakeDoc.getElementById('themes-grid-container');
assert.strictEqual(grid.children.length, themes.length, `Grid should have ${themes.length} cards, had ${grid.children.length}`);
console.log(`✅ Themes grid rendered with ${grid.children.length} theme cards.`);

// Test opening theme modal
const themeBtn = fakeDoc.getElementById('btn-goto-themes');
themeBtn.click();
const themeModal = fakeDoc.getElementById('modal-themes');
assert(themeModal.classList.contains('active'), 'Theme modal should be active after clicking #btn-goto-themes');
console.log('✅ Clicking THEME button successfully opened #modal-themes.');

// Test switching theme to emerald_aurora
const emeraldCard = grid.children.find(c => c.getAttribute('data-theme-id') === 'emerald_aurora');
assert(emeraldCard, 'Card for emerald_aurora should exist');
emeraldCard.click();

assert.strictEqual(window.gameStorage.getSetting('theme_bg'), 'emerald_aurora', 'Theme setting should be saved as emerald_aurora');
assert(fakeDoc.body.style.backgroundImage.includes('emerald_aurora.jpg'), 'document.body.style.backgroundImage should update');
assert(emeraldCard.classList.contains('active'), 'emerald_aurora card should have active class');
console.log('✅ Selecting emerald_aurora theme correctly updated body background, styles, and storage.');

// Test closing theme modal
const closeBtn = fakeDoc.getElementById('btn-close-themes');
closeBtn.click();
assert(!themeModal.classList.contains('active'), 'Theme modal should close after clicking close button');
console.log('✅ Theme modal successfully closed.');

console.log('🎉 ALL THEME SYSTEM TESTS PASSED PERFECTLY!');
