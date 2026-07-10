function initEmailCopy() {
    const emailCopyCard = document.getElementById('email-copy-card');
    const copyToast = document.getElementById('copy-toast');
    let copyToastTimeoutId = null;

    async function copyEmailAddress() {
        const email = emailCopyCard?.querySelector('p')?.textContent?.trim();
        if (!email) return;

        try {
            await navigator.clipboard.writeText(email);
        } catch {
            const textarea = document.createElement('textarea');
            textarea.value = email;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }

        if (copyToast) {
            if (copyToastTimeoutId) {
                clearTimeout(copyToastTimeoutId);
            }
            copyToast.classList.add('show');
            copyToastTimeoutId = setTimeout(() => {
                copyToast.classList.remove('show');
                copyToastTimeoutId = null;
            }, 2500);
        }
    }

    if (!emailCopyCard) return;

    emailCopyCard.addEventListener('click', copyEmailAddress);
    emailCopyCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            copyEmailAddress();
        }
    });
}
