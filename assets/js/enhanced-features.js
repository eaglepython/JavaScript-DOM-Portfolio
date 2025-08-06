// ============================================================================
// ENHANCED FEATURES - PROJECT CAROUSEL & API INTEGRATION
// ============================================================================

// Initialize enhanced features after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for main script to load
    setTimeout(() => {
        initializeProjectCarousel();
        initializeScrollIndicator();
        initializeSkillProgressAnimation();
        initializeContactFormEnhancement();
        initializeKeyboardNavigation();
    }, 100);
});

// ============================================================================
// PROJECT CAROUSEL FUNCTIONALITY
// ============================================================================
function initializeProjectCarousel() {
    console.log('🎠 Initializing Project Carousel...');
    
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    // Create carousel container
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('project-carousel');
    
    // Create carousel wrapper
    const carouselWrapper = document.createElement('div');
    carouselWrapper.classList.add('carousel-wrapper');
    
    // Move existing projects into carousel
    const projectCards = Array.from(document.querySelectorAll('.project-card'));
    projectCards.forEach(card => {
        carouselWrapper.appendChild(card);
    });
    
    // Create navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('carousel-btn', 'carousel-prev');
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.setAttribute('aria-label', 'Previous project');
    
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('carousel-btn', 'carousel-next');
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.setAttribute('aria-label', 'Next project');
    
    // Create indicators
    const indicators = document.createElement('div');
    indicators.classList.add('carousel-indicators');
    
    projectCards.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.classList.add('carousel-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.setAttribute('aria-label', `Go to project ${index + 1}`);
        indicator.dataset.index = index;
        indicators.appendChild(indicator);
    });
    
    // Assemble carousel
    carouselContainer.appendChild(prevBtn);
    carouselContainer.appendChild(carouselWrapper);
    carouselContainer.appendChild(nextBtn);
    carouselContainer.appendChild(indicators);
    
    // Replace the grid with carousel on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleCarouselToggle(e) {
        if (e.matches) {
            // Mobile: Use carousel
            projectsGrid.style.display = 'none';
            projectsGrid.parentNode.insertBefore(carouselContainer, projectsGrid);
            setupCarouselFunctionality();
        } else {
            // Desktop: Use grid
            if (carouselContainer.parentNode) {
                carouselContainer.parentNode.removeChild(carouselContainer);
            }
            projectsGrid.style.display = 'grid';
            
            // Move cards back to grid
            projectCards.forEach(card => {
                projectsGrid.appendChild(card);
            });
        }
    }
    
    // Initial check and listener
    handleCarouselToggle(mediaQuery);
    mediaQuery.addListener(handleCarouselToggle);
    
    function setupCarouselFunctionality() {
        let currentIndex = 0;
        const totalCards = projectCards.length;
        
        function updateCarousel() {
            const translateX = -currentIndex * 100;
            carouselWrapper.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
            
            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalCards - 1;
        }
        
        function nextProject() {
            if (currentIndex < totalCards - 1) {
                currentIndex++;
                updateCarousel();
            }
        }
        
        function prevProject() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
        
        function goToProject(index) {
            currentIndex = Math.max(0, Math.min(index, totalCards - 1));
            updateCarousel();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextProject);
        prevBtn.addEventListener('click', prevProject);
        
        // Indicator clicks
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToProject(index));
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        carouselWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carouselWrapper.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
        
        carouselWrapper.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextProject();
                } else {
                    prevProject();
                }
            }
        });
        
        // Keyboard navigation
        carouselContainer.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevProject();
            } else if (e.key === 'ArrowRight') {
                nextProject();
            }
        });
        
        // Auto-play (optional)
        let autoplayInterval;
        
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                if (currentIndex < totalCards - 1) {
                    nextProject();
                } else {
                    currentIndex = 0;
                    updateCarousel();
                }
            }, 5000);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Start autoplay and pause on hover
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
        
        // Initial setup
        updateCarousel();
        startAutoplay();
    }
}

// ============================================================================
// SCROLL PROGRESS INDICATOR
// ============================================================================
function initializeScrollIndicator() {
    console.log('📊 Initializing Scroll Indicator...');
    
    // Create scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('scroll-indicator');
    
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    
    scrollIndicator.appendChild(progressBar);
    document.body.appendChild(scrollIndicator);
    
    // Update progress on scroll
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
    
    window.addEventListener('scroll', debounce(updateScrollProgress, 10));
    updateScrollProgress(); // Initial call
}

// ============================================================================
// ANIMATED SKILL PROGRESS BARS
// ============================================================================
function initializeSkillProgressAnimation() {
    console.log('📈 Initializing Skill Progress Animation...');
    
    const skillBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target;
                const targetWidth = progressFill.dataset.width;
                
                // Animate the progress bar
                progressFill.style.width = '0%';
                
                setTimeout(() => {
                    progressFill.style.transition = 'width 2s ease-out';
                    progressFill.style.width = `${targetWidth}%`;
                }, 200);
                
                // Unobserve after animation
                observer.unobserve(progressFill);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================================================
// ENHANCED CONTACT FORM WITH EMAIL SIMULATION
// ============================================================================
function initializeContactFormEnhancement() {
    console.log('📧 Enhancing Contact Form...');
    
    const contactForm = document.querySelector('#contact form');
    if (!contactForm) return;
    
    // Add character counters to textarea
    const messageTextarea = document.querySelector('#message');
    if (messageTextarea) {
        const charCounter = document.createElement('div');
        charCounter.classList.add('char-counter');
        charCounter.textContent = '0 / 500 characters';
        messageTextarea.parentNode.appendChild(charCounter);
        
        messageTextarea.addEventListener('input', () => {
            const length = messageTextarea.value.length;
            charCounter.textContent = `${length} / 500 characters`;
            
            if (length > 400) {
                charCounter.style.color = '#ff4757';
            } else if (length > 300) {
                charCounter.style.color = '#ffa502';
            } else {
                charCounter.style.color = '#00ff88';
            }
        });
    }
    
    // Enhanced form submission with better feedback
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.querySelector('.btn-text').textContent;
        
        submitBtn.classList.add('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call with realistic delay
        setTimeout(() => {
            // Log to console for development
            console.log('📧 Contact form submitted:', data);
            
            // In a real application, you would send this to your backend
            // fetch('/api/contact', { method: 'POST', body: formData })
            
            // Show success message
            showFormSuccess();
            
            // Reset form
            this.reset();
            
            // Reset character counter
            const charCounter = document.querySelector('.char-counter');
            if (charCounter) {
                charCounter.textContent = '0 / 500 characters';
                charCounter.style.color = '#00ff88';
            }
            
            // Reset button
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('.btn-text').textContent = originalBtnText;
            submitBtn.disabled = false;
            
        }, 2000 + Math.random() * 1000); // Random delay for realism
    });
    
    function showFormSuccess() {
        // Create success notification
        const notification = document.createElement('div');
        notification.classList.add('success-notification');
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div>
                    <h4>Message Sent Successfully!</h4>
                    <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// ============================================================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================================================
function initializeKeyboardNavigation() {
    console.log('⌨️ Initializing Keyboard Navigation...');
    
    // Add keyboard shortcuts info
    const shortcutsInfo = document.createElement('div');
    shortcutsInfo.classList.add('keyboard-shortcuts');
    shortcutsInfo.innerHTML = `
        <div class="shortcuts-toggle">
            <i class="fas fa-keyboard"></i>
            <span>Shortcuts</span>
        </div>
        <div class="shortcuts-menu">
            <h4>Keyboard Shortcuts</h4>
            <ul>
                <li><kbd>1-4</kbd> Navigate sections</li>
                <li><kbd>T</kbd> Toggle theme</li>
                <li><kbd>M</kbd> Toggle mobile menu</li>
                <li><kbd>F</kbd> Focus search/filter</li>
                <li><kbd>Esc</kbd> Close menus</li>
            </ul>
        </div>
    `;
    
    document.body.appendChild(shortcutsInfo);
    
    // Toggle shortcuts menu
    const shortcutsToggle = shortcutsInfo.querySelector('.shortcuts-toggle');
    const shortcutsMenu = shortcutsInfo.querySelector('.shortcuts-menu');
    
    shortcutsToggle.addEventListener('click', () => {
        shortcutsMenu.classList.toggle('show');
    });
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in form fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch(e.key) {
            case '1':
                scrollToSection('hero');
                break;
            case '2':
                scrollToSection('about');
                break;
            case '3':
                scrollToSection('projects');
                break;
            case '4':
                scrollToSection('contact');
                break;
            case 't':
            case 'T':
                document.getElementById('theme-toggle')?.click();
                break;
            case 'm':
            case 'M':
                document.getElementById('mobile-menu-toggle')?.click();
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                document.querySelector('.filter-btn')?.focus();
                break;
            case 'Escape':
                // Close any open menus
                document.querySelector('.shortcuts-menu')?.classList.remove('show');
                if (document.querySelector('.nav-menu.mobile-active')) {
                    document.getElementById('mobile-menu-toggle')?.click();
                }
                break;
        }
    });
    
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Debounce function (if not already defined in main script)
if (typeof debounce === 'undefined') {
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
}

// Performance monitoring
function logPerformance() {
    if (performance.mark) {
        performance.mark('portfolio-enhanced-features-loaded');
        console.log('🚀 Enhanced features loaded at:', performance.now(), 'ms');
    }
}

// Call performance logging
logPerformance();
