function animateCounter(el, target, duration = 2500) {
  let start = 0;
  const increment = target / (duration / 16);
  const step = () => {
    start += increment;
    if (start < target) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  };
  step();
}

export function wireCounters() {
  const section = document.getElementById('stats-section');
  if (!section) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.querySelectorAll('.counter').forEach(c => {
          const target = parseInt(c.getAttribute('data-target') || '0', 10);
          animateCounter(c, target);
        });
        io.unobserve(section);
      }
    });
  }, { threshold: 0.3 });
  io.observe(section);
}