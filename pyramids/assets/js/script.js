// ...existing code...
document.addEventListener('DOMContentLoaded', function () {

    // Mobile Menu Toggle (guarded)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link (guarded)
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links (guarded)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        // prevent default and perform smooth scroll accounting for header offset
        e.preventDefault();

        // read header offset from CSS var (fallback to 90)
        const rootStyles = getComputedStyle(document.documentElement);
        const offsetVal = parseInt(rootStyles.getPropertyValue('--header-offset')) || 90;

        const rect = targetElement.getBoundingClientRect();
        const targetY = window.pageYOffset + rect.top - offsetVal;

        window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
});

    // Slider init (only if elements exist)
// ...existing code...
// Slider init (only if elements exist)
const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
if (slides.length) {
    const prevBtn = document.querySelector('.hero-slider .slider-control.prev');
    const nextBtn = document.querySelector('.hero-slider .slider-control.next');
    const indicators = Array.from(document.querySelectorAll('.hero-slider .indicator'));
    let current = 0;
    let interval = null;
    const delay = 5000;

    function show(index) {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        if (indicators.length) indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
        current = index;
    }

    function next() { show((current + 1) % slides.length); }
    function prev() { show((current - 1 + slides.length) % slides.length); }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAuto(); });

    if (indicators.length) {
        indicators.forEach(ind => {
            ind.addEventListener('click', () => {
                const i = Number(ind.dataset.slide || 0);
                show(i);
                restartAuto();
            });
        });
    }

    function startAuto() {
        stopAuto();
        interval = setInterval(next, delay);
    }
    function stopAuto() {
        if (interval) { clearInterval(interval); interval = null; }
    }
    function restartAuto() { stopAuto(); startAuto(); }

    const sliderEl = document.querySelector('.hero-slider');
    if (sliderEl) {
        sliderEl.addEventListener('mouseenter', stopAuto);
        sliderEl.addEventListener('mouseleave', startAuto);
    }

    // ensure first slide is visible
    show(0);
    startAuto();
}
// ...existing code...

    // Product category filter (for products.html)
    const btns = Array.from(document.querySelectorAll('.category-btn'));
    const cards = Array.from(document.querySelectorAll('.product-card'));
    if (btns.length && cards.length) {
        function showCategory(cat) {
            btns.forEach(b => {
                const isActive = b.dataset.cat === cat;
                b.classList.toggle('active', isActive);
                b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
            if (cat === 'all') {
                cards.forEach(c => c.classList.remove('hidden'));
                return;
            }
            cards.forEach(c => {
                const matches = (c.dataset.category || '').toLowerCase() === cat.toLowerCase();
                c.classList.toggle('hidden', !matches);
            });
        }
        btns.forEach(b => b.addEventListener('click', () => showCategory(b.dataset.cat)));
        const params = new URLSearchParams(location.search);
        const pre = params.get('category');
        if (pre) {
            const matchBtn = btns.find(b => b.dataset.cat.toLowerCase() === pre.toLowerCase());
            if (matchBtn) matchBtn.click();
        }
    }

    // Optional: other guarded features...
});
// ...existing code...