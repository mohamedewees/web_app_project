// Mobile Menu Toggle
        document.querySelector('.mobile-toggle').addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.toggle('active');
        });
        
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

    // ...existing code...
});