// Simple slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let idx = 0;

function show(i) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[i].classList.add('active');
  dots[i].classList.add('active');
  idx = i;
}

dots.forEach(d => {
  d.addEventListener('click', () => show(parseInt(d.dataset.slide, 10)));
});

setInterval(() => show((idx + 1) % slides.length), 6000);