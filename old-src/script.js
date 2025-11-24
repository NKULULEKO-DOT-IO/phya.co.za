/**
 * PHYA Website - Custom JavaScript
 * Features: Smooth scrolling, form validation, animations, and interactive elements
 */

$(document).ready(function() {
    console.log('PHYA Website Loaded!');

    // Smooth scrolling for navigation links
    $('.nav-links a, .cta-button').on('click', function(e) {
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Header scroll effect
    let lastScroll = 0;
    $(window).on('scroll', function() {
        const currentScroll = $(this).scrollTop();

        if (currentScroll > 100) {
            $('.header-custom').css({
                'padding': '0.5rem 0',
                'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.2)'
            });
        } else {
            $('.header-custom').css({
                'padding': '1rem 0',
                'box-shadow': '0 2px 10px rgba(0, 0, 0, 0.1)'
            });
        }

        lastScroll = currentScroll;
    });

    // Fade in elements on scroll
    function fadeInOnScroll() {
        $('.feature-card').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('fade-in');
            }
        });
    }

    $(window).on('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Initial check

    // Form validation and submission
    $('#waitlistForm').on('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();

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
        $('.submit-button').prop('disabled', true).text('Joining...');

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
                $('.submit-button').prop('disabled', false).text('Join Waiting List');
                return;
            }

            // Add new entry
            waitlist.push(waitlistData);
            localStorage.setItem('phya_waitlist', JSON.stringify(waitlist));

            // Show success message
            showMessage('🎉 Success! You\'re on the waiting list. We\'ll be in touch soon!', 'success');

            // Reset form
            $('#waitlistForm')[0].reset();

            // Re-enable button
            $('.submit-button').prop('disabled', false).text('Join Waiting List');

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
        const $messageDiv = $('#formMessage');
        $messageDiv
            .removeClass('success error')
            .addClass(type)
            .text(message)
            .fadeIn();

        // Hide message after 5 seconds
        setTimeout(function() {
            $messageDiv.fadeOut();
        }, 5000);
    }

    // Input focus effects
    $('.form-group input').on('focus', function() {
        $(this).parent().addClass('focused');
    });

    $('.form-group input').on('blur', function() {
        $(this).parent().removeClass('focused');
    });

    // Animated counter for waitlist size (if you want to display it)
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

    $(document).on('keydown', function(e) {
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
        $('body').addClass('party-mode');
        showMessage('🎊 You found the secret! You\'re getting VIP access!', 'success');

        // Add some fun animations
        $('.hero-section').css({
            'animation': 'rainbow 3s infinite'
        });

        setTimeout(function() {
            $('body').removeClass('party-mode');
            $('.hero-section').css('animation', '');
        }, 5000);
    }

    // Parallax effect for hero section
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        $('.hero-section::before').css('transform', `translateY(${scrolled * 0.5}px)`);
    });

    // Add loading animation complete class
    setTimeout(function() {
        $('body').addClass('loaded');
    }, 100);
});

// Console welcome message
console.log('%cWelcome to PHYA!', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
console.log('%cWe\'re building something amazing. Stay tuned!', 'color: #666; font-size: 14px;');
