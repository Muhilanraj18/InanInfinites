// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize AOS with optimized settings
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    disable: 'mobile' // Disable on mobile for better performance
});

// Performance optimization - Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// SCROLL PROGRESS BAR (Throttled)
// ========================================
const scrollProgress = document.getElementById('scroll-progress');

const updateScrollProgress = throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
}, 100);

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ========================================
// TYPING ANIMATION
// ========================================
const typedTextElement = document.getElementById('typed-text');
const texts = [
    'Transforming Ideas into Infinite Possibilities',
    'Building Innovative Web Solutions',
    'Creating Powerful Mobile Applications',
    'Developing Smart Python Automation'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before starting new text
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation
if (typedTextElement) {
    setTimeout(typeText, 1000);
}

// ========================================
// DARK MODE TOGGLE
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// HAMBURGER MENU
// ========================================
const closeMenu = document.querySelector('.close-menu');
const menuOverlay = document.querySelector('.menu-overlay');

// Function to close mobile menu
function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    if (menuOverlay) {
        menuOverlay.classList.remove('active');
    }
}

// Open menu with hamburger
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        if (menuOverlay) {
            menuOverlay.classList.toggle('active');
        }
    });
}

// Close menu with close button
if (closeMenu) {
    closeMenu.addEventListener('click', closeMobileMenu);
}

// Close menu when clicking overlay
if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
    observer.observe(card);
});

// Observe showcase items
document.querySelectorAll('.showcase-item').forEach((item, index) => {
    observer.observe(item);
});

// Add animated entrance for section headers
document.querySelectorAll('.section-header').forEach(header => {
    observer.observe(header);
});

// Parallax effect for service icons
document.addEventListener('mousemove', (e) => {
    const serviceCards = document.querySelectorAll('.service-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        if (icon) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = '#6366f1';
            } else {
                navLink.style.color = '#1f2937';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Parallax effect for hero section
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroVideo.style.transform = `translateY(${parallax}px)`;
    });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h4');
            statItems.forEach((item, index) => {
                const values = [100, 50, 5];
                animateCounter(item, values[index]);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Video play on scroll
const videos = document.querySelectorAll('video');

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
        }
    });
}, { threshold: 0.5 });

videos.forEach(video => {
    videoObserver.observe(video);
});

// Add loading animation
window.addEventListener('load', () => {
    // Page is ready
    console.log('Page fully loaded');
});

// Tech tags hover effect
const techTags = document.querySelectorAll('.tech-tags span');
techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// VANTA.JS INITIALIZATION
// ========================================
window.addEventListener('load', function() {
    // Vanta Cells effect for Contact Section
    if (document.getElementById('contact-vanta-bg')) {
        VANTA.CELLS({
            el: "#contact-vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            color1: 0x8c8c,
            color2: 0xf2e735,
            size: 1.50,
            speed: 1.00
        });
    }

    // Vanta NET effect for body background (optimized)
    if (document.getElementById('vanta-bg')) {
        // Disable Vanta on mobile for better performance
        if (window.innerWidth > 768) {
            VANTA.NET({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: false,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x6366f1,
                backgroundColor: 0xf9fafb,
                points: 6.00,
                maxDistance: 18.00,
                spacing: 16.00
            });
        }
    }
});

// ========================================
// VIDEO OPTIMIZATION FOR MOBILE
// ========================================
function optimizeVideosForMobile() {
    const isMobile = window.innerWidth <= 768;
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        if (isMobile) {
            // Ensure videos are muted and have proper attributes for autoplay on mobile
            video.muted = true;
            video.setAttribute('muted', '');
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('preload', 'auto');
            
            // Force play for mobile browsers
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Auto-play was prevented, try again on user interaction
                    console.log('Video autoplay prevented:', error);
                    document.addEventListener('touchstart', function playOnTouch() {
                        video.play();
                        document.removeEventListener('touchstart', playOnTouch);
                    }, { once: true });
                });
            }
        } else {
            video.setAttribute('preload', 'auto');
            video.play().catch(err => console.log('Video play error:', err));
        }
    });
}

// Force services video to play specifically
function ensureServicesVideoPlays() {
    const servicesVideo = document.querySelector('.services-video');
    if (servicesVideo) {
        servicesVideo.muted = true;
        servicesVideo.setAttribute('muted', '');
        servicesVideo.setAttribute('playsinline', '');
        servicesVideo.setAttribute('webkit-playsinline', '');
        
        // Keep video playing continuously
        const keepPlaying = () => {
            if (servicesVideo.paused) {
                servicesVideo.play().catch(err => console.log('Video play error:', err));
            }
        };
        
        // Check and play every 500ms
        setInterval(keepPlaying, 500);
        
        // Play when scrolling
        window.addEventListener('scroll', keepPlaying, { passive: true });
        
        // Play when video ends (even though it's set to loop)
        servicesVideo.addEventListener('ended', () => {
            servicesVideo.play();
        });
        
        // Play when page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                keepPlaying();
            }
        });
        
        // Attempt to play immediately
        const playPromise = servicesVideo.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Services video playing successfully');
                })
                .catch(error => {
                    console.log('Services video autoplay prevented, will play on scroll:', error);
                    
                    // Create intersection observer to play when in view
                    const videoObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                servicesVideo.play().catch(err => console.log('Play on scroll error:', err));
                            }
                        });
                    }, { threshold: 0.1 });
                    
                    videoObserver.observe(servicesVideo);
                });
        }
    }
}

// Run on page load
optimizeVideosForMobile();
ensureServicesVideoPlays();

// Run on resize (throttled)
window.addEventListener('resize', throttle(optimizeVideosForMobile, 500));

console.log('Inan Infinites Website Loaded Successfully! 🚀');
