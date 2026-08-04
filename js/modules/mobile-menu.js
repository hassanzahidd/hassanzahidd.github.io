function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpening = !mobileMenu.classList.contains('is-active');
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open', isOpening);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('is-active') && 
                !navMenu.contains(e.target) && 
                !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking a nav link (for single-page navigation)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    return {
        close() {
            if (mobileMenu?.classList.contains('is-active')) {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    };
}
