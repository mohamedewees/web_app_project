// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 90,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // slider
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
            indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
            current = index;
        }

        function next() { show((current + 1) % slides.length); }
        function prev() { show((current - 1 + slides.length) % slides.length); }

        nextBtn?.addEventListener('click', () => { next(); restartAuto(); });
        prevBtn?.addEventListener('click', () => { prev(); restartAuto(); });

        indicators.forEach(ind => {
            ind.addEventListener('click', () => {
                const i = Number(ind.dataset.slide || 0);
                show(i);
                restartAuto();
            });
        });

        function startAuto() {
            stopAuto();
            interval = setInterval(next, delay);
        }
        function stopAuto() {
            if (interval) { clearInterval(interval); interval = null; }
        }
        function restartAuto() { stopAuto(); startAuto(); }

        // pause on hover
        const sliderEl = document.querySelector('.hero-slider');
        sliderEl?.addEventListener('mouseenter', stopAuto);
        sliderEl?.addEventListener('mouseleave', startAuto);

        show(0);
        startAuto();
    }
});

// Product category filter (for products.html)
(function () {
    const btns = Array.from(document.querySelectorAll('.category-btn'));
    const cards = Array.from(document.querySelectorAll('.product-card'));

    if (!btns.length || !cards.length) return; // skip if not on products page

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

    btns.forEach(b => {
        b.addEventListener('click', () => showCategory(b.dataset.cat));
    });

    // read optional ?category= param to pre-filter
    const params = new URLSearchParams(location.search);
    const pre = params.get('category');
    if (pre) {
        const matchBtn = btns.find(b => b.dataset.cat.toLowerCase() === pre.toLowerCase());
        if (matchBtn) matchBtn.click();
    }
})();