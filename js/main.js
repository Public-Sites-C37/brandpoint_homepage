/* Brandpoint Landing Page — Scroll Reveal, Nav & Interactions */

document.addEventListener('DOMContentLoaded', function() {

  // --- Enable scroll reveal animations (progressive enhancement) ---
  // Content is visible by default; this class enables the hide → reveal cycle
  document.documentElement.classList.add('bp-reveal-ready');

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

  // --- GA4 Event Tracking (via gtag) ---
  function trackEvent(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, params));
  }

  // CTA Click Tracking
  document.querySelectorAll('.bp-landing-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var section = btn.closest('section') || btn.closest('header');
      var sectionId = section ? section.id || 'unknown' : 'nav';
      trackEvent('cta_click', {
        cta_text: btn.textContent.trim(),
        cta_url: btn.href || '',
        cta_section: sectionId
      });
    });
  });

  // Section Scroll Tracking
  var trackedSections = ['packages', 'optimize', 'case-study', 'final-cta'];
  var sectionsSeen = {};

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !sectionsSeen[entry.target.id]) {
          sectionsSeen[entry.target.id] = true;
          trackEvent('section_view', {
            section_id: entry.target.id,
            section_name: entry.target.querySelector('h2') ?
              entry.target.querySelector('h2').textContent.trim().substring(0, 60) : entry.target.id
          });
        }
      });
    }, { threshold: 0.3 });

    trackedSections.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }

  // Outbound Link Tracking (nav links to brandpoint.com subpages)
  document.querySelectorAll('.bp-landing-nav-links a, .bp-landing-footer-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      trackEvent('nav_click', {
        link_text: link.textContent.trim(),
        link_url: link.href || ''
      });
    });
  });

});
