// ============================================================================
// PORTFOLIO DOM MANIPULATION & INTERACTIVE FEATURES
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio JavaScript Loaded - DOM Ready');
    
    // Initialize all features
    initializeThemeToggle();
    initializeMobileMenu();
    initializeTypewriter();
    initializeFormValidation();
    initializeProjectFiltering();
    initializeSmoothScrolling();
    initializeAnimationOnScroll();
    
    console.log('✅ All features initialized successfully');
});

// ============================================================================
// 1. THEME TOGGLING (Light/Dark Mode)
// ============================================================================
function initializeThemeToggle() {
    console.log('🎨 Initializing Theme Toggle...');
    
    // Use existing theme toggle button from HTML
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) {
        console.error('Theme toggle button not found in HTML');
        return;
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.body.classList.add(`${savedTheme}-theme`);
    updateThemeButton(savedTheme);
    
    // Theme toggle event listener
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Remove current theme and add new theme
        document.body.classList.remove(`${currentTheme}-theme`);
        document.body.classList.add(`${newTheme}-theme`);
        
        // Save preference
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Update button
        updateThemeButton(newTheme);
        
        // Add transition effect
        document.body.style.transition = 'all 0.3s ease-in-out';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
        
        console.log(`🎨 Theme switched to: ${newTheme}`);
    });
    
    function updateThemeButton(theme) {
        const sunIcon = themeToggleBtn.querySelector('.sun-icon');
        const moonIcon = themeToggleBtn.querySelector('.moon-icon');
        
        if (theme === 'light') {
            if (sunIcon) sunIcon.style.opacity = '1';
            if (moonIcon) moonIcon.style.opacity = '0.6';
        } else {
            if (sunIcon) sunIcon.style.opacity = '0.6';
            if (moonIcon) moonIcon.style.opacity = '1';
        }
    }
}

// ============================================================================
// 2. MOBILE MENU WITH HAMBURGER ICON
// ============================================================================
function initializeMobileMenu() {
    console.log('📱 Initializing Mobile Menu...');
    
    // Create hamburger button
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.id = 'mobile-menu-toggle';
    hamburgerBtn.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;
    hamburgerBtn.classList.add('hamburger-btn');
    hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Add to navigation
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(hamburgerBtn);
    
    const navMenu = document.querySelector('.nav-menu');
    let isMenuOpen = false;
    
    // Toggle menu function
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        // Toggle classes
        hamburgerBtn.classList.toggle('active', isMenuOpen);
        navMenu.classList.toggle('mobile-active', isMenuOpen);
        document.body.classList.toggle('menu-open', isMenuOpen);
        
        // Update aria-expanded
        hamburgerBtn.setAttribute('aria-expanded', isMenuOpen);
        
        console.log(`📱 Mobile menu ${isMenuOpen ? 'opened' : 'closed'}`);
    }
    
    // Event listeners
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navContainer.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMobileMenu();
        }
    });
}

// ============================================================================
// 3. TYPEWRITER EFFECT FOR HERO TEXT
// ============================================================================
function initializeTypewriter() {
    console.log('⌨️ Initializing Typewriter Effect...');
    
    const typewriterElement = document.querySelector('.typewriter-text');
    if (!typewriterElement) return;
    
    const phrases = [
        'Software Engineer & Quantitative Researcher',
        'Full-Stack Developer & AI Specialist',
        'Biomedical Engineer & Data Scientist',
        'Machine Learning Engineer',
        'Financial Technology Developer'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            // Remove character
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 500); // Pause before typing next phrase
                return;
            }
        } else {
            // Add character
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000); // Pause before deleting
                return;
            }
        }
        
        // Continue typing/deleting
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    
    // Start the typewriter effect
    setTimeout(typeEffect, 1000);
    
    console.log('⌨️ Typewriter effect started');
}

// ============================================================================
// 4. FORM VALIDATION WITH REAL-TIME FEEDBACK
// ============================================================================
function initializeFormValidation() {
    console.log('📝 Initializing Form Validation...');
    
    const contactForm = document.querySelector('#contact form');
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (letters and spaces only, minimum 2 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        company: {
            required: false,
            minLength: 2,
            message: 'Company name should be at least 2 characters'
        },
        subject: {
            required: true,
            minLength: 5,
            message: 'Subject should be at least 5 characters'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Message should be at least 10 characters'
        }
    };
    
    // Create error message elements
    formInputs.forEach(input => {
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.id = `${input.name}-error`;
        input.parentNode.appendChild(errorElement);
    });
    
    // Real-time validation on input
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate all fields
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            handleFormSubmission(contactForm);
        } else {
            console.log('❌ Form validation failed');
            showFormMessage('Please correct the errors above', 'error');
        }
    });
    
    function validateField(input) {
        const rules = validationRules[input.name];
        if (!rules) return true;
        
        const value = input.value.trim();
        const errorElement = document.getElementById(`${input.name}-error`);
        
        // Check required
        if (rules.required && !value) {
            showFieldError(input, errorElement, `${capitalize(input.name)} is required`);
            return false;
        }
        
        // Check minimum length
        if (value && rules.minLength && value.length < rules.minLength) {
            showFieldError(input, errorElement, rules.message);
            return false;
        }
        
        // Check pattern
        if (value && rules.pattern && !rules.pattern.test(value)) {
            showFieldError(input, errorElement, rules.message);
            return false;
        }
        
        // Field is valid
        showFieldSuccess(input, errorElement);
        return true;
    }
    
    function showFieldError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function showFieldSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    function handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('✅ Form submission data:', data);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission with realistic delay
        showFormMessage('Connecting to server...', 'info');
        
        setTimeout(() => {
            showFormMessage('Message sent successfully! 🎉 Thank you for reaching out. I\'ll get back to you within 24 hours.', 'success');
            
            // Reset form and button
            form.reset();
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
            
            // Clear validation states
            formInputs.forEach(input => {
                input.classList.remove('error', 'success');
                const errorElement = document.getElementById(`${input.name}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.classList.remove('show');
                }
            });
            
            // Show success animation
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc70)';
            setTimeout(() => {
                submitBtn.style.background = '';
            }, 2000);
            
        }, 2500);
    }
    
    function showFormMessage(message, type) {
        let messageElement = document.querySelector('.form-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.classList.add('form-message');
            contactForm.appendChild(messageElement);
        }
        
        messageElement.textContent = message;
        messageElement.className = `form-message ${type} show`;
        
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                messageElement.classList.remove('show');
            }, 5000);
        }
    }
    
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// ============================================================================
// 5. PROJECT FILTERING BY TECH STACK
// ============================================================================
function initializeProjectFiltering() {
    console.log('🔍 Initializing Project Filtering...');
    
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;
    
    // Create filter buttons container
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('project-filters');
    filterContainer.innerHTML = `
        <h3>Filter by Technology:</h3>
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All Projects</button>
            <button class="filter-btn" data-filter="react">React</button>
            <button class="filter-btn" data-filter="node">Node.js</button>
            <button class="filter-btn" data-filter="python">Python</button>
            <button class="filter-btn" data-filter="ai">AI/ML</button>
            <button class="filter-btn" data-filter="healthcare">Healthcare</button>
            <button class="filter-btn" data-filter="javascript">JavaScript</button>
        </div>
    `;
    
    // Insert filter container before projects
    const projectsSection = document.querySelector('#projects .container');
    const sectionTitle = projectsSection.querySelector('.section-title');
    sectionTitle.insertAdjacentElement('afterend', filterContainer);
    
    // Get all project cards and extract their tech tags
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter);
            
            console.log(`🔍 Filtering projects by: ${filter}`);
        });
    });
    
    function filterProjects(filter) {
        projectCards.forEach((card, index) => {
            const techTags = card.querySelectorAll('.tech-tag');
            const cardTechs = Array.from(techTags).map(tag => tag.textContent.toLowerCase());
            
            let shouldShow = filter === 'all';
            
            if (!shouldShow) {
                // Check if card contains the filter technology
                shouldShow = cardTechs.some(tech => {
                    switch(filter) {
                        case 'react':
                            return tech.includes('react');
                        case 'node':
                            return tech.includes('node.js') || tech.includes('express');
                        case 'python':
                            return tech.includes('python') || tech.includes('tensorflow') || tech.includes('pytorch');
                        case 'ai':
                            return tech.includes('tensorflow') || tech.includes('pytorch') || 
                                   tech.includes('machine learning') || tech.includes('deep learning') ||
                                   tech.includes('computer vision') || tech.includes('medical imaging');
                        case 'healthcare':
                            return tech.includes('medical') || tech.includes('healthcare') || 
                                   tech.includes('biomedical') || tech.includes('dicom') || 
                                   tech.includes('fhir');
                        case 'javascript':
                            return tech.includes('javascript') || tech.includes('rest api') || 
                                   tech.includes('ajax');
                        default:
                            return tech.includes(filter);
                    }
                });
            }
            
            // Add animation delay for staggered effect
            setTimeout(() => {
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                } else {
                    card.style.animation = 'fadeOutDown 0.3s ease-out forwards';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }, index * 100);
        });
    }
}

// ============================================================================
// 6. SMOOTH SCROLLING NAVIGATION
// ============================================================================
function initializeSmoothScrolling() {
    console.log('🌊 Initializing Smooth Scrolling...');
    
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(link);
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    updateActiveNavLink(activeLink);
                }
            }
        });
    });
    
    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
}

// ============================================================================
// 7. ANIMATION ON SCROLL
// ============================================================================
function initializeAnimationOnScroll() {
    console.log('✨ Initializing Scroll Animations...');
    
    const observerOptions = {
        root: null,
        rootMargin: '-100px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.skill-bar, .project-card, .form-group');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections and key elements
    const elementsToObserve = document.querySelectorAll('section, .about-grid, .skills-section, .projects-grid, .contact-container');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

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

// Console branding
console.log(`
%c🚀 Joseph Bidias Portfolio
%cVersion: 2.0 - DOM Manipulation Enhanced
%cFeatures: Theme Toggle, Mobile Menu, Form Validation, Project Filtering, Typewriter Effect
`, 
'color: #00ff88; font-size: 16px; font-weight: bold;',
'color: #0099ff; font-size: 12px;',
'color: #888; font-size: 10px;');
