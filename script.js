// ========================================
// Portfolio Animation & Interactions
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollAnimations();
  initSkillBars();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavLink();
});

// ========================================
// Header Scroll Effect
// ========================================
function initHeader() {
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');

        // Trigger skill bar animation
        if (entry.target.classList.contains('skill-card')) {
          const progressBar = entry.target.querySelector('.skill-progress');
          if (progressBar) {
            const progress = progressBar.dataset.progress;
            setTimeout(() => {
              progressBar.style.width = progress + '%';
            }, 300);
          }
        }
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// ========================================
// Skill Bars Animation
// ========================================
function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.skill-progress');
        if (progressBar && !progressBar.classList.contains('animated')) {
          progressBar.classList.add('animated');
          const progress = progressBar.dataset.progress;
          setTimeout(() => {
            progressBar.style.width = progress + '%';
          }, 400);
        }
      }
    });
  }, { threshold: 0.5 });

  skillCards.forEach(card => {
    observer.observe(card);
  });
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-list');

  if (menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuBtn.classList.toggle('active');

      // Animate hamburger
      const spans = menuBtn.querySelectorAll('span');
      if (navList.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu on link click
    const navLinks = navList.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        menuBtn.classList.remove('active');
        const spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
}

// ========================================
// Smooth Scroll for Navigation
// ========================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// Active Navigation Link on Scroll
// ========================================
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// ========================================
// Parallax Effect for Blobs (Optional)
// ========================================
document.addEventListener('mousemove', (e) => {
  const blobs = document.querySelectorAll('.blob');
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  blobs.forEach((blob, index) => {
    const speed = (index + 1) * 20;
    const x = mouseX * speed;
    const y = mouseY * speed;
    blob.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// ========================================
// Add Ripple Effect to Buttons
// ========================================
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mouseenter', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btn.style.setProperty('--ripple-x', x + 'px');
    btn.style.setProperty('--ripple-y', y + 'px');
  });
});

// ========================================
// Typewriter Effect for Hero (Optional Enhancement)
// ========================================
const typewriterText = document.querySelector('.hero-title .gradient-text');
if (typewriterText) {
  const text = typewriterText.textContent;
  typewriterText.textContent = '';
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typewriterText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  // Start typewriter after a delay
  setTimeout(typeWriter, 500);
}
