const levels = require('../js/data/levels.js');
const PuzzleRenderer = require('../js/ui/puzzleRenderer.js');

// Mock DOM container
class MockElement {
  constructor(tagName = 'div') {
    this.tagName = tagName;
    this.classList = {
      classes: new Set(),
      add(cls) { this.classes.add(cls); },
      remove(cls) { this.classes.delete(cls); },
      contains(cls) { return this.classes.has(cls); }
    };
    this.children = [];
    this._innerHTML = '';
    this.className = '';
    this.style = {};
  }
  set innerHTML(val) {
    this._innerHTML = val;
    this.children = [];
  }
  get innerHTML() {
    return this._innerHTML;
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
}

global.document = {
  createElement: (tag) => new MockElement(tag)
};

console.log('--- TESTING PUZZLE RENDERER ON ALL 100 LEVELS ---');
let successCount = 0;
const errors = [];

levels.forEach((lvl) => {
  const container = new MockElement('div');
  try {
    PuzzleRenderer.render(lvl, container);
    const hasContent = container.innerHTML.length > 0 || container.children.length > 0;
    if (!hasContent) {
      errors.push(`Level ${lvl.id} (${lvl.type}) rendered empty container!`);
    } else {
      successCount++;
    }
  } catch (err) {
    errors.push(`Level ${lvl.id} (${lvl.type}) threw error during render: ${err.message}`);
  }
});

if (errors.length === 0) {
  console.log(`✅ Successfully rendered all ${successCount} levels with zero errors!`);
} else {
  console.error(`❌ Errors during rendering:`);
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}
