// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Change header background opacity based on scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Here you can add your form submission logic
            // For example, send to Google Forms, email service, etc.
            
            // Show success message
            showNotification('Thank you for your inquiry! We will contact you within 24 hours to discuss your Korean market entry strategy.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-card, .process-step');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Counter animation for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const suffix = counter.textContent.replace(/[\d]/g, '');
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            // Start animation when element is visible
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            
            counterObserver.observe(counter);
        });
    }

    // Initialize counter animation
    animateCounters();

    // Mobile menu toggle (if you want to add mobile menu later)
    function createMobileMenu() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #1e40af;
            cursor: pointer;
        `;
        
        nav.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
        });
        
        // Add mobile styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                .nav-links {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(15px);
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                .nav-links.mobile-open {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize mobile menu
    createMobileMenu();

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styling
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }

    // Add loading states to buttons
    function addLoadingState(button, text = 'Processing...') {
        const originalText = button.textContent;
        button.textContent = text;
        button.disabled = true;
        button.style.opacity = '0.7';
        
        return function removeLoadingState() {
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
        };
    }

    // Enhanced form submission with loading state
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const removeLoading = addLoadingState(submitBtn, 'Sending...');
            
            // Simulate form submission delay
            setTimeout(() => {
                removeLoading();
                showNotification('Thank you for your inquiry! We will contact you within 24 hours to discuss your Korean market entry strategy.', 'success');
                this.reset();
            }, 2000);
        });
    }

    // Parallax effect for hero section
    function addParallaxEffect() {
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Initialize parallax
    addParallaxEffect();

    // Email protection
    function protectEmails() {
        const emailElements = document.querySelectorAll('[href^="mailto:"]');
        emailElements.forEach(element => {
            element.addEventListener('click', function(e) {
                // Add analytics tracking here if needed
                console.log('Email link clicked');
            });
        });
    }

    // Initialize email protection
    protectEmails();

    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.querySelector('.nav-links.mobile-open');
            if (mobileMenu) {
                mobileMenu.classList.remove('mobile-open');
            }
        }
    });

    // Add focus indicators for better accessibility
    function enhanceAccessibility() {
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid #1e40af';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }

    // Initialize accessibility enhancements
    enhanceAccessibility();

    // Performance optimization - lazy load images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries) {
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
    }

    // Initialize lazy loading
    lazyLoadImages();

    // Add smooth reveal animations
    function addRevealAnimations() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-visible');
                    }
                });
            }, { threshold: 0.1 });
            
            sectionObserver.observe(section);
        });
        
        // Add CSS for reveal animations
        const revealStyles = document.createElement('style');
        revealStyles.textContent = `
            .section {
                opacity: 0;
                transform: translateY(50px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            .section-visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(revealStyles);
    }

    // Initialize reveal animations
    addRevealAnimations();

    console.log('Korean Market Entry Agency website loaded successfully!');
});
