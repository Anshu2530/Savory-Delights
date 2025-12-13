// ============================================
// Mobile Menu Toggle
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Form Validation Utilities
// ============================================
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phone: {
        pattern: /^[\d\s\-\+\(\)]+$/
    },
    subject: {
        required: true,
        minLength: 3
    },
    message: {
        required: true,
        minLength: 10
    },
    bookingName: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/
    },
    bookingEmail: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    bookingPhone: {
        required: true,
        pattern: /^[\d\s\-\+\(\)]+$/
    },
    bookingDate: {
        required: true
    },
    bookingTime: {
        required: true
    },
    guests: {
        required: true
    }
};

function validateField(field, value) {
    const rules = validationRules[field];
    if (!rules) return { valid: true };

    const errors = [];

    // Check required
    if (rules.required && (!value || value.trim() === '')) {
        errors.push('This field is required');
    }

    // Check min length
    if (rules.minLength && value && value.length < rules.minLength) {
        errors.push(`Must be at least ${rules.minLength} characters`);
    }

    // Check pattern
    if (rules.pattern && value && !rules.pattern.test(value)) {
        if (field.includes('email')) {
            errors.push('Please enter a valid email address');
        } else if (field.includes('phone')) {
            errors.push('Please enter a valid phone number');
        } else if (field.includes('name')) {
            errors.push('Name should only contain letters and spaces');
        }
    }

    // Special validation for date
    if (field === 'bookingDate' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            errors.push('Please select a future date');
        }
    }

    // Special validation for time
    if (field === 'bookingTime' && value && document.getElementById('bookingDate').value) {
        const selectedDate = new Date(document.getElementById('bookingDate').value);
        const today = new Date();
        
        if (selectedDate.toDateString() === today.toDateString()) {
            const selectedTime = value.split(':');
            const currentTime = new Date();
            const selectedHours = parseInt(selectedTime[0]);
            const selectedMinutes = parseInt(selectedTime[1]);
            const currentHours = currentTime.getHours();
            const currentMinutes = currentTime.getMinutes();
            
            if (selectedHours < currentHours || 
                (selectedHours === currentHours && selectedMinutes <= currentMinutes)) {
                errors.push('Please select a future time');
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors: errors
    };
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.remove('error');
    }
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function clearAllErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        clearError(field.id);
    });
}

// ============================================
// Contact Form Validation
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Real-time validation
    const contactFields = ['name', 'email', 'phone', 'subject', 'message'];
    contactFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => {
                const value = field.value.trim();
                const validation = validateField(fieldId, value);
                
                if (!validation.valid) {
                    showError(fieldId, validation.errors[0]);
                } else {
                    clearError(fieldId);
                }
            });

            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    const value = field.value.trim();
                    const validation = validateField(fieldId, value);
                    
                    if (validation.valid) {
                        clearError(fieldId);
                    }
                }
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearAllErrors('contactForm');
        
        let isValid = true;
        const formData = {};

        contactFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                const value = field.value.trim();
                formData[fieldId] = value;
                
                const validation = validateField(fieldId, value);
                
                if (!validation.valid) {
                    isValid = false;
                    showError(fieldId, validation.errors[0]);
                }
            }
        });

        if (isValid) {
            // Simulate form submission
            const successMessage = document.getElementById('formSuccess');
            if (successMessage) {
                successMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }
            
            // In a real application, you would send the data to a server here
            console.log('Contact form submitted:', formData);
        }
    });
}

// ============================================
// Booking Form Validation
// ============================================
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    // Set minimum date to today
    const dateField = document.getElementById('bookingDate');
    if (dateField) {
        const today = new Date().toISOString().split('T')[0];
        dateField.setAttribute('min', today);
    }

    // Real-time validation
    const bookingFields = ['bookingName', 'bookingEmail', 'bookingPhone', 'bookingDate', 'bookingTime', 'guests'];
    bookingFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => {
                const value = field.value.trim();
                const validation = validateField(fieldId, value);
                
                if (!validation.valid) {
                    showError(fieldId, validation.errors[0]);
                } else {
                    clearError(fieldId);
                }
            });

            field.addEventListener('change', () => {
                if (field.classList.contains('error')) {
                    const value = field.value.trim();
                    const validation = validateField(fieldId, value);
                    
                    if (validation.valid) {
                        clearError(fieldId);
                    }
                }
            });

            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    const value = field.value.trim();
                    const validation = validateField(fieldId, value);
                    
                    if (validation.valid) {
                        clearError(fieldId);
                    }
                }
            });
        }
    });

    // Form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearAllErrors('bookingForm');
        
        let isValid = true;
        const formData = {};

        bookingFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                const value = field.value.trim();
                formData[fieldId] = value;
                
                const validation = validateField(fieldId, value);
                
                if (!validation.valid) {
                    isValid = false;
                    showError(fieldId, validation.errors[0]);
                }
            }
        });

        // Validate occasion if provided
        const occasion = document.getElementById('occasion');
        if (occasion) {
            formData.occasion = occasion.value;
        }

        // Validate special requests if provided
        const specialRequests = document.getElementById('specialRequests');
        if (specialRequests) {
            formData.specialRequests = specialRequests.value.trim();
        }

        if (isValid) {
            // Simulate form submission
            const successMessage = document.getElementById('bookingSuccess');
            if (successMessage) {
                const date = new Date(formData.bookingDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                successMessage.textContent = `Thank you, ${formData.bookingName}! Your table reservation for ${date} at ${formData.bookingTime} has been confirmed. We look forward to serving you!`;
                successMessage.classList.add('show');
                
                // Reset form
                bookingForm.reset();
                
                // Hide success message after 8 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 8000);
            }
            
            // In a real application, you would send the data to a server here
            console.log('Booking form submitted:', formData);
        }
    });
}

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Lazy Loading Images Enhancement
// ============================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// Intersection Observer for Animations
// ============================================
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

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .dish-card, .testimonial-card, .menu-item, .info-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// Form Input Enhancements
// ============================================
// Add floating label effect
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ============================================
// Services Page Animations
// ============================================
// Scroll-triggered animations for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        serviceObserver.observe(card);
    });

    // Animate features on hover
    const serviceCardsWithFeatures = document.querySelectorAll('.service-card');
    serviceCardsWithFeatures.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const features = this.querySelectorAll('.service-features li');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const features = this.querySelectorAll('.service-features li');
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
            });
        });
    });
});

