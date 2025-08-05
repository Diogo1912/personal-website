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
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        
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
        color: #26d0ce;
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