/* Brandpoint Landing Page — Scroll Reveal & Interactions */

document.addEventListener('DOMContentLoaded', function() {

  // Scroll reveal — IntersectionObserver for fade-in animations
  const revealElements = document.querySelectorAll('.bp-landing-reveal');

  if (revealElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('bp-landing-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function(el) {
      el.classList.add('bp-landing-visible');
    });
  }

  // Animate the gauge donut on scroll
  var gaugeCircle = document.querySelector('.bp-landing-gauge-svg circle:nth-child(2)');
  if (gaugeCircle) {
    var originalDash = gaugeCircle.getAttribute('stroke-dasharray');
    gaugeCircle.setAttribute('stroke-dasharray', '0 440');
    gaugeCircle.style.transition = 'stroke-dasharray 1.2s cubic-bezier(0.16, 1, 0.3, 1)';

    var gaugeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          gaugeCircle.setAttribute('stroke-dasharray', originalDash);
          gaugeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    gaugeObserver.observe(gaugeCircle.closest('.bp-landing-gauge-card'));
  }
});
