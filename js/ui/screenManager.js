/**
 * Screen & Modal Flow Manager (Cool, Minimalist - No Stars, No Broken Tabs, No Emoji Locks)
 */
class ScreenManager {
  constructor(options = {}) {
    this.onSelectLevel = options.onSelectLevel || (() => {});

    this.screens = {
      home: document.getElementById('screen-home'),
      levels: document.getElementById('screen-levels'),
      game: document.getElementById('screen-game')
    };

    this.modals = {
      hint: document.getElementById('modal-hint'),
      settings: document.getElementById('modal-settings'),
      themes: document.getElementById('modal-themes')
    };

    this.initCloseButtons();
  }

  initCloseButtons() {
    const closeHint = document.getElementById('btn-close-hint');
    if (closeHint) {
      closeHint.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.closeModal('hint');
      });
    }

    const closeSettings = document.getElementById('btn-close-settings');
    if (closeSettings) {
      closeSettings.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.closeModal('settings');
      });
    }

    const closeThemes = document.getElementById('btn-close-themes');
    if (closeThemes) {
      closeThemes.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.closeModal('themes');
      });
    }

    // Dismiss modal when clicking on backdrop
    if (this.modals.hint) {
      this.modals.hint.addEventListener('click', (e) => {
        if (e.target === this.modals.hint) {
          if (window.sound) window.sound.playClick();
          this.closeModal('hint');
        }
      });
    }
    if (this.modals.settings) {
      this.modals.settings.addEventListener('click', (e) => {
        if (e.target === this.modals.settings) {
          if (window.sound) window.sound.playClick();
          this.closeModal('settings');
        }
      });
    }
    if (this.modals.themes) {
      this.modals.themes.addEventListener('click', (e) => {
        if (e.target === this.modals.themes) {
          if (window.sound) window.sound.playClick();
          this.closeModal('themes');
        }
      });
    }
  }

  showScreen(screenName) {
    for (const key in this.screens) {
      if (this.screens[key]) {
        if (key === screenName) {
          this.screens[key].classList.add('active');
          this.screens[key].scrollTop = 0;
        } else {
          this.screens[key].classList.remove('active');
        }
      }
    }

    if (screenName === 'home') {
      this.updateHomeStats();
    } else if (screenName === 'levels') {
      this.updateLevelSelectHeader();
      this.renderLevelsGrid();
    }
  }

  openModal(modalName) {
    if (this.modals[modalName]) {
      this.modals[modalName].classList.add('active');
    }
  }

  closeModal(modalName) {
    if (this.modals[modalName]) {
      this.modals[modalName].classList.remove('active');
    }
  }

  updateHomeStats() {
    const solved = window.gameStorage.getTotalSolved();
    const curLevel = window.gameStorage.getCurrentLevel();

    const solvedEl = document.getElementById('stat-solved');
    const levelEl = document.getElementById('stat-level');
    const playTextEl = document.getElementById('btn-play-text');

    if (solvedEl) solvedEl.textContent = `${solved}/100`;
    if (levelEl) levelEl.textContent = curLevel > 100 ? '100' : curLevel;
    if (playTextEl) {
      playTextEl.textContent = curLevel > 100 ? 'ALL COMPLETED' : `PLAY LEVEL ${curLevel}`;
    }
  }

  updateLevelSelectHeader() {
    const solvedEl = document.getElementById('level-select-solved');
    if (solvedEl) {
      solvedEl.textContent = `${window.gameStorage.getTotalSolved()}/100`;
    }
  }

  renderLevelsGrid() {
    const gridEl = document.getElementById('levels-grid-container');
    if (!gridEl) return;
    gridEl.innerHTML = '';

    const curLevel = window.gameStorage.getCurrentLevel();

    for (let id = 1; id <= 100; id++) {
      const card = document.createElement('div');
      card.className = 'level-tile';
      card.id = `level-card-${id}`;

      const isUnlocked = window.gameStorage.isUnlocked(id);
      const isCompleted = window.gameStorage.isCompleted(id);

      if (id === curLevel && !isCompleted) {
        card.classList.add('current');
      }

      if (isCompleted) {
        card.classList.add('completed');
      }

      if (!isUnlocked) {
        card.classList.add('locked');
      }

      // Display clean numbers (locked numbers are dimmed in CSS, no cartoon lock emojis)
      const numSpan = document.createElement('span');
      numSpan.className = 'level-tile-num';
      numSpan.textContent = id;
      card.appendChild(numSpan);

      card.addEventListener('click', () => {
        if (!isUnlocked) {
          if (window.sound) window.sound.playWrong();
          if (window.effects) window.effects.vibrate(30);
          return;
        }
        if (window.sound) window.sound.playClick();
        this.onSelectLevel(id);
      });

      gridEl.appendChild(card);
    }
  }
}

window.ScreenManager = ScreenManager;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScreenManager;
  global.ScreenManager = ScreenManager;
}
