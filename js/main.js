// Prevents the browser from jumping to a saved scroll position on reload,
// which conflicts with the custom scroll animation.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function initSite() {
    initReveal();
    initNavHighlight();
    initSpotlight();

    const mobileMenu = initMobileMenu();
    initSmoothScroll({ closeMobileMenu: mobileMenu.close });
    initScrollToTop();
    initEmailCopy();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
} else {
    initSite();
}
