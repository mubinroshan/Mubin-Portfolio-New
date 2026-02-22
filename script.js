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

// Navigation Scroll effect - Not needed for pill navbar usually but good for active link
const navLinks = document.querySelectorAll('.nav-links a');
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

    navLinks.forEach(a => {
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

// Close modal on click outside content
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});
