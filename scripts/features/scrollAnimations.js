/**
 * Scroll Animations
 * Fade in/out sections as user scrolls
 */

function initScrollAnimations() {
  // Configuration
  const config = {
    threshold: 0.15, // Show when 15% visible
    rootMargin: '0px 0px -100px 0px' // Trigger slightly before reaching viewport
  };

  // Get all sections to animate
  const sections = document.querySelectorAll('.section, .section--hero, .section--about, .section--projects, .section--cta');

  // Set initial state - all hidden
  sections.forEach(section => {
    section.classList.add('section-hidden');
  });

  // Intersection Observer callback
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is visible - show it
        entry.target.classList.remove('section-hidden');
        entry.target.classList.add('section-visible');
      } else {
        // Section is out of view - hide it again
        entry.target.classList.remove('section-visible');
        entry.target.classList.add('section-hidden');
      }
    });
  };

  // Create observer
  const observer = new IntersectionObserver(observerCallback, config);

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });

  console.log('🎬 Scroll animations initialized for', sections.length, 'sections');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}
