// ========================================
// PERFORMANCE OPTIMIZATION - LAZY VIDEO LOADING
// ========================================

// Intersection Observer for lazy video loading
const lazyVideoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            
            // Load video source
            if (video.dataset.autoplay !== undefined) {
                video.load();
                
                // Play video when loaded
                video.addEventListener('loadeddata', () => {
                    video.play().catch(err => console.log('Video autoplay prevented:', err));
                }, { once: true });
            }
            
            observer.unobserve(video);
        }
    });
}, {
    rootMargin: '50px' // Start loading 50px before video enters viewport
});

// Observe all videos with data-autoplay attribute
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('video[data-autoplay]').forEach(video => {
        lazyVideoObserver.observe(video);
    });
    
    // Initialize hero video immediately (critical for first paint)
    const heroVideo = document.querySelector('.hero-video video');
    if (heroVideo) {
        heroVideo.play().catch(err => console.log('Hero video autoplay prevented:', err));
    }
    
    // Initialize services video immediately if visible
    const servicesVideo = document.getElementById('servicesVideo');
    if (servicesVideo) {
        servicesVideo.play().catch(err => console.log('Services video autoplay prevented:', err));
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize AOS with optimized settings - Deferred
window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            disable: 'mobile' // Disable on mobile for better performance
        });
    }
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
// VANTA.JS INITIALIZATION (Optimized & Conditional)
// ========================================
window.addEventListener('load', function() {
    // Skip Vanta initialization if disabled
    if (window.disableVanta || typeof VANTA === 'undefined') {
        console.log('Vanta.js disabled for performance');
        return;
    }
    
    // Vanta NET effect for body background
    if (document.getElementById('vanta-bg') && VANTA.NET) {
        setTimeout(() => {
            VANTA.NET({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x6366f1,
                backgroundColor: 0xf9fafb,
                points: 8.00,
                maxDistance: 20.00,
                spacing: 17.00
            });
        }, 500);
    }
    
    // Vanta WAVES effect for About Section
    if (document.getElementById('about-vanta-bg') && VANTA.WAVES) {
        setTimeout(() => {
            VANTA.WAVES({
                el: "#about-vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x1a1a2e,
                shininess: 30.00,
                waveHeight: 15.00,
                waveSpeed: 0.75,
                zoom: 0.80
            });
        }, 1000);
    }

    // Vanta Cells effect for Contact Section
    if (document.getElementById('contact-vanta-bg') && VANTA.CELLS) {
        setTimeout(() => {
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
        }, 1500);
    }
});

// ========================================
// VIDEO OPTIMIZATION FOR MOBILE
// ========================================
function optimizeVideosForMobile() {
    const isMobile = window.innerWidth <= 768;
    const videos = document.querySelectorAll('video');
    
    // Switch services video source for mobile
    const servicesVideo = document.getElementById('servicesVideo');
    if (servicesVideo) {
        const currentSrc = servicesVideo.querySelector('source').src;
        const desktopVideo = '15196739-uhd_3840_2160_30fps.mp4';
        const mobileVideo = '272021.mp4';
        
        if (isMobile && currentSrc.includes(desktopVideo)) {
            servicesVideo.querySelector('source').src = mobileVideo;
            servicesVideo.load();
            servicesVideo.play();
        } else if (!isMobile && currentSrc.includes(mobileVideo)) {
            servicesVideo.querySelector('source').src = desktopVideo;
            servicesVideo.load();
            servicesVideo.play();
        }
    }
    
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
        
        // Remove any transforms on mobile
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            servicesVideo.style.transform = 'none';
            servicesVideo.style.webkitTransform = 'none';
        }
        
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

// AI Chatbot Functionality
const chatbotButton = document.getElementById('chatbotButton');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');
const quickReplies = document.querySelectorAll('.quick-reply');

// Chatbot responses database
const chatbotResponses = {
    'services': {
        keywords: ['service', 'services', 'what do you do', 'offerings', 'provide'],
        response: "We offer comprehensive digital solutions including:\n\n• Web Development (Responsive, E-commerce, CMS)\n• Mobile App Development (iOS & Android)\n• Python Development (Automation, ML, APIs)\n• Cloud Solutions (AWS, Azure, GCP)\n• UI/UX Design\n\nWhich service interests you the most?"
    },
    'technologies': {
        keywords: ['technology', 'technologies', 'tech stack', 'tools', 'framework'],
        response: "We work with cutting-edge technologies:\n\n🌐 Frontend: React, Vue.js, Angular\n⚙️ Backend: Node.js, Python, Django, Flask\n📱 Mobile: React Native, Flutter\n☁️ Cloud: AWS, Azure, Docker, Kubernetes\n🤖 AI/ML: TensorFlow, scikit-learn\n💾 Databases: PostgreSQL, MongoDB\n\nWhat would you like to know more about?"
    },
    'contact': {
        keywords: ['contact', 'email', 'phone', 'reach', 'get in touch'],
        response: "I'd love to connect you with our team! 📞\n\n📧 Email: contact@inaninfinites.com\n📱 Phone: +1 (555) 123-4567\n\nYou can also scroll down to our contact section to send us a message directly. We typically respond within 24 hours!"
    },
    'pricing': {
        keywords: ['price', 'pricing', 'cost', 'quote', 'budget'],
        response: "Our pricing is customized based on your specific needs and project scope. 💰\n\nFactors we consider:\n• Project complexity\n• Timeline requirements\n• Technology stack\n• Ongoing support needs\n\nWould you like to schedule a free consultation to discuss your project?"
    },
    'about': {
        keywords: ['about', 'company', 'team', 'who are you', 'experience'],
        response: "We're Inan Infinites - your trusted partner in digital transformation! 🚀\n\n✨ \"We Create Emotion Worth Solutions\"\n\n• 5+ years of experience\n• 100+ projects delivered\n• 50+ happy clients worldwide\n• Expert team of developers and designers\n\nWe specialize in creating innovative solutions that drive real business results!"
    },
    'portfolio': {
        keywords: ['portfolio', 'work', 'projects', 'examples', 'case study'],
        response: "We've worked on diverse projects across industries! 🎨\n\n• E-commerce platforms\n• Enterprise applications\n• Data analytics dashboards\n• Mobile apps with 100K+ downloads\n• AI/ML solutions\n\nCheck out our Portfolio section above to see some of our featured work!"
    },
    'timeline': {
        keywords: ['timeline', 'how long', 'duration', 'time', 'delivery'],
        response: "Project timelines vary based on complexity:\n\n⚡ Simple websites: 2-4 weeks\n🏗️ Custom web apps: 6-12 weeks\n📱 Mobile apps: 8-16 weeks\n🤖 AI/ML projects: 12-20 weeks\n\nWe can provide a detailed timeline after understanding your requirements!"
    },
    'greeting': {
        keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
        response: "Hello! 👋 Great to hear from you!\n\nI'm here to help you learn about Inan Infinites and our services. What would you like to know about?"
    },
    'default': {
        keywords: [],
        response: "Thanks for your question! 🤔\n\nI'm an AI assistant here to help with:\n• Our services and solutions\n• Technologies we use\n• Pricing information\n• Contact details\n• Project timelines\n\nCould you rephrase your question or pick one of the quick replies below?"
    }
};

// Toggle chatbot window
chatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active')) {
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

// Send message function
function sendMessage(message) {
    if (!message.trim()) return;

    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Get bot response after delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    if (sender === 'bot') {
        avatar.innerHTML = `
            <video autoplay muted loop playsinline preload="metadata" class="message-avatar-video">
                <source src="Ai-powered marketing tools abstract.mp4" type="video/mp4">
            </video>
        `;
    } else {
        avatar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
            </svg>
        `;
    }
    
    const content = document.createElement('div');
    content.className = 'message-content';
    const p = document.createElement('p');
    p.textContent = text;
    p.style.whiteSpace = 'pre-line';
    content.appendChild(p);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Get bot response
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, data] of Object.entries(chatbotResponses)) {
        if (key === 'default') continue;
        
        for (const keyword of data.keywords) {
            if (lowerMessage.includes(keyword)) {
                return data.response;
            }
        }
    }
    
    return chatbotResponses.default.response;
}

// Typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot-message typing-indicator-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <video autoplay muted loop playsinline preload="metadata" class="message-avatar-video">
                <source src="Ai-powered marketing tools abstract.mp4" type="video/mp4">
            </video>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = chatbotMessages.querySelector('.typing-indicator-message');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Send button click
chatbotSend.addEventListener('click', () => {
    sendMessage(chatbotInput.value);
});

// Enter key to send
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage(chatbotInput.value);
    }
});

// Quick replies
quickReplies.forEach(button => {
    button.addEventListener('click', () => {
        const message = button.getAttribute('data-message');
        sendMessage(message);
    });
});

// ========================================
// VANTA CLOUDS FOR MOBILE SERVICES BACKGROUND
// ========================================
let vantaCloudsInstance = null;

function initMobileServicesBackground() {
    const isMobile = window.innerWidth <= 768;
    const servicesBackground = document.getElementById('servicesBackground');
    const servicesVideo = document.getElementById('servicesVideo');
    
    if (isMobile) {
        // Hide video on mobile
        if (servicesVideo) {
            servicesVideo.style.display = 'none';
        }
        
        // Destroy existing instance first
        if (vantaCloudsInstance) {
            vantaCloudsInstance.destroy();
            vantaCloudsInstance = null;
        }
        
        // Initialize Vanta CLOUDS for mobile
        if (!vantaCloudsInstance && servicesBackground && typeof VANTA !== 'undefined' && VANTA.CLOUDS) {
            console.log('Initializing Vanta CLOUDS for mobile services...');
            
            vantaCloudsInstance = VANTA.CLOUDS({
                el: servicesBackground,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                skyColor: 0x68b8d7,
                cloudColor: 0xadc1de,
                cloudShadowColor: 0x183550,
                sunColor: 0xff9919,
                sunGlareColor: 0xff6633,
                sunlightColor: 0xff9933,
                speed: 1.2,
                backgroundColor: 0x0f172a
            });
            console.log('Vanta CLOUDS initialized for services!');
        }
    } else {
        // Show video on desktop and destroy Vanta instance
        if (servicesVideo) {
            servicesVideo.style.display = 'block';
        }
        
        if (vantaCloudsInstance) {
            console.log('Destroying Vanta CLOUDS (switching to desktop)');
            vantaCloudsInstance.destroy();
            vantaCloudsInstance = null;
        }
    }
}

// Initialize on load with delay to ensure libraries are loaded
window.addEventListener('load', function() {
    setTimeout(initMobileServicesBackground, 300);
});

// Re-initialize on resize with debounce
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initMobileServicesBackground, 500);
});

// ========================================
// VANTA TOPOLOGY FOR PORTFOLIO SECTION  
// ========================================
let vantaTopologyInstance = null;

function initPortfolioBackground() {
    const portfolioBackground = document.getElementById('portfolio-vanta-bg');
    
    if (!vantaTopologyInstance && portfolioBackground && typeof VANTA !== 'undefined' && VANTA.TOPOLOGY) {
        console.log('Initializing Vanta TOPOLOGY for portfolio...');
        vantaTopologyInstance = VANTA.TOPOLOGY({
            el: "#portfolio-vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x732c9a
        });
        console.log('Vanta TOPOLOGY initialized!', vantaTopologyInstance);
    } else if (!VANTA || !VANTA.TOPOLOGY) {
        console.log('TOPOLOGY not ready, retrying in 500ms...');
        setTimeout(initPortfolioBackground, 500);
    }
}

// ========================================
// VANTA CLOUDS FOR ABOUT SECTION (BOTH MOBILE & DESKTOP)
// ========================================
let vantaAboutInstance = null;

function initAboutBackground() {
    const aboutBackground = document.getElementById('about-vanta-bg');
    
    if (!vantaAboutInstance && aboutBackground && typeof VANTA !== 'undefined' && VANTA.CLOUDS) {
        console.log('Initializing Vanta CLOUDS for About section...');
        vantaAboutInstance = VANTA.CLOUDS({
            el: aboutBackground,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            skyColor: 0x68b8d7,
            cloudColor: 0xadc1de,
            cloudShadowColor: 0x183550,
            sunColor: 0xff9919,
            sunGlareColor: 0xff6633,
            sunlightColor: 0xff9933,
            speed: 1.0,
            backgroundColor: 0x1e1b4b
        });
        console.log('Vanta CLOUDS initialized for About section!', vantaAboutInstance);
    }
}

// Initialize on load
window.addEventListener('load', function() {
    // Delay to ensure libraries are loaded (longer for p5.js)
    setTimeout(initPortfolioBackground, 1500);
    setTimeout(initAboutBackground, 400);
});

console.log('Inan Infinites Website Loaded Successfully! 🚀');

