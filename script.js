window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.visibility = 'hidden';
    }, 500);
});

// Scroll Reveal
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', reveal);

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (menuBtn && navLinksContainer) {
    menuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// Navigation Scroll effect
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Form Submission & Modal
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');
const closeModalBtn = document.getElementById('close-modal');
let submitted = false;

// Global function for iframe onload
window.showSuccessModal = function () {
    if (successModal) {
        successModal.classList.add('active');
        const btn = contactForm.querySelector('button');
        btn.textContent = 'Message Sent!';
        btn.style.background = 'var(--primary)';
        btn.style.color = 'var(--secondary)';
        contactForm.reset();

        setTimeout(() => {
            btn.textContent = 'Send Message';
            btn.style.background = 'var(--secondary)';
            btn.style.color = 'var(--white)';
            btn.disabled = false;
            btn.style.opacity = '1';
            submitted = false;
        }, 3000);
    }
};

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const btn = contactForm.querySelector('button');
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        btn.disabled = true;
        submitted = true;
        // Form will submit naturally to the hidden iframe
    });
}

// Close Modal Logic
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });
}

// Theme Toggle Logic
const themeSwitch = document.getElementById('theme-switch');
const htmlElement = document.documentElement;

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);

if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Certificate Modal Logic
const certModal = document.getElementById('cert-viewer-modal');
const certModalImg = document.getElementById('cert-modal-img');
const closeCertBtn = document.getElementById('close-cert-modal');
const certCards = document.querySelectorAll('.certificate-card');

if (certModal && certCards.length > 0) {
    certCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const imgSrc = card.querySelector('img').src;
            const imgAlt = card.querySelector('img').alt;
            certModalImg.src = imgSrc;
            certModalImg.alt = imgAlt;
            certModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeViewer = () => {
        certModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    if (closeCertBtn) {
        closeCertBtn.addEventListener('click', closeViewer);
    }

    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) {
            closeViewer();
        }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal.classList.contains('active')) {
            closeViewer();
        }
    });
}

// Close modal on click outside content
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});
