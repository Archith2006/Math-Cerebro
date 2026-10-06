/**
 * Math Cerebro - Curated Wallpaper & Color Themes
 * 12 High-Aesthetic Atmospheric Themes with Distinct Palettes
 * Frosted Glass UI is preserved across all themes.
 */
const GAME_THEMES = [
  {
    id: 'twilight_mountain',
    name: 'Twilight Dusk',
    subtitle: 'Classic Mountain Peak',
    image: 'assets/bg-mountain.jpg',
    accentColor: '#c084fc',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(217, 70, 239, 0.18) 0%, rgba(16, 8, 29, 0.45) 75%, rgba(8, 4, 15, 0.85) 100%)',
    appBg: 'rgba(22, 10, 36, 0.45)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(168, 85, 247, 0.15)',
    paletteTag: 'Purple / Dusk'
  },
  {
    id: 'emerald_aurora',
    name: 'Emerald Aurora',
    subtitle: 'Northern Lights Fjord',
    image: 'assets/themes/emerald_aurora.jpg',
    accentColor: '#34d399',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(16, 185, 129, 0.22) 0%, rgba(6, 40, 34, 0.45) 75%, rgba(3, 18, 15, 0.85) 100%)',
    appBg: 'rgba(6, 30, 25, 0.45)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(52, 211, 153, 0.20)',
    paletteTag: 'Emerald Green'
  },
  {
    id: 'cyberpunk_neon',
    name: 'Cyberpunk Neon',
    subtitle: 'Electric Metropolis',
    image: 'assets/themes/cyberpunk_neon.jpg',
    accentColor: '#f43f5e',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(244, 63, 94, 0.22) 0%, rgba(22, 8, 38, 0.45) 75%, rgba(10, 4, 18, 0.85) 100%)',
    appBg: 'rgba(20, 8, 35, 0.48)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(244, 63, 94, 0.20)',
    paletteTag: 'Electric Magenta'
  },
  {
    id: 'sunset_crimson',
    name: 'Sunset Crimson',
    subtitle: 'Fiery Alpine Horizon',
    image: 'assets/themes/sunset_crimson.jpg',
    accentColor: '#fb923c',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(249, 115, 22, 0.22) 0%, rgba(42, 14, 12, 0.45) 75%, rgba(18, 5, 5, 0.85) 100%)',
    appBg: 'rgba(32, 12, 10, 0.45)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(251, 146, 60, 0.20)',
    paletteTag: 'Crimson Amber'
  },
  {
    id: 'oceanic_abyss',
    name: 'Oceanic Abyss',
    subtitle: 'Bioluminescent Depths',
    image: 'assets/themes/oceanic_abyss.jpg',
    accentColor: '#38bdf8',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(14, 165, 233, 0.22) 0%, rgba(6, 26, 48, 0.45) 75%, rgba(3, 12, 24, 0.85) 100%)',
    appBg: 'rgba(6, 22, 42, 0.45)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(56, 189, 248, 0.20)',
    paletteTag: 'Cyan / Ocean'
  },
  {
    id: 'cosmic_nebula',
    name: 'Cosmic Nebula',
    subtitle: 'Interstellar Stardust',
    image: 'assets/themes/cosmic_nebula.jpg',
    accentColor: '#e879f9',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(192, 38, 211, 0.22) 0%, rgba(25, 8, 42, 0.45) 75%, rgba(11, 3, 20, 0.85) 100%)',
    appBg: 'rgba(22, 8, 38, 0.45)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(232, 121, 249, 0.20)',
    paletteTag: 'Cosmic Violet'
  },
  {
    id: 'golden_mirage',
    name: 'Golden Mirage',
    subtitle: 'Radiant Sahara Dunes',
    image: 'assets/themes/golden_mirage.jpg',
    accentColor: '#facc15',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(234, 179, 8, 0.22) 0%, rgba(42, 28, 8, 0.45) 75%, rgba(18, 12, 3, 0.85) 100%)',
    appBg: 'rgba(32, 22, 8, 0.45)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(250, 204, 21, 0.20)',
    paletteTag: 'Radiant Gold'
  },
  {
    id: 'arctic_frost',
    name: 'Arctic Frost',
    subtitle: 'Crystalline Glacial Cave',
    image: 'assets/themes/arctic_frost.jpg',
    accentColor: '#67e8f9',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(6, 182, 212, 0.22) 0%, rgba(10, 32, 45, 0.45) 75%, rgba(4, 15, 24, 0.85) 100%)',
    appBg: 'rgba(8, 26, 40, 0.45)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(103, 232, 249, 0.20)',
    paletteTag: 'Glacial Ice'
  },
  {
    id: 'tokyo_midnight',
    name: 'Tokyo Midnight',
    subtitle: 'Rainy Cyber Alley',
    image: 'assets/themes/tokyo_midnight.jpg',
    accentColor: '#818cf8',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(99, 102, 241, 0.22) 0%, rgba(14, 16, 38, 0.45) 75%, rgba(6, 7, 18, 0.85) 100%)',
    appBg: 'rgba(12, 14, 32, 0.48)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(129, 140, 248, 0.20)',
    paletteTag: 'Midnight Indigo'
  },
  {
    id: 'sakura_twilight',
    name: 'Sakura Twilight',
    subtitle: 'Blossom Reflection Pool',
    image: 'assets/themes/sakura_twilight.jpg',
    accentColor: '#f472b6',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(244, 114, 182, 0.22) 0%, rgba(36, 12, 30, 0.45) 75%, rgba(16, 5, 14, 0.85) 100%)',
    appBg: 'rgba(28, 10, 24, 0.45)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(244, 114, 182, 0.20)',
    paletteTag: 'Pastel Sakura'
  },
  {
    id: 'celestial_void',
    name: 'Celestial Void',
    subtitle: 'Solar Eclipse Diamond',
    image: 'assets/themes/celestial_void.jpg',
    accentColor: '#e2e8f0',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.12) 0%, rgba(18, 18, 22, 0.50) 75%, rgba(6, 6, 8, 0.90) 100%)',
    appBg: 'rgba(12, 12, 16, 0.50)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.75), 0 0 45px rgba(255, 255, 255, 0.12)',
    paletteTag: 'Obsidian Black'
  },
  {
    id: 'ember_magma',
    name: 'Ember Magma',
    subtitle: 'Molten Basalt Fissure',
    image: 'assets/themes/ember_magma.jpg',
    accentColor: '#ef4444',
    vignette: 'radial-gradient(circle at 50% 25%, rgba(239, 68, 68, 0.22) 0%, rgba(38, 10, 8, 0.45) 75%, rgba(16, 4, 3, 0.85) 100%)',
    appBg: 'rgba(28, 8, 6, 0.48)',
    appShadow: '0 30px 80px rgba(0, 0, 0, 0.65), 0 0 45px rgba(239, 68, 68, 0.20)',
    paletteTag: 'Molten Flame'
  }
];

if (typeof window !== 'undefined') {
  window.GAME_THEMES = GAME_THEMES;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GAME_THEMES;
}
