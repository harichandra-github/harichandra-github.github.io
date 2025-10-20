
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initCounters();
    initProgressCircles();
    initContactForm();
    initResumeDownload();
    initTooltips();
    initSmoothScrolling();
    initParallaxEffects();
    initThemeToggle();
    initSocialLinkTracking(); // Add tracking for social links
});
    

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (window.scrollY > 100) {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.boxShadow = 'none';
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                }
                
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.timeline-item, .experience-card, .project-card, .learning-item, .link-card, .resume-download');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Separate subtle animation for skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Progress circles animation
function initProgressCircles() {
    const progressCircles = document.querySelectorAll('.progress-circle');
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const progress = parseInt(circle.getAttribute('data-progress'));
                const degrees = (progress / 100) * 360;
                
                // Animate the progress circle
                setTimeout(() => {
                    circle.style.background = `conic-gradient(var(--primary-color) ${degrees}deg, var(--border-color) ${degrees}deg)`;
                }, 500);
                
                progressObserver.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });

    progressCircles.forEach(circle => {
        progressObserver.observe(circle);
    });
}

// Resume download functionality
function initResumeDownload() {
    const downloadButton = document.getElementById('downloadResume');
    
    // Configurable resume link
    const resumeConfig = {
        googleDriveLink: 'https://lnk.ink/hari-cv',
        directDownloadLink: 'https://lnk.ink/hari-cv',
        fileName: 'Harichandra_4+YOE_SDET_Resume.pdf'
    };
    
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // Track resume download in Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'resume_download', {
                    'event_category': 'Resume',
                    'event_label': 'Download Button Click',
                    'value': 1
                });
            }
            
            // Show downloading state
            this.classList.add('downloading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Opening Resume...</span><div class="download-progress"></div>';
            this.disabled = true;
            
            // Simulate download process
            setTimeout(() => {
                // Show downloaded state
                this.classList.remove('downloading');
                this.classList.add('downloaded');
                this.innerHTML = '<i class="fas fa-check"></i><span>Opened!</span><div class="download-progress"></div>';
                
                // Open Google Drive link in new tab
                window.open(resumeConfig.googleDriveLink, '_blank');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    this.classList.remove('downloaded');
                    this.innerHTML = '<i class="fas fa-download"></i><span>Download Resume</span><div class="download-progress"></div>';
                    this.disabled = false;
                }, 3000);
            }, 1500);
        });
        
        // Add hover effects
        downloadButton.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        downloadButton.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        // Add right-click context menu for direct download
        downloadButton.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            if (!this.disabled) {
                // Track right-click direct download
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'resume_download_direct', {
                        'event_category': 'Resume',
                        'event_label': 'Right-Click Direct Download',
                        'value': 1
                    });
                }
                
                // Show direct download option
                this.classList.add('downloading');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Downloading...</span><div class="download-progress"></div>';
                this.disabled = true;
                
                setTimeout(() => {
                    // Create direct download link
                    const link = document.createElement('a');
                    link.href = resumeConfig.directDownloadLink;
                    link.download = resumeConfig.fileName;
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    this.classList.remove('downloading');
                    this.classList.add('downloaded');
                    this.innerHTML = '<i class="fas fa-check"></i><span>Downloaded!</span><div class="download-progress"></div>';
                    
                    setTimeout(() => {
                        this.classList.remove('downloaded');
                        this.innerHTML = '<i class="fas fa-download"></i><span>Download Resume</span><div class="download-progress"></div>';
                        this.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
}

// function initContactForm() {
//     const form = document.getElementById('contactForm');
//     const submitButton = form.querySelector('.submit-button');
//     let isSubmitting = false;
  
//     form.addEventListener('submit', async function (e) {
//       e.preventDefault();
//       if (isSubmitting) return;
//       isSubmitting = true;
  
//       submitButton.innerHTML = '<div class="loading"></div> Sending...';
//       submitButton.disabled = true;
  
//       const formData = new FormData(form);
  
//       try {
//         const response = await fetch(form.action, {
//           method: 'POST',
//           body: formData,
//           headers: {
//             'Accept': 'application/json'
//           }
//         });
  
//         const result = await response.json();
  
//         if (result.success) {
//           showNotification('✅ Message sent successfully!', 'success');
//           submitButton.innerHTML = 'Message Sent!';
//           submitButton.style.background = '#4ade80';
//           form.reset();
//         } else {
//           console.error(result);
//           showNotification(`❌ ${result.message || 'Something went wrong.'}`, 'error');
//           submitButton.innerHTML = 'Try Again';
//           submitButton.style.background = '#ef4444';
//         }
//       } catch (error) {
//         console.error('Error submitting form:', error);
//         showNotification('❌ Network or server error. Please try again.', 'error');
//         submitButton.innerHTML = 'Try Again';
//         submitButton.style.background = '#ef4444';
//       }
  
//       setTimeout(() => {
//         submitButton.innerHTML = 'Send Message';
//         submitButton.style.background = '';
//         submitButton.disabled = false;
//         isSubmitting = false;
//       }, 3000);
//     });
//   }
  
//   function showNotification(message, type = 'info') {
//     const existing = document.querySelectorAll('.notification');
//     existing.forEach(el => el.remove());
  
//     const notification = document.createElement('div');
//     notification.className = `notification notification-${type}`;
//     notification.textContent = message;
  
//     notification.style.cssText = `
//       position: fixed;
//       top: 20px;
//       right: 20px;
//       background: ${type === 'success' ? '#4ade80' : '#ef4444'};
//       color: white;
//       padding: 1rem 1.5rem;
//       border-radius: 10px;
//       box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//       z-index: 10000;
//       font-weight: 500;
//       opacity: 0;
//       transform: translateX(100%);
//       transition: all 0.3s ease;
//     `;
  
//     document.body.appendChild(notification);
//     setTimeout(() => {
//       notification.style.opacity = '1';
//       notification.style.transform = 'translateX(0)';
//     }, 10);
  
//     setTimeout(() => {
//       notification.style.opacity = '0';
//       notification.style.transform = 'translateX(100%)';
//       setTimeout(() => notification.remove(), 300);
//     }, 5000);
//   }
  
//   document.addEventListener('DOMContentLoaded', initContactForm);
  

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.submit-button');
    let isSubmitting = false; // Prevent double submission
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Prevent double submission
        if (isSubmitting) {
            console.log('Form already submitting, ignoring...');
            return false;
        }
        
        isSubmitting = true;
        console.log('Starting form submission...');
        
        // Show loading state
        submitButton.innerHTML = '<div class="loading"></div> Sending...';
        submitButton.disabled = true;

        try {
            // Submit form to Web3Forms
            const formData = new FormData(form);
            
            // Debug: Log form data
            console.log('Submitting form data:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
            });
            
            // Debug: Log response
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            // Check if response is ok and get the response data
            let result;
            try {
                result = await response.json();
                console.log('Response data:', result);
            } catch (jsonError) {
                console.error('Failed to parse JSON response:', jsonError);
                throw new Error('Invalid response from server');
            }
            
            // Web3Forms success conditions: response.ok AND (result.success === true OR result.success === "true")
            const isSuccess = response.ok && (result.success === true || result.success === "true" || result.success === 1 || result.success === "1");
            
            if (isSuccess) {
                console.log('🎉 Form submission successful!');
                
                // Show success state briefly
                submitButton.innerHTML = '<div class="success-checkmark"></div> Message Sent!';
                submitButton.style.background = '#4ade80';
                
                // Show success notification
                showNotification('✅ Message sent successfully!', 'success');
                
                // Reset form
                form.reset();
                
            } else {
                // Handle Web3Forms error response
                const errorMessage = result.message || result.error || 'Form submission failed';
                console.error('Web3Forms error:', errorMessage, result);
                
                // Show error state
                submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
                submitButton.style.background = '#ef4444';
                
                // Show error notification with more specific message
                let userMessage = '❌ Something went wrong. Please try again.';
                if (errorMessage.includes('access_key')) {
                    userMessage = '❌ Configuration error. Please contact the website owner.';
                } else if (errorMessage.includes('spam') || errorMessage.includes('bot')) {
                    userMessage = '❌ Message blocked as spam. Please try again.';
                } else if (errorMessage) {
                    userMessage = `❌ ${errorMessage}`;
                }
                
                showNotification(userMessage, 'error');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = '<span class="button-text">Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                    isSubmitting = false;
                }, 3000);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Show error state
            submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
            submitButton.style.background = '#ef4444';
            
            // Determine error message based on error type
            let errorMessage = '❌ Something went wrong. Please try again.';
            
            if (error.name === 'AbortError') {
                errorMessage = '❌ Request timed out. Please check your connection and try again.';
            } else if (error.message.includes('fetch')) {
                errorMessage = '❌ Network error. Please check your internet connection.';
            } else if (error.message.includes('JSON')) {
                errorMessage = '❌ Server error. Please try again later.';
            }
            
            // Show error notification
            showNotification(errorMessage, 'error');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = '<span class="button-text">Send Message</span><i class="fas fa-paper-plane"></i>';
                submitButton.style.background = '';
                submitButton.disabled = false;
                isSubmitting = false;
            }, 3000);
        }
    });

    // Form field animations
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}


// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ade80' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Allow manual close on click
    notification.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Tooltip functionality
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                showTooltip(this, tooltip);
            }
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--bg-dark);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
}

function hideTooltip() {
    const tooltip = document.querySelector('.custom-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// CTA button interactions
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const experienceSection = document.getElementById('experience');
            if (experienceSection) {
                experienceSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Code animation in hero section
function initCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    let currentLine = 0;
    
    function animateCode() {
        codeLines.forEach((line, index) => {
            if (index === currentLine) {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            } else {
                line.style.opacity = '0.5';
                line.style.transform = 'translateX(-20px)';
            }
        });
        
        currentLine = (currentLine + 1) % codeLines.length;
    }
    
    // Start animation
    setInterval(animateCode, 2000);
    animateCode(); // Initial call
}

// Initialize code animation when page loads
document.addEventListener('DOMContentLoaded', initCodeAnimation);

// Scroll indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const journeySection = document.getElementById('journey');
            if (journeySection) {
                journeySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hide scroll indicator when user starts scrolling
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// Initialize scroll indicator
document.addEventListener('DOMContentLoaded', initScrollIndicator);

// Enhanced hover effects for cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.experience-card, .project-card, .learning-item, .link-card, .resume-download');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Initialize card hover effects
document.addEventListener('DOMContentLoaded', initCardHoverEffects);

// Tech tag hover effects
function initTechTagEffects() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Initialize tech tag effects
document.addEventListener('DOMContentLoaded', initTechTagEffects);

// GitHub link glow effect
function initGitHubGlow() {
    const githubLinks = document.querySelectorAll('.github-link');
    
    githubLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px rgba(37, 99, 235, 0.5)';
            this.style.transform = 'scale(1.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize GitHub glow effect
document.addEventListener('DOMContentLoaded', initGitHubGlow);

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', initTypingEffect);

// Page load animations
function initPageLoadAnimations() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Stagger animation for hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Initialize page load animations
document.addEventListener('DOMContentLoaded', initPageLoadAnimations);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects
}, 16)); // ~60fps

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Track social media and external link clicks
function initSocialLinkTracking() {
    // Track LinkedIn clicks
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
    linkedinLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'linkedin_click', {
                    'event_category': 'Social Media',
                    'platform': 'LinkedIn',
                    'value': 1
                });
            }
        });
    });
    
    // Track GitHub clicks
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'github_click', {
                    'event_category': 'Social Media',
                    'platform': 'GitHub',
                    'value': 1
                });
            }
        });
    });
    
    // Track Email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_click', {
                    'event_category': 'Contact',
                    'contact_method': 'Email',
                    'value': 1
                });
            }
        });
    });
}

// Initialize social link tracking
document.addEventListener('DOMContentLoaded', initSocialLinkTracking);

// Initialize all safe elements
// document.addEventListener('DOMContentLoaded', function() {
//     // Safe initialization of all features
//     const features = [
//         initNavigation,
//         initScrollAnimations,
//         initCounters,
//         initProgressCircles,
//         initContactForm,
//         initTooltips,
//         initSmoothScrolling,
//         initParallaxEffects,
//         initCodeAnimation,
//         initScrollIndicator,
//         initCardHoverEffects,
//         initTechTagEffects,
//         initGitHubGlow,
//         initTypingEffect,
//         initPageLoadAnimations
//     ];
    
//     features.forEach(feature => {
//         try {
//             feature();
//         } catch (error) {
//             console.warn('Feature initialization failed:', error);
//         }
//     });
// });

// document.getElementById("contactForm").addEventListener("submit", function(e) {
//   e.preventDefault();
//   const formData = new FormData(this);
//   fetch("https://api.web3forms.com/submit", {
//     method: "POST",
//     body: formData,
//     mode: "no-cors"
//   });
//   alert("Message sent successfully!");
// });


// Add CSS for loaded state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) * {
        animation-play-state: paused !important;
    }
    
    .loaded .hero-content > * {
        animation: fadeIn 0.8s ease-out both;
    }
    
    .custom-tooltip {
        position: absolute;
        background: var(--bg-dark);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    // Update navbar on initial load
    updateNavbarTheme(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Set new theme
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            updateThemeIcon(newTheme);
            
            // Update navbar immediately
            updateNavbarTheme(newTheme);
            
            // Add animation
            this.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

function updateNavbarTheme(theme) {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            if (theme === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (theme === 'dark') {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.boxShadow = 'none';
        }
    }
}

// Hero section - Download Resume button (scroll to resume section)
document.addEventListener('DOMContentLoaded', function() {
    const heroDownloadBtn = document.getElementById('heroDownloadResume');
    if (heroDownloadBtn) {
        heroDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button behavior
            
            // Track the interaction
            if (typeof gtag !== 'undefined') {
                gtag('event', 'resume_section_click', {
                    'event_category': 'Navigation',
                    'event_label': 'Hero to Resume Section',
                    'value': 1
                });
            }
            
            // Smooth scroll to resume section
            const resumeSection = document.getElementById('resume');
            if (resumeSection) {
                resumeSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Hero section - Get In Touch button (smooth scroll to contact)
document.addEventListener('DOMContentLoaded', function() {
    const getInTouchBtn = document.getElementById('heroGetInTouch');
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button behavior
            
            // Track the interaction
            if (typeof gtag !== 'undefined') {
                gtag('event', 'get_in_touch_click', {
                    'event_category': 'Navigation',
                    'event_label': 'Hero Section to Contact',
                    'value': 1
                });
            }
            
            // Smooth scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});
