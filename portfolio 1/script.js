// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const toggleIcon = document.querySelector('.toggle-icon');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    toggleIcon.textContent = body.classList.contains('dark') ? '☀' : '🌙';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Enhanced Skills Progress Animation
const skillBars = document.querySelectorAll('.progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.dataset.width;
        // Reset the width before animation
        bar.style.width = '0';
        // Force a reflow
        bar.offsetHeight;
        // Add animation class
        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        // Set the final width
        requestAnimationFrame(() => {
            bar.style.width = width;
        });
    });
};

// Improved Intersection Observer for skills
const observeSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Delay animation slightly to ensure proper rendering
            setTimeout(() => {
                animateSkills();
            }, 100);
            // Unobserve after animation
            observeSkills.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2, // Trigger when 20% of the element is visible
    rootMargin: '50px' // Start animation slightly before the element comes into view
});

// Observe all skill sections
document.querySelectorAll('.skills').forEach(skillSection => {
    observeSkills.observe(skillSection);
});

// Re-trigger animations when switching between portrait and landscape
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        document.querySelectorAll('.skills').forEach(skillSection => {
            if (isElementInViewport(skillSection)) {
                animateSkills();
            }
        });
    }, 100);
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('.form-submit');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    })
    .catch(() => alert('Error sending message'))
    .finally(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    });
});

// Glow Elements Animation Fix
const glowElements = document.querySelectorAll('.glow-element');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowElements.forEach((element, index) => {
        const speed = 0.05 + (index * 0.01);
        const rect = element.getBoundingClientRect();
        const targetX = mouseX - rect.width / 2;
        const targetY = mouseY - rect.height / 2;

        const currentX = parseFloat(element.style.left) || rect.left;
        const currentY = parseFloat(element.style.top) || rect.top;

        const newX = currentX + (targetX - currentX) * speed;
        const newY = currentY + (targetY - currentY) * speed;

        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
    });
    requestAnimationFrame(animateGlow);
}
animateGlow();

// Particles.js Configuration
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#00f0ff", "#ffa500", "#4f46e5"]
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 5,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 250,
                size: 0,
                duration: 2,
                opacity: 0,
                speed: 3
            },
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});
// Scroll to Top Button Functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Mobile Menu Toggle Functionality
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

// Toggle menu and overlay visibility on button click
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Close the menu and overlay when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// Close the menu and overlay when clicking outside the menu (on the overlay)
overlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
});
const texts = ["I'M A DEVELOPER.", "I'M A C-CODER.", "I'M A FRONT-END DEVLOPER.","I'M A JAVASCRIPT CODER."];
const typingSpeed = 100; // Speed of typing in ms
const erasingSpeed = 50; // Speed of erasing the text in ms
const newTextDelay = 2000; // Delay before typing the next text

let textIndex = 0; // To keep track of which text we are typing
let charIndex = 0; // To keep track of the character we're currently typing

const typingElement = document.querySelector('.typing-text');

// Function to start typing the next text
function typeText() {
    if (charIndex < texts[textIndex].length) {
        typingElement.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        // Once the current text is typed, wait before erasing
        setTimeout(eraseText, newTextDelay);
    }
}

// Function to erase the text
function eraseText() {
    if (charIndex > 0) {
        typingElement.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, erasingSpeed);
    } else {
        // Once text is erased, move to the next text
        textIndex = (textIndex + 1) % texts.length; // Loop through the texts
        setTimeout(typeText, typingSpeed);
    }
}

// Start typing the first text
window.addEventListener('load', () => {
    typingElement.classList.add('cursor-blink');
    typeText();
});


