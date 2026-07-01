/* ============================================================
   DFARMA — Google Ads / Analytics (tag central das 3 páginas)
   ------------------------------------------------------------
   COMO ATIVAR: cole abaixo os 2 códigos que o Google Ads te dá
   ao criar a conversão "Contato" (clique no WhatsApp):

     1) GOOGLE_ADS_ID ......... o ID da tag, ex.: 'AW-123456789'
     2) CONVERSAO_WHATSAPP .... o "send_to" do snippet de conversão,
        ex.: 'AW-123456789/AbC-D_efGh12_34'  (ID/RÓTULO)

   (Opcional) GA4_ID .......... o Google Analytics, ex.: 'G-XXXXXXXXXX'

   Enquanto os valores estiverem com "XXXX", NADA é carregado
   (sem rastreamento, sem cookies, sem erro). Assim que você colar
   os códigos reais, o site passa a contar como conversão TODO
   clique que leva ao WhatsApp (formulário, botões e finalizar pedido).
   ============================================================ */

(function () {
  // ====== COLE SEUS CÓDIGOS AQUI ======
  var GOOGLE_ADS_ID      = 'AW-18269119731';
  var CONVERSAO_WHATSAPP = 'AW-18269119731/xJgyCM_WuMgcEPPJsodE'; // conversão "Chamada WhatsApp"
  var GA4_ID             = ''; // opcional: 'G-XXXXXXXXXX'
  // =====================================

  var adsOk = GOOGLE_ADS_ID.indexOf('AW-') === 0 && GOOGLE_ADS_ID !== 'AW-XXXXXXXXXX';
  var ga4Ok = GA4_ID.indexOf('G-') === 0;

  // Carrega a tag do Google (gtag.js) só se estiver configurado.
  if (adsOk || ga4Ok) {
    var primeiro = adsOk ? GOOGLE_ADS_ID : GA4_ID;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + primeiro;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    if (adsOk) gtag('config', GOOGLE_ADS_ID);
    if (ga4Ok) gtag('config', GA4_ID);
  }

  // Dispara a conversão "Contato" (clique no WhatsApp).
  function conversaoWhatsApp() {
    if (!adsOk || typeof window.gtag !== 'function') return;
    if (CONVERSAO_WHATSAPP.indexOf('/') === -1 || CONVERSAO_WHATSAPP.indexOf('XXXX') !== -1) return;
    window.gtag('event', 'conversion', { send_to: CONVERSAO_WHATSAPP, value: 1.0, currency: 'BRL' });
  }
  // Disponível para uso manual, se precisar.
  window.dfarmaConversao = conversaoWhatsApp;

  /* Conta como conversão QUALQUER clique que leve ao WhatsApp:
     - links wa.me (botões "Pedir no WhatsApp" das 3 páginas)
     - botões marcados com data-wa-cta
     - "Finalizar no WhatsApp" da loja (#cart-checkout)
     - enviar do formulário da captura (#lead-form)
     O WhatsApp abre em nova aba, então o disparo tem tempo de
     registrar (não atrasa nem bloqueia a abertura). */
  document.addEventListener('click', function (e) {
    var alvo = e.target.closest('a[href*="wa.me"], [data-wa-cta], #cart-checkout, #lead-form [type="submit"]');
    if (alvo) conversaoWhatsApp();
  }, true);
})();
