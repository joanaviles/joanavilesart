/* ============================================================
   JOAN AVILÉS — Escultor  |  main.js
   ============================================================ */

/* ----------------------------------------------------------
   Artwork data — read from #obras-data in HTML
   ---------------------------------------------------------- */
function getArtworks() {
  return Array.from(document.querySelectorAll('#obras-data [data-obra-id]')).map(el => ({
    id:   el.dataset.obraId,
    lat:  parseFloat(el.dataset.lat),
    lng:  parseFloat(el.dataset.lng),
    image: el.dataset.img,
  }));
}

const artworks = [];  // populated after DOM ready

/* ----------------------------------------------------------
   Helper — read translation from window.t (set by i18n.js)
   ---------------------------------------------------------- */
function tr(key) {
  return typeof t === 'function' ? t(key) : key;
}

/* ----------------------------------------------------------
   NAVBAR — scroll effect + active section tracking
   ---------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNavLink();
  }, { passive: true });

  updateActiveNavLink();
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  let current = '';

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 100) current = sec.id;
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href').slice(1);
    link.classList.toggle('active', href === current);
  });
}

/* ----------------------------------------------------------
   MOBILE MENU
   ---------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');
  if (!toggle || !menu || !overlay) return;

  function open() {
    toggle.classList.add('open');
    menu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    toggle.classList.remove('open');
    menu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    menu.classList.contains('open') ? close() : open();
  });

  overlay.addEventListener('click', close);

  const closeBtn = document.querySelector('.mobile-menu-close');
  if (closeBtn) closeBtn.addEventListener('click', close);

  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', close);
  });
}

/* ----------------------------------------------------------
   SCROLL ANIMATIONS — IntersectionObserver
   ---------------------------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ----------------------------------------------------------
   SMOOTH SCROLL for anchor links
   ---------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ----------------------------------------------------------
   HERO SCROLL button
   ---------------------------------------------------------- */
function initHeroScroll() {
  const btn = document.querySelector('.hero-scroll');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const artista = document.querySelector('#artista');
    if (artista) artista.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ----------------------------------------------------------
   MODAL — open by obra-id (shared helper)
   ---------------------------------------------------------- */
function openModalById(obraId) {
  const card = document.querySelector(`.obra-card[data-obra-id="${obraId}"]`);
  if (card) { card.click(); return; }

  // Fallback: read from #obras-data
  const dataEl = document.querySelector(`#obras-data [data-obra-id="${obraId}"]`);
  if (!dataEl) return;
  const overlay = document.getElementById('obra-modal-overlay');
  if (!overlay) return;

  const lang = typeof currentLang !== 'undefined' ? currentLang : 'ca';
  const title    = typeof t === 'function' ? t(dataEl.dataset.titleI18n)    : obraId;
  const location = typeof t === 'function' ? t(dataEl.dataset.locationI18n) : '';
  const material = typeof t === 'function' ? t(dataEl.dataset.materialI18n) : '';
  const desc     = typeof t === 'function' ? t(dataEl.dataset.descI18n)     : '';

  const img = overlay.querySelector('.obra-modal-img img');
  if (img) { img.src = dataEl.dataset.img || ''; img.alt = title; }
  const yearEl = overlay.querySelector('.obra-modal-year');
  if (yearEl) yearEl.textContent = dataEl.dataset.year || '';
  const titleEl = overlay.querySelector('.obra-modal-title');
  if (titleEl) titleEl.textContent = title;
  const locEl = overlay.querySelector('.obra-modal-location');
  if (locEl) locEl.textContent = location;
  const matEl = overlay.querySelector('.obra-modal-material');
  if (matEl) matEl.textContent = material;
  const descEl = overlay.querySelector('.obra-modal-desc');
  if (descEl) descEl.textContent = desc;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ----------------------------------------------------------
   OBRA CARDS — click to open modal
   ---------------------------------------------------------- */
function initObraCards() {
  const overlay = document.getElementById('obra-modal-overlay');
  if (!overlay) return;

  const modalImg    = overlay.querySelector('.obra-modal-img img');
  const modalYear   = overlay.querySelector('.obra-modal-year');
  const modalTitle  = overlay.querySelector('.obra-modal-title');
  const modalDesc   = overlay.querySelector('.obra-modal-desc');
  const metaLocation= overlay.querySelector('.obra-modal-location');
  const metaMaterial= overlay.querySelector('.obra-modal-material');
  const closeBtn    = overlay.querySelector('.obra-modal-close');

  function openModal(card) {
    const id = card.dataset.obraId;
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'ca';

    if (modalImg) {
      modalImg.src = card.dataset.img || '';
      modalImg.alt = card.dataset.title || '';
    }
    if (modalYear)     modalYear.textContent     = card.dataset.year     || '';
    if (modalTitle)    modalTitle.textContent    = card.dataset.title    || '';
    if (modalDesc)     modalDesc.textContent     = card.dataset.desc     || '';
    if (metaLocation)  metaLocation.textContent  = card.dataset.location || '';
    if (metaMaterial)  metaMaterial.textContent  = card.dataset.material || '';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.obra-card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(card);
    });
  });

  closeBtn && closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ----------------------------------------------------------
   LEAFLET MAP
   ---------------------------------------------------------- */
function initMap() {
  const mapEl = document.getElementById('obras-map');
  if (!mapEl || typeof L === 'undefined') return;

  const map = L.map('obras-map', {
    center: [41.7, 1.8],
    zoom: 8,
    zoomControl: true,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map);

  const markerIcon = (active = false) => L.divIcon({
    className: '',
    html: `<div class="map-marker${active ? ' active' : ''}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -14],
  });

  const markers = {};

  function buildPopupHTML(obra, titleText, year, desc) {
    const imgSrc = obra.image || '';
    const imgTag = imgSrc
      ? `<div class="map-popup-img"><img src="${imgSrc}" alt="${titleText}" loading="lazy"></div>`
      : '';
    return `
      <div class="map-popup">
        ${imgTag}
        <div class="map-popup-body">
          <div class="map-popup-year">${year}</div>
          <div class="map-popup-title">${titleText}</div>
          ${desc ? `<div class="map-popup-desc">${desc}</div>` : ''}
        </div>
      </div>
    `;
  }

  artworks.forEach(obra => {
    const dataEl = document.querySelector(`#obras-data [data-obra-id="${obra.id}"]`);
    const year  = dataEl?.dataset.year || '';
    const title = typeof t === 'function' && dataEl ? t(dataEl.dataset.titleI18n)   : obra.id;
    const desc  = typeof t === 'function' && dataEl ? t(dataEl.dataset.descI18n)    : '';

    const marker = L.marker([obra.lat, obra.lng], { icon: markerIcon() })
      .addTo(map)
      .bindPopup(buildPopupHTML(obra, title, year, desc), { maxWidth: 240, minWidth: 220 });

    markers[obra.id] = { marker, dataEl };

    marker.on('click', () => highlightCard(obra.id));
  });

  function highlightCard(id) {
    document.querySelectorAll('.obra-card').forEach(c => c.classList.remove('highlighted'));
    const target = document.querySelector(`.obra-card[data-obra-id="${id}"]`);
    if (target) {
      target.classList.add('highlighted');
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // Rebuild popups on language change
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        artworks.forEach(obra => {
          const { marker, dataEl } = markers[obra.id] || {};
          if (!marker || !dataEl) return;
          const year  = dataEl.dataset.year || '';
          const title = typeof t === 'function' ? t(dataEl.dataset.titleI18n) : obra.id;
          const desc  = typeof t === 'function' ? t(dataEl.dataset.descI18n)  : '';
          marker.setPopupContent(buildPopupHTML(obra, title, year, desc));
        });
      }, 50);
    });
  });
}

/* ----------------------------------------------------------
   TABS — Graella / Línies / Mapa / Cronològic
   ---------------------------------------------------------- */
function initTabs() {
  const tabs  = document.querySelectorAll('.obras-tab');
  const views = document.querySelectorAll('.obras-view');
  if (!tabs.length) return;

  let mapInitialized = false;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });

      views.forEach(v => {
        const isActive = v.id === `view-${target}`;
        v.classList.toggle('active', isActive);
      });

      // Init map lazily on first show
      if (target === 'mapa' && !mapInitialized) {
        initMap();
        mapInitialized = true;
      }

      // Re-trigger reveal for newly visible items
      setTimeout(() => {
        document.querySelectorAll(`#view-${target} .reveal:not(.visible)`).forEach(el => {
          el.classList.add('visible');
        });
      }, 30);
    });
  });
}

/* ----------------------------------------------------------
   TIMELINE — click opens modal
   ---------------------------------------------------------- */
function initTimeline() {
  document.querySelectorAll('.timeline-content[data-obra-id]').forEach(item => {
    const open = () => openModalById(item.dataset.obraId);
    item.addEventListener('click', open);
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
  });
}

/* ----------------------------------------------------------
   LÍNIES rows — click opens modal
   ---------------------------------------------------------- */
function initObraRows() {
  document.querySelectorAll('.obra-row[data-obra-id]').forEach(row => {
    const open = () => openModalById(row.dataset.obraId);
    row.addEventListener('click', open);
    row.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
  });
}

/* ----------------------------------------------------------
   GALLERY — GLightbox
   ---------------------------------------------------------- */
function initGallery() {
  // Lightbox disabled — hover effect only
  document.querySelectorAll('.galeria-item a').forEach(a => {
    a.addEventListener('click', e => e.preventDefault());
  });
}

/* ----------------------------------------------------------
   CONTACT FORM — Formspree
   ---------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const btn = form.querySelector('button[type="submit"]');
  const btnText = btn ? btn.querySelector('span') : null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (btn) btn.classList.add('loading');
    if (btnText) btnText.textContent = tr('contacto.form.sending');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        if (btnText) btnText.textContent = tr('contacto.form.sent');
        btn && btn.classList.remove('loading');
        setTimeout(() => {
          if (btnText) btnText.setAttribute('data-i18n', 'contacto.form.send');
          if (btnText) btnText.textContent = tr('contacto.form.send');
        }, 4000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      if (btnText) btnText.textContent = 'Error. Intenta de nuevo.';
      btn && btn.classList.remove('loading');
      setTimeout(() => {
        if (btnText) btnText.setAttribute('data-i18n', 'contacto.form.send');
        if (btnText) btnText.textContent = tr('contacto.form.send');
      }, 3000);
    }
  });
}

/* ----------------------------------------------------------
   OBRA CARD DATA — sync i18n translations into data attributes
   This lets the modal read the correct translated text.
   ---------------------------------------------------------- */
function syncCardData() {
  document.querySelectorAll('.obra-card').forEach(card => {
    const titleEl    = card.querySelector('.obra-card-title');
    const locationEl = card.querySelector('.obra-card-location span');
    const descEl     = card.querySelector('.obra-card-desc');
    const materialEl = card.querySelector('.obra-card-material');

    if (titleEl)    card.dataset.title    = titleEl.textContent;
    if (locationEl) card.dataset.location = locationEl.textContent;
    if (descEl)     card.dataset.desc     = descEl.textContent;
    if (materialEl) card.dataset.material = materialEl.textContent;
  });
}

/* ----------------------------------------------------------
   PAGE LOADER
   ---------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  function hideLoader() {
    loader.classList.add('hidden');
  }

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 300);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 300));
  }
}

/* ----------------------------------------------------------
   IMAGE SKELETON — fade in on load
   ---------------------------------------------------------- */
function initImageFade() {
  document.querySelectorAll('.obra-card-img img').forEach(img => {
    if (img.complete && img.naturalWidth) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });
}

/* ----------------------------------------------------------
   NAV INDICATOR — sliding blue underline
   ---------------------------------------------------------- */
function initNavIndicator() {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;

  const indicator = document.createElement('span');
  indicator.className = 'nav-indicator';
  nav.appendChild(indicator);

  function moveTo(el) {
    indicator.style.width   = el.offsetWidth + 'px';
    indicator.style.transform = `translateX(${el.offsetLeft}px)`;
    indicator.style.opacity = '1';
  }

  function toActive() {
    const active = nav.querySelector('a.active');
    if (active) moveTo(active);
    else indicator.style.opacity = '0';
  }

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseenter', () => moveTo(a));
    a.addEventListener('mouseleave', toActive);
  });

  toActive();

  // Keep indicator in sync when active section changes
  window.addEventListener('scroll', toActive, { passive: true });
}

/* ----------------------------------------------------------
   LANG PILL — sliding indicator
   ---------------------------------------------------------- */
function moveLangPill(selector) {
  const pill   = selector.querySelector('.lang-pill');
  const active = selector.querySelector('.lang-btn.active');
  if (!pill || !active) return;
  pill.style.width  = active.offsetWidth  + 'px';
  pill.style.height = active.offsetHeight + 'px';
  pill.style.transform = `translateX(${active.offsetLeft - 3}px)`;
}

function initLangPills() {
  document.querySelectorAll('.lang-selector, .mobile-lang').forEach(selector => {
    moveLangPill(selector);
    selector.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => requestAnimationFrame(() => moveLangPill(selector)));
    });
  });
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();

  // Populate artworks array from HTML data
  artworks.push(...getArtworks());

  initNavbar();
  initMobileMenu();
  initReveal();
  initSmoothScroll();
  initHeroScroll();
  initTabs();        // tabs before cards so map is lazy
  initObraCards();
  initObraRows();
  initTimeline();
  // Map is now lazy (initMap called when Mapa tab is clicked)
  initGallery();
  initContactForm();
  setTimeout(initLangPills, 30);
  setTimeout(initNavIndicator, 30);
  initImageFade();

  setTimeout(syncCardData, 20);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(syncCardData, 20));
  });
});
