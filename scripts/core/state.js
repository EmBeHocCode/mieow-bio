/**
 * Global State Management
 * Handles app-wide settings and preferences using localStorage
 */

const AppState = {
  // Default settings
  defaults: {
    language: 'vi',
    theme: 'dark',
    cursorEnabled: true,  // Enable cursor by default
    effectsEnabled: true
  },

  // Get setting from localStorage or default
  get(key) {
    const stored = localStorage.getItem(`bio_${key}`);
    return stored !== null ? JSON.parse(stored) : this.defaults[key];
  },

  // Set setting to localStorage
  set(key, value) {
    localStorage.setItem(`bio_${key}`, JSON.stringify(value));
    // Dispatch state change event
    document.dispatchEvent(new CustomEvent('state-changed', { 
      detail: { key, value } 
    }));
  },

  // Get all settings
  getAll() {
    return {
      language: this.get('language'),
      theme: this.get('theme'),
      cursorEnabled: this.get('cursorEnabled'),
      effectsEnabled: this.get('effectsEnabled')
    };
  },

  // Reset to defaults
  reset() {
    Object.keys(this.defaults).forEach(key => {
      this.set(key, this.defaults[key]);
    });
    console.log('🔄 State reset to defaults');
  },

  // Initialize state on page load
  init() {
    const state = this.getAll();
    
    console.log('🔧 State init - cursorEnabled:', state.cursorEnabled);
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', state.theme);
    
    // Apply cursor state - DON'T block if enabled
    if (!state.cursorEnabled) {
      document.body.classList.add('no-custom-cursor');
      console.log('❌ Cursor disabled by settings');
    } else {
      console.log('✅ Cursor enabled, will init from main.js');
    }
    
    // Apply effects state
    if (!state.effectsEnabled) {
      document.body.classList.add('no-effects');
    }
    
    console.log('✅ App state initialized:', state);
    
    // Return state and let cursor init naturally from main.js
    return state;
  }
};

// Initialize state immediately
AppState.init();

// Listen for state changes and apply them
document.addEventListener('state-changed', (e) => {
  const { key, value } = e.detail;
  
  switch(key) {
    case 'theme':
      document.documentElement.setAttribute('data-theme', value);
      break;
    case 'cursorEnabled':
      document.body.classList.toggle('no-custom-cursor', !value);
      // Reinit cursor if needed
      if (value && typeof initCursor === 'function') {
        setTimeout(() => initCursor(), 100);
      }
      break;
    case 'effectsEnabled':
      document.body.classList.toggle('no-effects', !value);
      break;
  }
});
