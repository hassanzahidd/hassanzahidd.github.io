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

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
