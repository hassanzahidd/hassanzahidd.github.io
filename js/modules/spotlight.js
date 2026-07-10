function initSpotlight() {
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

        const xOrb = (clientX / window.innerWidth - 0.5) * 40;
        const yOrb = (clientY / window.innerHeight - 0.5) * 40;

        orbs.forEach((orb, index) => {
            const factor = (index + 1) * 0.5;
            orb.style.transform = `translate(${xOrb * factor}px, ${yOrb * factor}px)`;
        });
    });
}
