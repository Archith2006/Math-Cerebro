/**
 * Test: Verify Play Button Glassy Style & Sound Toggle Click Flow
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- RUNNING PLAY BUTTON & SOUND TOGGLE TESTS ---');

// 1. Check HTML
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

assert(html.includes('id="btn-play-continue" class="btn-home-secondary"'), '#btn-play-continue must use btn-home-secondary class');
assert(html.includes('id="btn-toggle-sound"'), '#btn-toggle-sound must exist in index.html');
assert(html.includes('id="sound-icon-indicator"'), '#sound-icon-indicator must exist in index.html');
console.log('✅ HTML markup verified: play button uses btn-home-secondary.');

// 2. Check CSS
const compCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'components.css'), 'utf8');
const btnPlayRule = compCss.substring(compCss.indexOf('.btn-play-primary'), compCss.indexOf('.btn-play-primary:hover'));
assert(!btnPlayRule.includes('var(--gradient-primary)'), 'btn-play-primary should not use pink gradient');
assert(compCss.includes('.btn-play-primary,') || compCss.includes('.btn-play-primary ,'), 'components.css groups btn-play-primary and btn-home-secondary');

const styleCss = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf8');
assert(styleCss.includes('.glass-icon-btn.sound-muted'), 'style.css defines .glass-icon-btn.sound-muted');
console.log('✅ CSS verified: no pink gradient on play button, sound-muted state defined.');

// 3. Mock DOM Test for Sound Toggle
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
    this.attributes = {};
    this.style = { setProperty: () => {} };
  }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k]; }
  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }
  click() {
    if (this.listeners['click']) {
      this.listeners['click'].forEach(fn => fn({ target: this }));
    }
  }
  appendChild(c) { this.children.push(c); return c; }
  querySelectorAll() { return []; }
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
  'hint-steps-container': new FakeElement('hint-steps-container'),
  'btn-toggle-sound': new FakeElement('btn-toggle-sound'),
  'sound-icon-indicator': new FakeElement('sound-icon-indicator')
};

const fakeDoc = {
  body: new FakeElement('body'),
  documentElement: new FakeElement('html'),
  getElementById: (id) => elements[id] || null,
  createElement: (tag) => new FakeElement('', tag),
  querySelectorAll: () => []
};

let soundEnabledInAudio = true;
let clicksPlayed = 0;

global.window = {
  document: fakeDoc,
  localStorage: {
    store: {},
    getItem: function(k) { return this.store[k] || null; },
    setItem: function(k, v) { this.store[k] = String(v); },
    removeItem: function(k) { delete this.store[k]; }
  },
  sound: {
    playClick: () => { clicksPlayed++; },
    playCorrect: () => {},
    playWrong: () => {},
    playHint: () => {},
    setEnabled: (val) => { soundEnabledInAudio = val; }
  },
  addEventListener: () => {}
};
global.document = fakeDoc;
global.localStorage = global.window.localStorage;

require('../js/core/storage.js');
const themes = require('../js/data/themes.js');
global.GAME_THEMES = themes;
global.window.GAME_THEMES = themes;

require('../js/ui/screenManager.js');
require('../js/ui/keypad.js');
require('../js/data/levels.js');
require('../js/ui/puzzleRenderer.js');
require('../js/app.js');

const app = new window.MathRiddlesApp();

const soundBtn = elements['btn-toggle-sound'];
const soundIcon = elements['sound-icon-indicator'];

// Initially sound is enabled
assert.strictEqual(soundIcon.textContent, '🔊', 'Sound icon should initially be 🔊');
assert.strictEqual(soundEnabledInAudio, true, 'Audio engine should initially be enabled');

// Click 1: Mute
console.log('1. Clicking sound toggle to Mute...');
soundBtn.click();
assert.strictEqual(window.gameStorage.getSetting('sound'), false, 'Storage should be false after click 1');
assert.strictEqual(soundEnabledInAudio, false, 'Audio engine should be disabled after click 1');
assert.strictEqual(soundIcon.textContent, '🔇', 'Sound icon should switch to 🔇');
assert(soundBtn.classList.contains('sound-muted'), 'Button should have sound-muted class');
console.log('✅ Sound muted correctly (icon: 🔇, storage: false, engine: disabled)');

// Click 2: Unmute
console.log('2. Clicking sound toggle to Unmute...');
soundBtn.click();
assert.strictEqual(window.gameStorage.getSetting('sound'), true, 'Storage should be true after click 2');
assert.strictEqual(soundEnabledInAudio, true, 'Audio engine should be enabled after click 2');
assert.strictEqual(soundIcon.textContent, '🔊', 'Sound icon should switch to 🔊');
assert(!soundBtn.classList.contains('sound-muted'), 'Button should not have sound-muted class');
assert(clicksPlayed > 0, 'Audio click sound should play when unmuting');
console.log('✅ Sound unmuted correctly (icon: 🔊, audio click played, storage: true)');

console.log('🎉 ALL PLAY BUTTON & SOUND TOGGLE TESTS PASSED PERFECTLY!');
