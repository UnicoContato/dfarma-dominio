/* ============================================================
   DFARMA — captura.html
   JavaScript isolado desta landing (não afeta o index.html).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------
       Configuração — TROQUE AQUI o número e a mensagem padrão.
       ------------------------------------------------------------ */
    const WHATSAPP_NUMBER = '5511942724668'; // formato internacional, só dígitos
    const DEFAULT_MESSAGE = 'Olá! Vim pelo site da DFARMA e gostaria de fazer um pedido.';

    const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    /* ------------------------------------------------------------
       Header: esconde ao rolar para baixo, mostra ao subir.
       ------------------------------------------------------------ */
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.classList.add('scroll-hide');
            header.classList.remove('scroll-show');
        } else {
            header.classList.remove('scroll-hide');
            header.classList.add('scroll-show');
        }
        lastScrollY = window.scrollY;
    });

    /* ------------------------------------------------------------
       Botões "Pedir no WhatsApp" (todos com data-wa-cta):
       abrem o WhatsApp com uma mensagem padrão simples.
       ------------------------------------------------------------ */
    document.querySelectorAll('[data-wa-cta]').forEach((btn) => {
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener');
        btn.setAttribute('href', waLink(DEFAULT_MESSAGE));
    });

    /* ------------------------------------------------------------
       Máscara de telefone: (11) 9XXXX-XXXX
       ------------------------------------------------------------ */
    const telInput = document.getElementById('telefone');
    if (telInput) {
        telInput.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '').slice(0, 11);
            if (v.length > 6) {
                e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
            } else if (v.length > 2) {
                e.target.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
            } else if (v.length > 0) {
                e.target.value = `(${v}`;
            } else {
                e.target.value = '';
            }
        });
    }

    /* ------------------------------------------------------------
       Formulário de captura: monta a mensagem e abre o WhatsApp.
       ------------------------------------------------------------ */
    const form = document.getElementById('lead-form');
    const errorBox = document.getElementById('form-error');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Honeypot anti-spam: se preenchido, é bot — aborta em silêncio.
            const honeypot = form.querySelector('#empresa');
            if (honeypot && honeypot.value.trim() !== '') {
                return;
            }

            const nome = form.querySelector('#nome').value.trim();
            const telefone = form.querySelector('#telefone').value.trim();
            const necessidade = form.querySelector('#necessidade').value.trim();

            // Validação básica: nome é obrigatório.
            if (!nome) {
                showError('Por favor, preencha o seu nome para começarmos.');
                form.querySelector('#nome').focus();
                return;
            }
            hideError();

            // Monta a mensagem pré-preenchida com o que foi informado.
            let msg = 'Olá! Vim pelo site da DFARMA.';
            msg += ` Meu nome é ${nome}.`;
            if (necessidade) msg += ` Preciso de: ${necessidade}.`;
            if (telefone) msg += ` Meu WhatsApp: ${telefone}.`;

            // TODO (lead/CRM): este ponto apenas INICIA a conversa no WhatsApp,
            // mas NÃO armazena o lead. Para capturar o contato de verdade,
            // envie { nome, telefone, necessidade } para uma planilha (ex.:
            // Google Apps Script / Sheets) ou um endpoint/CRM antes do window.open.
            // Ex.: fetch('SUA_URL', { method: 'POST', body: JSON.stringify({ nome, telefone, necessidade }) });

            window.open(waLink(msg), '_blank', 'noopener');
        });
    }

    function showError(message) {
        if (!errorBox) return;
        errorBox.textContent = message;
        errorBox.classList.remove('hidden');
    }
    function hideError() {
        if (!errorBox) return;
        errorBox.classList.add('hidden');
    }

    /* ------------------------------------------------------------
       Reveal das seções no scroll (mesma classe .reveal do site).
       ------------------------------------------------------------ */
    const revealEls = document.querySelectorAll('.reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        // Sem animação: mostra tudo imediatamente.
        revealEls.forEach((el) => el.classList.add('active'));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealEls.forEach((el) => observer.observe(el));
    }

    /* ------------------------------------------------------------
       Modal de Política de Privacidade (reaproveitado do site).
       ------------------------------------------------------------ */
    const modal = document.getElementById('privacy-modal');
    const privacyBtn = document.getElementById('privacy-btn');
    const closeBtn = document.getElementById('close-modal');

    if (modal && privacyBtn && closeBtn) {
        const openModal = (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        };
        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        };

        privacyBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
        });
    }
});
