export function wireCallButtons(phone = '+5493513418294') {
  document.querySelectorAll('button, a').forEach(el => {
    const text = (el.textContent || '').trim();
    if (/Llamar Ahora/i.test(text)) {
      el.addEventListener('click', () => {
        window.location.href = `tel:${phone}`;
      });
    }
  });
}