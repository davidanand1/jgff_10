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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initNav);