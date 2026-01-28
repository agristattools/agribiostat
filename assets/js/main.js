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


// ===== AD MANAGEMENT =====
function loadAdScript(src, type = 'script') {
    return new Promise((resolve, reject) => {
        if (type === 'script') {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        } else if (type === 'popunder') {
            // Popunder is loaded differently
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
            resolve();
        }
    });
}

// Prevent multiple popunder loads per session
function loadPopunderOnce() {
    const popunderLoaded = sessionStorage.getItem('popunderLoaded');
    
    if (!popunderLoaded && 
        (window.location.pathname.includes('index.html') || 
         window.location.pathname.includes('blogs.html'))) {
        
        loadAdScript('https://pl28518807.effectivegatecpm.com/72/2d/6c/722d6cd18b8a6d02d99216541d5b071d.js', 'popunder')
            .then(() => {
                sessionStorage.setItem('popunderLoaded', 'true');
            })
            .catch(err => console.error('Popunder failed to load:', err));
    }
}

// Load Social Bar for homepage
function loadSocialBar() {
    if (window.location.pathname.includes('index.html')) {
        const socialBarContainer = document.createElement('div');
        socialBarContainer.className = 'social-bar-container';
        document.body.appendChild(socialBarContainer);
        
        loadAdScript('https://pl28518811.effectivegatecpm.com/62/10/1c/62101cf8c62dc98eb40bb69406f6ab83.js')
            .catch(err => console.error('Social Bar failed to load:', err));
    }
}

// Initialize ads
document.addEventListener('DOMContentLoaded', function() {
    // Load popunder once per session
    loadPopunderOnce();
    
    // Load social bar for homepage
    loadSocialBar();
});






// ===== BLOG PAGE AD FUNCTIONALITY =====
function initBlogAds() {
    // Only run on blogs page
    if (!window.location.pathname.includes('blogs.html')) return;
    
    // Smartlink conversion for CTA buttons
    function convertCTALinks() {
        const smartlinkUrl = 'https://www.effectivegatecpm.com/g8a2ww5t?key=933bc4b749a4893d94d8bb3c077e6e50';
        
        // Convert primary buttons to smartlinks
        const ctaButtons = document.querySelectorAll('.btn-primary:not([href*="ammi-gea"]):not([href*="bioomics"])');
        ctaButtons.forEach(btn => {
            if (btn.href && !btn.href.includes('#') && !btn.href.includes('mailto:')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.open(smartlinkUrl, '_blank');
                });
            }
        });
    }
    
    // Modify modal opening to insert ads
    function modifyBlogModal() {
        document.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('read-more')) {
                setTimeout(insertNativeAdInModal, 100);
            }
        });
    }
    
    // Insert native ad in modal after 2nd paragraph
    function insertNativeAdInModal() {
        const modalBody = document.getElementById('modal-body');
        if (!modalBody) return;
        
        const paragraphs = modalBody.querySelectorAll('p');
        if (paragraphs.length >= 2) {
            const adContainer = document.createElement('div');
            adContainer.className = 'ad-container native';
            adContainer.style.margin = '2rem 0';
            adContainer.innerHTML = `
                <span class="ad-label">Advertisement</span>
                <script async="async" data-cfasync="false" src="https://pl28518810.effectivegatecpm.com/e057183590c510b499eb5de3f9c43f9d/invoke.js"></script>
                <div id="container-e057183590c510b499eb5de3f9c43f9d"></div>
            `;
            
            paragraphs[1].after(adContainer);
            
            // Load ad script
            setTimeout(() => {
                const existingScript = document.querySelector('script[src*="e057183590c510b499eb5de3f9c43f9d"]');
                if (!existingScript) {
                    const script = document.createElement('script');
                    script.async = true;
                    script.setAttribute('data-cfasync', 'false');
                    script.src = 'https://pl28518810.effectivegatecpm.com/e057183590c510b499eb5de3f9c43f9d/invoke.js';
                    document.body.appendChild(script);
                }
            }, 200);
        }
    }
    
    // Initialize blog ads
    convertCTALinks();
    modifyBlogModal();
}

// Call when DOM is loaded
document.addEventListener('DOMContentLoaded', initBlogAds);


