/**
 * PHYA Website - Vanilla JavaScript (Vite)
 * Features: Tabbed forms, Tredicik API integration, smooth scrolling, animations
 */

import './style.css';
import { toast } from 'sonner';

// Configuration
// API uses shared Tredicik infrastructure (multi-tenant backend)
const API_BASE_URL = 'https://api-dev.tredicik.com/api/v1'; // Development/Testing
// const API_BASE_URL = 'https://api.tredicik.com/api/v1'; // Production (uncomment for launch)
// const API_BASE_URL = 'http://localhost:8080/api/v1'; // Local Development
const TENANT_DOMAIN = 'phya.co.za'; // Tenant identifier for backend

// Simple logging utility
const log = {
    info: (message, data = {}) => {
        console.log(`[PHYA] ${message}`, data);
    },
    error: (message, error, data = {}) => {
        console.error(`[PHYA ERROR] ${message}`, { error: error.message || error, ...data });
    },
    success: (message, data = {}) => {
        console.log(`[PHYA SUCCESS] ${message}`, data);
    }
};

// Console welcome message
console.log('%cWelcome to PHYA!', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
console.log('%cWe\'re building something amazing. Stay tuned!', 'color: #666; font-size: 14px;');

document.addEventListener('DOMContentLoaded', function() {
    console.log('PHYA Website Loaded!');

    // ========================================================================
    // TAB FUNCTIONALITY
    // ========================================================================

    const clientTabBtn = document.getElementById('clientTabBtn');
    const providerTabBtn = document.getElementById('providerTabBtn');
    const clientForm = document.getElementById('clientForm');
    const providerForm = document.getElementById('providerForm');

    if (clientTabBtn && providerTabBtn && clientForm && providerForm) {
        // Client tab click
        clientTabBtn.addEventListener('click', () => {
            // Update buttons
            clientTabBtn.classList.add('active', 'bg-gradient-to-r', 'from-gold', 'to-gold-light', 'text-black');
            clientTabBtn.classList.remove('bg-[#1a1a1a]', 'text-gray-400', 'border', 'border-gray-700');

            providerTabBtn.classList.remove('active', 'bg-gradient-to-r', 'from-gold', 'to-gold-light', 'text-black');
            providerTabBtn.classList.add('bg-[#1a1a1a]', 'text-gray-400', 'border', 'border-gray-700');

            // Update forms
            clientForm.classList.remove('hidden');
            clientForm.classList.add('active');
            providerForm.classList.add('hidden');
            providerForm.classList.remove('active');
        });

        // Provider tab click
        providerTabBtn.addEventListener('click', () => {
            // Update buttons
            providerTabBtn.classList.add('active', 'bg-gradient-to-r', 'from-gold', 'to-gold-light', 'text-black');
            providerTabBtn.classList.remove('bg-[#1a1a1a]', 'text-gray-400', 'border', 'border-gray-700');

            clientTabBtn.classList.remove('active', 'bg-gradient-to-r', 'from-gold', 'to-gold-light', 'text-black');
            clientTabBtn.classList.add('bg-[#1a1a1a]', 'text-gray-400', 'border', 'border-gray-700');

            // Update forms
            providerForm.classList.remove('hidden');
            providerForm.classList.add('active');
            clientForm.classList.add('hidden');
            clientForm.classList.remove('active');
        });
    }

    // ========================================================================
    // FORM SUBMISSIONS - CLIENT FORM
    // ========================================================================

    const clientFormElement = document.getElementById('clientForm');

    if (clientFormElement) {
        clientFormElement.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = clientFormElement.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            try {
                // Disable submit button
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';

                // Collect form data
                const formData = {
                    email: document.getElementById('client-email').value.trim(),
                    name: document.getElementById('client-name').value.trim(),
                    phone: document.getElementById('client-phone').value.trim() || null,
                    segment: 'client',
                    location: document.getElementById('client-city').value.trim() || null,
                    message: document.getElementById('client-message').value.trim() || null,
                    pilot_program_applicant: document.getElementById('client-pilot').checked,
                    pilot_region: document.getElementById('client-pilot').checked ? 'Gauteng' : null,
                    pilot_city: document.getElementById('client-city').value.trim() || null,
                    referral_source: 'phya.co.za_landing_page',
                    utm_source: new URLSearchParams(window.location.search).get('utm_source'),
                    utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
                    utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign')
                };

                log.info('Submitting client form', { email: formData.email, pilot: formData.pilot_program_applicant });

                // Submit to Tredicik backend
                const response = await fetch(`${API_BASE_URL}/public/waitlist?tenant_domain=${TENANT_DOMAIN}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (!response.ok) {
                    log.error('API returned error', { status: response.status, detail: result.detail });
                    throw new Error(result.detail || 'Submission failed');
                }

                if (result.success) {
                    log.success('Client waitlist entry created', { entry_id: result.entry_id, email: formData.email });
                    toast.success(result.message || 'Successfully joined the waitlist!');
                    clientFormElement.reset();
                } else {
                    log.error('Submission failed', result.message);
                    toast.error(result.message || 'Failed to join waitlist');
                }

            } catch (error) {
                log.error('Error submitting client form', error, { email: formData.email });
                toast.error('Unable to submit form. Please try again or email us directly at admin@phya.co.za');
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // ========================================================================
    // FORM SUBMISSIONS - SERVICE PROVIDER FORM
    // ========================================================================

    const providerFormElement = document.getElementById('providerForm');

    if (providerFormElement) {
        providerFormElement.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = providerFormElement.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            try {
                // Disable submit button
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting Application...';

                // Collect form data
                const formData = {
                    email: document.getElementById('provider-email').value.trim(),
                    name: document.getElementById('provider-name').value.trim(),
                    phone: document.getElementById('provider-phone').value.trim(),
                    segment: 'service_provider',
                    location: document.getElementById('provider-city').value.trim(),
                    message: document.getElementById('provider-message').value.trim() || null,
                    pilot_program_applicant: true, // Service providers default to pilot program
                    pilot_region: 'Gauteng',
                    pilot_city: document.getElementById('provider-city').value.trim(),
                    psira_number: document.getElementById('provider-psira').value.trim(),
                    psira_grade: document.getElementById('provider-grade').value,
                    years_experience: parseInt(document.getElementById('provider-experience').value),
                    primary_role: document.getElementById('provider-role').value,
                    armed_status: document.getElementById('provider-armed').value,
                    referral_source: 'phya.co.za_landing_page',
                    utm_source: new URLSearchParams(window.location.search).get('utm_source'),
                    utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
                    utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign')
                };

                log.info('Submitting service provider form', {
                    email: formData.email,
                    psira_grade: formData.psira_grade,
                    years_experience: formData.years_experience
                });

                // Submit to Tredicik backend
                const response = await fetch(`${API_BASE_URL}/public/waitlist?tenant_domain=${TENANT_DOMAIN}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (!response.ok) {
                    log.error('API returned error', { status: response.status, detail: result.detail });
                    throw new Error(result.detail || 'Submission failed');
                }

                if (result.success) {
                    log.success('Service provider application created', {
                        entry_id: result.entry_id,
                        email: formData.email,
                        psira_grade: formData.psira_grade
                    });
                    toast.success(result.message || 'Application submitted successfully!');
                    providerFormElement.reset();
                } else {
                    log.error('Submission failed', result.message);
                    toast.error(result.message || 'Failed to submit application');
                }

            } catch (error) {
                log.error('Error submitting service provider form', error, { email: formData.email });
                toast.error('Unable to submit application. Please try again or email us directly at admin@phya.co.za');
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // ========================================================================
    // NAVIGATION & UI
    // ========================================================================

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
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

    // Add loading animation complete class
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
});
