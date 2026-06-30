/* ============================================================
   DFARMA — loja.html
   Loja online com cesta e checkout via WhatsApp (sem backend).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------
       CONFIGURAÇÃO — troque o número aqui.
       ------------------------------------------------------------ */
    const WHATSAPP_NUMBER = '5511942724668';
    const DEFAULT_MESSAGE = 'Olá! Vim pela loja online da DFARMA e gostaria de fazer um pedido.';
    const DESCONTO_PCT = 0.05; // 5% Bolsa Família / famílias atípicas

    /* ============================================================
       CATÁLOGO — preços informados pelo dono (jun/2026).
       Cada produto: { id, nome, categoria, unidade, preco,
         precoAntigo(opcional, p/ mostrar % de desconto),
         avaliacao(opcional 0-5), avaliacoes(opcional),
         imagem(opcional: 'img/arquivo.jpg') }.
       Se 'imagem' existir, mostra a foto; senão, uma ilustração da
       categoria. Categorias: medicamentos | fraldas | infantil |
       beleza | vitaminas.
       ============================================================ */
    const CATALOGO = [
        // Medicamentos
        { id: 'losartana',        nome: 'Losartana 50mg',                          categoria: 'medicamentos', unidade: 'cartela',        preco: 4.99 },
        { id: 'dipirona-gotas',   nome: 'Dipirona gotas',                          categoria: 'medicamentos', unidade: 'frasco',         preco: 5.99 },
        { id: 'loratadina-comp',  nome: 'Loratadina comprimido',                   categoria: 'medicamentos', unidade: 'cartela',        preco: 9.99 },
        { id: 'cimegripe',        nome: 'Cimegripe',                               categoria: 'medicamentos', unidade: 'cartela',        preco: 14.99 },
        { id: 'loratadina-xpe',   nome: 'Loratadina xarope',                       categoria: 'medicamentos', unidade: 'frasco',         preco: 14.99 },
        { id: 'dipirona-1g',      nome: 'Dipirona 1g',                             categoria: 'medicamentos', unidade: 'cartela',        preco: 14.99 },
        { id: 'nistatina',        nome: 'Pomada Nistatina + Zinco',                categoria: 'medicamentos', unidade: 'bisnaga',        preco: 14.99 },
        { id: 'naridrin',         nome: 'Naridrin',                                categoria: 'medicamentos', unidade: 'frasco',         preco: 17.99 },
        { id: 'narix',            nome: 'Narix (3 unidades)',                      categoria: 'medicamentos', unidade: '3 unidades',     preco: 17.99 },
        { id: 'neosoro',          nome: 'Neosoro (3 unidades)',                    categoria: 'medicamentos', unidade: '3 unidades',     preco: 19.99 },
        { id: 'ambroximel',       nome: 'Xarope Ambroximel (adulto e infantil)',   categoria: 'medicamentos', unidade: 'frasco',         preco: 24.99 },
        { id: 'expec',            nome: 'Expec (xarope expectorante)',             categoria: 'medicamentos', unidade: 'frasco 120ml',   preco: 27.99 },
        { id: 'inalador',         nome: 'Inalador G-Tech Ultrassônico',            categoria: 'medicamentos', unidade: '1 unidade',      preco: 189.90 },
        // Fraldas
        { id: 'baby-sec',         nome: 'Fralda Baby Sec',                         categoria: 'fraldas',      unidade: 'pacote',         preco: 35.99 },
        { id: 'pompom',           nome: 'Fralda Pom Pom',                          categoria: 'fraldas',      unidade: 'pacote grande',  preco: 47.99 },
        { id: 'personal',         nome: 'Fralda Personal',                         categoria: 'fraldas',      unidade: 'pacote',         preco: 69.90 },
        { id: 'personalidade',    nome: 'Fralda Personalidade',                    categoria: 'fraldas',      unidade: 'pacote',         preco: 52.99 },
        { id: 'toquinho',         nome: 'Fralda Toquinho',                         categoria: 'fraldas',      unidade: 'pacote',         preco: 52.99 },
        { id: 'huggies-grande',   nome: 'Fralda Huggies (azul) — pacote grande',   categoria: 'fraldas',      unidade: 'pacote grande',  preco: 79.90 },
        { id: 'huggies-pequeno',  nome: 'Fralda Huggies (azul) — pacote pequeno',  categoria: 'fraldas',      unidade: 'pacote pequeno', preco: 34.99 },
        // Mãe & Bebê (leites e infantil)
        { id: 'aptamil',          nome: 'Leite Aptamil',                           categoria: 'infantil',     unidade: 'lata 800g',      preco: 67.99 },
        { id: 'nan',              nome: 'Leite Nan',                               categoria: 'infantil',     unidade: 'lata 800g',      preco: 74.99 },
        { id: 'nestogeno',        nome: 'Leite Nestogeno',                         categoria: 'infantil',     unidade: 'lata 800g',      preco: 58.99 },
        { id: 'ninho-fases',      nome: 'Leite Ninho Fases',                       categoria: 'infantil',     unidade: 'lata 800g',      preco: 49.99 },
        { id: 'ninho-integral',   nome: 'Leite Ninho Integral',                    categoria: 'infantil',     unidade: 'lata 380g',      preco: 24.99 },
        { id: 'ninho-inst',       nome: 'Leite Ninho Instantâneo',                 categoria: 'infantil',     unidade: 'lata 380g',      preco: 24.99 },
        { id: 'mucilon',          nome: 'Mucilon',                                 categoria: 'infantil',     unidade: 'caixa',          preco: 12.99 },
        // Beleza (tintas de cabelo e perfumaria)
        { id: 'tinta-maxton',     nome: 'Tinta Maxton',                            categoria: 'beleza',       unidade: 'cada',           preco: 14.99 },
        { id: 'tinta-corton',     nome: 'Tinta Cor & Ton',                         categoria: 'beleza',       unidade: 'cada',           preco: 15.99 },
        { id: 'biocolor',         nome: 'Tinta Biocolor',                          categoria: 'beleza',       unidade: 'cada',           preco: 15.99 },
        { id: 'tinta-salonline',  nome: 'Tinta Salon Line',                        categoria: 'beleza',       unidade: 'cada',           preco: 19.99 },
        { id: 'tinta-koleston',   nome: 'Tinta Koleston',                          categoria: 'beleza',       unidade: 'cada',           preco: 24.99 },
        { id: 'tinta-imedia',     nome: 'Tinta Imédia',                            categoria: 'beleza',       unidade: 'cada',           preco: 29.99 },
        { id: 'lake-charming',    nome: 'Charming Hair Spray (fixador)',           categoria: 'beleza',       unidade: 'cada',           preco: 38.90 },
        // Vitaminas
        { id: 'lavitan-az',       nome: 'Lavitan A-Z',                             categoria: 'vitaminas',    unidade: 'cada',           preco: 29.99 },
    ];

    /* ============================================================
       BANNERS — área de destaque (carrossel).
       --------------------------------------------------------------
       PARA USAR IMAGEM (recomendado): adicione 'imagem' ao banner.
       Tamanho recomendado: 1600 x 500 px (proporção ~3:1), JPG/WebP
       até ~300 KB, com o conteúdo importante no CENTRO (as bordas
       podem ser cortadas conforme a tela). Opcional: 'imagemMobile'
       (ex.: 1080 x 1080 px) para uma versão só do celular, e 'target'
       (para onde o banner leva ao ser clicado) e 'alt' (descrição).
       Exemplo:
         { imagem: 'img/banner-1.jpg', imagemMobile: 'img/banner-1-mobile.jpg',
           target: '#produtos', alt: 'Promoção de inverno' }
       Se a imagem não carregar, aparece o banner colorido de texto abaixo.
       Para escalar no futuro (marketplace), é só acrescentar mais itens.
       ============================================================ */
    const BANNERS = [
        { bg: 'bg-primary',     text: 'text-white',      titulo: 'Sua saúde é nossa prioridade', sub: 'Monte sua cesta e finalize pelo WhatsApp.',          cta: 'Ver produtos',   target: '#produtos',  ctaBg: 'bg-white',   ctaText: 'text-primary', cross: true },
        { bg: 'bg-secondary',   text: 'text-white',      titulo: '5% de desconto no Bolsa Família', sub: 'E para famílias atípicas, no uso contínuo de medicamentos.', target: '#beneficios', alt: '5% de desconto para Bolsa Família e famílias atípicas', imagem: 'img/banner-bolsa-familia.jpg', imagemMobile: 'img/banner-bolsa-familia-mobile.jpg' },
        { bg: 'bg-primary', text: 'text-white', titulo: 'Entrega grátis em Caieiras', sub: 'Atendemos toda a região com agilidade.', target: '#produtos', alt: 'Entregador entregando um pedido da farmácia', imagem: 'img/banner-entrega-gratis.jpg', imagemMobile: 'img/banner-entrega-gratis-mobile.jpg' },
    ];

    /* ============================================================
       DEPOIMENTOS — avaliações reais do Google (perfil DFARMA CAIEIRAS,
       4,8★ / 26 avaliações). Para adicionar/trocar: { nome, texto, nota }.
       ============================================================ */
    const DEPOIMENTOS = [
        { nome: 'Leticia Santos Mollinari', texto: 'Bom atendimento, entrega rápida e preço justo.', nota: 5 },
        { nome: 'Cliente do Google',        texto: 'Muito bom atendimento e qualidade dos produtos.', nota: 5 },
        { nome: 'Cliente do Google',        texto: 'Boas condições de pagamento, entrega rápida.', nota: 5 },
    ];

    /* Ícones SVG por categoria (placeholder quando não há foto) */
    const ICONES = {
        medicamentos: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.22 11.29l7.07-7.07a5 5 0 117.07 7.07l-7.07 7.07a5 5 0 11-7.07-7.07zm8.49-2.83l-5.66 5.66 2.83 2.83 5.66-5.66-2.83-2.83z"/></svg>',
        fraldas:      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v4a9 9 0 01-18 0V5zm2 2v2a7 7 0 0014 0V7H5zm4 4h6a3 3 0 01-6 0z"/></svg>',
        infantil:     '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 2h6v2l-1 1v1.2c1.8.9 3 2.7 3 4.8v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8c0-2.1 1.2-3.9 3-4.8V5L9 4V2zm0 9v2h6v-2H9z"/></svg>',
        beleza:       '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 5.6L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.4z"/></svg>',
        higiene:      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/></svg>',
        vitaminas:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4a5 5 0 015 5v6a5 5 0 01-10 0V9a5 5 0 015-5zm10 4a3 3 0 013 3v3a3 3 0 01-6 0v-3a3 3 0 013-3z"/></svg>',
    };

    /* Ilustrações maiores por categoria (placeholder de FOTO, feitas à mão,
       sem direito autoral). Quando o produto tiver 'imagem', a foto aparece
       no lugar destas. */
    const ILUSTRACOES = {
        medicamentos: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-40 30 28)"><rect x="12" y="19" width="36" height="18" rx="9" fill="#fff" stroke="#DC2626" stroke-width="3"/><path d="M30 19h9a9 9 0 0 1 0 18h-9z" fill="#DC2626"/></g><circle cx="45" cy="45" r="11" fill="#F3F4F6" stroke="#1E3A8A" stroke-width="3"/><path d="M45 39v12M39 45h12" stroke="#1E3A8A" stroke-width="3" stroke-linecap="round"/></svg>',
        fraldas:      '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 18h48v6c0 17-13 27-24 27S8 41 8 24z" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="3" stroke-linejoin="round"/><path d="M9 19c10 7 36 7 46 0" stroke="#1E3A8A" stroke-width="3" fill="none"/><circle cx="32" cy="33" r="5" fill="#F59E0B"/></svg>',
        infantil:     '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="12" width="28" height="8" rx="2" fill="#1E3A8A"/><rect x="16" y="20" width="32" height="34" rx="4" fill="#fff" stroke="#1E3A8A" stroke-width="3"/><rect x="21" y="30" width="22" height="16" rx="2" fill="#DBEAFE"/><circle cx="32" cy="38" r="5" fill="#F59E0B"/></svg>',
        beleza:       '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="23" y="9" width="14" height="9" rx="2" fill="#1E3A8A"/><rect x="20" y="18" width="20" height="37" rx="6" fill="#fff" stroke="#DC2626" stroke-width="3"/><path d="M25 31h10" stroke="#DC2626" stroke-width="3" stroke-linecap="round"/><path d="M48 15l2.2 5.3 5.3 2.2-5.3 2.2L48 30l-2.2-5.3L40.5 22.5l5.3-2.2z" fill="#F59E0B"/></svg>',
        higiene:      '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="27" y="8" width="10" height="9" rx="1.5" fill="#1E3A8A"/><rect x="19" y="17" width="26" height="39" rx="7" fill="#E0F2FE" stroke="#1E3A8A" stroke-width="3"/><path d="M32 28c4.5 5.5 7 9 7 12.5a7 7 0 0 1-14 0C25 37 27.5 33.5 32 28z" fill="#38BDF8"/></svg>',
        vitaminas:    '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="12" width="28" height="9" rx="2" fill="#F59E0B"/><rect x="15" y="21" width="34" height="34" rx="6" fill="#fff" stroke="#F59E0B" stroke-width="3"/><rect x="21" y="30" width="22" height="16" rx="2" fill="#FEF3C7"/><circle cx="32" cy="38" r="4.5" fill="#F59E0B"/></svg>',
        xarope:       '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="23" y="8" width="14" height="7" rx="1.5" fill="#1E3A8A"/><rect x="20" y="15" width="20" height="41" rx="5" fill="#fff" stroke="#DC2626" stroke-width="3"/><rect x="20" y="30" width="20" height="14" fill="#FCEBEB"/><path d="M24 30h12" stroke="#DC2626" stroke-width="2"/><path d="M44 41h11l-2 13h-7z" fill="#fff" stroke="#1E3A8A" stroke-width="2.5"/></svg>',
        gotas:        '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="26" y="6" width="12" height="6" rx="1.5" fill="#1E3A8A"/><rect x="28" y="12" width="8" height="6" fill="#1E3A8A"/><rect x="20" y="18" width="24" height="38" rx="6" fill="#fff" stroke="#DC2626" stroke-width="3"/><circle cx="32" cy="38" r="7" fill="#FCEBEB"/><path d="M32 31c2.2 3.2 3.3 4.8 3.3 6.3a3.3 3.3 0 0 1-6.6 0c0-1.5 1.1-3.1 3.3-6.3z" fill="#DC2626"/></svg>',
        pomada:       '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="27" y="8" width="10" height="7" rx="1.5" fill="#1E3A8A"/><path d="M22 16h20v30a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4z" fill="#fff" stroke="#DC2626" stroke-width="3"/><path d="M22 49h20l-3 6H25z" fill="#DC2626"/><path d="M27 26h10" stroke="#DC2626" stroke-width="3" stroke-linecap="round"/></svg>',
        spray:        '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 6h8v6h-8z" fill="#1E3A8A"/><path d="M23 12h12v5l-2 4h-8l-2-4z" fill="#1E3A8A"/><rect x="22" y="25" width="18" height="31" rx="5" fill="#E0F2FE" stroke="#1E3A8A" stroke-width="3"/><path d="M37 8l8-2M37 11h8M37 14l8 2" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/></svg>',
        tinta:        '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="13" width="32" height="40" rx="3" fill="#fff" stroke="#DC2626" stroke-width="3"/><rect x="16" y="13" width="32" height="11" rx="3" fill="#DC2626"/><circle cx="26" cy="37" r="6" fill="#F59E0B"/><circle cx="38" cy="37" r="6" fill="#1E3A8A"/><path d="M22 47h20" stroke="#DC2626" stroke-width="2.5" stroke-linecap="round"/></svg>',
        inalador:     '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="13" y="30" width="28" height="22" rx="4" fill="#fff" stroke="#1E3A8A" stroke-width="3"/><circle cx="21" cy="41" r="3" fill="#DC2626"/><rect x="29" y="37" width="9" height="9" rx="1.5" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="2"/><path d="M41 40h6l5-9" stroke="#1E3A8A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M49 27a6 6 0 0 1 6 6" stroke="#38BDF8" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>',
    };

    const TITULOS = {
        todos: 'Mais vendidos',
        medicamentos: 'Medicamentos',
        fraldas: 'Fraldas',
        infantil: 'Mãe & Bebê',
        beleza: 'Beleza & Tintas',
        vitaminas: 'Vitaminas',
    };

    const QUICKLINKS = [
        { cat: 'medicamentos', label: 'Remédios' },
        { cat: 'fraldas', label: 'Fraldas' },
        { cat: 'infantil', label: 'Mãe & Bebê' },
        { cat: 'beleza', label: 'Beleza' },
        { cat: 'vitaminas', label: 'Vitaminas' },
    ];

    /* ------------------------------------------------------------
       Utilitários
       ------------------------------------------------------------ */
    const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const fmt = (v) => brl.format(v);
    const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    const byId = (id) => document.getElementById(id);
    const prodById = (id) => CATALOGO.find((p) => p.id === id);

    /* Foto do produto: usa p.imagem se informado; senão tenta automaticamente
       img/produtos/<id>.jpg. Se o arquivo não existir, o onerror remove a
       <img> e aparece a ilustração/ícone que fica embaixo.
       → Para ter foto: salve o arquivo como img/produtos/<id>.jpg (lista de
         nomes em img/produtos/LEIA-ME.txt). Use fotos próprias ou liberadas
         pelo distribuidor — não use imagens de marca baixadas da internet. */
    const fotoSrc = (p) => p.imagem || `img/produtos/${p.id}.jpg`;

    function tipoIlustracao(p) {
        const n = p.nome.toLowerCase();
        if (n.includes('xarope')) return 'xarope';
        if (n.includes('gotas')) return 'gotas';
        if (n.includes('pomada')) return 'pomada';
        if (n.includes('inalador')) return 'inalador';
        if (['naridrin', 'narix', 'neosoro'].some((x) => n.includes(x))) return 'spray';
        if (p.categoria === 'beleza' && n.includes('tinta')) return 'tinta';
        return p.categoria;
    }

    function imagemOuIcone(p, tamanhoIcone) {
        const icone = `<span class="${tamanhoIcone}">${ICONES[p.categoria] || ICONES.medicamentos}</span>`;
        return `${icone}<img src="${fotoSrc(p)}" alt="" class="absolute inset-0 w-full h-full object-contain bg-white" loading="lazy" onerror="this.remove()">`;
    }

    function imagemOuIlustracao(p) {
        const ilustra = `<span class="w-20 h-20 flex items-center justify-center">${ILUSTRACOES[tipoIlustracao(p)] || ILUSTRACOES[p.categoria] || ICONES[p.categoria] || ICONES.medicamentos}</span>`;
        return `${ilustra}<img src="${fotoSrc(p)}" alt="${p.nome}" class="absolute inset-0 w-full h-full object-contain bg-white" loading="lazy" onerror="this.remove()">`;
    }

    function estrelas(nota) {
        let s = '';
        for (let i = 1; i <= 5; i++) {
            const cor = i <= Math.round(nota) ? '#F59E0B' : '#D1D5DB';
            s += `<svg class="w-3.5 h-3.5" style="color:${cor}" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>`;
        }
        return s;
    }

    /* ============================================================
       BANNERS — render + carrossel (snap + dots + autoplay)
       ============================================================ */
    function bannerSlide(b) {
        // Banner com imagem: imagem por cima do banner de texto (que serve de
        // fallback se a imagem não carregar). O banner inteiro vira link.
        if (b.imagem) {
            return `
        <div class="snap-center shrink-0 w-full">
            <a href="${b.target || '#produtos'}" class="block relative h-44 md:h-60 rounded-2xl overflow-hidden ${b.bg || 'bg-primary'} ${b.text || 'text-white'}">
                <picture>
                    ${b.imagemMobile ? `<source media="(max-width:767px)" srcset="${b.imagemMobile}">` : ''}
                    <img src="${b.imagem}" alt="${b.alt || b.titulo || 'Banner DFARMA'}" class="absolute inset-0 w-full h-full object-cover" onerror="this.closest('picture').remove()">
                </picture>
                ${(b.titulo || b.sub) ? `<div class="absolute inset-0 p-4 md:p-10 flex flex-col justify-center">
                    <h2 class="text-base md:text-3xl font-bold mb-1 md:mb-2 leading-tight max-w-[52%] md:max-w-md" style="text-shadow:0 1px 6px rgba(0,0,0,.45)">${b.titulo || ''}</h2>
                    <p class="text-xs md:text-lg leading-snug max-w-[52%] md:max-w-sm opacity-95" style="text-shadow:0 1px 6px rgba(0,0,0,.45)">${b.sub || ''}</p>
                </div>` : ''}
            </a>
        </div>`;
        }
        return `
        <div class="snap-center shrink-0 w-full">
            <div class="${b.bg} ${b.text} h-44 md:h-60 rounded-2xl p-6 md:p-10 flex flex-col justify-center relative overflow-hidden">
                ${b.cross ? `<div class="absolute -top-8 -right-8 text-white/10 pointer-events-none" aria-hidden="true"><svg class="w-48 h-48" viewBox="0 0 24 24" fill="currentColor"><path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8z"/></svg></div>` : ''}
                <h2 class="relative text-xl md:text-3xl font-bold mb-2 leading-tight max-w-lg">${b.titulo}</h2>
                <p class="relative md:text-lg mb-5 max-w-md opacity-90">${b.sub}</p>
                <a href="${b.target}" class="relative inline-flex w-max items-center gap-2 ${b.ctaBg} ${b.ctaText} font-semibold px-6 py-2.5 rounded-full hover:scale-105 transition-transform">${b.cta}<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12"/></svg></a>
            </div>
        </div>`;
    }

    function initBanners() {
        const track = byId('banner-track');
        const dotsWrap = byId('banner-dots');
        if (!track || !dotsWrap) return;

        track.innerHTML = BANNERS.map(bannerSlide).join('');
        dotsWrap.innerHTML = BANNERS.map((_, i) => `<button data-dot="${i}" class="h-2.5 rounded-full transition-all" aria-label="Ir para o banner ${i + 1}"></button>`).join('');
        const dots = [...dotsWrap.children];

        const setDots = (a) => dots.forEach((d, i) => {
            d.className = 'h-2.5 rounded-full transition-all ' + (i === a ? 'w-6 bg-primary' : 'w-2.5 bg-gray-300');
        });
        const idx = () => Math.round(track.scrollLeft / track.clientWidth);
        const goTo = (i) => track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });

        setDots(0);
        let raf = null;
        track.addEventListener('scroll', () => {
            if (raf) return;
            raf = requestAnimationFrame(() => { setDots(idx()); raf = null; });
        });
        dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

        const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reduz && BANNERS.length > 1) {
            let timer;
            const start = () => { timer = setInterval(() => goTo((idx() + 1) % BANNERS.length), 5000); };
            const stop = () => clearInterval(timer);
            start();
            track.addEventListener('mouseenter', stop);
            track.addEventListener('mouseleave', start);
        }
    }

    /* ============================================================
       DEPOIMENTOS — render
       ============================================================ */
    function iniciais(nome) {
        return nome.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
    }
    function renderDepoimentos() {
        const el = byId('depoimentos-grid');
        if (!el) return;
        el.innerHTML = DEPOIMENTOS.map((d) => `
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div class="text-accent text-lg mb-3" aria-label="${d.nota} de 5 estrelas">${'★'.repeat(d.nota)}<span class="text-gray-200">${'★'.repeat(5 - d.nota)}</span></div>
                <p class="text-gray-700 mb-4 leading-relaxed">“${d.texto}”</p>
                <div class="flex items-center gap-3">
                    <span class="w-10 h-10 rounded-full bg-secondary/10 text-secondary font-bold flex items-center justify-center text-sm">${iniciais(d.nome)}</span>
                    <div>
                        <p class="font-semibold text-sm text-gray-800">${d.nome}</p>
                        <p class="text-xs text-gray-400">via Google</p>
                    </div>
                </div>
            </div>`).join('');
    }

    /* ------------------------------------------------------------
       Estado de busca / categoria
       ------------------------------------------------------------ */
    let categoriaAtual = 'todos';
    let termoBusca = '';

    const grid = byId('produtos-grid');
    const emptyState = byId('empty-state');
    const gridTitle = byId('grid-title');
    const gridCount = byId('grid-count');

    function produtosFiltrados() {
        const t = termoBusca.trim().toLowerCase();
        return CATALOGO.filter((p) => {
            const okCat = categoriaAtual === 'todos' || p.categoria === categoriaAtual;
            const okBusca = !t || p.nome.toLowerCase().includes(t) || p.categoria.includes(t);
            return okCat && okBusca;
        });
    }

    function cardProduto(p) {
        const desconto = p.precoAntigo ? Math.round((1 - p.preco / p.precoAntigo) * 100) : 0;
        return `
        <article class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col">
            <div class="relative">
                ${desconto > 0 ? `<span class="absolute top-1 left-1 z-10 bg-green-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16l-6-6h12z"/></svg>${desconto}%</span>` : ''}
                <div class="relative bg-gray-100 rounded-xl h-28 sm:h-32 flex items-center justify-center text-gray-300 overflow-hidden">
                    ${imagemOuIlustracao(p)}
                </div>
                <button data-add="${p.id}" class="absolute -bottom-2 right-1 w-9 h-9 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-lg transition-colors" aria-label="Adicionar ${p.nome} à cesta">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14"/></svg>
                </button>
            </div>
            <h3 class="mt-4 text-sm font-semibold text-gray-800 leading-snug min-h-[2.5rem]">${p.nome}</h3>
            <p class="text-xs text-gray-400 mb-2">${p.unidade}</p>
            ${p.avaliacao ? `<div class="flex items-center gap-1 mb-2">${estrelas(p.avaliacao)}${p.avaliacoes ? `<span class="text-xs text-gray-400 ml-1">(${p.avaliacoes})</span>` : ''}</div>` : ''}
            <div class="mt-auto pt-1">
                ${p.precoAntigo ? `<span class="block text-xs text-gray-400 line-through">${fmt(p.precoAntigo)}</span>` : ''}
                <span class="text-lg font-bold text-gray-900">${fmt(p.preco)}</span>
            </div>
        </article>`;
    }

    function renderProdutos() {
        const lista = produtosFiltrados();
        gridTitle.textContent = termoBusca ? `Resultados para “${termoBusca}”` : (TITULOS[categoriaAtual] || 'Produtos');
        gridCount.textContent = `${lista.length} ${lista.length === 1 ? 'produto' : 'produtos'}`;

        if (lista.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }
        emptyState.classList.add('hidden');
        grid.innerHTML = lista.map(cardProduto).join('');
    }

    /* ------------------------------------------------------------
       Atalhos de categoria (quicklinks)
       ------------------------------------------------------------ */
    byId('quicklinks').innerHTML = QUICKLINKS.map((q) => `
        <button data-quick="${q.cat}" class="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col items-center gap-2 hover:shadow-md transition-shadow">
            <span class="w-12 h-12 rounded-full bg-[#FCEBEB] text-primary flex items-center justify-center"><span class="w-6 h-6">${ICONES[q.cat]}</span></span>
            <span class="text-xs font-medium text-gray-600 text-center">${q.label}</span>
        </button>`).join('');

    /* ------------------------------------------------------------
       Filtro por categoria (chips + quicklinks)
       ------------------------------------------------------------ */
    function setCategoria(cat) {
        categoriaAtual = cat;
        document.querySelectorAll('.cat-chip').forEach((c) => {
            c.classList.toggle('is-active', c.dataset.cat === cat);
        });
        renderProdutos();
    }

    document.querySelectorAll('.cat-chip').forEach((chip) => {
        chip.addEventListener('click', () => setCategoria(chip.dataset.cat));
    });

    byId('quicklinks').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-quick]');
        if (!btn) return;
        setCategoria(btn.dataset.quick);
        byId('produtos').scrollIntoView({ behavior: 'smooth' });
    });

    /* ------------------------------------------------------------
       Busca (desktop + mobile sincronizadas)
       ------------------------------------------------------------ */
    const searchInputs = [byId('search'), byId('search-mobile')].filter(Boolean);
    searchInputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            termoBusca = e.target.value;
            searchInputs.forEach((other) => { if (other !== e.target) other.value = e.target.value; });
            renderProdutos();
        });
    });

    /* ============================================================
       CESTA (carrinho)
       ============================================================ */
    const cart = new Map(); // id -> quantidade
    let descontoAtivo = false;

    const cartCount = byId('cart-count');
    const cartItemsEl = byId('cart-items');
    const cartEmpty = byId('cart-empty');
    const cartFooter = byId('cart-footer');
    const cartSubtotalEl = byId('cart-subtotal');
    const cartDiscountRow = byId('cart-discount-row');
    const cartDiscountEl = byId('cart-discount');
    const cartTotalEl = byId('cart-total');
    const descontoChk = byId('cart-desconto');
    const cartBar = byId('cart-bar');
    const cartBarCount = byId('cart-bar-count');
    const cartBarTotal = byId('cart-bar-total');

    function totalItens() {
        let n = 0; cart.forEach((q) => n += q); return n;
    }
    function valores() {
        let sub = 0;
        cart.forEach((q, id) => { const p = prodById(id); if (p) sub += p.preco * q; });
        const desc = descontoAtivo ? sub * DESCONTO_PCT : 0;
        return { sub, desc, total: sub - desc };
    }

    function addAoCarrinho(id) {
        cart.set(id, (cart.get(id) || 0) + 1);
        renderCart();
    }
    function mudarQtd(id, delta) {
        const novo = (cart.get(id) || 0) + delta;
        if (novo <= 0) cart.delete(id); else cart.set(id, novo);
        renderCart();
    }

    function renderCart() {
        const n = totalItens();
        const { sub, desc, total } = valores();

        cartCount.textContent = n;
        cartCount.classList.toggle('hidden', n === 0);

        cartBar.classList.toggle('hidden', n === 0);
        cartBarCount.textContent = n;
        cartBarTotal.textContent = fmt(total);

        if (n === 0) {
            cartItemsEl.innerHTML = '';
            cartEmpty.classList.remove('hidden');
            cartFooter.classList.add('hidden');
            return;
        }
        cartEmpty.classList.add('hidden');
        cartFooter.classList.remove('hidden');

        cartSubtotalEl.textContent = fmt(sub);
        cartDiscountEl.textContent = '- ' + fmt(desc);
        cartDiscountRow.classList.toggle('hidden', desc <= 0);
        cartTotalEl.textContent = fmt(total);

        let html = '';
        cart.forEach((qtd, id) => {
            const p = prodById(id);
            if (!p) return;
            html += `
            <div class="flex gap-3 items-center">
                <span class="relative w-12 h-12 rounded-lg bg-gray-100 text-gray-300 flex items-center justify-center shrink-0 overflow-hidden">${imagemOuIcone(p, 'w-6 h-6')}</span>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-800 truncate">${p.nome}</p>
                    <p class="text-xs text-gray-400">${fmt(p.preco)} · ${p.unidade}</p>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <button data-dec="${id}" class="w-7 h-7 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-100" aria-label="Diminuir ${p.nome}">−</button>
                    <span class="w-5 text-center text-sm font-semibold">${qtd}</span>
                    <button data-inc="${id}" class="w-7 h-7 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-100" aria-label="Aumentar ${p.nome}">+</button>
                </div>
            </div>`;
        });
        cartItemsEl.innerHTML = html;
    }

    // Adicionar via "+" nos cards
    grid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-add]');
        if (!btn) return;
        addAoCarrinho(btn.dataset.add);
        abrirCesta();
    });

    // +/- dentro do drawer
    cartItemsEl.addEventListener('click', (e) => {
        const inc = e.target.closest('[data-inc]');
        const dec = e.target.closest('[data-dec]');
        if (inc) mudarQtd(inc.dataset.inc, 1);
        if (dec) mudarQtd(dec.dataset.dec, -1);
    });

    // Checkbox de 5% de desconto
    if (descontoChk) {
        descontoChk.addEventListener('change', () => { descontoAtivo = descontoChk.checked; renderCart(); });
    }

    /* ------------------------------------------------------------
       Abrir / fechar o drawer da cesta
       ------------------------------------------------------------ */
    const drawer = byId('cart-drawer');
    const overlay = byId('cart-overlay');

    function abrirCesta() {
        drawer.classList.remove('translate-x-full');
        drawer.setAttribute('aria-hidden', 'false');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    function fecharCesta() {
        drawer.classList.add('translate-x-full');
        drawer.setAttribute('aria-hidden', 'true');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    byId('cart-btn').addEventListener('click', abrirCesta);
    byId('cart-bar-btn').addEventListener('click', abrirCesta);
    byId('cart-close').addEventListener('click', fecharCesta);
    overlay.addEventListener('click', fecharCesta);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharCesta(); });

    /* ------------------------------------------------------------
       Checkout → monta a mensagem do pedido e abre o WhatsApp.
       ------------------------------------------------------------ */
    byId('cart-checkout').addEventListener('click', () => {
        if (totalItens() === 0) return;
        const { sub, desc, total } = valores();

        let msg = 'Olá! Vim pela loja online da DFARMA e quero fazer este pedido:\n\n';
        cart.forEach((qtd, id) => {
            const p = prodById(id);
            if (!p) return;
            msg += `• ${qtd}x ${p.nome} (${p.unidade}) — ${fmt(p.preco * qtd)}\n`;
        });
        msg += `\nSubtotal: ${fmt(sub)}\n`;
        if (desc > 0) msg += `Desconto 5% (Bolsa Família / família atípica): -${fmt(desc)}\n`;
        msg += `Total: ${fmt(total)}\n\n`;
        msg += 'Pode confirmar a disponibilidade, o valor final e a entrega? Obrigado(a)!';

        // TODO (lead/CRM): aqui o pedido apenas vira uma mensagem no WhatsApp.
        // Para registrar o pedido, envie o conteúdo da cesta para uma planilha
        // (Google Apps Script / Sheets) ou um endpoint antes do window.open.

        window.open(waLink(msg), '_blank', 'noopener');
    });

    /* ------------------------------------------------------------
       Botões "WhatsApp" genéricos (header)
       ------------------------------------------------------------ */
    document.querySelectorAll('[data-wa-cta]').forEach((btn) => {
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener');
        btn.setAttribute('href', waLink(DEFAULT_MESSAGE));
    });

    /* ------------------------------------------------------------
       Contador da "oferta da semana" (até o fim do dia).
       ------------------------------------------------------------ */
    const cdH = byId('cd-h'), cdM = byId('cd-m'), cdS = byId('cd-s');
    function tickCountdown() {
        const agora = new Date();
        const fim = new Date(agora);
        fim.setHours(23, 59, 59, 999);
        let diff = Math.max(0, Math.floor((fim - agora) / 1000));
        const h = Math.floor(diff / 3600); diff %= 3600;
        const m = Math.floor(diff / 60);
        const s = diff % 60;
        const pad = (x) => String(x).padStart(2, '0');
        if (cdH) cdH.textContent = pad(h) + 'h';
        if (cdM) cdM.textContent = pad(m) + 'm';
        if (cdS) cdS.textContent = pad(s) + 's';
    }
    tickCountdown();
    setInterval(tickCountdown, 1000);

    /* ------------------------------------------------------------
       Reveal das seções no scroll (respeita prefers-reduced-motion).
       ------------------------------------------------------------ */
    const revealEls = document.querySelectorAll('.reveal');
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduz || !('IntersectionObserver' in window)) {
        revealEls.forEach((el) => el.classList.add('active'));
    } else {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { entry.target.classList.add('active'); obs.unobserve(entry.target); }
            });
        }, { threshold: 0.1 });
        revealEls.forEach((el) => obs.observe(el));
    }

    /* ------------------------------------------------------------
       Modal de Política de Privacidade.
       ------------------------------------------------------------ */
    const modal = byId('privacy-modal');
    const privacyBtn = byId('privacy-btn');
    const closeBtn = byId('close-modal');
    if (modal && privacyBtn && closeBtn) {
        const open = (e) => { e.preventDefault(); modal.classList.remove('hidden'); modal.classList.add('flex'); };
        const close = () => { modal.classList.add('hidden'); modal.classList.remove('flex'); };
        privacyBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    }

    /* ------------------------------------------------------------
       Render inicial.
       ------------------------------------------------------------ */
    initBanners();
    renderDepoimentos();
    renderProdutos();
    renderCart();
});
