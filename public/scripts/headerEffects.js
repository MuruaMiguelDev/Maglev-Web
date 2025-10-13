export function wireHeaderColor() {
  const header = document.querySelector('header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 100) {
      header.classList.add('bg-white/98');
      header.classList.remove('bg-white/95');
    } else {
      header.classList.add('bg-white/95');
      header.classList.remove('bg-white/98');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}