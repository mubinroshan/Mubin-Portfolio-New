window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.visibility = 'hidden';
    }, 500);
});

// Matrix Background Effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const columns = Math.floor(width / 20);
const charArray = '01'.split('');
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

const drawMatrix = () => {
    ctx.fillStyle = 'rgba(10, 11, 16, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00f2fe';
    ctx.font = '15px Montserrat';

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
};

let matrixInterval = setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.reveal');

const checkReveal = () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < window.innerHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', checkReveal);
checkReveal();

// Sticky Navbar
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

// Active Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Form Submission (Simulated)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Message Sent!';
            btn.style.background = 'var(--accent)';
            contactForm.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}
