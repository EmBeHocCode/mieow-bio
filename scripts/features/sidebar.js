/**
 * Sidebar Toggle Logic
 * Handles sidebar open/close with graceful fallback if sidebar CSS fails to load.
 */

function initSidebar() {
  if (window.__sidebarInitialized) {
    return;
  }

  const setup = () => {
    const menuBtn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const overlay = document.getElementById('sidebar-overlay');

    console.log('Sidebar elements:', {
      menuBtn: !!menuBtn,
      sidebar: !!sidebar,
      sidebarClose: !!sidebarClose,
      overlay: !!overlay
    });

    if (!menuBtn || !sidebar) {
      console.warn('Sidebar elements not found');
      return;
    }

    let fallbackMode = false;
    let lastGlobalToggleAt = 0;

    const forceMenuButtonStyles = () => {
      // Ensure the trigger stays clickable even if other layers overlap.
      Object.assign(menuBtn.style, {
        position: 'fixed',
        top: '16px',
        left: '16px',
        zIndex: '20001',
        pointerEvents: 'auto',
        touchAction: 'manipulation'
      });
    };

    const ensureFallbackStyles = () => {
      const sidebarStyle = window.getComputedStyle(sidebar);
      if (sidebarStyle.position !== 'fixed') {
        fallbackMode = true;
        Object.assign(sidebar.style, {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '280px',
          maxWidth: '80vw',
          height: '100vh',
          padding: '16px',
          background: 'rgba(10, 10, 10, 0.98)',
          borderRight: '1px solid rgba(255, 0, 110, 0.3)',
          boxShadow: '4px 0 30px rgba(0, 0, 0, 0.5)',
          overflowY: 'auto',
          zIndex: '500',
          transform: 'translateX(-100%)',
          transition: 'transform 0.3s ease'
        });
      }

      if (overlay) {
        const overlayStyle = window.getComputedStyle(overlay);
        if (overlayStyle.position !== 'fixed') {
          fallbackMode = true;
          Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: '499',
            opacity: '0',
            visibility: 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease'
          });
        }
      }
    };

    const openSidebar = () => {
      sidebar.classList.add('active');
      if (overlay) {
        overlay.classList.add('active');
      }
      menuBtn.classList.add('menu-toggle--hidden');

      if (fallbackMode) {
        sidebar.style.transform = 'translateX(0)';
        if (overlay) {
          overlay.style.opacity = '1';
          overlay.style.visibility = 'visible';
        }
      }
    };

    const closeSidebar = () => {
      sidebar.classList.remove('active');
      if (overlay) {
        overlay.classList.remove('active');
      }
      menuBtn.classList.remove('menu-toggle--hidden');

      if (fallbackMode) {
        sidebar.style.transform = 'translateX(-100%)';
        if (overlay) {
          overlay.style.opacity = '0';
          overlay.style.visibility = 'hidden';
        }
      }
    };

    const toggleSidebar = () => {
      if (sidebar.classList.contains('active')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    };

    ensureFallbackStyles();
    forceMenuButtonStyles();
    closeSidebar();

    menuBtn.addEventListener('click', () => {
      console.log('Menu button clicked');
      toggleSidebar();
    });

    if (sidebarClose) {
      sidebarClose.addEventListener('click', () => {
        closeSidebar();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        closeSidebar();
      });
    }

    // Global click fallback: open/close when user clicks where the menu button is,
    // even if another transparent layer intercepts the element target.
    document.addEventListener('click', (e) => {
      if (!menuBtn || !e || typeof e.clientX !== 'number' || typeof e.clientY !== 'number') {
        return;
      }

      const now = Date.now();
      if (now - lastGlobalToggleAt < 200) {
        return;
      }

      const rect = menuBtn.getBoundingClientRect();
      const insideMenuBox =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (insideMenuBox && !menuBtn.contains(e.target)) {
        lastGlobalToggleAt = now;
        console.log('Menu area fallback click');
        toggleSidebar();
      }
    }, true);

    const navLinks = sidebar.querySelectorAll('.sidebar__nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          closeSidebar();

          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            setTimeout(() => {
              targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
          }
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
      }
    });

    // Allow other modules (e.g. settings) to control sidebar state cleanly.
    document.addEventListener('sidebar:close', closeSidebar);
    document.addEventListener('sidebar:open', openSidebar);
    document.addEventListener('sidebar:toggle', toggleSidebar);

    const currentPage = window.location.pathname;
    document.querySelectorAll('.sidebar__nav-link').forEach((link) => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });

    window.__sidebarInitialized = true;
    console.log('Sidebar initialized');
  };

  if (document.getElementById('sidebar')) {
    setup();
  } else {
    document.addEventListener('partials-loaded', setup);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebar);
} else {
  initSidebar();
}
