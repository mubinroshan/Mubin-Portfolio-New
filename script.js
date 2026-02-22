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
const modal = document.getElementById('success-modal');
const closeModal = document.getElementById('close-modal');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        const formData = new FormData(contactForm);

        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        // Send data to Google Forms
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        }).then(() => {
            // Show Success Modal
            successModal.classList.add('active');

            btn.textContent = 'Message Sent!';
            btn.style.background = 'var(--accent)';
            contactForm.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 3000);
        }).catch(err => {
            console.error('Submission error:', err);
            btn.textContent = 'Error!';
            btn.style.background = '#ff4b2b';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
            }, 3000);
        });
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
