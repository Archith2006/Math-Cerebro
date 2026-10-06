/**
 * Virtual Keypad & Hardware Keyboard Controller
 * Ultra-responsive, clean keypad handling (2x5 grid + Control Bar)
 */
class KeypadController {
  constructor(options = {}) {
    this.value = '';
    this.onUpdate = options.onUpdate || (() => {});
    this.onSubmit = options.onSubmit || (() => {});

    this.keypadEl = document.getElementById('virtual-keypad');
    this.answerTextEl = document.getElementById('answer-text');
    this.clearBtn = document.getElementById('btn-clear-answer');
    this.submitBtn = document.getElementById('btn-submit-answer');

    this.init();
  }

  init() {
    // Virtual keypad buttons (1 2 3 4 5 / 6 7 8 9 0)
    if (this.keypadEl) {
      this.keypadEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.key-num') || e.target.closest('.key-btn');
        if (!btn) return;

        btn.classList.add('key-tap');
        setTimeout(() => btn.classList.remove('key-tap'), 120);

        const key = btn.dataset.key;
        if (window.sound) window.sound.playClick();
        if (window.effects) window.effects.vibrate(20);

        this.handleKey(key);
      });
    }

    // Submit button (in control bar)
    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.submit();
      });
    }

    // Clear button (✕ in answer bar)
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.clear();
      });
    }

    // Hardware Keyboard listener
    window.addEventListener('keydown', (e) => {
      // Don't intercept if focus is inside an input or modal is open
      if (document.querySelector('.modal-overlay.active')) {
        if (e.key === 'Escape') {
          if (window.app && window.app.screenManager) {
            window.app.screenManager.closeModal('hint');
            window.app.screenManager.closeModal('settings');
          }
        }
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        if (window.sound) window.sound.playClick();
        this.append(e.key);
      } else if (e.key === 'Backspace') {
        if (window.sound) window.sound.playClick();
        this.backspace();
      } else if (e.key === 'Enter') {
        this.submit();
      } else if (e.key === 'Escape') {
        this.clear();
      } else if (e.key === '-' || e.key === '.') {
        if (window.sound) window.sound.playClick();
        this.append(e.key);
      }
    });
  }

  handleKey(key) {
    if (key === 'backspace') {
      this.backspace();
    } else if (key === 'enter') {
      this.submit();
    } else if (key !== undefined) {
      this.append(key);
    }
  }

  append(char) {
    if (this.value.length < 8) {
      this.value += char;
      this.render();
    }
  }

  backspace() {
    if (this.value.length > 0) {
      this.value = this.value.slice(0, -1);
      this.render();
    }
  }

  clear() {
    this.value = '';
    this.render();
  }

  setValue(val) {
    this.value = String(val);
    this.render();
  }

  getValue() {
    return this.value.trim();
  }

  submit() {
    if (this.value.trim().length > 0) {
      this.onSubmit(this.value.trim());
    }
  }

  render() {
    if (this.answerTextEl) {
      this.answerTextEl.textContent = this.value;
    }
    this.onUpdate(this.value);
  }

  configureForLevel(level) {
    this.clear();
    if (this.keypadEl) {
      this.keypadEl.style.display = 'grid';
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = KeypadController;
  global.KeypadController = KeypadController;
}
if (typeof window !== 'undefined') {
  window.KeypadController = KeypadController;
}
