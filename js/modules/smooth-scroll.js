let scrollAnimationFrameId = null;

function getNavbarHeight() {
    return document.querySelector('header').offsetHeight;
}

function smoothScrollTo(targetPosition) {
    if (scrollAnimationFrameId) {
        cancelAnimationFrame(scrollAnimationFrameId);
    }

    document.documentElement.style.scrollBehavior = 'auto';

    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;

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
            document.documentElement.style.scrollBehavior = '';
            scrollAnimationFrameId = null;
        }
    }

    scrollAnimationFrameId = requestAnimationFrame(animation);
}

function scrollToElement(targetElement) {
    const offset = targetElement.getBoundingClientRect().top + window.scrollY - getNavbarHeight() - 16;
    smoothScrollTo(offset);
}

function initSmoothScroll({ closeMobileMenu } = {}) {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            closeMobileMenu?.();

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                scrollToElement(targetElement);
            }
        });
    });

    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            window.scrollTo(0, 0);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const offset = targetElement.getBoundingClientRect().top + window.scrollY - getNavbarHeight() - 16;
                    window.scrollTo({ top: offset, behavior: 'auto' });
                });
            });
        }
    }
}
