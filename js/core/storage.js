/**
 * Storage Manager for Math Cerebro
 * Persists user game progress, coins, unlocked hints, and preferences.
 */
class StorageManager {
  constructor() {
    this.STORAGE_KEY = 'math_cerebro_save_v1';
    this.data = this.load();
  }

  getDefaultData() {
    return {
      currentLevel: 1,
      completedLevels: {}, // id: true
      coins: 100,          // Starting coins
      unlockedHints: {},   // id: [0, 1, 2]
      settings: {
        theme: 'dark',
        sound: true,
        vibration: true
      }
    };
  }

  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const data = Object.assign(this.getDefaultData(), parsed);
        if (!data.unlockedHints || typeof data.unlockedHints !== 'object') {
          data.unlockedHints = {};
        }
        if (!data.completedLevels || typeof data.completedLevels !== 'object') {
          data.completedLevels = {};
        }
        if (!data.settings || typeof data.settings !== 'object') {
          data.settings = this.getDefaultData().settings;
        }
        return data;
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using memory storage:', e);
    }
    return this.getDefaultData();
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Could not write to localStorage:', e);
    }
  }

  getCurrentLevel() {
    return this.data.currentLevel || 1;
  }

  setCurrentLevel(id) {
    this.data.currentLevel = Math.max(1, Math.min(100, parseInt(id, 10)));
    this.save();
  }

  isUnlocked(levelId) {
    const id = parseInt(levelId, 10);
    if (id === 1) return true;
    return !!this.data.completedLevels[id - 1] || this.data.currentLevel >= id;
  }

  isCompleted(levelId) {
    return !!this.data.completedLevels[parseInt(levelId, 10)];
  }

  getTotalSolved() {
    return Object.keys(this.data.completedLevels).length;
  }

  getCoins() {
    return this.data.coins;
  }

  addCoins(amount) {
    this.data.coins = Math.max(0, this.data.coins + amount);
    this.save();
    return this.data.coins;
  }

  spendCoins(amount) {
    if (this.data.coins >= amount) {
      this.data.coins -= amount;
      this.save();
      return true;
    }
    return false;
  }

  completeLevel(levelId) {
    const id = parseInt(levelId, 10);
    this.data.completedLevels[id] = true;

    if (this.data.currentLevel <= id && id < 100) {
      this.data.currentLevel = id + 1;
    }
    this.save();
  }

  getUnlockedHints(levelId) {
    const id = parseInt(levelId, 10);
    if (!this.data.unlockedHints) this.data.unlockedHints = {};
    return this.data.unlockedHints[id] || [];
  }

  unlockHint(levelId, hintIndex) {
    const id = parseInt(levelId, 10);
    if (!this.data.unlockedHints) {
      this.data.unlockedHints = {};
    }
    if (!this.data.unlockedHints[id]) {
      this.data.unlockedHints[id] = [];
    }
    if (!this.data.unlockedHints[id].includes(hintIndex)) {
      this.data.unlockedHints[id].push(hintIndex);
      this.save();
    }
  }

  getSetting(key) {
    return this.data.settings[key];
  }

  setSetting(key, val) {
    this.data.settings[key] = val;
    this.save();
  }

  resetAll() {
    this.data = this.getDefaultData();
    this.save();
  }
}

window.gameStorage = new StorageManager();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
  global.gameStorage = window.gameStorage;
}
