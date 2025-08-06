// ============================================================================
// ADDITIONAL INTERACTIVE ENHANCEMENTS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize additional features after main features load
    setTimeout(() => {
        initializeParticleEffect();
        initializeSkillAnimations();
        initializeProjectHoverEffects();
        initializeScrollIndicators();
        initializeContactFormEnhancements();
        debugAboutSection(); // Add debug function
        
        console.log('✨ Additional interactive features loaded');
    }, 500);
});

// ============================================================================
// PARTICLE BACKGROUND EFFECT
// ============================================================================
function initializeParticleEffect() {
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particle-background');
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 255, 136, 0.3);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: -5;
            animation: float ${duration}s infinite linear;
        `;
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                createParticle(container);
            }
        }, duration * 1000);
    }
}

// ============================================================================
// ENHANCED SKILL ANIMATIONS
// ============================================================================
function initializeSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach((skillBar, index) => {
        skillBar.addEventListener('mouseenter', () => {
            const progressFill = skillBar.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.8)';
                progressFill.style.transform = 'scaleY(1.2)';
            }
        });
        
        skillBar.addEventListener('mouseleave', () => {
            const progressFill = skillBar.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.boxShadow = '';
                progressFill.style.transform = 'scaleY(1)';
            }
        });
    });
}

// ============================================================================
// PROJECT HOVER EFFECTS
// ============================================================================
function initializeProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 136, 0.2)';
            
            // Add glow effect to tech tags
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.5)';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            
            const techTags = card.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.boxShadow = '';
            });
        });
    });
}

// ============================================================================
// SCROLL PROGRESS INDICATORS
// ============================================================================
function initializeScrollIndicators() {
    const sections = document.querySelectorAll('section[id]');
    const scrollIndicator = document.createElement('div');
    scrollIndicator.classList.add('section-indicators');
    
    sections.forEach((section, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('section-indicator');
        indicator.setAttribute('data-section', section.id);
        indicator.setAttribute('title', section.id.charAt(0).toUpperCase() + section.id.slice(1));
        
        if (index === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        
        scrollIndicator.appendChild(indicator);
    });
    
    document.body.appendChild(scrollIndicator);
    
    // Update active indicator on scroll
    window.addEventListener('scroll', debounce(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const indicator = document.querySelector(`[data-section="${section.id}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                document.querySelectorAll('.section-indicator').forEach(ind => 
                    ind.classList.remove('active'));
                indicator.classList.add('active');
            }
        });
    }, 100));
}

// ============================================================================
// CONTACT FORM ENHANCEMENTS
// ============================================================================
function initializeContactFormEnhancements() {
    const form = document.querySelector('#contact form');
    if (!form) return;
    
    // Add floating labels effect
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                label.style.transform = 'translateY(-25px) scale(0.8)';
                label.style.color = '#00ff88';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.transform = '';
                    label.style.color = '';
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                label.style.transform = 'translateY(-25px) scale(0.8)';
                label.style.color = '#00ff88';
            }
        }
    });
    
    // Add typing animation to textarea
    const messageTextarea = document.querySelector('#message');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', () => {
            const length = messageTextarea.value.length;
            messageTextarea.style.borderColor = `hsl(${Math.min(length * 2, 120)}, 70%, 50%)`;
        });
    }
}

// ============================================================================
// THEME ENHANCEMENT
// ============================================================================
function enhanceThemeToggle() {
    // Add theme transition effects
    const themeTransition = document.createElement('div');
    themeTransition.classList.add('theme-transition');
    document.body.appendChild(themeTransition);
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const classList = mutation.target.classList;
                if (classList.contains('light-theme') || classList.contains('dark-theme')) {
                    // Trigger transition animation
                    themeTransition.style.opacity = '1';
                    setTimeout(() => {
                        themeTransition.style.opacity = '0';
                    }, 300);
                }
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================
function initializePerformanceMonitoring() {
    // Monitor scroll performance
    let scrollTicking = false;
    
    function updateOnScroll() {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                // Perform scroll-based updates here
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);
    
    // Log performance metrics
    if (window.performance) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('🚀 Portfolio Performance Metrics:');
                console.log(`⏱️ DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
                console.log(`⏱️ Page Load Complete: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }, 1000);
        });
    }
}

// ============================================================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================================================
function initializeA11yEnhancements() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.classList.add('skip-link');
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('#hero');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
    
    // Enhance focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    enhanceThemeToggle();
    initializePerformanceMonitoring();
    initializeA11yEnhancements();
});

// ============================================================================
// DEBUG ABOUT SECTION VISIBILITY
// ============================================================================
function debugAboutSection() {
    console.log('🔍 Debugging About Section...');
    
    const aboutSection = document.querySelector('#about');
    const aboutGrid = document.querySelector('.about-grid');
    const profileCard = document.querySelector('.profile-card');
    const skillsSection = document.querySelector('.skills-section');
    
    if (!aboutSection) {
        console.error('❌ About section not found!');
        return;
    }
    
    // Log current styles
    const computedStyle = window.getComputedStyle(aboutSection);
    console.log('About section computed styles:', {
        display: computedStyle.display,
        visibility: computedStyle.visibility,
        opacity: computedStyle.opacity,
        height: computedStyle.height,
        position: computedStyle.position
    });
    
    // Force visibility
    if (aboutSection) {
        aboutSection.style.display = 'block';
        aboutSection.style.visibility = 'visible';
        aboutSection.style.opacity = '1';
        aboutSection.style.minHeight = '500px';
        console.log('✅ About section visibility forced');
    }
    
    if (aboutGrid) {
        aboutGrid.style.display = 'grid';
        aboutGrid.style.visibility = 'visible';
        aboutGrid.style.opacity = '1';
        console.log('✅ About grid visibility forced');
    }
    
    if (profileCard) {
        profileCard.style.display = 'block';
        profileCard.style.visibility = 'visible';
        profileCard.style.opacity = '1';
        console.log('✅ Profile card visibility forced');
    }
    
    if (skillsSection) {
        skillsSection.style.display = 'block';
        skillsSection.style.visibility = 'visible';
        skillsSection.style.opacity = '1';
        console.log('✅ Skills section visibility forced');
    }
    
    // Check for any elements with display: none
    const hiddenElements = document.querySelectorAll('#about *');
    hiddenElements.forEach(element => {
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            console.warn('Hidden element found:', element, {
                display: style.display,
                visibility: style.visibility,
                opacity: style.opacity
            });
            // Force show
            element.style.display = 'block';
            element.style.visibility = 'visible';
            element.style.opacity = '1';
        }
    });
    
    // Trigger skill bar animations
    setTimeout(() => {
        const skillBars = document.querySelectorAll('.progress-fill');
        skillBars.forEach(bar => {
            const width = bar.dataset.width;
            if (width) {
                bar.style.width = width + '%';
                console.log(`✅ Skill bar animated to ${width}%`);
            }
        });
    }, 1000);
    
    console.log('🔍 About section debug complete');
}

// Debounce function (fallback if not defined)
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
