/* ===========================
   JISCA FASHION — APP.JS
   Version complète
=========================== */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

// ===== CURSOR (desktop only) =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
if (window.innerWidth > 768) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  })();
  document.querySelectorAll('a, button, .filter-btn, .product-card, .size-opt, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      follower.style.transform = 'translate(-50%,-50%) scale(1.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
  // Back to top
  const btn = document.getElementById('backTop');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
});

// ===== ACTIVE NAV =====
function updateActiveNav() {
  const sections = ['home','about','services','collection','lookbook','contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 140) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== CART =====
let cart = JSON.parse(localStorage.getItem('jiscaCart') || '[]');
function saveCart() { localStorage.setItem('jiscaCart', JSON.stringify(cart)); }

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  el.textContent = count;
  el.classList.toggle('show', count > 0);
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><p>Votre panier est vide</p></div>`;
    footerEl.style.display = 'none';
  } else {
    itemsEl.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-img">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${(item.price * item.qty).toLocaleString('fr-FR')} FCFA</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${idx},-1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${idx},1)">+</button>
            <button class="cart-item-del" onclick="removeItem(${idx})">✕ Retirer</button>
          </div>
        </div>
      </div>`).join('');
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    document.getElementById('cartTotal').textContent = total.toLocaleString('fr-FR') + ' FCFA';
    footerEl.style.display = 'block';
  }
}

function changeQty(idx, delta) { cart[idx].qty = Math.max(1, cart[idx].qty + delta); saveCart(); updateCartUI(); }
function removeItem(idx) { cart.splice(idx, 1); saveCart(); updateCartUI(); }
function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) existing.qty++; else cart.push({ ...product, qty: 1 });
  saveCart(); updateCartUI();
  showToast(`✓ ${product.name} ajouté au panier`);
}

const cartBtn     = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose   = document.getElementById('cartClose');
function openCart()  { cartSidebar.classList.add('open'); cartOverlay.classList.add('show'); document.body.style.overflow = 'hidden'; }
function closeCart() { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('show'); document.body.style.overflow = ''; }
cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.querySelector('.btn-checkout').addEventListener('click', () => {
  if (!cart.length) return;
  showToast('🛍️ Redirection vers le paiement...');
  setTimeout(() => showToast('✓ Merci ! Nous vous contacterons rapidement.'), 2500);
});

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== PRODUCTS DATA =====
const products = [
  { id:1,  name:'Boubou Royal',          cat:'homme',      catLabel:'Homme',      price:45000,             emoji:'👘', badge:'new',   desc:'Boubou traditionnel taillé dans du brocart premium, brodé à la main avec des motifs géométriques dorés. Une pièce intemporelle.',  sizes:['S','M','L','XL','XXL'] },
  { id:2,  name:'Robe Ankara Chic',       cat:'femme',      catLabel:'Femme',      price:38000, oldPrice:52000, emoji:'👗', badge:'promo', desc:'Robe longue confectionnée dans un tissu Ankara aux imprimés géométriques. Coupe élégante pour toutes les occasions.',               sizes:['XS','S','M','L','XL'] },
  { id:3,  name:'Ensemble Kente',         cat:'femme',      catLabel:'Femme',      price:62000,             emoji:'🥻', badge:'new',   desc:'Ensemble deux pièces en tissu Kente authentique du Ghana. Parfait pour les cérémonies et événements importants.',                 sizes:['S','M','L','XL'] },
  { id:4,  name:'Costume Dashiki',        cat:'homme',      catLabel:'Homme',      price:55000,             emoji:'🕴️', badge:null,    desc:'Costume Dashiki contemporain avec broderies fines. Alliance parfaite du style africain et de l\'élégance occidentale.',             sizes:['M','L','XL','XXL'] },
  { id:5,  name:'Sac Raphia Doré',        cat:'accessoires',catLabel:'Accessoires',price:18000,             emoji:'👜', badge:null,    desc:'Sac à main artisanal en raphia naturel avec finitions dorées. Fabriqué à la main par nos artisans béninois.',                       sizes:['Unique'] },
  { id:6,  name:'Uniforme Corporate',     cat:'corporate',  catLabel:'Corporate',  price:0,                 emoji:'👔', badge:null,    desc:'Uniformes professionnels sur mesure pour votre entreprise. Design personnalisé selon votre charte graphique.',                       sizes:['Sur mesure'], custom:true },
  { id:7,  name:'Tenue de Mariée',        cat:'femme',      catLabel:'Femme',      price:180000,            emoji:'👰', badge:'new',   desc:'Robe de mariée exceptionnelle mêlant dentelle française et tissus traditionnels béninois. Sur mesure uniquement.',                   sizes:['Sur mesure'] },
  { id:8,  name:'Collier Perles du Bénin',cat:'accessoires',catLabel:'Accessoires',price:12000, oldPrice:16000, emoji:'📿', badge:'promo', desc:'Collier en perles de verre soufflé artisanales, selon la tradition béninoise. Pièce unique et authentique.',                       sizes:['Unique'] },
  { id:9,  name:'Agbada Prestige',        cat:'homme',      catLabel:'Homme',      price:72000,             emoji:'🥋', badge:'new',   desc:'Agbada trois pièces en bazin riche importé, richement brodé. Le must-have pour les grandes cérémonies.',                            sizes:['M','L','XL','XXL'] },
  { id:10, name:'Wrap Dress Wax',         cat:'femme',      catLabel:'Femme',      price:29000,             emoji:'🎽', badge:null,    desc:'Robe portefeuille en wax hollandais aux couleurs vives. Confort absolu et style africain affirmé.',                                   sizes:['XS','S','M','L','XL'] },
  { id:11, name:'Bracelet Bronze Gélédé', cat:'accessoires',catLabel:'Accessoires',price:8500,              emoji:'💛', badge:null,    desc:'Bracelet artisanal en bronze coulé à la cire perdue, inspiré des masques Gélédé patrimoine de l\'UNESCO.',                            sizes:['Unique'] },
  { id:12, name:'Tenue Baptême',          cat:'femme',      catLabel:'Femme',      price:42000,             emoji:'🌸', badge:'new',   desc:'Ensemble élégant pour baptême : robe longue et veste assortie en dentelle et satin. Disponible en plusieurs couleurs.',                sizes:['S','M','L','XL'] },
];

// ===== RENDER PRODUCTS =====
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
  grid.style.opacity = '0'; grid.style.transform = 'translateY(10px)';
  setTimeout(() => {
    grid.innerHTML = filtered.map(p => `
      <div class="product-card" data-cat="${p.cat}">
        <div class="product-img">
          ${p.badge ? `<div class="product-badge ${p.badge==='new'?'new':''}">${p.badge==='new'?'Nouveau':p.oldPrice?'-'+Math.round((1-p.price/p.oldPrice)*100)+'%':p.badge}</div>` : ''}
          <span>${p.emoji}</span>
          <div class="product-actions">
            <button class="product-action-btn" onclick="openModal(${p.id})">Voir détails</button>
            <button class="product-action-btn outline-btn" onclick="quickAdd(${p.id})">+ Panier</button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-cat">${p.catLabel}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-price-row">
            <span class="product-price">${p.custom?'Sur devis':p.price.toLocaleString('fr-FR')+' FCFA'}</span>
            ${p.oldPrice?`<span class="product-price-old">${p.oldPrice.toLocaleString('fr-FR')} FCFA</span>`:''}
          </div>
        </div>
      </div>`).join('');
    grid.style.transition = 'opacity 0.4s, transform 0.4s';
    grid.style.opacity = '1'; grid.style.transform = 'translateY(0)';
  }, 200);
}

function quickAdd(id) {
  const p = products.find(p => p.id === id);
  if (!p || p.custom) { showToast('Contactez-nous pour un devis personnalisé'); return; }
  addToCart({ id:p.id, name:p.name, price:p.price, emoji:p.emoji });
}

// ===== FILTERS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

// ===== PRODUCT MODAL =====
function openModal(id) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-grid">
      <div class="modal-img">${p.emoji}</div>
      <div class="modal-info">
        <div class="modal-cat">${p.catLabel}</div>
        <div class="modal-name">${p.name}</div>
        <div class="modal-price">${p.custom?'Sur devis':p.price.toLocaleString('fr-FR')+' FCFA'}</div>
        <div class="modal-desc">${p.desc}</div>
        <div class="modal-sizes">
          <h4>Taille</h4>
          <div class="sizes-row">${p.sizes.map((s,i)=>`<button class="size-opt${i===0?' active':''}" onclick="selectSize(this)">${s}</button>`).join('')}</div>
        </div>
        ${p.custom
          ? `<a href="#contact" class="btn-primary btn-full modal-add" onclick="closeModal()"><span>Demander un devis</span></a>`
          : `<button class="btn-primary btn-full modal-add" onclick="addToCart({id:${p.id},name:'${p.name.replace(/'/g,"\\'")}',price:${p.price},emoji:'${p.emoji}'}); closeModal()"><span>Ajouter au panier</span></button>`}
      </div>
    </div>`;
  document.getElementById('productModal').classList.add('show');
  document.getElementById('modalOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('productModal').classList.remove('show');
  document.getElementById('modalOverlay').classList.remove('show');
  document.body.style.overflow = '';
}
function selectSize(btn) {
  btn.closest('.sizes-row').querySelectorAll('.size-opt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', closeModal);

// ===== TESTIMONIALS SLIDER =====
const track = document.getElementById('testimonialsTrack');
const dotsContainer = document.getElementById('sliderDots');
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
let currentSlide = 0;
let slidesPerView = 3;

function initSlider() {
  slidesPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  cards.forEach(c => c.style.minWidth = `${100 / slidesPerView}%`);
  const totalDots = Math.ceil(cards.length / slidesPerView);
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  goToSlide(0);
}

function goToSlide(idx) {
  const maxSlide = Math.ceil(cards.length / slidesPerView) - 1;
  currentSlide = Math.max(0, Math.min(idx, maxSlide));
  if (track) track.style.transform = `translateX(-${currentSlide * 100 * slidesPerView / slidesPerView}%)`;
  if (track) track.style.transform = `translateX(-${currentSlide * (100 / slidesPerView) * slidesPerView}%)`;
  dotsContainer.querySelectorAll('.slider-dot').forEach((d,i) => d.classList.toggle('active', i === currentSlide));
}

document.getElementById('prevBtn').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('nextBtn').addEventListener('click', () => goToSlide(currentSlide + 1));

let autoplay = setInterval(() => {
  const maxSlide = Math.ceil(cards.length / slidesPerView) - 1;
  goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
}, 5500);
if (track) {
  track.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      const maxSlide = Math.ceil(cards.length / slidesPerView) - 1;
      goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
    }, 5500);
  });
}
window.addEventListener('resize', initSlider);

// ===== LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxInner = document.getElementById('lightboxInner');
const galleryData = [
  { emoji:'👗', label:'Collection Femme' },
  { emoji:'🕴️', label:'Style Corporate' },
  { emoji:'👰', label:'Mariage de Luxe' },
  { emoji:'📿', label:'Accessoires' },
  { emoji:'👘', label:'Boubou Royal' },
  { emoji:'🥻', label:'Kente & Ankara' },
  { emoji:'✨', label:'Fashion Shooting' },
  { emoji:'👔', label:'Uniforme Premium' },
];
let currentLightbox = 0;

function openLightbox(idx) {
  currentLightbox = idx;
  renderLightbox();
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() { lightbox.classList.remove('show'); document.body.style.overflow = ''; }
function renderLightbox() {
  const item = galleryData[currentLightbox];
  lightboxInner.innerHTML = `<div style="text-align:center"><div style="font-size:10rem">${item.emoji}</div><p style="font-family:var(--font-display);font-size:1.2rem;color:var(--gold);letter-spacing:0.3em;text-transform:uppercase;margin-top:16px">${item.label}</p></div>`;
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => openLightbox(parseInt(item.dataset.lightbox)));
});
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.getElementById('lightboxPrev').addEventListener('click', () => { currentLightbox = (currentLightbox - 1 + galleryData.length) % galleryData.length; renderLightbox(); });
document.getElementById('lightboxNext').addEventListener('click', () => { currentLightbox = (currentLightbox + 1) % galleryData.length; renderLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('show')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { currentLightbox = (currentLightbox - 1 + galleryData.length) % galleryData.length; renderLightbox(); }
  if (e.key === 'ArrowRight') { currentLightbox = (currentLightbox + 1) % galleryData.length; renderLightbox(); }
});

// ===== FAQ =====
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== NEWSLETTER =====
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.innerHTML = '<span>Envoi...</span>';
  btn.disabled = true;
  setTimeout(() => {
    showToast('✓ Abonnement confirmé ! Bienvenue dans la famille Jisca Fashion.');
    this.reset();
    btn.innerHTML = '<span>S\'abonner</span>';
    btn.disabled = false;
  }, 1200);
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.querySelector('span').textContent = 'Envoi en cours...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('formSuccess').classList.add('show');
    this.reset();
    btn.querySelector('span').textContent = 'Envoyer le message';
    btn.disabled = false;
    showToast('✓ Message envoyé avec succès !');
    setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
  }, 1500);
});

// ===== BACK TO TOP =====
const backTopBtn = document.getElementById('backTop');
if (backTopBtn) {
  backTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.service-card, .process-step, .gallery-item, .about-grid, .contact-grid, .footer-grid, .faq-grid').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== INIT =====
renderProducts();
updateCartUI();
initSlider();
updateActiveNav();
