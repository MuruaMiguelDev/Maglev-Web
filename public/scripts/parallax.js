export function wireHeroParallax() {
  const hero = document.querySelector('#inicio');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const rate = window.scrollY * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }, { passive: true });
}