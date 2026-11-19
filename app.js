/**
 * CALL TIGER — ENHANCED APPLICATION CONTROLLER
 * Implements Client Portal (Pages 1–6), Consultant Collaboration Network & Admin Portal (Admin Pages 1–3)
 */

const AppState = {
  mode: 'client', // 'client' | 'admin'
  currentView: 'home',
  historyStack: [],
  layoutMode: 'list', // 'list' (1-col detailed) | 'grid' (2-col executive cards)
  homeSearchQuery: '',
  homeHotTab: 'ALL', // 'ALL' | 'COMMERCIAL' | 'RESIDENTIAL'
  filters: {
    area: 'ALL',
    search: '',
    sortOrder: 'DESC', // 'ASC' (Low to High) | 'DESC' (High to Low)
    residentialType: 'ALL', // 'ALL' | 'SITE' | 'HOME'
    scaleType: 'ALL', // 'ALL' | 'SITE' | 'BUILDING'
    workstationBracket: 'ALL', // 'ALL' | '50-100' | '100-200' | '200-500' | '500-5000'
    landClassification: 'ALL', // 'ALL' | 'Agricultural Land' | 'Industrial Land' | 'Converted Land' | 'Within City Land'
    bhkFilter: 'ALL', // 'ALL' | '3 BHK' | '4 BHK' | '5 BHK' | '6+ BHK'
    hotCommBracket: 'ALL', // 'ALL' | '5-10' | '10-20' | '20-50' | '50-100'
    hotResBracket: 'ALL' // 'ALL' | '0-10' | '10-20' | '20-50' | '50-200'
  },
  admin: {
    activeFormType: 'bungalow_building',
    editingPropertyId: null,
    pendingImageUrl: '',
    searchQuery: '',
    categoryFilter: 'ALL'
  }
};

// ============================================================================
// CUSTOM ARCHITECTURAL SVG ICONS
// ============================================================================
const SEGMENT_ICONS = {
  'office-space': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>`,
  'land': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
  'comm-10-50': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/></svg>`,
  'comm-50-1000': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/></svg>`,
  'gated-community': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  'beautiful-bungalows': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  'site-below-4000': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
  'site-above-4000': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M2 12h20M12 2v20"/><circle cx="12" cy="12" r="3"/></svg>`,
  'hot-commercial': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  'hot-residential': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`
};

// ============================================================================
// VIEW METADATA DEFINITIONS (Matching Wireframes Pages 1 to 6)
// ============================================================================
const VIEW_CONFIGS = {
  'commercial': {
    title: 'Commercial Properties',
    subtitle: 'All Commercial Buildings, Pre-Leased Retail Assets, Showrooms, Offices & Commercial Plots'
  },
  'residential': {
    title: 'Residential Properties',
    subtitle: 'All Luxury Bungalows, Independent Homes, Gated Enclave Villas & Residential Plots'
  },
  'office-space': {
    title: 'Office Space',
    subtitle: 'Plug & Play Floors, Corporate Suites & Enterprise Campuses (50 to 5,000 Workstations)'
  },
  'land': {
    title: 'Land Parcels & Acreage',
    subtitle: 'Agricultural, Industrial, DC Converted & Within-City Development Land Banks'
  },
  'comm-10-50': {
    title: 'Commercial 10 – 50 Cr',
    subtitle: 'Mid-Cap Pre-Leased Buildings, Boutique Floors & Prime Commercial Sites (₹10 Cr – ₹50 Cr)'
  },
  'comm-50-1000': {
    title: 'Commercial 50 – 1000 Cr',
    subtitle: 'Institutional Towers, IT Campuses & Trophy Commercial Assets (₹50 Cr – ₹1,000 Cr)'
  },
  'gated-community': {
    title: 'Gated Community',
    subtitle: 'Ultra-Secure Gated Enclave Plots & Signature Gated Community Villas/Buildings'
  },
  'beautiful-bungalows': {
    title: 'Beautiful Bungalows',
    subtitle: 'Independent Luxury Mansions, Heritage Bungalows & Architect-Designed Residences'
  },
  'site-below-4000': {
    title: 'Site Below 4000 sq.ft',
    subtitle: 'Prime BDA & Gated Plots Under 4,000 sq.ft (30×40, 40×60, 45×80 ft)'
  },
  'site-above-4000': {
    title: 'Site Above 4000 sq.ft',
    subtitle: 'Large Format Estate Plots & Trophy Sites 4,000 sq.ft and Above (60×80, 80×120 ft+)'
  },
  'hot-commercial': {
    title: 'Hot Commercial Properties of All Areas',
    subtitle: 'Priority High-Yield & Trophy Commercial Listings Across Price Brackets'
  },
  'hot-residential': {
    title: 'Hot Residential Properties of All Areas',
    subtitle: 'Priority Luxury Residential Bungalows, Plots & Villa Listings Across Price Brackets'
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatPriceCr(num) {
  const val = parseFloat(num);
  if (isNaN(val)) return 'Price on Request';
  return `₹ ${val % 1 === 0 ? val.toFixed(0) : val.toFixed(2).replace(/0$/, '')} Cr`;
}

function formatNumber(num) {
  const val = parseFloat(num);
  if (isNaN(val)) return num || '—';
  return val.toLocaleString('en-IN');
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3400);
}

function resetViewFilters(defaultSort = 'DESC') {
  AppState.filters = {
    area: 'ALL',
    search: '',
    sortOrder: defaultSort,
    residentialType: 'ALL',
    scaleType: 'ALL',
    workstationBracket: 'ALL',
    landClassification: 'ALL',
    bhkFilter: 'ALL',
    hotCommBracket: 'ALL',
    hotResBracket: 'ALL'
  };
}

// ============================================================================
// NAVIGATION & ROUTING ENGINE
// ============================================================================
function navigateToView(viewName, pushHistory = true) {
  if (pushHistory && AppState.currentView !== viewName) {
    AppState.historyStack.push(AppState.currentView);
  }
  AppState.mode = 'client';
  AppState.currentView = viewName;

  const lowToHighDefaultViews = ['comm-10-50', 'comm-50-1000', 'site-below-4000', 'site-above-4000', 'gated-community'];
  resetViewFilters(lowToHighDefaultViews.includes(viewName) ? 'ASC' : 'DESC');

  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateBack() {
  if (AppState.historyStack.length > 0) {
    const prev = AppState.historyStack.pop();
    AppState.currentView = prev;
    resetViewFilters();
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    navigateToHome();
  }
}

function navigateToHome() {
  AppState.mode = 'client';
  AppState.currentView = 'home';
  AppState.historyStack = [];
  AppState.homeSearchQuery = '';
  resetViewFilters();
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleAdminMode() {
  AppState.mode = AppState.mode === 'admin' ? 'client' : 'admin';
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================================
// FILTERING & SEGMENT MATCHING ENGINE
// ============================================================================
function getBasePropertiesForView(viewName, allProps) {
  switch (viewName) {
    case 'commercial':
      return allProps.filter(p => p.primaryGroup === 'Commercial');

    case 'residential':
      return allProps.filter(p => p.primaryGroup === 'Residential');

    case 'office-space':
      return allProps.filter(p => p.formType === 'office_space' || p.subCategory === 'office_space');

    case 'land':
      return allProps.filter(p => p.formType === 'land' || p.subCategory === 'land_parcel');

    case 'comm-10-50':
      return allProps.filter(p => p.primaryGroup === 'Commercial' && p.priceCr >= 10 && p.priceCr <= 50);

    case 'comm-50-1000':
      return allProps.filter(p => p.primaryGroup === 'Commercial' && p.priceCr > 50 && p.priceCr <= 1000);

    case 'gated-community':
      return allProps.filter(
        p => p.subCategory === 'gated_community_site' || p.subCategory === 'gated_community_building'
      );

    case 'beautiful-bungalows':
      return allProps.filter(
        p => p.subCategory === 'beautiful_bungalow' || p.formType === 'bungalow_building'
      );

    case 'site-below-4000':
      return allProps.filter(p => p.formType === 'site' && Number(p.plotSize) > 0 && Number(p.plotSize) < 4000);

    case 'site-above-4000':
      return allProps.filter(p => p.formType === 'site' && Number(p.plotSize) >= 4000);

    case 'hot-commercial':
      return allProps.filter(p => Boolean(p.hotCommercial));

    case 'hot-residential':
      return allProps.filter(p => Boolean(p.hotResidential));

    default:
      return allProps;
  }
}

function getFilteredAndSortedProperties(viewName) {
  const allProps = CallTigerStore.getProperties();
  let list = getBasePropertiesForView(viewName, allProps);
  const f = AppState.filters;

  // 1. Area Filter
  if (f.area !== 'ALL') {
    list = list.filter(p => p.area === f.area);
  }

  // 2. Keyword Search within View
  if (f.search && f.search.trim()) {
    const q = f.search.trim().toLowerCase();
    list = list.filter(
      p =>
        p.id.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        (p.details && p.details.toLowerCase().includes(q))
    );
  }

  // 3. Residential Type Switch (Site vs Home / Bungalow on Page 2 Residential View)
  if (viewName === 'residential' && f.residentialType !== 'ALL') {
    if (f.residentialType === 'SITE') {
      list = list.filter(p => p.formType === 'site' || p.formType === 'land');
    } else if (f.residentialType === 'HOME') {
      list = list.filter(p => p.formType === 'bungalow_building');
    }
  }

  // 4. Scale Type Switch (Site vs Building on Comm 10-50, Comm 50-1000, Gated Community)
  if (['comm-10-50', 'comm-50-1000', 'gated-community'].includes(viewName) && f.scaleType !== 'ALL') {
    if (f.scaleType === 'SITE') {
      list = list.filter(p => p.formType === 'site' || p.formType === 'land');
    } else if (f.scaleType === 'BUILDING') {
      list = list.filter(p => ['commercial_building', 'office_space', 'bungalow_building'].includes(p.formType));
    }
  }

  // 5. Workstation Capacity Filter (Office Space View — Page 4)
  if (viewName === 'office-space' && f.workstationBracket !== 'ALL') {
    const [minW, maxW] = f.workstationBracket.split('-').map(Number);
    list = list.filter(p => {
      const w = Number(p.workstations) || 0;
      return w >= minW && w <= maxW;
    });
  }

  // 6. Land Classification Filter (Land View — Page 5)
  if (viewName === 'land' && f.landClassification !== 'ALL') {
    list = list.filter(p => p.landType === f.landClassification);
  }

  // 7. BHK Filter (Beautiful Bungalows View — Admin Page 1 spec)
  if (viewName === 'beautiful-bungalows' && f.bhkFilter !== 'ALL') {
    list = list.filter(p => p.bhk === f.bhkFilter);
  }

  // 8. Hot Commercial Price Brackets (5-10, 10-20, 20-50, 50-100 Cr — Page 6)
  if (viewName === 'hot-commercial' && f.hotCommBracket !== 'ALL') {
    const [minP, maxP] = f.hotCommBracket.split('-').map(Number);
    list = list.filter(p => p.priceCr >= minP && p.priceCr <= maxP);
  }

  // 9. Hot Residential Price Brackets (0-10, 10-20, 20-50, 50-200 Cr — Page 6)
  if (viewName === 'hot-residential' && f.hotResBracket !== 'ALL') {
    const [minP, maxP] = f.hotResBracket.split('-').map(Number);
    list = list.filter(p => p.priceCr >= minP && p.priceCr <= maxP);
  }

  // 10. Sort by Price (Low to High / High to Low)
  list.sort((a, b) => {
    const pa = Number(a.priceCr) || 0;
    const pb = Number(b.priceCr) || 0;
    return f.sortOrder === 'ASC' ? pa - pb : pb - pa;
  });

  return list;
}

// ============================================================================
// RENDERING: HOME PAGE (Page 1 Wireframe + Collaboration Vault + Hot Preview)
// ============================================================================
function renderHomePage() {
  const letter = CallTigerStore.getLetter();
  const allProps = CallTigerStore.getProperties();

  const countFor = (viewKey) => getBasePropertiesForView(viewKey, allProps).length;
  const directCount = allProps.filter(p => p.mandate === 'Direct').length;
  const indirectCount = allProps.length - directCount;
  const totalValueCr = Math.round(allProps.reduce((acc, p) => acc + (Number(p.priceCr) || 0), 0));

  const segments = [
    {
      key: 'office-space',
      index: '01 • CORPORATE WORKSPACE',
      name: 'Office Space',
      desc: '50–100, 100–200, 200–500 & 500–5000 Workstations',
      hot: false
    },
    {
      key: 'land',
      index: '02 • LAND BANKS & ACREAGE',
      name: 'Land',
      desc: 'Agricultural, Industrial, Converted & Within City Land',
      hot: false
    },
    {
      key: 'comm-10-50',
      index: '03 • MID-CAP COMMERCIAL',
      name: 'Commercial 10 – 50 Cr',
      desc: 'Commercial Sites & Yielding Buildings (₹10 Cr – ₹50 Cr)',
      hot: false
    },
    {
      key: 'comm-50-1000',
      index: '04 • INSTITUTIONAL COMMERCIAL',
      name: 'Commercial 50 – 1000 Cr',
      desc: 'Trophy Towers, Campuses & Large Sites (₹50 Cr – ₹1000 Cr)',
      hot: false
    },
    {
      key: 'gated-community',
      index: '05 • SECURE ENCLAVES',
      name: 'Gated Community',
      desc: 'Gated Community Villa Plots & Built Luxury Villas',
      hot: false
    },
    {
      key: 'beautiful-bungalows',
      index: '06 • SIGNATURE RESIDENCES',
      name: 'Beautiful Bungalows',
      desc: 'Independent Luxury Bungalows & Legacy Compounds',
      hot: false
    },
    {
      key: 'site-below-4000',
      index: '07 • PRIME PLOTS (< 4000 SQ.FT)',
      name: 'Site Below 4000 sq.ft',
      desc: 'BDA & Gated Plots under 4,000 sq.ft (30×40, 40×60 ft)',
      hot: false
    },
    {
      key: 'site-above-4000',
      index: '08 • ESTATE PLOTS (≥ 4000 SQ.FT)',
      name: 'Site Above 4000 sq.ft',
      desc: 'Large Residential & Commercial Plots ≥ 4,000 sq.ft',
      hot: false
    },
    {
      key: 'hot-commercial',
      index: '09 • PRIORITY COMMERCIAL DEALS',
      name: 'Hot Commercial',
      desc: 'Price Filters: 5–10 Cr • 10–20 Cr • 20–50 Cr • 50–100 Cr',
      hot: true
    },
    {
      key: 'hot-residential',
      index: '10 • PRIORITY RESIDENTIAL DEALS',
      name: 'Hot Residential',
      desc: 'Price Filters: 0–10 Cr • 10–20 Cr • 20–50 Cr • 50–200 Cr',
      hot: true
    }
  ];

  // Filter Home Search Results if user typed in the quick search box
  const homeQuery = AppState.homeSearchQuery.trim().toLowerCase();
  const quickSearchMatches = homeQuery
    ? allProps.filter(
        p =>
          p.id.toLowerCase().includes(homeQuery) ||
          p.title.toLowerCase().includes(homeQuery) ||
          p.area.toLowerCase().includes(homeQuery) ||
          (p.details && p.details.toLowerCase().includes(homeQuery))
      )
    : [];

  // Featured Hot Listings for Home Page Showcase
  let featuredHot = allProps.filter(p => p.hotCommercial || p.hotResidential);
  if (AppState.homeHotTab === 'COMMERCIAL') {
    featuredHot = featuredHot.filter(p => p.hotCommercial);
  } else if (AppState.homeHotTab === 'RESIDENTIAL') {
    featuredHot = featuredHot.filter(p => p.hotResidential);
  }

  return `
    <!-- 1. HERO: FOUNDER'S LETTER & COLLABORATION VAULT -->
    <div class="home-hero-grid">
      <!-- Left: <FoundersLetterBox /> -->
      <section class="founders-letter-box" aria-label="Founder's Letter">
        <div>
          <div class="letter-top-bar">
            <span class="letter-badge">✉ ${escapeHtml(letter.badge)}</span>
            <button type="button" class="btn-edit-letter-inline" onclick="openLetterModal()">
              ✎ Edit Letter
            </button>
          </div>
          <h1 class="letter-title">${escapeHtml(letter.title)}</h1>
          <p class="letter-salutation">${escapeHtml(letter.salutation)}</p>
          <div class="letter-body">${escapeHtml(letter.body)}</div>
        </div>

        <div class="letter-footer">
          <div>
            <div class="letter-signature-closing">${escapeHtml(letter.signoffClosing || 'Best regards,')}</div>
            <div class="letter-signature-name">${escapeHtml(letter.signoffName)}</div>
            <div class="letter-signature-role">${escapeHtml(letter.signoffTitle)}</div>
          </div>
          <div style="display:flex; gap:0.55rem; flex-wrap:wrap;">
            <button type="button" class="btn-prop-action call-tiger" onclick="openCollaborateModal()">
              + Cross-Share a Property
            </button>
          </div>
        </div>
      </section>

      <!-- Right: Consultant Collaboration & Transparent Listing Vault -->
      <aside class="collaboration-vault-card" aria-label="Collaboration Network Overview">
        <div>
          <span class="letter-badge" style="background:rgba(229,180,91,0.16); color:#E5B45B; border-color:rgba(229,180,91,0.4);">
            HOW CALL TIGER WORKS
          </span>
          <h2 class="vault-title" style="margin-top:0.65rem;">Transparent Direct &amp; Indirect Deal Sharing</h2>
          <p class="vault-desc" style="margin-top:0.35rem;">
            Every listing on Call Tiger carries a verified source tag so consultants and buyers know exactly how the mandate is held:
          </p>
        </div>

        <div class="mandate-explainer-grid">
          <div class="explainer-item">
            <span class="explainer-dot direct"></span>
            <div>
              <div class="explainer-title">✓ Direct Listing (Owner Mandate)</div>
              <div class="explainer-sub">Sourced directly from the property owner. Open for direct buyers &amp; collaborating side-by-side consultants.</div>
            </div>
          </div>
          <div class="explainer-item">
            <span class="explainer-dot indirect"></span>
            <div>
              <div class="explainer-title">◆ Indirect Listing (Consultant Partner)</div>
              <div class="explainer-sub">Cross-shared by a trusted fellow real estate consultant. Protected mandate with joint deal closure.</div>
            </div>
          </div>
        </div>

        <div>
          <div class="vault-stats-strip" style="margin-bottom:1rem;">
            <div class="vault-stat">
              <span class="vault-stat-num">${allProps.length}</span>
              <span class="vault-stat-lbl">Live Listings</span>
            </div>
            <div class="vault-stat">
              <span class="vault-stat-num">${directCount} / ${indirectCount}</span>
              <span class="vault-stat-lbl">Direct / Indirect</span>
            </div>
            <div class="vault-stat">
              <span class="vault-stat-num">₹${formatNumber(totalValueCr)} Cr</span>
              <span class="vault-stat-lbl">Inventory Value</span>
            </div>
          </div>

          <button type="button" class="btn-share-listing-cta" onclick="openCollaborateModal()">
            <span>🤝 Share Your Property with Manjunath T R</span>
          </button>
        </div>
      </aside>
    </div>

    <!-- 2. INSTANT PORTFOLIO SEARCH BAR -->
    <div class="home-search-bar-wrap">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input
        type="search"
        id="home-quick-search-input"
        class="home-search-input"
        placeholder="Quick search across all ${allProps.length} properties by locality (e.g. Sadashivanagar, Indiranagar), ID (CT-COM-202), or keyword..."
        value="${escapeHtml(AppState.homeSearchQuery)}"
        oninput="handleHomeQuickSearch(this.value)"
      />
      ${
        homeQuery
          ? `<button type="button" class="btn-nav-wireframe" onclick="handleHomeQuickSearch('')">Clear Search</button>`
          : `<span style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted);">${CallTigerStore.getAreas().length} Prime Localities Active</span>`
      }
    </div>

    ${
      homeQuery
        ? `
      <div style="margin-bottom:2.75rem;">
        <div class="section-header-bar">
          <div>
            <span class="section-eyebrow">INSTANT SEARCH RESULTS</span>
            <h2 class="section-main-heading">Found ${quickSearchMatches.length} Matching Properties for "${escapeHtml(AppState.homeSearchQuery)}"</h2>
          </div>
        </div>
        <div class="property-list-container grid-2-col">
          ${
            quickSearchMatches.length > 0
              ? quickSearchMatches.map(renderPropertyCard).join('')
              : `<div class="empty-results-notice"><h3 class="empty-results-title">No Properties Match "${escapeHtml(AppState.homeSearchQuery)}"</h3></div>`
          }
        </div>
      </div>
    `
        : ''
    }

    <!-- 3. <CategorySwitchBar /> (Commercial & Residential Primary Buttons) -->
    <div class="section-header-bar">
      <div>
        <span class="section-eyebrow">PRIMARY PORTFOLIO DIVISIONS</span>
        <h2 class="section-main-heading">Explore by Core Real Estate Division</h2>
      </div>
      <span style="font-family:var(--font-mono); font-size:0.74rem; color:var(--text-muted);">CLICK DIVISION TO OPEN FULL DIRECTORY</span>
    </div>

    <section class="category-switch-bar" aria-label="Primary Real Estate Divisions">
      <button type="button" class="primary-category-btn" onclick="navigateToView('commercial')">
        <div class="cat-icon-circle">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/></svg>
        </div>
        <div class="cat-btn-body">
          <span class="cat-btn-title">Commercial</span>
          <span class="cat-btn-sub">Pre-Leased Buildings, Plug &amp; Play Offices, Showrooms &amp; Commercial Plots</span>
          <div class="cat-btn-tags">
            <span class="cat-mini-tag">All Areas Filter</span>
            <span class="cat-mini-tag">10–50 Cr &amp; 50–1000 Cr</span>
            <span class="cat-mini-tag">Yield &amp; Rental Assets</span>
          </div>
        </div>
        <div class="cat-btn-right">
          <span class="cat-btn-count">${countFor('commercial')} Listings</span>
          <span class="cat-btn-arrow">→</span>
        </div>
      </button>

      <button type="button" class="primary-category-btn" onclick="navigateToView('residential')">
        <div class="cat-icon-circle">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <div class="cat-btn-body">
          <span class="cat-btn-title">Residential</span>
          <span class="cat-btn-sub">Independent Bungalows, Gated Community Villas &amp; Prime BDA Plots</span>
          <div class="cat-btn-tags">
            <span class="cat-mini-tag">Site vs Home Switch</span>
            <span class="cat-mini-tag">Bungalows &amp; Villas</span>
            <span class="cat-mini-tag">Plots &lt;4000 &amp; ≥4000 sq.ft</span>
          </div>
        </div>
        <div class="cat-btn-right">
          <span class="cat-btn-count">${countFor('residential')} Listings</span>
          <span class="cat-btn-arrow">→</span>
        </div>
      </button>
    </section>

    <!-- 4. <SegmentLaunchGrid /> (10 Specialized Launchpad Buttons in 2 Columns) -->
    <div class="section-header-bar">
      <div>
        <span class="section-eyebrow">10 SPECIALIZED PROPERTY CATEGORIES</span>
        <h2 class="section-main-heading">Select Your Target Segment</h2>
      </div>
      <span style="font-family:var(--font-mono); font-size:0.74rem; color:var(--text-muted);">DEDICATED FILTERS &amp; SORTING ON EVERY SCREEN</span>
    </div>

    <section class="segment-launch-grid" aria-label="10 Property Segments">
      ${segments
        .map(
          seg => `
        <button type="button" class="segment-card ${seg.hot ? 'segment-hot' : ''}" onclick="navigateToView('${seg.key}')">
          <div class="segment-card-left">
            <div class="segment-icon-box" aria-hidden="true">
              ${SEGMENT_ICONS[seg.key] || ''}
            </div>
            <div class="segment-text-col">
              <span class="segment-index">${seg.hot ? '🔥 ' : ''}${escapeHtml(seg.index)}</span>
              <span class="segment-name">${escapeHtml(seg.name)}</span>
              <span class="segment-desc">${escapeHtml(seg.desc)}</span>
            </div>
          </div>
          <div class="segment-card-right">
            <span class="segment-badge-count">${countFor(seg.key)} Listings</span>
            <span class="segment-enter-label">Explore →</span>
          </div>
        </button>
      `
        )
        .join('')}
    </section>

    <!-- 5. FEATURED HOT LISTINGS SHOWCASE ON HOME PAGE -->
    <div class="section-header-bar" style="margin-top:1rem;">
      <div>
        <span class="section-eyebrow" style="color:var(--accent-hot);">🔥 PRIORITY MANDATE FEED</span>
        <h2 class="section-main-heading">Featured Hot Commercial &amp; Hot Residential Listings</h2>
      </div>
      <div class="chip-bar">
        <button type="button" class="filter-chip hot-chip ${AppState.homeHotTab === 'ALL' ? 'active' : ''}" onclick="AppState.homeHotTab='ALL'; renderApp();">
          All Hot Deals
        </button>
        <button type="button" class="filter-chip hot-chip ${AppState.homeHotTab === 'COMMERCIAL' ? 'active' : ''}" onclick="AppState.homeHotTab='COMMERCIAL'; renderApp();">
          Hot Commercial (${countFor('hot-commercial')})
        </button>
        <button type="button" class="filter-chip hot-chip ${AppState.homeHotTab === 'RESIDENTIAL' ? 'active' : ''}" onclick="AppState.homeHotTab='RESIDENTIAL'; renderApp();">
          Hot Residential (${countFor('hot-residential')})
        </button>
      </div>
    </div>

    <section class="property-list-container grid-2-col" aria-label="Featured Hot Deals">
      ${featuredHot.slice(0, 6).map(renderPropertyCard).join('')}
    </section>
  `;
}

function handleHomeQuickSearch(val) {
  AppState.homeSearchQuery = val;
  renderApp();
  const input = document.getElementById('home-quick-search-input');
  if (input) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
}

// ============================================================================
// RENDERING: FILTER COMPONENTS (Pages 2 to 6)
// ============================================================================
function renderAreaFilterChips(areas, viewName) {
  const current = AppState.filters.area;
  const baseProps = getBasePropertiesForView(viewName, CallTigerStore.getProperties());

  return `
    <div class="filter-group full-width">
      <span class="filter-label">Filter by Locality / Area</span>
      <div class="chip-bar">
        <button type="button" class="filter-chip ${current === 'ALL' ? 'active' : ''}" onclick="setFilter('area', 'ALL')">
          <span>All Areas</span>
          <span class="chip-count-bubble">${baseProps.length}</span>
        </button>
        ${areas
          .map(area => {
            const count = baseProps.filter(p => p.area === area).length;
            return `
              <button type="button" class="filter-chip ${current === area ? 'active' : ''}" onclick="setFilter('area', '${escapeHtml(area.replace(/'/g, "\\'"))}')">
                <span>${escapeHtml(area)}</span>
                <span class="chip-count-bubble">${count}</span>
              </button>
            `;
          })
          .join('')}
      </div>
    </div>
  `;
}

function renderAreaDropdownSelector(areas, viewName) {
  const current = AppState.filters.area;
  const baseProps = getBasePropertiesForView(viewName, CallTigerStore.getProperties());

  return `
    <div class="filter-group">
      <label class="filter-label" for="area-dropdown-select">Area-Wise Filter</label>
      <select id="area-dropdown-select" class="area-dropdown-select" onchange="setFilter('area', this.value)">
        <option value="ALL" ${current === 'ALL' ? 'selected' : ''}>All Areas (${baseProps.length} Listings)</option>
        ${areas
          .map(area => {
            const count = baseProps.filter(p => p.area === area).length;
            return `
              <option value="${escapeHtml(area)}" ${current === area ? 'selected' : ''}>
                ${escapeHtml(area)} (${count})
              </option>
            `;
          })
          .join('')}
      </select>
    </div>
  `;
}

function renderSortToggleButtons() {
  const current = AppState.filters.sortOrder;
  return `
    <div class="filter-group">
      <span class="filter-label">Sort by Price (₹ Crores)</span>
      <div class="chip-bar">
        <button type="button" class="filter-chip sort-chip ${current === 'ASC' ? 'active' : ''}" onclick="setFilter('sortOrder', 'ASC')">
          ↑ Low to High
        </button>
        <button type="button" class="filter-chip sort-chip ${current === 'DESC' ? 'active' : ''}" onclick="setFilter('sortOrder', 'DESC')">
          ↓ High to Low
        </button>
      </div>
    </div>
  `;
}

function renderFilterDeckForView(viewName) {
  const areas = CallTigerStore.getAreas();
  const f = AppState.filters;

  const usesDropdownArea = ['comm-10-50', 'comm-50-1000', 'hot-commercial', 'hot-residential'].includes(viewName);

  let specializedControlsHtml = '';

  // 1. Residential View (Page 2): [ Site ] vs [ Home ]
  if (viewName === 'residential') {
    specializedControlsHtml = `
      <div class="filter-group">
        <span class="filter-label">Property Type (Site vs Home)</span>
        <div class="chip-bar">
          <button type="button" class="filter-chip ${f.residentialType === 'ALL' ? 'active' : ''}" onclick="setFilter('residentialType', 'ALL')">All Residential</button>
          <button type="button" class="filter-chip ${f.residentialType === 'SITE' ? 'active' : ''}" onclick="setFilter('residentialType', 'SITE')">Site (Plots)</button>
          <button type="button" class="filter-chip ${f.residentialType === 'HOME' ? 'active' : ''}" onclick="setFilter('residentialType', 'HOME')">Home / Bungalow</button>
        </div>
      </div>
    `;
  }

  // 2. Commercial 10-50 Cr, 50-1000 Cr, & Gated Community (Pages 3 & 4): [ Site ] vs [ Building ]
  if (['comm-10-50', 'comm-50-1000', 'gated-community'].includes(viewName)) {
    specializedControlsHtml = `
      <div class="filter-group">
        <span class="filter-label">Asset Configuration (Site vs Building)</span>
        <div class="chip-bar">
          <button type="button" class="filter-chip ${f.scaleType === 'ALL' ? 'active' : ''}" onclick="setFilter('scaleType', 'ALL')">All (Site &amp; Building)</button>
          <button type="button" class="filter-chip ${f.scaleType === 'SITE' ? 'active' : ''}" onclick="setFilter('scaleType', 'SITE')">Site</button>
          <button type="button" class="filter-chip ${f.scaleType === 'BUILDING' ? 'active' : ''}" onclick="setFilter('scaleType', 'BUILDING')">Building</button>
        </div>
      </div>
    `;
  }

  // 3. Office Space (Page 4): Workstation Capacity Brackets
  if (viewName === 'office-space') {
    const brackets = [
      { id: 'ALL', label: 'All Capacities' },
      { id: '50-100', label: '50 – 100 Workstations' },
      { id: '100-200', label: '100 – 200 Workstations' },
      { id: '200-500', label: '200 – 500 Workstations' },
      { id: '500-5000', label: '500 – 5000 Workstations' }
    ];
    specializedControlsHtml = `
      <div class="filter-group full-width">
        <span class="filter-label">Workstation Capacity Filter</span>
        <div class="chip-bar">
          ${brackets
            .map(
              b => `
            <button type="button" class="filter-chip ${f.workstationBracket === b.id ? 'active' : ''}" onclick="setFilter('workstationBracket', '${b.id}')">
              ${escapeHtml(b.label)}
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  // 4. Beautiful Bungalows (Page 5 + Admin Page 1 BHK filter)
  if (viewName === 'beautiful-bungalows') {
    const bhks = ['ALL', '3 BHK', '4 BHK', '5 BHK', '6+ BHK'];
    specializedControlsHtml = `
      <div class="filter-group">
        <span class="filter-label">BHK Configuration Filter</span>
        <div class="chip-bar">
          ${bhks
            .map(
              b => `
            <button type="button" class="filter-chip ${f.bhkFilter === b ? 'active' : ''}" onclick="setFilter('bhkFilter', '${b}')">
              ${b === 'ALL' ? 'All BHKs' : escapeHtml(b)}
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  // 5. Land View (Page 5): Agricultural, Industrial, Converted, Within City Land
  if (viewName === 'land') {
    const landTypes = [
      { id: 'ALL', label: 'All Land Types' },
      { id: 'Agricultural Land', label: 'Agricultural Land' },
      { id: 'Converted Land', label: 'Converted Land' },
      { id: 'Industrial Land', label: 'Industrial Land' },
      { id: 'Within City Land', label: 'Within City Land' }
    ];
    specializedControlsHtml = `
      <div class="filter-group full-width">
        <span class="filter-label">Land Classification</span>
        <div class="chip-bar">
          ${landTypes
            .map(
              lt => `
            <button type="button" class="filter-chip ${f.landClassification === lt.id ? 'active' : ''}" onclick="setFilter('landClassification', '${lt.id}')">
              ${escapeHtml(lt.label)}
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  // 6. Hot Commercial (Page 6): 5-10 Cr, 10-20 Cr, 20-50 Cr, 50-100 Cr
  if (viewName === 'hot-commercial') {
    const brackets = [
      { id: 'ALL', label: 'All Brackets' },
      { id: '5-10', label: '5 – 10 Cr' },
      { id: '10-20', label: '10 – 20 Cr' },
      { id: '20-50', label: '20 – 50 Cr' },
      { id: '50-100', label: '50 – 100 Cr' }
    ];
    specializedControlsHtml = `
      <div class="filter-group full-width">
        <span class="filter-label">Hot Commercial Price Filters</span>
        <div class="chip-bar">
          ${brackets
            .map(
              b => `
            <button type="button" class="filter-chip hot-chip ${f.hotCommBracket === b.id ? 'active' : ''}" onclick="setFilter('hotCommBracket', '${b.id}')">
              ${escapeHtml(b.label)}
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  // 7. Hot Residential (Page 6): 0-10 Cr, 10-20 Cr, 20-50 Cr, 50-200 Cr
  if (viewName === 'hot-residential') {
    const brackets = [
      { id: 'ALL', label: 'All Brackets' },
      { id: '0-10', label: '0 – 10 Cr' },
      { id: '10-20', label: '10 – 20 Cr' },
      { id: '20-50', label: '20 – 50 Cr' },
      { id: '50-200', label: '50 – 200 Cr' }
    ];
    specializedControlsHtml = `
      <div class="filter-group full-width">
        <span class="filter-label">Hot Residential Price Filters</span>
        <div class="chip-bar">
          ${brackets
            .map(
              b => `
            <button type="button" class="filter-chip hot-chip ${f.hotResBracket === b.id ? 'active' : ''}" onclick="setFilter('hotResBracket', '${b.id}')">
              ${escapeHtml(b.label)}
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  return `
    <section class="filter-deck" aria-label="Property Filters and Sorting">
      ${!usesDropdownArea ? renderAreaFilterChips(areas, viewName) : ''}
      <div class="filter-row">
        ${usesDropdownArea ? renderAreaDropdownSelector(areas, viewName) : ''}
        ${specializedControlsHtml}
        ${renderSortToggleButtons()}
      </div>
    </section>
  `;
}

function setFilter(key, value) {
  AppState.filters[key] = value;
  renderApp();
}

// ============================================================================
// RENDERING: <PropertyCard />
// ============================================================================
function getCategoryLabel(prop) {
  const map = {
    'beautiful_bungalow': 'Beautiful Bungalow',
    'residential_building': 'Residential Building',
    'gated_community_building': 'Gated Community Building',
    'residential_site': 'Residential Site',
    'gated_community_site': 'Gated Community Site',
    'commercial_site': 'Commercial Site',
    'commercial_building': 'Commercial Building',
    'office_space': 'Office Space',
    'land_parcel': 'Land Parcel'
  };
  return map[prop.subCategory] || prop.primaryGroup || 'Listing';
}

function renderSpecGridForProperty(prop) {
  let cells = [];

  if (prop.formType === 'bungalow_building') {
    cells = [
      { k: 'Configuration', v: prop.bhk || 'Luxury Residence' },
      { k: 'Plot Area', v: `${formatNumber(prop.plotArea)} sq.ft` },
      { k: 'Built-Up Area', v: `${formatNumber(prop.builtUpArea)} sq.ft` },
      { k: 'Plot Facing', v: prop.facing || 'East / North' }
    ];
  } else if (prop.formType === 'site') {
    const plotSqft = Number(prop.plotSize) || 0;
    const ratePerSqft = plotSqft > 0 ? Math.round((Number(prop.priceCr) * 10000000) / plotSqft) : 0;
    cells = [
      { k: 'Plot Size', v: `${formatNumber(plotSqft)} sq.ft` },
      { k: 'Dimensions', v: prop.dimensions || 'Standard Plot' },
      { k: 'Plot Facing', v: prop.facing || 'East' },
      { k: 'Approx. Rate', v: ratePerSqft > 0 ? `₹ ${formatNumber(ratePerSqft)} / sq.ft` : plotSqft < 4000 ? '< 4,000 sq.ft' : '≥ 4,000 sq.ft' }
    ];
  } else if (prop.formType === 'commercial_building') {
    cells = [
      { k: 'Plot Size', v: `${formatNumber(prop.plotArea)} sq.ft` },
      { k: 'Built-Up Area', v: `${formatNumber(prop.builtUpArea)} sq.ft` },
      { k: 'Rental Income', v: prop.rentalIncome || 'Vacant / Self-Use' },
      { k: 'Facing', v: prop.facing || 'Main Road Facing' }
    ];
  } else if (prop.formType === 'office_space') {
    cells = [
      { k: 'Workstations', v: `${formatNumber(prop.workstations)} Seats` },
      { k: 'Executive Cabins', v: `${formatNumber(prop.cabins)} Cabins` },
      { k: 'Grade / Fitout', v: 'Plug & Play Grade-A' },
      { k: 'Listing Source', v: `${prop.mandate || 'Direct'} Listing` }
    ];
  } else if (prop.formType === 'land') {
    cells = [
      { k: 'Survey No.', v: prop.surveyNo || 'On Request' },
      { k: 'Land Classification', v: prop.landType || 'Converted Land' },
      { k: 'Total Extent', v: `${prop.acres || '—'} Acres (${formatNumber(prop.sqFeet)} sq.ft)` },
      { k: 'Road Width', v: prop.roadWidth || '60 ft Road' },
      { k: 'Frontage / Rate', v: prop.frontage || 'Prime Frontage' }
    ];
  }

  return `
    <div class="prop-spec-grid">
      ${cells
        .map(
          c => `
        <div class="spec-cell">
          <span class="spec-key">${escapeHtml(c.k)}</span>
          <span class="spec-val">${escapeHtml(c.v)}</span>
        </div>
      `
        )
        .join('')}
    </div>
  `;
}

function renderPropertyCard(prop) {
  const letter = CallTigerStore.getLetter();
  const isHot = prop.hotCommercial || prop.hotResidential;
  const mandateClass = (prop.mandate || 'Direct').toLowerCase() === 'indirect' ? 'indirect' : 'direct';

  const whatsappText = encodeURIComponent(
    `Hi Manjunath (Call Tiger), I am interested in Property [${prop.id}] — ${prop.title} (${prop.area}) listed at ${formatPriceCr(prop.priceCr)} (${prop.mandate} Listing). Let's connect.`
  );
  const whatsappUrl = `https://wa.me/${letter.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappText}`;

  return `
    <article class="property-card ${isHot ? 'is-hot-deal' : ''}">
      <div>
        ${
          prop.imageUrl
            ? `<div class="prop-uploaded-image-wrap"><img src="${escapeHtml(prop.imageUrl)}" alt="${escapeHtml(prop.title)}" loading="lazy" /></div>`
            : ''
        }
        <div class="prop-card-top">
          <div class="prop-badges-left">
            <span class="prop-id-code">${escapeHtml(prop.id)}</span>
            <span class="prop-category-tag">${escapeHtml(getCategoryLabel(prop))}</span>
            <span class="mandate-badge ${mandateClass}">
              ${prop.mandate === 'Indirect' ? '◆ Indirect Listing' : '✓ Direct Listing'}
            </span>
            ${prop.hotCommercial ? `<span class="hot-deal-badge">🔥 Hot Commercial</span>` : ''}
            ${prop.hotResidential ? `<span class="hot-deal-badge">🔥 Hot Residential</span>` : ''}
          </div>
          <span class="prop-area-pill">📍 ${escapeHtml(prop.area)}</span>
        </div>

        <div class="prop-card-headline-row">
          <h2 class="prop-title">${escapeHtml(prop.title)}</h2>
          <div class="prop-valuation-box">
            <span class="prop-valuation-label">Asking Price</span>
            <span class="prop-valuation-amount">${formatPriceCr(prop.priceCr)}</span>
          </div>
        </div>

        ${renderSpecGridForProperty(prop)}

        <p class="prop-details-text">${escapeHtml(prop.details)}</p>
      </div>

      <div class="prop-card-actions">
        <span class="prop-confidential-note">
          ${prop.mandate === 'Indirect' ? 'SHARED BY PARTNER CONSULTANT • CALL TIGER VERIFIED' : 'DIRECT OWNER MANDATE • CALL TIGER VERIFIED'}
        </span>
        <div class="prop-action-buttons">
          <button type="button" class="btn-prop-action call-tiger" onclick="openEnquiryModal('${escapeHtml(prop.id)}')">
            📞 Call / Enquire
          </button>
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-prop-action whatsapp">
            💬 WhatsApp Manjunath
          </a>
        </div>
      </div>
    </article>
  `;
}

// ============================================================================
// RENDERING: LISTING VIEW (Pages 2 to 6)
// ============================================================================
function renderListingView(viewName) {
  const config = VIEW_CONFIGS[viewName] || {
    title: 'Property Listings',
    subtitle: 'Verified High-Value Real Estate Inventory'
  };
  const filteredProps = getFilteredAndSortedProperties(viewName);

  return `
    <!-- <ListingNavBar /> ([ Back ] [ Home ] + Active Section Title + Layout Switch) -->
    <nav class="listing-nav-bar" aria-label="Listing Navigation">
      <div class="nav-buttons-group">
        <button type="button" class="btn-nav-wireframe" onclick="navigateBack()">
          ← Back
        </button>
        <button type="button" class="btn-nav-wireframe" onclick="navigateToHome()">
          ⌂ Home
        </button>
      </div>
      <div class="listing-title-wrap">
        <h1 class="listing-active-title">${escapeHtml(config.title)}</h1>
        <span class="listing-active-subtitle">${escapeHtml(config.subtitle)}</span>
      </div>
      <div class="listing-nav-right">
        <div class="layout-toggle-group" role="group" aria-label="Layout Switcher">
          <button
            type="button"
            class="layout-toggle-btn ${AppState.layoutMode === 'list' ? 'active' : ''}"
            onclick="AppState.layoutMode='list'; renderApp();"
          >
            ☰ List
          </button>
          <button
            type="button"
            class="layout-toggle-btn ${AppState.layoutMode === 'grid' ? 'active' : ''}"
            onclick="AppState.layoutMode='grid'; renderApp();"
          >
            ⊞ 2-Col Grid
          </button>
        </div>
        <div class="listing-result-counter">
          ${filteredProps.length} ${filteredProps.length === 1 ? 'Listing' : 'Listings'}
        </div>
      </div>
    </nav>

    <!-- Filter & Sorting Controls -->
    ${renderFilterDeckForView(viewName)}

    <!-- <PropertyListContainer /> -->
    <section
      class="property-list-container ${AppState.layoutMode === 'grid' ? 'grid-2-col' : ''}"
      aria-label="List of Properties"
    >
      ${
        filteredProps.length > 0
          ? filteredProps.map(renderPropertyCard).join('')
          : `
        <div class="empty-results-notice">
          <h3 class="empty-results-title">No Matching Listings in This Filter Combination</h3>
          <p class="empty-results-sub">
            Try switching the Area filter back to "All Areas" or resetting the bracket filter, or add a new property in the Admin Portal.
          </p>
          <button type="button" class="btn-nav-wireframe" onclick="resetViewFilters('${AppState.filters.sortOrder}'); renderApp();">
            Reset Active Filters
          </button>
        </div>
      `
      }
    </section>
  `;
}

// ============================================================================
// RENDERING: ADMIN PORTAL (Admin Pages 1 to 3)
// ============================================================================
function renderAdminSpecificFields(formType, editingProp) {
  const p = editingProp || {};

  if (formType === 'bungalow_building') {
    return `
      <div class="form-field">
        <label>Sub-Category (Bungalow / Res Building / Gated Building)</label>
        <select name="subCategory" class="admin-select" required>
          <option value="beautiful_bungalow" ${p.subCategory === 'beautiful_bungalow' ? 'selected' : ''}>Beautiful Bungalow</option>
          <option value="residential_building" ${p.subCategory === 'residential_building' ? 'selected' : ''}>Residential Building</option>
          <option value="gated_community_building" ${p.subCategory === 'gated_community_building' ? 'selected' : ''}>Gated Community Building</option>
        </select>
      </div>
      <div class="form-field">
        <label>BHK Configuration (Filterable)</label>
        <select name="bhk" class="admin-select" required>
          <option value="3 BHK" ${p.bhk === '3 BHK' ? 'selected' : ''}>3 BHK</option>
          <option value="4 BHK" ${!p.bhk || p.bhk === '4 BHK' ? 'selected' : ''}>4 BHK</option>
          <option value="5 BHK" ${p.bhk === '5 BHK' ? 'selected' : ''}>5 BHK</option>
          <option value="6+ BHK" ${p.bhk === '6+ BHK' ? 'selected' : ''}>6+ BHK / Mansion</option>
        </select>
      </div>
      <div class="form-field">
        <label>Plot Area (sq.ft) *</label>
        <input type="number" name="plotArea" class="admin-input" placeholder="e.g. 4800" value="${escapeHtml(p.plotArea || '')}" required />
      </div>
      <div class="form-field">
        <label>Built-Up Area (sq.ft) *</label>
        <input type="number" name="builtUpArea" class="admin-input" placeholder="e.g. 6500" value="${escapeHtml(p.builtUpArea || '')}" required />
      </div>
      <div class="form-field span-2">
        <label>Plot Facing *</label>
        <input type="text" name="facing" class="admin-input" placeholder="e.g. North-East / East / North" value="${escapeHtml(p.facing || 'East')}" required />
      </div>
    `;
  }

  if (formType === 'site') {
    return `
      <div class="form-field">
        <label>Site Category (Residential / Gated / Commercial Site)</label>
        <select name="subCategory" class="admin-select" required>
          <option value="residential_site" ${p.subCategory === 'residential_site' ? 'selected' : ''}>Residential Site</option>
          <option value="gated_community_site" ${p.subCategory === 'gated_community_site' ? 'selected' : ''}>Gated Community Site</option>
          <option value="commercial_site" ${p.subCategory === 'commercial_site' ? 'selected' : ''}>Commercial Site</option>
        </select>
      </div>
      <div class="form-field">
        <label>Plot Size (sq.ft) * (Auto-routes &lt;4000 vs ≥4000 sq.ft)</label>
        <input type="number" name="plotSize" class="admin-input" placeholder="e.g. 2400 or 6000" value="${escapeHtml(p.plotSize || '')}" required />
      </div>
      <div class="form-field">
        <label>Dimensions *</label>
        <input type="text" name="dimensions" class="admin-input" placeholder="e.g. 40 × 60 ft or 60 × 80 ft" value="${escapeHtml(p.dimensions || '')}" required />
      </div>
      <div class="form-field">
        <label>Facing *</label>
        <input type="text" name="facing" class="admin-input" placeholder="e.g. East / North-East Corner" value="${escapeHtml(p.facing || 'East')}" required />
      </div>
    `;
  }

  if (formType === 'commercial_building') {
    return `
      <input type="hidden" name="subCategory" value="commercial_building" />
      <div class="form-field">
        <label>Plot Size (sq.ft) *</label>
        <input type="number" name="plotArea" class="admin-input" placeholder="e.g. 6000" value="${escapeHtml(p.plotArea || '')}" required />
      </div>
      <div class="form-field">
        <label>Built-Up Area (sq.ft) *</label>
        <input type="number" name="builtUpArea" class="admin-input" placeholder="e.g. 22500" value="${escapeHtml(p.builtUpArea || '')}" required />
      </div>
      <div class="form-field">
        <label>Rental Income (Monthly Yield) *</label>
        <input type="text" name="rentalIncome" class="admin-input" placeholder="e.g. ₹ 18.50 Lakhs / month" value="${escapeHtml(p.rentalIncome || '')}" required />
      </div>
      <div class="form-field">
        <label>Facing *</label>
        <input type="text" name="facing" class="admin-input" placeholder="e.g. East / 100ft Main Road" value="${escapeHtml(p.facing || 'East')}" required />
      </div>
    `;
  }

  if (formType === 'office_space') {
    return `
      <input type="hidden" name="subCategory" value="office_space" />
      <div class="form-field">
        <label>Workstation Count * (50–100, 100–200, 200–500, 500–5000)</label>
        <input type="number" name="workstations" class="admin-input" placeholder="e.g. 150" value="${escapeHtml(p.workstations || '')}" required />
      </div>
      <div class="form-field">
        <label>Cabins Count *</label>
        <input type="number" name="cabins" class="admin-input" placeholder="e.g. 8" value="${escapeHtml(p.cabins || '')}" required />
      </div>
    `;
  }

  if (formType === 'land') {
    return `
      <input type="hidden" name="subCategory" value="land_parcel" />
      <div class="form-field">
        <label>Survey No. *</label>
        <input type="text" name="surveyNo" class="admin-input" placeholder="e.g. Sy. No. 142/2" value="${escapeHtml(p.surveyNo || '')}" required />
      </div>
      <div class="form-field">
        <label>Land Classification *</label>
        <select name="landType" class="admin-select" required>
          <option value="Agricultural Land" ${p.landType === 'Agricultural Land' ? 'selected' : ''}>Agricultural Land</option>
          <option value="Industrial Land" ${p.landType === 'Industrial Land' ? 'selected' : ''}>Industrial Land</option>
          <option value="Converted Land" ${p.landType === 'Converted Land' ? 'selected' : ''}>Converted Land</option>
          <option value="Within City Land" ${p.landType === 'Within City Land' ? 'selected' : ''}>Within City Land</option>
        </select>
      </div>
      <div class="form-field">
        <label>Frontage of Land / Rate per sq.ft *</label>
        <input type="text" name="frontage" class="admin-input" placeholder="e.g. 320 ft frontage (₹ 3,200 / sq.ft)" value="${escapeHtml(p.frontage || '')}" required />
      </div>
      <div class="form-field">
        <label>Road Width *</label>
        <input type="text" name="roadWidth" class="admin-input" placeholder="e.g. 80 ft CDP Road" value="${escapeHtml(p.roadWidth || '')}" required />
      </div>
      <div class="form-field">
        <label>Acres *</label>
        <input type="number" step="0.01" name="acres" class="admin-input" placeholder="e.g. 2.5" value="${escapeHtml(p.acres || '')}" oninput="autoCalcSqftFromAcres(this.value)" required />
      </div>
      <div class="form-field">
        <label>Sq.feet *</label>
        <input type="number" id="land-sqft-input" name="sqFeet" class="admin-input" placeholder="e.g. 108900" value="${escapeHtml(p.sqFeet || '')}" required />
      </div>
    `;
  }

  return '';
}

function autoCalcSqftFromAcres(acresVal) {
  const num = parseFloat(acresVal);
  const sqftInput = document.getElementById('land-sqft-input');
  if (!isNaN(num) && sqftInput) {
    sqftInput.value = Math.round(num * 43560);
  }
}

function handleAdminImageUpload(inputEl) {
  const file = inputEl.files && inputEl.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (evt) {
    AppState.admin.pendingImageUrl = evt.target.result;
    showToast('Property photo attached to form.');
  };
  reader.readAsDataURL(file);
}

function renderAdminPortal() {
  const allProps = CallTigerStore.getProperties();
  const areas = CallTigerStore.getAreas();
  const enquiries = CallTigerStore.getEnquiries();

  const commCount = allProps.filter(p => p.primaryGroup === 'Commercial').length;
  const resCount = allProps.filter(p => p.primaryGroup === 'Residential').length;
  const hotCount = allProps.filter(p => p.hotCommercial || p.hotResidential).length;
  const directCount = allProps.filter(p => p.mandate === 'Direct').length;
  const indirectCount = allProps.length - directCount;

  const activeForm = AppState.admin.activeFormType;
  const editingProp = AppState.admin.editingPropertyId
    ? allProps.find(p => p.id === AppState.admin.editingPropertyId)
    : null;

  const formTabs = [
    { id: 'bungalow_building', label: '1. Bungalow / Res / Gated Bldg', ref: 'Admin Page 1' },
    { id: 'site', label: '2. Residential / Gated / Comm Site', ref: 'Admin Page 2' },
    { id: 'commercial_building', label: '3. Commercial Building', ref: 'Admin Page 2' },
    { id: 'office_space', label: '4. Office Space', ref: 'Admin Page 3' },
    { id: 'land', label: '5. Land Parcel', ref: 'Admin Page 3' }
  ];

  const filteredTableProps = allProps.filter(p => {
    const q = AppState.admin.searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.id.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.area.toLowerCase().includes(q);
    const matchesCat =
      AppState.admin.categoryFilter === 'ALL' || p.formType === AppState.admin.categoryFilter;
    return matchesQuery && matchesCat;
  });

  return `
    <!-- Admin Portal Header -->
    <div class="admin-portal-header">
      <div>
        <span class="letter-badge">ADMINISTRATION &amp; INVENTORY ENGINE (ADMIN PAGES 1–3)</span>
        <h1 class="listing-active-title" style="margin-top:0.35rem;">Call Tiger Executive Admin Portal</h1>
      </div>
      <div class="header-actions">
        <button type="button" class="btn-header" onclick="openLetterModal()">
          ✎ Edit Founder's Letter
        </button>
        <button type="button" class="btn-header" onclick="resetDemoDataConfirm()">
          ↺ Reset Demo Inventory
        </button>
        <button type="button" class="btn-header btn-concierge" onclick="navigateToHome()">
          ← Return to Live Client Site
        </button>
      </div>
    </div>

    <!-- 1. <AdminDashboardStats /> -->
    <section class="admin-stats-grid" aria-label="Dashboard KPIs">
      <div class="admin-stat-card">
        <span class="stat-label">Total Active Listings</span>
        <div class="stat-value">${allProps.length}</div>
        <span class="stat-breakdown">Live across all 10 client segments</span>
      </div>
      <div class="admin-stat-card">
        <span class="stat-label">Commercial vs Residential</span>
        <div class="stat-value">${commCount} / ${resCount}</div>
        <span class="stat-breakdown">${commCount} Commercial • ${resCount} Residential</span>
      </div>
      <div class="admin-stat-card">
        <span class="stat-label">🔥 Priority Hot Deals</span>
        <div class="stat-value" style="color:var(--accent-hot);">${hotCount}</div>
        <span class="stat-breakdown">Featured in Hot Commercial &amp; Hot Residential</span>
      </div>
      <div class="admin-stat-card">
        <span class="stat-label">Direct vs Indirect Listings</span>
        <div class="stat-value" style="color:var(--accent-direct);">${directCount} : ${indirectCount}</div>
        <span class="stat-breakdown">Enquiries &amp; Partner Submissions: ${enquiries.length}</span>
      </div>
    </section>

    <div class="admin-main-grid">
      <!-- 2. <AreaManagerModule /> ("Admin must be able to Add Areas") -->
      <aside class="admin-panel-card">
        <h2 class="admin-panel-title">Dynamic Area Manager</h2>
        <p class="admin-panel-subtitle">
          Add or manage localities. Every area added here immediately generates filter chips and dropdown options across the client portal.
        </p>
        <form class="area-add-form" onsubmit="handleAddAreaSubmit(event)">
          <input
            type="text"
            id="new-area-input"
            class="admin-input"
            placeholder="e.g. Hebbal / RMV 2nd Stage"
            required
          />
          <button type="submit" class="btn-primary-submit" style="padding:0.6rem 1rem; white-space:nowrap;">
            + Add Area
          </button>
        </form>
        <div class="area-list-scroll">
          ${areas
            .map(
              a => `
            <div class="area-list-item">
              <span>📍 ${escapeHtml(a)}</span>
              <button type="button" class="btn-remove-area" title="Remove Area" onclick="handleRemoveArea('${escapeHtml(a.replace(/'/g, "\\'"))}')">
                ✕
              </button>
            </div>
          `
            )
            .join('')}
        </div>
      </aside>

      <!-- 3. <CategoryFormSelector /> & 5 Specialized Property Forms -->
      <section class="admin-panel-card" id="admin-property-form-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <h2 class="admin-panel-title">
            ${editingProp ? `Editing Listing: ${escapeHtml(editingProp.id)}` : 'Add New Property Listing'}
          </h2>
          ${
            editingProp
              ? `<button type="button" class="btn-nav-wireframe" onclick="cancelEditProperty()">Cancel Edit</button>`
              : `<span class="letter-badge">ADMIN PAGES 1–3</span>`
          }
        </div>
        <p class="admin-panel-subtitle">
          Select the property category below to load its specialized metric fields.
        </p>

        <!-- 5 Form Type Tabs -->
        <div class="form-type-tabs">
          ${formTabs
            .map(
              tab => `
            <button
              type="button"
              class="form-type-tab ${activeForm === tab.id ? 'active' : ''}"
              onclick="selectAdminFormType('${tab.id}')"
            >
              <div style="font-size:0.65rem; opacity:0.75;">${escapeHtml(tab.ref)}</div>
              <div>${escapeHtml(tab.label)}</div>
            </button>
          `
            )
            .join('')}
        </div>

        <form id="property-ingestion-form" onsubmit="handlePropertyFormSubmit(event)">
          <div class="admin-form-grid">
            <div class="form-field span-2">
              <label>Property Headline / Listing Title *</label>
              <input
                type="text"
                name="title"
                class="admin-input"
                placeholder="e.g. Signature Corner Bungalow — Sadashivanagar"
                value="${escapeHtml(editingProp ? editingProp.title : '')}"
                required
              />
            </div>

            <!-- Universal Location -> Area & Valuation -->
            <div class="form-field">
              <label>Location → Choose Area *</label>
              <select name="area" class="admin-select" required>
                ${areas
                  .map(
                    a => `
                  <option value="${escapeHtml(a)}" ${editingProp && editingProp.area === a ? 'selected' : ''}>
                    ${escapeHtml(a)}
                  </option>
                `
                  )
                  .join('')}
              </select>
            </div>

            <div class="form-field">
              <label>Asking Price (in ₹ Crores) *</label>
              <input
                type="number"
                step="0.01"
                name="priceCr"
                class="admin-input"
                placeholder="e.g. 24.5"
                value="${escapeHtml(editingProp ? editingProp.priceCr : '')}"
                required
              />
            </div>

            <!-- Category-Specific Fields -->
            ${renderAdminSpecificFields(activeForm, editingProp)}

            <!-- Optional [ Image ] Upload Box from Admin Wireframes 1-3 -->
            <div class="form-field span-2">
              <label>Property Image (Optional — Wireframe [ Image ] Box)</label>
              <div class="image-upload-dropzone">
                <input type="file" accept="image/*" onchange="handleAdminImageUpload(this)" style="font-size:0.82rem;" />
                <span style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted);">
                  Upload photo or leave blank for clean executive card
                </span>
              </div>
            </div>

            <!-- Details Textarea -->
            <div class="form-field span-2">
              <label>Details &amp; Property Highlights *</label>
              <textarea
                name="details"
                rows="3"
                class="admin-textarea"
                placeholder="Enter key technical specifications, road approach, rental yield, or title notes..."
                required
              >${escapeHtml(editingProp ? editingProp.details : '')}</textarea>
            </div>
          </div>

          <!-- <UniversalPropertyFields /> Checkboxes (Hot Commercial / Hot Residential & Direct / Indirect) -->
          <div class="universal-boxes-row">
            <div class="checkbox-group-box">
              <span class="filter-label">Hot Box Classification (Admin Pages 1–3)</span>
              <label class="checkbox-label">
                <input type="checkbox" name="hotCommercial" ${editingProp && editingProp.hotCommercial ? 'checked' : ''} />
                <span>Hot Commercial</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" name="hotResidential" ${editingProp && editingProp.hotResidential ? 'checked' : ''} />
                <span>Hot Residential</span>
              </label>
            </div>

            <div class="checkbox-group-box">
              <span class="filter-label">Listing Source (Direct vs Indirect)</span>
              <label class="checkbox-label">
                <input
                  type="radio"
                  name="mandate"
                  value="Direct"
                  ${!editingProp || editingProp.mandate === 'Direct' ? 'checked' : ''}
                />
                <span>✓ Direct Listing (From Owner)</span>
              </label>
              <label class="checkbox-label">
                <input
                  type="radio"
                  name="mandate"
                  value="Indirect"
                  ${editingProp && editingProp.mandate === 'Indirect' ? 'checked' : ''}
                />
                <span>◆ Indirect Listing (From Consultant)</span>
              </label>
            </div>
          </div>

          <button type="submit" class="btn-primary-submit">
            ${editingProp ? '✓ Update Live Property Listing' : '+ Publish Property Listing Live'}
          </button>
        </form>
      </section>
    </div>

    <!-- 4. <AdminListingTable /> -->
    <section class="admin-panel-card" aria-label="Inventory Management Table">
      <div class="filter-row" style="margin-bottom:0.75rem;">
        <div>
          <h2 class="admin-panel-title">Active Property Inventory (${filteredTableProps.length})</h2>
          <p style="font-size:0.82rem; color:var(--text-secondary);">
            Search, edit, or delete existing listings. Changes reflect immediately on the client portal.
          </p>
        </div>
        <div style="display:flex; gap:0.65rem; flex-wrap:wrap;">
          <input
            type="search"
            class="admin-input"
            style="width:240px;"
            placeholder="Search ID, title, or area..."
            value="${escapeHtml(AppState.admin.searchQuery)}"
            oninput="AppState.admin.searchQuery = this.value; renderApp();"
          />
          <select
            class="admin-select"
            style="width:210px;"
            onchange="AppState.admin.categoryFilter = this.value; renderApp();"
          >
            <option value="ALL" ${AppState.admin.categoryFilter === 'ALL' ? 'selected' : ''}>All 5 Form Categories</option>
            <option value="bungalow_building" ${AppState.admin.categoryFilter === 'bungalow_building' ? 'selected' : ''}>Bungalows &amp; Buildings</option>
            <option value="site" ${AppState.admin.categoryFilter === 'site' ? 'selected' : ''}>Sites (Plots)</option>
            <option value="commercial_building" ${AppState.admin.categoryFilter === 'commercial_building' ? 'selected' : ''}>Commercial Buildings</option>
            <option value="office_space" ${AppState.admin.categoryFilter === 'office_space' ? 'selected' : ''}>Office Space</option>
            <option value="land" ${AppState.admin.categoryFilter === 'land' ? 'selected' : ''}>Land Parcels</option>
          </select>
        </div>
      </div>

      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title &amp; Category</th>
              <th>Area</th>
              <th>Price</th>
              <th>Source</th>
              <th>Hot Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filteredTableProps
              .map(
                p => `
              <tr>
                <td style="font-family:var(--font-mono); font-weight:700;">${escapeHtml(p.id)}</td>
                <td>
                  <div style="font-weight:600;">${escapeHtml(p.title)}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">
                    ${escapeHtml(getCategoryLabel(p))} • ${escapeHtml(p.primaryGroup)}
                  </div>
                </td>
                <td style="font-family:var(--font-mono); font-size:0.78rem;">${escapeHtml(p.area)}</td>
                <td style="font-family:var(--font-mono); font-weight:700; color:var(--accent-gold);">
                  ${formatPriceCr(p.priceCr)}
                </td>
                <td>
                  <span class="mandate-badge ${p.mandate === 'Indirect' ? 'indirect' : 'direct'}">
                    ${escapeHtml(p.mandate)}
                  </span>
                </td>
                <td>
                  ${p.hotCommercial ? '<span class="hot-deal-badge">Hot Comm</span> ' : ''}
                  ${p.hotResidential ? '<span class="hot-deal-badge">Hot Res</span>' : ''}
                  ${!p.hotCommercial && !p.hotResidential ? '<span style="color:var(--text-muted); font-size:0.75rem;">Standard</span>' : ''}
                </td>
                <td style="white-space:nowrap;">
                  <button type="button" class="table-action-btn" onclick="startEditProperty('${escapeHtml(p.id)}')">
                    Edit
                  </button>
                  <button type="button" class="table-action-btn delete" onclick="handleDeleteProperty('${escapeHtml(p.id)}')">
                    Delete
                  </button>
                </td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// ============================================================================
// ADMIN ACTIONS (Add Area, Submit Property Form, Edit, Delete)
// ============================================================================
function handleAddAreaSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('new-area-input');
  if (!input || !input.value.trim()) return;
  const areaName = input.value.trim();
  CallTigerStore.addArea(areaName);
  input.value = '';
  showToast(`Area "${areaName}" added to live filters.`);
  renderApp();
}

function handleRemoveArea(areaName) {
  CallTigerStore.removeArea(areaName);
  showToast(`Area "${areaName}" removed.`);
  renderApp();
}

function selectAdminFormType(formType) {
  AppState.admin.activeFormType = formType;
  AppState.admin.editingPropertyId = null;
  AppState.admin.pendingImageUrl = '';
  renderApp();
}

function generatePropertyId(formType) {
  const prefixMap = {
    'bungalow_building': 'CT-BNG',
    'site': 'CT-SIT',
    'commercial_building': 'CT-COM',
    'office_space': 'CT-OFF',
    'land': 'CT-LND'
  };
  const prefix = prefixMap[formType] || 'CT-PRP';
  const rand = Math.floor(100 + Math.random() * 899);
  return `${prefix}-${rand}`;
}

function determinePrimaryGroup(formType, subCategory, landType) {
  if (formType === 'commercial_building' || formType === 'office_space') return 'Commercial';
  if (formType === 'bungalow_building') return 'Residential';
  if (formType === 'site') {
    return subCategory === 'commercial_site' ? 'Commercial' : 'Residential';
  }
  if (formType === 'land') {
    return landType === 'Converted Land' ? 'Residential' : 'Commercial';
  }
  return 'Commercial';
}

function handlePropertyFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const fd = new FormData(form);
  const formType = AppState.admin.activeFormType;
  const subCategory = fd.get('subCategory') || formType;
  const landType = fd.get('landType') || '';

  const isEditing = Boolean(AppState.admin.editingPropertyId);
  const existingProp = isEditing
    ? CallTigerStore.getProperties().find(p => p.id === AppState.admin.editingPropertyId)
    : null;
  const propId = isEditing ? AppState.admin.editingPropertyId : generatePropertyId(formType);

  const newProp = {
    id: propId,
    formType,
    primaryGroup: determinePrimaryGroup(formType, subCategory, landType),
    subCategory,
    title: fd.get('title').trim(),
    area: fd.get('area'),
    priceCr: parseFloat(fd.get('priceCr')) || 0,
    hotCommercial: form.elements['hotCommercial'].checked,
    hotResidential: form.elements['hotResidential'].checked,
    mandate: fd.get('mandate') || 'Direct',
    imageUrl: AppState.admin.pendingImageUrl || (existingProp ? existingProp.imageUrl : ''),
    details: fd.get('details').trim(),
    createdAt: new Date().toISOString()
  };

  if (formType === 'bungalow_building') {
    newProp.bhk = fd.get('bhk');
    newProp.plotArea = parseFloat(fd.get('plotArea')) || 0;
    newProp.builtUpArea = parseFloat(fd.get('builtUpArea')) || 0;
    newProp.facing = fd.get('facing');
  } else if (formType === 'site') {
    newProp.plotSize = parseFloat(fd.get('plotSize')) || 0;
    newProp.dimensions = fd.get('dimensions');
    newProp.facing = fd.get('facing');
  } else if (formType === 'commercial_building') {
    newProp.plotArea = parseFloat(fd.get('plotArea')) || 0;
    newProp.builtUpArea = parseFloat(fd.get('builtUpArea')) || 0;
    newProp.rentalIncome = fd.get('rentalIncome');
    newProp.facing = fd.get('facing');
  } else if (formType === 'office_space') {
    newProp.workstations = parseInt(fd.get('workstations'), 10) || 0;
    newProp.cabins = parseInt(fd.get('cabins'), 10) || 0;
  } else if (formType === 'land') {
    newProp.surveyNo = fd.get('surveyNo');
    newProp.landType = fd.get('landType');
    newProp.frontage = fd.get('frontage');
    newProp.roadWidth = fd.get('roadWidth');
    newProp.acres = parseFloat(fd.get('acres')) || 0;
    newProp.sqFeet = parseFloat(fd.get('sqFeet')) || 0;
  }

  AppState.admin.pendingImageUrl = '';

  if (isEditing) {
    CallTigerStore.updateProperty(newProp);
    AppState.admin.editingPropertyId = null;
    showToast(`Listing ${propId} updated successfully.`);
  } else {
    CallTigerStore.addProperty(newProp);
    showToast(`New Listing ${propId} published live!`);
  }

  renderApp();
}

function startEditProperty(propId) {
  const prop = CallTigerStore.getProperties().find(p => p.id === propId);
  if (!prop) return;
  AppState.admin.activeFormType = prop.formType;
  AppState.admin.editingPropertyId = prop.id;
  AppState.admin.pendingImageUrl = prop.imageUrl || '';
  renderApp();
  const card = document.getElementById('admin-property-form-card');
  if (card) card.scrollIntoView({ behavior: 'smooth' });
}

function cancelEditProperty() {
  AppState.admin.editingPropertyId = null;
  AppState.admin.pendingImageUrl = '';
  renderApp();
}

function handleDeleteProperty(propId) {
  CallTigerStore.deleteProperty(propId);
  if (AppState.admin.editingPropertyId === propId) {
    AppState.admin.editingPropertyId = null;
  }
  showToast(`Listing ${propId} removed from inventory.`);
  renderApp();
}

function resetDemoDataConfirm() {
  CallTigerStore.resetToDefaults();
  AppState.admin.editingPropertyId = null;
  showToast('Inventory and Areas restored to Call Tiger defaults.');
  renderApp();
}

// ============================================================================
// MODALS: <PrivateEnquiryModal />, Consultant Collaborate Modal & Letter Modal
// ============================================================================
function openEnquiryModal(propId) {
  const prop = CallTigerStore.getProperties().find(p => p.id === propId);
  const letter = CallTigerStore.getLetter();
  const modal = document.getElementById('enquiry-modal-backdrop');
  const content = document.getElementById('enquiry-modal-body');
  if (!modal || !content || !prop) return;

  content.innerHTML = `
    <span class="letter-badge">CALL TIGER PROPERTY ENQUIRY</span>
    <h2 class="admin-panel-title" style="margin-top:0.5rem;">${escapeHtml(prop.title)}</h2>
    <p style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-gold); margin-bottom:1rem;">
      Code: ${escapeHtml(prop.id)} • ${escapeHtml(prop.area)} • Asking: ${formatPriceCr(prop.priceCr)} (${escapeHtml(prop.mandate)} Listing)
    </p>
    <div style="background:var(--bg-elevated); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.85rem 1rem; margin-bottom:1.15rem; font-size:0.86rem;">
      <strong>Direct Call Manjunath T R:</strong>
      <a href="tel:${escapeHtml(letter.conciergePhone)}" style="font-family:var(--font-mono); font-weight:700; color:var(--accent-gold); margin-left:0.4rem;">
        ${escapeHtml(letter.conciergePhone)}
      </a>
    </div>
    <form onsubmit="handleEnquirySubmit(event, '${escapeHtml(prop.id)}')">
      <div class="admin-form-grid">
        <div class="form-field span-2">
          <label>Your Name (Buyer / Fellow Consultant) *</label>
          <input type="text" name="clientName" class="admin-input" placeholder="Your Full Name or Agency Name" required />
        </div>
        <div class="form-field">
          <label>Phone / WhatsApp Number *</label>
          <input type="tel" name="phone" class="admin-input" placeholder="+91 98xxx xxxxx" required />
        </div>
        <div class="form-field">
          <label>Preferred Callback Time</label>
          <select name="callbackTime" class="admin-select">
            <option value="Immediate Priority">Immediate Priority</option>
            <option value="Morning (10 AM – 1 PM)">Morning (10 AM – 1 PM)</option>
            <option value="Afternoon (2 PM – 5 PM)">Afternoon (2 PM – 5 PM)</option>
            <option value="Evening (6 PM – 8 PM)">Evening (6 PM – 8 PM)</option>
          </select>
        </div>
        <div class="form-field span-2">
          <label>Requirement / Site Inspection Note</label>
          <textarea name="notes" rows="2" class="admin-textarea" placeholder="Let Manjunath know if you have a direct buyer or want to schedule a site inspection..."></textarea>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:0.65rem;">
        <button type="button" class="btn-nav-wireframe" onclick="closeEnquiryModal()">Cancel</button>
        <button type="submit" class="btn-primary-submit">Submit Enquiry</button>
      </div>
    </form>
  `;
  modal.classList.add('open');
}

function closeEnquiryModal() {
  const modal = document.getElementById('enquiry-modal-backdrop');
  if (modal) modal.classList.remove('open');
}

function handleEnquirySubmit(e, propId) {
  e.preventDefault();
  const fd = new FormData(e.target);
  CallTigerStore.addEnquiry({
    propertyId: propId,
    clientName: fd.get('clientName'),
    phone: fd.get('phone'),
    callbackTime: fd.get('callbackTime'),
    notes: fd.get('notes')
  });
  closeEnquiryModal();
  showToast(`Enquiry registered for Property ${propId}. Manjunath will connect shortly!`);
}

// Consultant Collaboration / Share Listing Modal
function openCollaborateModal() {
  const modal = document.getElementById('collaborate-modal-backdrop');
  const content = document.getElementById('collaborate-modal-body');
  const areas = CallTigerStore.getAreas();
  if (!modal || !content) return;

  content.innerHTML = `
    <span class="letter-badge">🤝 CONSULTANT &amp; OWNER COLLABORATION</span>
    <h2 class="admin-panel-title" style="margin-top:0.5rem;">Share Your Property with Call Tiger</h2>
    <p class="admin-panel-subtitle">
      If you are a fellow real estate consultant, your property will be listed as an <strong>"Indirect Listing."</strong> If you are a direct owner, it will be listed as a <strong>"Direct Listing."</strong>
    </p>
    <form onsubmit="handleCollaborateSubmit(event)">
      <div class="admin-form-grid">
        <div class="form-field">
          <label>Your Name *</label>
          <input type="text" name="partnerName" class="admin-input" placeholder="e.g. Rajesh Kumar" required />
        </div>
        <div class="form-field">
          <label>Your Mobile / WhatsApp *</label>
          <input type="tel" name="partnerPhone" class="admin-input" placeholder="+91 98xxx xxxxx" required />
        </div>
        <div class="form-field">
          <label>You Are Submitting As *</label>
          <select name="mandate" class="admin-select" required>
            <option value="Indirect">Fellow Real Estate Consultant (Indirect Listing)</option>
            <option value="Direct">Direct Property Owner (Direct Listing)</option>
          </select>
        </div>
        <div class="form-field">
          <label>Property Category *</label>
          <select name="formType" class="admin-select" required>
            <option value="bungalow_building">Beautiful Bungalow / Residential Building</option>
            <option value="site">Plot / Site (Residential, Gated or Commercial)</option>
            <option value="commercial_building">Commercial Building (Yield / Retail)</option>
            <option value="office_space">Office Space (Workstations)</option>
            <option value="land">Land Parcel (Agri / Industrial / Converted / City)</option>
          </select>
        </div>
        <div class="form-field">
          <label>Locality / Area *</label>
          <select name="area" class="admin-select" required>
            ${areas.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label>Asking Price (₹ Crores) *</label>
          <input type="number" step="0.01" name="priceCr" class="admin-input" placeholder="e.g. 18.5" required />
        </div>
        <div class="form-field span-2">
          <label>Property Title / Headline *</label>
          <input type="text" name="title" class="admin-input" placeholder="e.g. 40x60 East Facing BDA Plot in Indiranagar" required />
        </div>
        <div class="form-field span-2">
          <label>Key Specifications (Plot Size, Built-Up, Facing, Rent, etc.) *</label>
          <textarea name="details" rows="3" class="admin-textarea" placeholder="Share plot size, dimensions, built-up area, facing, or workstation count..." required></textarea>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:0.65rem; flex-wrap:wrap;">
        <button type="button" class="btn-nav-wireframe" onclick="closeCollaborateModal()">Cancel</button>
        <button type="submit" class="btn-primary-submit">+ Add to Call Tiger Listings</button>
      </div>
    </form>
  `;
  modal.classList.add('open');
}

function closeCollaborateModal() {
  const modal = document.getElementById('collaborate-modal-backdrop');
  if (modal) modal.classList.remove('open');
}

function handleCollaborateSubmit(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const formType = fd.get('formType');
  const propId = generatePropertyId(formType);

  const subCatMap = {
    'bungalow_building': 'beautiful_bungalow',
    'site': 'residential_site',
    'commercial_building': 'commercial_building',
    'office_space': 'office_space',
    'land': 'land_parcel'
  };

  const newProp = {
    id: propId,
    formType,
    primaryGroup: determinePrimaryGroup(formType, subCatMap[formType], 'Converted Land'),
    subCategory: subCatMap[formType],
    title: fd.get('title').trim(),
    area: fd.get('area'),
    priceCr: parseFloat(fd.get('priceCr')) || 0,
    hotCommercial: false,
    hotResidential: false,
    mandate: fd.get('mandate'),
    plotArea: 4000,
    builtUpArea: 5000,
    plotSize: 4000,
    dimensions: 'Standard',
    facing: 'East',
    workstations: 100,
    cabins: 5,
    landType: 'Converted Land',
    acres: 1,
    sqFeet: 43560,
    details: `${fd.get('details').trim()} (Shared by: ${fd.get('partnerName')})`,
    createdAt: new Date().toISOString()
  };

  CallTigerStore.addProperty(newProp);
  CallTigerStore.addEnquiry({
    propertyId: propId,
    clientName: fd.get('partnerName'),
    phone: fd.get('partnerPhone'),
    callbackTime: 'Partner Listing Submission',
    notes: fd.get('title')
  });

  closeCollaborateModal();
  showToast(`Thank you! Property ${propId} listed as a ${newProp.mandate} Listing.`);
  renderApp();
}

function openLetterModal() {
  const letter = CallTigerStore.getLetter();
  const modal = document.getElementById('letter-modal-backdrop');
  const content = document.getElementById('letter-modal-body');
  if (!modal || !content) return;

  content.innerHTML = `
    <span class="letter-badge">HOME PAGE LETTER EDITOR</span>
    <h2 class="admin-panel-title" style="margin-top:0.45rem;">Edit Manjunath T R's Letter</h2>
    <p class="admin-panel-subtitle">
      Update the subject, message body, sign-off, and contact numbers displayed on the Call Tiger Home Page.
    </p>
    <form onsubmit="handleLetterSave(event)">
      <div class="admin-form-grid">
        <div class="form-field span-2">
          <label>Subject / Headline</label>
          <input type="text" name="title" class="admin-input" value="${escapeHtml(letter.title)}" required />
        </div>
        <div class="form-field span-2">
          <label>Salutation</label>
          <input type="text" name="salutation" class="admin-input" value="${escapeHtml(letter.salutation)}" required />
        </div>
        <div class="form-field span-2">
          <label>Letter Body Text *</label>
          <textarea name="body" rows="7" class="admin-textarea" required>${escapeHtml(letter.body)}</textarea>
        </div>
        <div class="form-field">
          <label>Sign-Off Name</label>
          <input type="text" name="signoffName" class="admin-input" value="${escapeHtml(letter.signoffName)}" required />
        </div>
        <div class="form-field">
          <label>Sign-Off Title</label>
          <input type="text" name="signoffTitle" class="admin-input" value="${escapeHtml(letter.signoffTitle)}" required />
        </div>
        <div class="form-field">
          <label>Phone Number</label>
          <input type="text" name="conciergePhone" class="admin-input" value="${escapeHtml(letter.conciergePhone)}" required />
        </div>
        <div class="form-field">
          <label>WhatsApp Number (with country code)</label>
          <input type="text" name="whatsappNumber" class="admin-input" value="${escapeHtml(letter.whatsappNumber)}" required />
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:0.65rem;">
        <button type="button" class="btn-nav-wireframe" onclick="closeLetterModal()">Cancel</button>
        <button type="submit" class="btn-primary-submit">Save Letter</button>
      </div>
    </form>
  `;
  modal.classList.add('open');
}

function closeLetterModal() {
  const modal = document.getElementById('letter-modal-backdrop');
  if (modal) modal.classList.remove('open');
}

function handleLetterSave(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const current = CallTigerStore.getLetter();
  CallTigerStore.saveLetter({
    ...current,
    title: fd.get('title'),
    salutation: fd.get('salutation'),
    body: fd.get('body'),
    signoffName: fd.get('signoffName'),
    signoffTitle: fd.get('signoffTitle'),
    conciergePhone: fd.get('conciergePhone'),
    whatsappNumber: fd.get('whatsappNumber')
  });
  closeLetterModal();
  showToast("Founder's Letter updated on Home Page.");
  renderApp();
}

// ============================================================================
// THEME SWITCHER (Luxury Light vs Obsidian Dark)
// ============================================================================
function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEYS.THEME, next);
  renderApp();
}

// ============================================================================
// MASTER APPLICATION RENDERER
// ============================================================================
function renderApp() {
  const letter = CallTigerStore.getLetter();
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  const headerActionsEl = document.getElementById('app-header-actions');
  if (headerActionsEl) {
    headerActionsEl.innerHTML = `
      <button type="button" class="btn-header btn-collaborate" onclick="openCollaborateModal()">
        🤝 Cross-Share Listing
      </button>
      <button type="button" class="btn-header" onclick="toggleTheme()" title="Switch Theme">
        ${isDark ? '☀ Light Mode' : '☾ Dark Mode'}
      </button>
      <a href="tel:${escapeHtml(letter.conciergePhone)}" class="btn-header btn-concierge">
        📞 ${escapeHtml(letter.conciergePhone)}
      </a>
      <button
        type="button"
        class="btn-header ${AppState.mode === 'admin' ? 'btn-admin-active' : ''}"
        onclick="toggleAdminMode()"
      >
        ${AppState.mode === 'admin' ? '← Client View' : '⚙ Admin Portal'}
      </button>
    `;
  }

  const mainEl = document.getElementById('app-main-container');
  if (!mainEl) return;

  if (AppState.mode === 'admin') {
    mainEl.innerHTML = renderAdminPortal();
  } else if (AppState.currentView === 'home') {
    mainEl.innerHTML = renderHomePage();
  } else {
    mainEl.innerHTML = renderListingView(AppState.currentView);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderApp();
});
