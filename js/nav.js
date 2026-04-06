const NAV_LINKS = [
    { label: 'Home', href: '/index.html' },
    { label: 'Media', href: '/media.html' },
    { label: 'Teams', href: '/teams.html' },
    { label: 'League History', href: '/league-history.html' },
    { label: 'Record Room', href: '/record-room.html' },
    { label: 'Rivalries', href: '/rivalries.html' },
    { label: 'Rulebook', href: '/rulebook.html' }
];

function initNav() {
    const currentPath = window.location.pathname;

    // Build nav HTML
    const navHTML = `
        <nav class="nav">
            <div class="nav-container">
                <a href="/index.html" class="nav-brand">JG&FF</a>
                <ul class="nav-links">
                    ${NAV_LINKS.map(link => `
                        <li>
                            <a href="${link.href}" 
                               class="${isActive(currentPath, link.href) ? 'active' : ''}">
                                ${link.label}
                            </a>
                        </li>
                    `).join('')}
                </ul>
                <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
        <div class="nav-mobile" id="mobileMenu">
            ${NAV_LINKS.map(link => `
                <a href="${link.href}"
                   class="${isActive(currentPath, link.href) ? 'active' : ''}">
                    ${link.label}
                </a>
            `).join('')}
        </div>
    `;

    // Inject nav into page
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        }
    });
}

function isActive(currentPath, linkHref) {
    if (linkHref === '/index.html') {
        return currentPath === '/' || currentPath === '/index.html';
    }
    return currentPath.includes(linkHref.replace('.html', ''));
}


// ── Scroll To Top ──
function initScrollTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Page Transition Links ──
function initPageTransitions() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        if (!link.href) return;
        if (link.target === '_blank') return;
        if (link.href.startsWith('mailto:')) return;
        if (link.href.includes('#')) return;

        // Only intercept same-origin links
        if (!link.href.startsWith(window.location.origin)) return;

        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(8px)';
        document.body.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

        setTimeout(() => {
            window.location.href = link.href;
        }, 200);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollTop();
    initPageTransitions();
});
