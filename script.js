// main.js for Servant Games Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation handling
    setupMobileNavigation();
    
    // Handle smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Form submission handler
    setupContactForm();
    
    // Add responsive video resizing
    setupResponsiveVideos();
    
    // Add animation on scroll for project cards
    setupScrollAnimations();
});

/**
 * Sets up mobile navigation menu toggle functionality
 */
function setupMobileNavigation() {
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn')) {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelector('.nav-links');
        
        // Create button element
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Insert button into navbar
        navbar.querySelector('.nav-container').insertBefore(mobileMenuBtn, navbar.querySelector('.nav-links'));
        
        // Add collapsed class to nav-links initially on mobile
        if (window.innerWidth <= 768) {
            navLinks.classList.add('collapsed');
            navLinks.style.display = 'none';
        }
        
        // Toggle menu visibility when button is clicked
        mobileMenuBtn.addEventListener('click', function() {
            if (navLinks.classList.contains('collapsed')) {
                navLinks.style.display = 'flex';
                setTimeout(() => {
                    navLinks.classList.remove('collapsed');
                }, 10);
                mobileMenuBtn.innerHTML = '✕'; // Change to X when menu is open
            } else {
                navLinks.classList.add('collapsed');
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300); // Match transition duration
                mobileMenuBtn.innerHTML = '☰'; // Change back to hamburger when closed
            }
        });
        
        // Close menu when clicking a navigation link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768 && !navLinks.classList.contains('collapsed')) {
                    mobileMenuBtn.click();
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('collapsed');
                navLinks.style.display = 'flex';
                mobileMenuBtn.innerHTML = '☰';
            } else if (!mobileMenuBtn.classList.contains('active')) {
                navLinks.classList.add('collapsed');
                navLinks.style.display = 'none';
            }
        });
    }
}

/**
 * Sets up smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate offset for fixed navbar
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - navbarHeight,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, targetId);
                    
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    if (window.innerWidth <= 768 && !navLinks.classList.contains('collapsed')) {
                        document.querySelector('.mobile-menu-btn').click();
                    }
                }
            }
        });
    });
}

/**
 * Sets up contact form submission and validation
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real implementation, you would send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
}

/**
 * Ensures videos maintain proper aspect ratio on all devices
 */
function setupResponsiveVideos() {
    const resizeVideos = function() {
        const videoContainers = document.querySelectorAll('.video-container');
        
        videoContainers.forEach(container => {
            const width = container.offsetWidth;
            const height = width * 0.5625; // 16:9 aspect ratio
            
            const iframe = container.querySelector('iframe');
            if (iframe) {
                iframe.style.height = height + 'px';
            }
        });
    };
    
    // Initial call
    resizeVideos();
    
    // Resize on window change
    window.addEventListener('resize', resizeVideos);
}

/**
 * Adds animation effects to project cards when scrolled into view
 */
function setupScrollAnimations() {
    // Add fade-in and slide-up animations to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        projectCards.forEach(card => {
            // Add initial state class
            card.classList.add('fade-in');
            observer.observe(card);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        projectCards.forEach(card => {
            card.classList.add('animated');
        });
    }
}

/**
 * Preloads background images for smoother transitions
 */
function preloadBackgroundImages() {
    const backgroundImages = [
        'images/home-section-BG.jpg',
        'images/about-sesction-BG.jpg',
        'images/team-section-BG.jpg',
        'images/projects-section-BG.jpg',
        'images/upcoming-projects-section-BG.jpg',
        'images/tutorial-section-BG.jpg',
        'images/contact-section.jpg'
    ];
    
    backgroundImages.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
    });
}

// Call preload function
preloadBackgroundImages();

/**
 * Adds CSS rules for animations
 */
function addAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-links {
            transition: all 0.3s ease;
        }
        
        .nav-links.collapsed {
            opacity: 0;
            transform: translateY(-10px);
        }
    `;
    document.head.appendChild(styleSheet);
}

// Add animation styles
addAnimationStyles();