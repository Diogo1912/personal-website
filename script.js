// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar background stays consistent - no scroll changes needed

// Skills accordion functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Close all other accordion items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations - DISABLED FOR DEBUGGING
// document.addEventListener('DOMContentLoaded', () => {
//     // Set initial state for animated elements
//     const animatedElements = document.querySelectorAll('.glass-card, .project-card, .contact-link');
//     animatedElements.forEach(el => {
//         el.style.opacity = '0';
//         el.style.transform = 'translateY(30px)';
//         el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//         observer.observe(el);
//     });
// });

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Marquee duplication for seamless scroll
document.addEventListener('DOMContentLoaded', () => {
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        // Clone the content multiple times for seamless scrolling
        const originalContent = marqueeContent.innerHTML;
        marqueeContent.innerHTML = originalContent + originalContent + originalContent;
    }
});

// CV Download functionality (removed - no longer needed)

// Old typing function removed to avoid conflicts


// Simple parallax for clouds
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Move clouds slightly with scroll
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach((cloud, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = scrolled * speed;
        cloud.style.transform += ` translateY(${yPos}px)`;
    });
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn, .contact-link, .project-card').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #ffffff;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Tech chip colors are now applied directly in HTML classes - no JavaScript needed

// Clean typing animation
let typingInProgress = false;

function startTypingAnimation() {
    if (typingInProgress) return; // Prevent multiple instances
    
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
    typingInProgress = true;
    
    const titles = [
        'AI Engineer',
        'Change Maker', 
        'Full Stack Developer',
        'AI Automation Engineer & Student in Computational Social Sciences'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeStep() {
        const currentTitle = titles[titleIndex];
        
        if (!isDeleting) {
            // Typing forward
            typedTextElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentTitle.length) {
                // Finished typing current title
                if (titleIndex === titles.length - 1) {
                    // Last title - stop here
                    return;
                }
                // Pause before deleting
                setTimeout(() => {
                    isDeleting = true;
                    typeStep();
                }, 2500);
                return;
            }
            setTimeout(typeStep, 120);
        } else {
            // Deleting backward
            charIndex--;
            typedTextElement.textContent = currentTitle.substring(0, charIndex);
            
            if (charIndex === 0) {
                // Finished deleting
                isDeleting = false;
                titleIndex++;
                setTimeout(typeStep, 300);
                return;
            }
            setTimeout(typeStep, 60);
        }
    }
    
    // Start typing
    typeStep();
}

// Start animation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(startTypingAnimation, 1500);
});


// Dark mode toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Console welcome message
console.log(`
🚀 Welcome to Diogo Baptista's Portfolio Website!
💼 AI Automation Engineer & Computational Social Sciences Student
🌟 Built with HTML, CSS, and JavaScript
📧 Contact: diogobap@icloud.com
`);

// Performance optimization: Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add loading states
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// EASTER EGG: Konami Code Implementation
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
let konamiPosition = 0;
let easterEggActive = false;

document.addEventListener('keydown', function(e) {
    if (easterEggActive) return;
    
    if (e.keyCode === konamiCode[konamiPosition]) {
        konamiPosition++;
        if (konamiPosition === konamiCode.length) {
            activateEasterEgg();
            konamiPosition = 0;
        }
    } else {
        konamiPosition = 0;
    }
});

function activateEasterEgg() {
    if (easterEggActive) return;
    easterEggActive = true;
    
    // Create celebration message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="text-align: center;">
            <h2 style="margin: 0 0 1rem 0; font-size: 2rem; color: #fbbf24;">🎉 Easter Egg Found! 🎉</h2>
            <p style="margin: 0; font-size: 1.2rem; color: #ffffff;">You discovered the secret Konami Code!</p>
            <p style="margin: 0.5rem 0 0 0; font-size: 1rem; color: #e2e8f0;">Enjoy the special animation!</p>
        </div>
    `;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(59, 130, 246, 0.9);
        backdrop-filter: blur(20px);
        border: 2px solid #fbbf24;
        border-radius: 20px;
        padding: 2rem 3rem;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: easterEggPop 0.5s ease-out;
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.style.animation = 'easterEggFadeOut 0.5s ease-out forwards';
        setTimeout(() => message.remove(), 500);
    }, 3000);
    
    // Trigger special effects
    triggerSpecialEffects();
    
    // Reset after 10 seconds
    setTimeout(() => {
        easterEggActive = false;
        resetSpecialEffects();
    }, 10000);
}

function triggerSpecialEffects() {
    // Rainbow clouds effect
    const clouds = document.querySelectorAll('.cloud');
    console.log('Found clouds:', clouds.length);
    clouds.forEach((cloud, index) => {
        cloud.classList.add('rainbow-glow');
        cloud.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Super speed solar system
    const orbits = document.querySelectorAll('.orbit');
    console.log('Found orbits:', orbits.length);
    orbits.forEach(orbit => {
        orbit.style.animationDuration = '2s';
    });
    
    // Dancing stars
    const stars = document.querySelectorAll('.star');
    console.log('Found stars:', stars.length);
    stars.forEach((star, index) => {
        star.classList.add('star-dance');
        star.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Pulsing sun/moon
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');
    console.log('Found sun:', !!sun, 'Found moon:', !!moon);
    if (sun) {
        sun.classList.add('mega-pulse');
    }
    if (moon) {
        moon.classList.add('mega-pulse');
    }
    
    // Show secret message in console
    console.log(`
🎉 EASTER EGG ACTIVATED! 🎉
╔══════════════════════════════════════╗
║  You found the secret Konami Code!   ║
║         ↑↑↓↓←→←→BA                    ║
║                                      ║
║  Thanks for exploring my portfolio!  ║
║  - Diogo Baptista                    ║
╚══════════════════════════════════════╝
    `);
}

function resetSpecialEffects() {
    // Reset clouds
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach((cloud, index) => {
        cloud.classList.remove('rainbow-glow');
        cloud.style.animationDelay = '';
    });
    
    // Reset solar system
    const orbits = document.querySelectorAll('.orbit');
    orbits.forEach((orbit, index) => {
        if (index === 0) orbit.style.animationDuration = '12s';
        if (index === 1) orbit.style.animationDuration = '18s';
        if (index === 2) orbit.style.animationDuration = '24s';
    });
    
    // Reset stars
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('star-dance');
        star.style.animationDelay = '';
    });
    
    // Reset sun/moon
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');
    if (sun) sun.classList.remove('mega-pulse');
    if (moon) moon.classList.remove('mega-pulse');
}

// Easter Egg Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const hintButton = document.getElementById('easter-egg-hint');
    const modal = document.getElementById('easter-egg-modal');
    const closeButton = document.getElementById('modal-close');

    // Open modal when clicking the hint
    hintButton.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal when clicking the X
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Spoiler functionality
    const spoilerHint = document.getElementById('spoiler-hint');
    spoilerHint.addEventListener('click', () => {
        spoilerHint.classList.add('revealed');
        // Prevent double-clicking from removing the revealed state
        spoilerHint.style.pointerEvents = 'none';
    });
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0c1445 0%, #1a2980 50%, #26d0ce 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(loadingStyle);

// Portfolio category filtering functionality
document.addEventListener('DOMContentLoaded', () => {
    const categoryChips = document.querySelectorAll('.category-chip');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event listeners to category chips
    categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const category = chip.getAttribute('data-category');
            
            // Update active chip
            categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // Filter projects
            filterProjects(category);
        });
    });
    
    // Filter projects based on selected category
    function filterProjects(selectedCategory) {
        projectCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category');
            
            if (selectedCategory === 'all' || cardCategories.includes(selectedCategory)) {
                // Show project card
                card.classList.remove('hidden');
            } else {
                // Hide project card
                card.classList.add('hidden');
            }
        });
    }
    
    // Initialize with featured projects visible
    filterProjects('featured');
});