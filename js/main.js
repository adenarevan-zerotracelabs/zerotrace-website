/* ============================================================
   ZEROTRACE — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ─── Navbar scroll state ─── */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();


  /* ─── Hamburger / Mobile Menu ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });


  /* ─── Scroll Reveal (Intersection Observer) ─── */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }


  /* ─── Smooth Scroll for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
        10
      ) || 72;

      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ─── Terminal typewriter effect ─── */
  const terminalLines = document.querySelectorAll('.terminal-line');

  function animateTerminal() {
    terminalLines.forEach((line, i) => {
      line.style.opacity = '0';
      line.style.transform = 'translateX(-6px)';
      line.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      }, 800 + i * 280);
    });
  }

  const terminalCard = document.querySelector('.terminal-card');
  if (terminalCard) {
    const termObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateTerminal();
          termObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    termObserver.observe(terminalCard);
  }


  /* ─── Active nav link highlight on scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function updateActiveNav() {
    const navHeight = 72;
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 60;
      if (window.scrollY >= sectionTop) {
        current = '#' + section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === current) {
        link.style.color = 'var(--text-primary)';
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });


  /* ─── Counter animation for hero metrics ─── */
  function animateCounter(el, target, duration, suffix) {
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    function update(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;

      if (suffix === '%') {
        el.textContent = value.toFixed(1) + '%';
      } else if (suffix === '+') {
        el.textContent = Math.floor(value) + '+';
      } else if (suffix === '<') {
        el.textContent = '<' + Math.ceil(target - (eased * (target - 1))) + 'h';
      } else {
        el.textContent = Math.floor(value);
      }

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const metricsSection = document.querySelector('.hero-metrics');
  if (metricsSection) {
    const metricValues = metricsSection.querySelectorAll('.metric-value');
    const metricTargets = [
      { value: 50, suffix: '+' },
      { value: 99.9, suffix: '%' },
      { value: 24, suffix: '<' },
    ];

    const metricObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          metricValues.forEach((el, i) => {
            const { value, suffix } = metricTargets[i];
            animateCounter(el, value, 1600, suffix);
          });
          metricObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    metricObserver.observe(metricsSection);
  }


  /* ─── Service card tilt effect (subtle) ─── */
  const serviceCards = document.querySelectorAll('.service-card:not(.service-card--cta)');

  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, border-color 0.3s, box-shadow 0.3s';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, background 0.3s, border-color 0.3s, box-shadow 0.3s';
    });
  });


  /* ─── Process step stagger reveal ─── */
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach((step, i) => {
    step.style.transitionDelay = `${i * 0.12}s`;
  });


  /* ─── Hero badge entrance animation ─── */
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    // Already handled by CSS reveal — just ensure it fires immediately
    setTimeout(() => {
      heroBadge.classList.add('revealed');
    }, 100);
  }

  /* Trigger hero section reveals immediately */
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('revealed'), 100 + i * 110);
  });

})();
