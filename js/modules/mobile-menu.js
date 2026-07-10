function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });
    }

    return {
        close() {
            if (mobileMenu?.classList.contains('is-active')) {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
            }
        }
    };
}
