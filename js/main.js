document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal implementation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Active Navigation Link Highlighting on Scroll
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    
    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -70% 0px' // triggers when section occupies the upper-middle part of screen
    });

    sections.forEach(section => activeSectionObserver.observe(section));

    // Interactive Visuals (Orbs & Spotlight)
    const orbs = document.querySelectorAll('.bg-orb');
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        
        spotlightCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        // Background Orbs movement
        const xOrb = (clientX / window.innerWidth - 0.5) * 40;
        const yOrb = (clientY / window.innerHeight - 0.5) * 40;

        orbs.forEach((orb, index) => {
            const factor = (index + 1) * 0.5;
            orb.style.transform = `translate(${xOrb * factor}px, ${yOrb * factor}px)`;
        });
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll for all internal links
    let scrollAnimationFrameId = null;
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            // Close mobile menu on click
            if (mobileMenu && mobileMenu.classList.contains('is-active')) {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cancel any currently running scroll animation
                if (scrollAnimationFrameId) {
                    cancelAnimationFrame(scrollAnimationFrameId);
                }

                // Temporarily disable CSS smooth scroll to prevent conflict with animation
                document.documentElement.style.scrollBehavior = 'auto';

                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 800; // Snappier scroll duration (0.8 seconds)
                let startTime = null;

                // Cubic ease-in-out easing curve
                function easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

                    if (progress < 1) {
                        scrollAnimationFrameId = requestAnimationFrame(animation);
                    } else {
                        // Restore CSS smooth scroll
                        document.documentElement.style.scrollBehavior = '';
                        scrollAnimationFrameId = null;
                    }
                }

                scrollAnimationFrameId = requestAnimationFrame(animation);
            }
        });
    });

    // Scroll to Top FAB Visibility
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    }
});
