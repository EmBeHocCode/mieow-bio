/**
 * Settings Modal Logic
 * Handles settings panel and preference toggles
 */

function initSettings() {
  const setup = () => {
    const openBtn = document.getElementById('open-settings');
    const closeBtn = document.getElementById('close-settings');
    const modal = document.getElementById('settings-modal');
    const overlay = modal?.querySelector('.modal__overlay');

    if (!modal || !openBtn) {
      console.warn('⚠️ Settings elements not found');
      return;
    }

    const requestSidebarClose = () => {
      document.dispatchEvent(new CustomEvent('sidebar:close'));
    };

    // Open modal
    const openModal = () => {
      requestSidebarClose();

      // Open on next frame so sidebar classes/overlay can update first.
      requestAnimationFrame(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    };

    // Close modal
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    // Event listeners
    openBtn.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        AppState.set('language', lang);
        
        // Update active state
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Call global setLanguage function from main.js
        if (typeof setLanguage === 'function') {
          setLanguage(lang);
        }
      });

      // Set initial active state
      if (btn.dataset.lang === AppState.get('language')) {
        btn.classList.add('active');
      }
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.checked = AppState.get('theme') === 'dark';
      themeToggle.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        AppState.set('theme', theme);
      });
    }

    // Cursor toggle
    const cursorToggle = document.getElementById('cursor-toggle');
    if (cursorToggle) {
      cursorToggle.checked = AppState.get('cursorEnabled');
      cursorToggle.addEventListener('change', (e) => {
        AppState.set('cursorEnabled', e.target.checked);
      });
    }

    // Effects toggle
    const effectsToggle = document.getElementById('effects-toggle');
    if (effectsToggle) {
      effectsToggle.checked = AppState.get('effectsEnabled');
      effectsToggle.addEventListener('change', (e) => {
        AppState.set('effectsEnabled', e.target.checked);
      });
    }
    
    console.log('✅ Settings initialized');
  };

  // Wait for partials
  if (document.getElementById('settings-modal')) {
    setup();
  } else {
    document.addEventListener('partials-loaded', setup);
  }
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSettings);
} else {
  initSettings();
}
