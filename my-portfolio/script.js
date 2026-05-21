/**
 * TALHA ZAFAR - PORTFOLIO DYNAMIC LOGIC
 * Full Length Script including Navigation, Scroll Reveal, Terminal Effects, and Forms
 */

document.addEventListener('DOMContentLoaded', () => {
    /* Initialize all core functions */
    initNavigation();
    initScrollReveal();
    initTerminalEffect();
    initSmoothScrolling();
});

// --- 1. DYNAMIC NAVIGATION HIGHLIGHTING ---
// Ensures the link for the current page turns Cyan (Blue)
function initNavigation() {
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll('#main-nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Exact match logic for local and hosted environments
        if (href === currentPath) {
            link.classList.add('nav-active');
        } else {
            link.classList.remove('nav-active');
        }
    });
}

// --- 2. OPTIMIZED REVEAL ON SCROLL ---
// Animates elements as they enter the viewport
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // stop observing once the animation is done
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target all cards and detail sections
    const revealElements = document.querySelectorAll('.service-card, .discipline-item, .project-detail, .reveal');
    revealElements.forEach(el => {
        // Prepare element for animation
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        revealObserver.observe(el);
    });

    // Handle the .active class in JS directly to ensure it works
    const style = document.createElement('style');
    style.innerHTML = `
        .service-card.active, .discipline-item.active, .project-detail.active, .reveal.active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// --- 3. TERMINAL TYPEWRITER EFFECT ---
// Specialized for the Software page Hero section
function initTerminalEffect() {
    const terminalText = document.querySelector('.terminal-body h1 span');
    
    if (terminalText) {
        const phrases = ["Software", "Intelligence", "Logic", "Automation", "Robotics"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                terminalText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 75; // Faster deletion
            } else {
                terminalText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150; // Normal typing
            }

            // Logic to switch between typing and deleting
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at the full word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Small pause before next word
            }

            setTimeout(type, typeSpeed);
        }
        
        // Start the loop
        type();
    }
}

// --- 4. ASYNC FORM HANDLING ---
// Connects the Contact Form to Formspree without page reloads
async function handleContact() {
    const nameField = document.getElementById('full-name');
    const emailField = document.getElementById('email-address');
    const messageField = document.getElementById('message');
    const subjectField = document.getElementById('subject');

    if (!nameField || !emailField || !messageField) return;

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const msg = messageField.value.trim();
    const subject = subjectField ? subjectField.value : "General Inquiry";

    // Basic Validation
    if (!name || !email || !msg) {
        alert('Required fields are missing. Please complete the form.');
        return;
    }

    const formData = {
        name: name,
        email: email,
        message: msg,
        project_type: subject
    };

    try {
        const response = await fetch("https://formspree.io/f/mjgjpnjz", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert(`Thank you, ${name}! Your message has been sent successfully.`);
            document.getElementById('contact-form').reset();
        } else {
            alert("Form submission failed. Please check your connection and try again.");
        }
    } catch (error) {
        console.error("Submission Error:", error);
        alert("An error occurred. Please try again later.");
    }
}

// --- 5. SMOOTH SCROLLING FOR LINKS ---
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}