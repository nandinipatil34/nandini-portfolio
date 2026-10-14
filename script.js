/**
 * Nandini Patil - Frontend Developer Portfolio
 * Clean, lightweight, modular JavaScript for smooth navigation,
 * project modals, copy-to-clipboard, and interactive contact feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollSpy();
  initCopyEmail();
  initProjectModals();
  initContactForm();
  setCurrentYear();
});

/* ===================================================================
   1. MOBILE MENU TOGGLE
   =================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-menu')?.querySelector('.nav-links');

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close when clicking any link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

/* ===================================================================
   2. SCROLL SPY & ACTIVE LINK HIGHLIGHTING
   =================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header elevation
    if (header) {
      if (scrollY > 40) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
      } else {
        header.style.boxShadow = 'none';
      }
    }

    // Active link highlighting
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ===================================================================
   3. COPY EMAIL TO CLIPBOARD
   =================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');

  if (!copyBtn || !emailText) return;

  copyBtn.addEventListener('click', async () => {
    const email = emailText.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email address copied to clipboard!', 'success');
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
      }, 2500);
    } catch (err) {
      showToast(`Email: ${email}`, 'info');
    }
  });
}

/* ===================================================================
   4. PROJECT DETAILS MODAL
   =================================================================== */
function initProjectModals() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalHeading = document.getElementById('modal-heading');
  const modalDescription = document.getElementById('modal-description');
  const modalClose = document.getElementById('modal-close');
  const modalCloseAction = document.getElementById('modal-close-action');
  const triggers = document.querySelectorAll('.preview-trigger');

  if (!modalBackdrop || !modalHeading || !modalDescription) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');

      modalHeading.textContent = title;
      modalDescription.textContent = desc;

      modalBackdrop.classList.add('active');
      modalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ===================================================================
   5. CONTACT FORM HANDLING
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const alertBox = document.getElementById('form-alert');

  if (!form || !submitBtn || !alertBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      alertBox.textContent = 'Please fill out all required fields.';
      alertBox.className = 'form-alert error';
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      alertBox.textContent = `Thank you, ${name}! Your message has been sent. I will get back to you shortly.`;
      alertBox.className = 'form-alert success';
      form.reset();

      showToast(`Message sent successfully from ${name}!`, 'success');

      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 5000);
    }, 1000);
  });
}

/* ===================================================================
   6. TOAST NOTIFICATIONS
   =================================================================== */
function showToast(message, type = 'info') {
  const toastBox = document.getElementById('toast-box');
  if (!toastBox) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
  
  toast.innerHTML = `<i class="fa-solid ${icon}" style="color: #a855f7;"></i> <span>${message}</span>`;
  toastBox.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ===================================================================
   7. FOOTER YEAR
   =================================================================== */
function setCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
