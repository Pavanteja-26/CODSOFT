// ================================
// Newsletter Signup - Main Script
// ================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initNewsletterForm();
    initSmoothScrolling();
});

// ================================
// Mobile Navigation Toggle
// ================================
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle navigation menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        this.classList.toggle('active');
        
        // Update ARIA attribute for accessibility
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ================================
// Newsletter Form Handling
// ================================
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('email-error');
    const submitButton = form.querySelector('.submit-button');
    const successMessage = document.getElementById('success-message');
    
    if (!form || !emailInput) return;
    
    // Email validation regex pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Real-time email validation on input
    emailInput.addEventListener('input', function() {
        validateEmail(this.value, false);
    });
    
    // Validation on blur (when user leaves the field)
    emailInput.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            validateEmail(this.value, true);
        }
    });
    
    // Form submission handler
    form.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validate email before submission
        if (!validateEmail(email, true)) {
            emailInput.focus();
            return;
        }
        
        // Submit the form
        submitForm(email);
    });
    
    // Email validation function
    function validateEmail(email, showError) {
        const isValid = emailRegex.test(email);
        
        if (!email) {
            if (showError) {
                showValidationError('Email address is required');
                emailInput.classList.add('error');
                emailInput.classList.remove('success');
            }
            return false;
        }
        
        if (!isValid) {
            if (showError) {
                showValidationError('Please enter a valid email address');
                emailInput.classList.add('error');
                emailInput.classList.remove('success');
            }
            return false;
        }
        
        // Email is valid
        hideValidationError();
        emailInput.classList.remove('error');
        emailInput.classList.add('success');
        return true;
    }
    
    // Show validation error message
    function showValidationError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
    
    // Hide validation error message
    function hideValidationError() {
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');
    }
    
    // Submit form with loading state
    function submitForm(email) {
        // Add loading state to button
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(function() {
            // Remove loading state
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            emailInput.classList.remove('success');
            
            // Log submission (replace with actual API call)
            console.log('Newsletter subscription submitted:', email);
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                hideSuccessMessage();
            }, 5000);
            
        }, 2000); // Simulated 2-second delay
    }
    
    // Show success message
    function showSuccessMessage() {
        form.style.display = 'none';
        successMessage.classList.add('show');
    }
    
    // Hide success message
    function hideSuccessMessage() {
        successMessage.classList.remove('show');
        form.style.display = 'flex';
    }
}

// ================================
// Smooth Scrolling for Anchor Links
// ================================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                // Get navbar height for offset
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                
                // Calculate scroll position
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// Scroll Animations (Optional Enhancement)
// ================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => observer.observe(card));
}

// Initialize scroll animations if desired
// initScrollAnimations();

// ================================
// Utility Functions
// ================================

// Debounce function for performance optimization
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ================================
// Form Analytics (Optional)
// ================================
function trackFormInteraction(action, label) {
    // Replace with your analytics tracking code
    console.log('Analytics Event:', {
        category: 'Newsletter Form',
        action: action,
        label: label,
        timestamp: new Date().toISOString()
    });
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': 'Newsletter Form',
    //         'event_label': label
    //     });
    // }
}

// ================================
// Browser Support Detection
// ================================
function checkBrowserSupport() {
    const features = {
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid'),
        customProperties: CSS.supports('--custom', 'property')
    };
    
    // Log browser support (for debugging)
    console.log('Browser Feature Support:', features);
    
    // Optionally show warning for unsupported browsers
    if (!features.flexbox || !features.grid) {
        console.warn('Some CSS features are not supported in this browser');
    }
    
    return features;
}

// Check browser support on load
checkBrowserSupport();

// ================================
// Accessibility Enhancements
// ================================

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Close mobile menu with Escape key
    if (event.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        }
    }
});

// Trap focus in mobile menu when open
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    event.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    event.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// ================================
// Performance Monitoring (Optional)
// ================================
function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                const renderTime = perfData.domComplete - perfData.domLoading;
                
                console.log('Performance Metrics:', {
                    pageLoadTime: pageLoadTime + 'ms',
                    connectTime: connectTime + 'ms',
                    renderTime: renderTime + 'ms'
                });
            }, 0);
        });
    }
}

// Enable performance monitoring
// logPerformanceMetrics();

// ================================
// Export functions for testing (if needed)
// ================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        checkBrowserSupport
    };
}