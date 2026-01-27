/**
 * AgriBioStat Analytics Suite - Main JavaScript
 * Version: 1.0
 * Author: AgriBioStat Team
 * 
 * This file contains shared functionality used across all pages
 */

// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Set active navigation link based on current page
    setActiveNavLink();
});

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if ((currentPage === '' || currentPage === 'index.html') && linkHref === 'index.html') {
            link.classList.add('active');
        } else if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== HERO SLIDER FUNCTIONALITY =====
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Handle index boundaries
        if (index >= slideCount) index = 0;
        if (index < 0) index = slideCount - 1;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide and activate corresponding dot
        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Next slide function
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide function
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Auto-advance slides every 5 seconds
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Stop auto-slide when user interacts
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Event listeners for navigation
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Pause auto-slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoSlide);
        heroSlider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Initialize slider
    showSlide(0);
    startAutoSlide();
}

// ===== FAQ ACCORDION FUNCTIONALITY =====
function initFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Get the answer element
            const answer = this.nextElementSibling;
            
            // Toggle answer visibility
            if (this.classList.contains('active')) {
                answer.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.classList.remove('active');
                answer.style.maxHeight = '0';
            }
            
            // Close other FAQs (optional - for single open at a time)
            // faqQuestions.forEach(otherQuestion => {
            //     if (otherQuestion !== this && otherQuestion.classList.contains('active')) {
            //         otherQuestion.classList.remove('active');
            //         const otherAnswer = otherQuestion.nextElementSibling;
            //         otherAnswer.classList.remove('active');
            //         otherAnswer.style.maxHeight = '0';
            //     }
            // });
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Select all links with hashes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-menu');
                const mobileToggle = document.querySelector('.mobile-toggle');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.classList.remove('active');
                        const spans = mobileToggle.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }
            }
        });
    });
}

// ===== FORM VALIDATION UTILITIES =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function hideFormError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function showFormSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// ===== BLOG UTILITIES (Shared between blogs.html and admin.html) =====
function getBlogPosts() {
    const posts = localStorage.getItem('agriBioStatBlogPosts');
    return posts ? JSON.parse(posts) : [];
}

function saveBlogPosts(posts) {
    localStorage.setItem('agriBioStatBlogPosts', JSON.stringify(posts));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ===== INITIALIZE COMMON FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize FAQ accordions if they exist
    if (document.querySelector('.faq-question')) {
        initFAQs();
    }
    
    // Check for iframes and add loading handlers
    const iframes = document.querySelectorAll('.tool-iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
            const loadingDiv = this.parentElement.querySelector('.iframe-loading');
            if (loadingDiv) {
                loadingDiv.style.display = 'none';
            }
        });
        
        // Fallback for iframe loading issues
        setTimeout(() => {
            if (iframe.style.opacity !== '1') {
                iframe.style.opacity = '1';
                const loadingDiv = iframe.parentElement.querySelector('.iframe-loading');
                if (loadingDiv) {
                    loadingDiv.style.display = 'none';
                }
            }
        }, 10000);
    });
});

// ===== EXPORT UTILITIES FOR USE IN SPECIFIC PAGES =====
window.AgriBioStatUtils = {
    validateEmail,
    showFormError,
    hideFormError,
    showFormSuccess,
    getBlogPosts,
    saveBlogPosts,
    formatDate
};



// ===== FAQ FUNCTION (Updated for single open item) =====
function initFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Check if this question is already active
            const isActive = this.classList.contains('active');
            
            // Close ALL FAQ answers first
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                const ans = q.nextElementSibling;
                if (ans && ans.classList.contains('faq-answer')) {
                    ans.classList.remove('show');
                }
            });
            
            // If the clicked question wasn't active, open it
            if (!isActive) {
                this.classList.add('active');
                const answer = this.nextElementSibling;
                if (answer && answer.classList.contains('faq-answer')) {
                    answer.classList.add('show');
                }
            }
        });
    });
}
// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if FAQ exists and initialize
    if (document.querySelector('.faq-question')) {
        initFAQs();
    }
    
    // Your other initialization code here...
});
