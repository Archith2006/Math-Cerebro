/**
 * Math Cerebro - Application Orchestrator
 * Cool, minimalist, zero currency/coins, zero emojis, seamless inline flow.
 */
class MathRiddlesApp {
  constructor() {
    this.currentLevel = null;
    this.currentLevelId = 1;
    this.isLevelSolved = false;
    this.activeHintIndex = 0;

    this.init();
  }

  init() {
    this.screenManager = new ScreenManager({
      onSelectLevel: (levelId) => this.startLevel(levelId)
    });

    this.keypad = new KeypadController({
      onSubmit: (answer) => this.handleAnswerSubmit(answer)
    });

    this.setupNavigation();
    this.setupGameActions();
    this.setupSettings();
    this.setupThemes();
    this.applyPreferences();
    this.screenManager.updateHomeStats();
  }

  setupNavigation() {
    const playBtn = document.getElementById('btn-play-continue');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        const curLevel = window.gameStorage.getCurrentLevel();
        this.startLevel(curLevel <= 100 ? curLevel : 1);
      });
    }

    const levelsBtn = document.getElementById('btn-goto-levels');
    if (levelsBtn) {
      levelsBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.screenManager.showScreen('levels');
      });
    }

    const backHomeBtn = document.getElementById('btn-back-home');
    if (backHomeBtn) {
      backHomeBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.screenManager.showScreen('home');
      });
    }

    const backToLevelsBtn = document.getElementById('btn-back-to-levels');
    if (backToLevelsBtn) {
      backToLevelsBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.screenManager.showScreen('levels');
      });
    }

    const themesBtn = document.getElementById('btn-goto-themes');
    if (themesBtn) {
      themesBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.screenManager.openModal('themes');
      });
    }
  }

  setupGameActions() {
    const hintBtn = document.getElementById('btn-open-hint');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        if (!this.currentLevel) {
          const curId = window.gameStorage.getCurrentLevel() || 1;
          this.currentLevel = (window.GAME_LEVELS || []).find((l) => l.id === curId);
          this.currentLevelId = curId;
        }
        this.activeHintIndex = 0;
        this.renderHintModal();
        this.screenManager.openModal('hint');
      });
    }

    const skipBtn = document.getElementById('btn-skip-level');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        this.handleSkipLevel();
      });
    }

    const nextLevelBtn = document.getElementById('btn-next-level');
    if (nextLevelBtn) {
      nextLevelBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.goToNextLevel();
      });
    }
  }

  setupSettings() {
    const settingsBtn = document.getElementById('btn-goto-settings');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.screenManager.openModal('settings');
      });
    }

    const themeToggle = document.getElementById('setting-theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        window.gameStorage.setSetting('theme', theme);
        if (window.sound) window.sound.playClick();
      });
    }

    const homeSoundBtn = document.getElementById('btn-toggle-sound');
    if (homeSoundBtn) {
      homeSoundBtn.addEventListener('click', () => {
        const currentlyEnabled = window.gameStorage.getSetting('sound') !== false;
        const newState = !currentlyEnabled;
        window.gameStorage.setSetting('sound', newState);
        if (window.sound) {
          window.sound.setEnabled(newState);
          if (newState) window.sound.playClick();
        }
        this.updateSoundUI(newState);
      });
    }

    const soundToggle = document.getElementById('setting-sound-toggle');
    if (soundToggle) {
      soundToggle.addEventListener('change', (e) => {
        window.gameStorage.setSetting('sound', e.target.checked);
        if (window.sound) window.sound.setEnabled(e.target.checked);
        this.updateSoundUI(e.target.checked);
      });
    }

    const vibToggle = document.getElementById('setting-vibration-toggle');
    if (vibToggle) {
      vibToggle.addEventListener('change', (e) => {
        window.gameStorage.setSetting('vibration', e.target.checked);
      });
    }

    const resetBtn = document.getElementById('btn-reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset all game progress?')) {
          window.gameStorage.resetAll();
          this.applyPreferences();
          this.screenManager.closeModal('settings');
          this.screenManager.updateHomeStats();
          this.screenManager.showScreen('home');
        }
      });
    }
  }

  updateSoundUI(soundEnabled) {
    const icon = document.getElementById('sound-icon-indicator');
    const homeSoundBtn = document.getElementById('btn-toggle-sound');
    if (icon) {
      icon.textContent = soundEnabled ? '🔊' : '🔇';
    }
    if (homeSoundBtn) {
      homeSoundBtn.title = soundEnabled ? 'Mute Sound' : 'Unmute Sound';
      homeSoundBtn.setAttribute('aria-label', soundEnabled ? 'Mute Sound' : 'Unmute Sound');
      if (soundEnabled) {
        homeSoundBtn.classList.remove('sound-muted');
      } else {
        homeSoundBtn.classList.add('sound-muted');
      }
    }
    const soundToggle = document.getElementById('setting-sound-toggle');
    if (soundToggle) soundToggle.checked = soundEnabled;
  }

  applyPreferences() {
    const theme = window.gameStorage.getSetting('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('setting-theme-toggle');
    if (themeToggle) themeToggle.checked = (theme === 'dark');

    const soundEnabled = window.gameStorage.getSetting('sound') !== false;
    this.updateSoundUI(soundEnabled);
    if (window.sound) window.sound.setEnabled(soundEnabled);

    const vibEnabled = window.gameStorage.getSetting('vibration') !== false;
    const vibToggle = document.getElementById('setting-vibration-toggle');
    if (vibToggle) vibToggle.checked = vibEnabled;

    const themeBg = window.gameStorage.getSetting('theme_bg') || 'twilight_mountain';
    this.applyTheme(themeBg);
  }

  setupThemes() {
    const container = document.getElementById('themes-grid-container');
    if (!container || !window.GAME_THEMES) return;

    container.innerHTML = '';
    const currentThemeId = window.gameStorage.getSetting('theme_bg') || 'twilight_mountain';

    window.GAME_THEMES.forEach((theme) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'theme-card' + (theme.id === currentThemeId ? ' active' : '');
      card.setAttribute('data-theme-id', theme.id);
      card.setAttribute('title', `${theme.name} - ${theme.subtitle}`);

      // Thumbnail Image
      const img = document.createElement('img');
      img.className = 'theme-card-img';
      img.src = theme.image;
      img.alt = theme.name;
      img.loading = 'lazy';
      card.appendChild(img);

      // Glassy Bottom Overlay
      const overlay = document.createElement('div');
      overlay.className = 'theme-card-overlay';

      const title = document.createElement('div');
      title.className = 'theme-card-title';
      title.textContent = theme.name;
      overlay.appendChild(title);

      const paletteRow = document.createElement('div');
      paletteRow.className = 'theme-card-palette-row';

      const dot = document.createElement('span');
      dot.className = 'theme-card-dot';
      dot.style.color = theme.accentColor;
      dot.style.backgroundColor = theme.accentColor;
      paletteRow.appendChild(dot);

      const tag = document.createElement('span');
      tag.className = 'theme-card-tag';
      tag.textContent = theme.paletteTag;
      paletteRow.appendChild(tag);

      overlay.appendChild(paletteRow);
      card.appendChild(overlay);

      // Active Check Indicator
      const activeIndicator = document.createElement('span');
      activeIndicator.className = 'theme-active-indicator';
      activeIndicator.textContent = '✓';
      card.appendChild(activeIndicator);

      card.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.applyTheme(theme.id);
      });

      container.appendChild(card);
    });
  }

  applyTheme(themeId) {
    if (!window.GAME_THEMES || !window.GAME_THEMES.length) return;
    const theme = window.GAME_THEMES.find((t) => t.id === themeId) || window.GAME_THEMES[0];
    if (!theme) return;

    // Update body background image
    document.body.style.backgroundImage = `url("${theme.image}")`;

    // Update dynamic root styling variables
    document.documentElement.style.setProperty('--theme-vignette', theme.vignette);
    document.documentElement.style.setProperty('--theme-app-bg', theme.appBg);
    document.documentElement.style.setProperty('--theme-accent', theme.accentColor);
    document.documentElement.style.setProperty('--theme-shadow', theme.appShadow);
    document.documentElement.style.setProperty('--accent-theme', theme.accentColor);

    // Save to storage
    window.gameStorage.setSetting('theme_bg', theme.id);

    // Update UI active card states
    const cards = document.querySelectorAll('.theme-card');
    cards.forEach((card) => {
      if (card.getAttribute('data-theme-id') === theme.id) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  startLevel(levelId) {
    const id = parseInt(levelId, 10);
    const level = (window.GAME_LEVELS || []).find((l) => l.id === id);
    if (!level) return;

    this.currentLevel = level;
    this.currentLevelId = id;
    this.isLevelSolved = false;
    this.activeHintIndex = 0;

    window.gameStorage.setCurrentLevel(id);

    // Reset completion panel and restore keypad and control bar
    const completePanel = document.getElementById('level-complete-panel');
    if (completePanel) completePanel.classList.add('hidden');

    const controlBar = document.querySelector('.game-control-bar');
    if (controlBar) controlBar.classList.remove('hidden');

    const keypad = document.getElementById('virtual-keypad');
    if (keypad) keypad.classList.remove('hidden');

    // Reset answer bar
    const answerBar = document.getElementById('answer-bar');
    if (answerBar) answerBar.classList.remove('correct');
    this.keypad.clear();

    // Update Header: 'Level X' (matching Image 2, 3, 5)
    const levelNumEl = document.getElementById('game-level-num');
    if (levelNumEl) levelNumEl.textContent = `Level ${level.id}`;

    // Render Puzzle Card
    const puzzleBox = document.getElementById('puzzle-content-box');
    if (puzzleBox) {
      window.PuzzleRenderer.render(level, puzzleBox);
    }

    // Configure Keypad
    this.keypad.configureForLevel(level);

    this.screenManager.showScreen('game');
  }

  handleAnswerSubmit(userInput) {
    if (!this.currentLevel) return;

    if (this.isLevelSolved) {
      this.goToNextLevel();
      return;
    }

    const isCorrect = window.AnswerValidator.check(userInput, this.currentLevel);

    if (isCorrect) {
      this.handleCorrectAnswer();
    } else {
      this.handleWrongAnswer();
    }
  }

  handleCorrectAnswer() {
    this.isLevelSolved = true;

    if (window.sound) window.sound.playCorrect();
    if (window.effects) window.effects.vibrate(50);

    // Mark Completed in storage
    window.gameStorage.completeLevel(this.currentLevelId);

    // Style Answer Bar
    const answerBar = document.getElementById('answer-bar');
    if (answerBar) answerBar.classList.add('correct');

    // Hide control bar and keypad, reveal Next Level button panel
    const controlBar = document.querySelector('.game-control-bar');
    if (controlBar) controlBar.classList.add('hidden');

    const keypad = document.getElementById('virtual-keypad');
    if (keypad) keypad.classList.add('hidden');

    const completePanel = document.getElementById('level-complete-panel');
    if (completePanel) {
      const nextBtn = document.getElementById('btn-next-level');
      if (nextBtn) {
        if (this.currentLevelId >= 100) {
          nextBtn.innerHTML = `
            <span>VIEW ALL LEVELS</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          `;
        } else {
          nextBtn.innerHTML = `
            <span>NEXT LEVEL</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          `;
        }
      }
      completePanel.classList.remove('hidden');
    }
  }

  goToNextLevel() {
    const nextId = this.currentLevelId + 1;
    if (nextId <= 100) {
      this.startLevel(nextId);
    } else {
      this.screenManager.updateHomeStats();
      this.screenManager.showScreen('levels');
    }
  }

  handleWrongAnswer() {
    if (window.sound) window.sound.playWrong();
    if (window.effects) {
      window.effects.shake(document.getElementById('answer-bar'));
      window.effects.vibrate(50);
    }
    this.keypad.clear();
  }

  // Step-by-Step Single Hint Display (Hint 1 only first, then Hint 2 only, then Hint 3 only)
  renderHintModal() {
    const container = document.getElementById('hint-steps-container');
    if (!container) return;

    if (!this.currentLevel) {
      const curId = this.currentLevelId || window.gameStorage.getCurrentLevel() || 1;
      this.currentLevel = (window.GAME_LEVELS || []).find((l) => l.id === curId);
      this.currentLevelId = curId;
    }
    if (!this.currentLevel || !Array.isArray(this.currentLevel.hints)) return;

    container.innerHTML = '';

    // Automatically ensure Hint 1 is unlocked for this level
    window.gameStorage.unlockHint(this.currentLevelId, 0);

    const hintTitles = ['Nudge', 'Formula / Direction', 'Full Solution'];

    if (typeof this.activeHintIndex !== 'number' || this.activeHintIndex < 0 || this.activeHintIndex > 2) {
      this.activeHintIndex = 0;
    }
    const currentStep = this.activeHintIndex;

    // 1. Top Tabs: [ Hint 1 ]  [ Hint 2 ]  [ Hint 3 ]
    const tabsRow = document.createElement('div');
    tabsRow.className = 'hint-tabs-nav';

    hintTitles.forEach((title, idx) => {
      const tabBtn = document.createElement('button');
      tabBtn.className = 'hint-tab-btn' + (idx === currentStep ? ' active' : '');
      tabBtn.type = 'button';
      tabBtn.textContent = `Hint ${idx + 1}`;
      if (idx === currentStep) {
        tabBtn.setAttribute('aria-current', 'true');
      }

      tabBtn.addEventListener('click', () => {
        if (idx !== this.activeHintIndex) {
          window.gameStorage.unlockHint(this.currentLevelId, idx);
          if (window.sound) window.sound.playClick();
          this.activeHintIndex = idx;
          this.renderHintModal();
        }
      });
      tabsRow.appendChild(tabBtn);
    });
    container.appendChild(tabsRow);

    // 2. Single Hint Card (Only ONE hint displayed at a time)
    const card = document.createElement('div');
    card.className = 'hint-single-card';

    const header = document.createElement('div');
    header.className = 'hint-step-label';
    header.textContent = `HINT ${currentStep + 1}: ${hintTitles[currentStep]}`;
    card.appendChild(header);

    const text = document.createElement('p');
    text.className = 'hint-body-text';
    text.textContent = this.currentLevel.hints[currentStep] || 'No hint available.';
    card.appendChild(text);

    container.appendChild(card);

    // 3. Navigation Row (Previous Hint / Next Hint)
    const navRow = document.createElement('div');
    navRow.className = 'hint-nav-row';

    if (currentStep > 0) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'btn-hint-prev';
      prevBtn.type = 'button';
      prevBtn.textContent = `‹ Hint ${currentStep}`;
      prevBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.activeHintIndex = currentStep - 1;
        this.renderHintModal();
      });
      navRow.appendChild(prevBtn);
    }

    if (currentStep < 2) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn-hint-next';
      nextBtn.type = 'button';
      nextBtn.textContent = `Show Hint ${currentStep + 2} (${hintTitles[currentStep + 1]}) ›`;
      nextBtn.addEventListener('click', () => {
        const nextStep = currentStep + 1;
        window.gameStorage.unlockHint(this.currentLevelId, nextStep);
        if (window.sound) window.sound.playHint();
        this.activeHintIndex = nextStep;
        this.renderHintModal();
      });
      navRow.appendChild(nextBtn);
    } else {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'btn-hint-next';
      closeBtn.type = 'button';
      closeBtn.textContent = 'Got It (Close)';
      closeBtn.addEventListener('click', () => {
        if (window.sound) window.sound.playClick();
        this.screenManager.closeModal('hint');
      });
      navRow.appendChild(closeBtn);
    }

    container.appendChild(navRow);
  }

  handleSkipLevel() {
    if (confirm(`Skip Level ${this.currentLevelId}?`)) {
      window.gameStorage.completeLevel(this.currentLevelId);
      this.goToNextLevel();
    }
  }
}

window.MathRiddlesApp = MathRiddlesApp;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MathRiddlesApp;
  global.MathRiddlesApp = MathRiddlesApp;
}

if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('DOMContentLoaded', () => {
    window.app = new MathRiddlesApp();
  });
}
