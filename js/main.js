/* Brandpoint Landing Page — Scroll Reveal, Nav & Interactions */

document.addEventListener('DOMContentLoaded', function() {

  // --- Scroll Reveal — IntersectionObserver for fade-in animations ---
  var revealElements = document.querySelectorAll('.bp-landing-reveal');

  if (revealElements.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
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
    revealElements.forEach(function(el) {
      el.classList.add('bp-landing-visible');
    });
  }

  // --- Gauge Donut Animation on Scroll ---
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

  // --- Sticky Nav Scroll Detection (with rAF throttle) ---
  var nav = document.querySelector('.bp-landing-nav');
  if (nav) {
    var navScrolled = false;
    var ticking = false;

    function updateNavScroll() {
      var shouldBeScrolled = window.scrollY > 50;
      if (shouldBeScrolled !== navScrolled) {
        navScrolled = shouldBeScrolled;
        nav.classList.toggle('bp-landing-nav-scrolled', navScrolled);
      }
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateNavScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Mobile Hamburger Toggle ---
  var navToggle = document.querySelector('.bp-landing-nav-toggle');
  var navLinks = document.querySelector('.bp-landing-nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      var isOpen = navLinks.classList.toggle('bp-landing-nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('bp-landing-nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && navLinks.classList.contains('bp-landing-nav-open')) {
        navLinks.classList.remove('bp-landing-nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

});
