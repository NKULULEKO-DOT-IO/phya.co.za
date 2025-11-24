/**
 * PHYA Website - Vanilla JavaScript (Vite)
 * Features: Smooth scrolling, form validation, animations, and interactive elements
 */

import './style.css';

// Console welcome message
console.log('%cWelcome to PHYA!', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
console.log('%cWe\'re building something amazing. Stay tuned!', 'color: #666; font-size: 14px;');

document.addEventListener('DOMContentLoaded', function() {
    console.log('PHYA Website Loaded!');

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .cta-button');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            if (hash && hash.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(hash);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    // Update URL without jump
                    setTimeout(() => {
                        window.history.pushState(null, null, hash);
                    }, 800);
                }
            }
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header-custom');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Fade in elements on scroll
    function fadeInOnScroll() {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            const viewportHeight = window.innerHeight;

            if (cardBottom > 0 && cardTop < viewportHeight) {
                card.classList.add('fade-in');
            }
        });
    }

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Initial check

    // Form validation and submission
    const waitlistForm = document.getElementById('waitlistForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = waitlistForm.querySelector('.submit-button');

    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();

        // Basic validation
        if (name === '') {
            showMessage('Please enter your name', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Joining...';

        // Simulate form submission (replace with actual API call)
        setTimeout(function() {
            // Store in localStorage for now
            const waitlistData = {
                name: name,
                email: email,
                phone: phone,
                timestamp: new Date().toISOString()
            };

            // Get existing waitlist or create new array
            let waitlist = JSON.parse(localStorage.getItem('phya_waitlist')) || [];

            // Check if email already exists
            const emailExists = waitlist.some(entry => entry.email === email);

            if (emailExists) {
                showMessage('This email is already on the waiting list!', 'error');
                submitButton.disabled = false;
                submitButton.textContent = 'Join Waiting List';
                return;
            }

            // Add new entry
            waitlist.push(waitlistData);
            localStorage.setItem('phya_waitlist', JSON.stringify(waitlist));

            // Show success message
            showMessage('🎉 Success! You\'re on the waiting list. We\'ll be in touch soon!', 'success');

            // Reset form
            waitlistForm.reset();

            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = 'Join Waiting List';

            // Log for development
            console.log('Waitlist entry added:', waitlistData);
            console.log('Total entries:', waitlist.length);

        }, 1500);
    });

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show message helper
    function showMessage(message, type) {
        formMessage.className = 'form-message';
        formMessage.classList.add(type);
        formMessage.textContent = message;
        formMessage.style.display = 'block';

        // Hide message after 5 seconds
        setTimeout(function() {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // Input focus effects
    const formInputs = document.querySelectorAll('.form-group input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Get waitlist count
    function getWaitlistCount() {
        const waitlist = JSON.parse(localStorage.getItem('phya_waitlist')) || [];
        return waitlist.length;
    }

    // Optional: Display waitlist count
    const waitlistCount = getWaitlistCount();
    if (waitlistCount > 0) {
        console.log(`Current waitlist size: ${waitlistCount} members`);
    }

    // Easter egg: Konami code
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        document.body.classList.add('party-mode');
        showMessage('🎊 You found the secret! You\'re getting VIP access!', 'success');

        // Add some fun animations
        const heroSection = document.querySelector('.hero-section');
        heroSection.style.animation = 'rainbow 3s infinite';

        setTimeout(function() {
            document.body.classList.remove('party-mode');
            heroSection.style.animation = '';
        }, 5000);
    }

    // Add loading animation complete class
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on links
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Header scroll shadow and backdrop blur effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const heroSection = document.getElementById('home');
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;

        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }

        // Remove backdrop blur when hero section is fully hidden
        if (window.scrollY >= heroHeight) {
            header.classList.remove('backdrop-blur-md');
            header.classList.add('bg-[#212121]');
        } else {
            header.classList.add('backdrop-blur-md');
            header.classList.remove('bg-[#212121]');
        }
    });

    // Screenshots Carousel Functionality
    const screenshotsContainer = document.getElementById('screenshots-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (screenshotsContainer && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            screenshotsContainer.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            screenshotsContainer.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }

    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((question) => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('svg');

            // Toggle answer visibility
            if (answer.classList.contains('hidden')) {
                // Close all other answers
                document.querySelectorAll('.faq-answer').forEach((ans) => {
                    ans.classList.add('hidden');
                });
                document.querySelectorAll('.faq-question svg').forEach((svg) => {
                    svg.classList.remove('rotate-180');
                });
                document.querySelectorAll('.faq-question span').forEach((span) => {
                    span.classList.remove('text-gold');
                    span.classList.add('text-white');
                });

                // Open clicked answer
                answer.classList.remove('hidden');
                icon.classList.add('rotate-180');
                question.querySelector('span').classList.remove('text-white');
                question.querySelector('span').classList.add('text-gold');
            } else {
                answer.classList.add('hidden');
                icon.classList.remove('rotate-180');
                question.querySelector('span').classList.remove('text-gold');
                question.querySelector('span').classList.add('text-white');
            }
        });
    });
});
