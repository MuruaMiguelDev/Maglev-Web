
const url = 'https://script.google.com/macros/s/AKfycbx6UVWOrDgX1aZWFIrVRW0ijeWWD1nAj1iBxVLRKzxGYn3rL9YQ8FR0qEn5FEYU3AyXCQ/exec'

export function wireContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('[type="submit"]');

  // ---- Modal helpers ----
  let modalEl = null;

  function openModal(status = 'loading', message = 'Enviando…') {
    closeModal(); // por si ya existe

    modalEl = document.createElement('div');
    modalEl.className = 'custom-modal';
    modalEl.innerHTML = `
      <div class="modal-content" role="dialog" aria-live="polite" aria-modal="true">
        <div class="status-area">
          <div class="spinner" aria-hidden="${status === 'loading' ? 'false' : 'true'}"></div>

          <!-- Ícono éxito -->
          <svg class="icon success" viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
            <path d="M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.5-1.5z"></path>
          </svg>

          <!-- Ícono error -->
          <svg class="icon error" viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
            <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 15h-2v-2h2zm0-4h-2V7h2z"></path>
          </svg>
        </div>

        <p class="message">${message}</p>
        <button id="close-modal" type="button" class="modal-btn hidden">Cerrar</button>
      </div>
    `;
    document.body.appendChild(modalEl);
    updateModal(status, message);

    modalEl.querySelector('#close-modal').addEventListener('click', closeModal);
  }

  function updateModal(status, message) {
    if (!modalEl) return;
    const content = modalEl.querySelector('.modal-content');
    const msg = modalEl.querySelector('.message');
    const spinner = modalEl.querySelector('.spinner');
    const okIcon = modalEl.querySelector('.icon.success');
    const errIcon = modalEl.querySelector('.icon.error');
    const closeBtn = modalEl.querySelector('#close-modal');

    msg.textContent = message;

    spinner.style.display = status === 'loading' ? 'inline-block' : 'none';
    okIcon.style.display = status === 'success' ? 'inline-block' : 'none';
    errIcon.style.display = status === 'error' ? 'inline-block' : 'none';

    content.classList.toggle('is-success', status === 'success');
    content.classList.toggle('is-error', status === 'error');

    if (status === 'loading') {
      closeBtn.classList.add('hidden');
    } else {
      closeBtn.classList.remove('hidden');
      // Llevar foco al botón para accesibilidad
      setTimeout(() => closeBtn.focus(), 0);
    }
  }

  function closeModal() {
    if (modalEl) {
      modalEl.remove();
      modalEl = null;
    }
  }

  // ---- Estilos del modal (inyectados una sola vez) ----
  if (!document.getElementById('custom-modal-styles')) {
    const style = document.createElement('style');
    style.id = 'custom-modal-styles';
    style.textContent = `
      .custom-modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn .2s ease;
      }
      .modal-content {
        background: #fff;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        text-align: center;
        max-width: 360px;
        width: calc(100% - 2rem);
        box-shadow: 0 10px 30px rgba(0,0,0,.15);
        animation: scaleUp .18s ease;
      }
      .status-area {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: .5rem;
      }
      .spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(0,0,0,.15);
        border-top-color: rgba(0,0,0,.7);
        border-radius: 50%;
        animation: spin .9s linear infinite;
      }
      .icon { display: none; fill: currentColor; }
      .icon.success { color: #2e7d32; }
      .icon.error   { color: #c62828; }

      .message { margin: .25rem 0 .75rem 0; font-weight: 600; }

      .modal-btn {
        background: #111;
        color: #fff;
        border: none;
        padding: .55rem 1rem;
        border-radius: 8px;
        cursor: pointer;
      }
      .modal-btn:hover { background: #000; }
      .hidden { display: none; }

      .modal-content.is-success .message { color: #2e7d32; }
      .modal-content.is-error   .message { color: #c62828; }

      @keyframes fadeIn { from {opacity: 0} to {opacity: 1} }
      @keyframes scaleUp { from {transform: scale(.96)} to {transform: scale(1)} }
      @keyframes spin { to { transform: rotate(360deg) } }
    `;
    document.head.appendChild(style);
  }

  // ---- Envío del formulario ----
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Deshabilitar submit para evitar dobles envíos
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent || '';
      submitBtn.textContent = 'Enviando…';
    }

    openModal('loading', 'Enviando…');

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: new FormData(form),
      });

      if (response.ok) {
        updateModal('success', 'Mensaje enviado 🎉');
        form.reset();
        // Cierre automático opcional (3 s)
        setTimeout(() => closeModal(), 3000);
      } else {
        updateModal('error', 'No se pudo enviar. Intenta nuevamente.');
      }
    } catch (err) {
      console.error('ERROR: ', err?.message || err);
      updateModal('error', 'Ocurrió un error de conexión. Intenta nuevamente.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText || 'Enviar';
      }
    }
  });
}