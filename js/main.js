/* ============================================
   Modernize180 | Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Active nav link ---------- */
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path || (path === '' && href === '/')) {
      link.classList.add('active');
    }
  });

  /* ---------- Reveal on scroll (Intersection Observer) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ---------- Back to top button ---------- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Portfolio filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          setTimeout(() => { item.style.display = 'none'; }, 350);
        }
      });
    });
  });

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }
      if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification('Message sent successfully! We\'ll be in touch soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed; top: 90px; right: 24px; z-index: 2000;
      padding: 16px 28px; border-radius: 8px;
      font-size: .9rem; font-weight: 600;
      color: #fff;
      background: ${type === 'success' ? '#059669' : '#dc2626'};
      box-shadow: 0 8px 24px rgba(0,0,0,.3);
      animation: slideIn .4s cubic-bezier(.4,0,.2,1);
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(20px)';
      notification.style.transition = 'all .3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Inject CSS for notification animation ---------- */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);

});


