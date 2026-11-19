/**
 * CALL TIGER — INITIAL SEED DATA & STATE STORE (V3 ENHANCED)
 * High-Value Real Estate & Consultant Collaboration Platform
 */

const STORAGE_KEYS = {
  PROPERTIES: 'call_tiger_properties_v3',
  AREAS: 'call_tiger_areas_v3',
  LETTER: 'call_tiger_founders_letter_v3',
  ENQUIRIES: 'call_tiger_enquiries_v3',
  THEME: 'call_tiger_theme_v3'
};

const DEFAULT_FOUNDERS_LETTER = {
  badge: 'CONSULTANT COLLABORATION & MANDATE NETWORK',
  title: "Subject: Let's collaborate and grow our business together",
  salutation: 'Dear fellow real estate consultant,',
  body: `Instead of relying entirely on Magicbricks and 99acres, let’s collaborate with each other to close more deals.

I would love to cross-share listings with you. If you share your properties with me, I will list them on my website (Call Tiger) as "Indirect listings." If a property comes directly from an owner, I will mark it clearly as a "Direct listing."

By building a little trust between us, we can both do a lot more business.`,
  signoffClosing: 'Best regards,',
  signoffName: 'Manjunath T R',
  signoffTitle: 'Founder, Call Tiger Real Estate Network',
  conciergePhone: '+91 98450 00000',
  whatsappNumber: '919845000000'
};

const DEFAULT_AREAS = [
  'Sadashivanagar',
  'CBD / MG Road',
  'Indiranagar',
  'Koramangala',
  'Outer Ring Road',
  'Whitefield',
  'Devanahalli / North',
  'Jayanagar / JP Nagar',
  'Sarjapur Road',
  'Mysore Road / Bidadi'
];

const DEFAULT_PROPERTIES = [
  // =========================================================================
  // 1. OFFICE SPACE (50-100, 100-200, 200-500, 500-5000 Workstations)
  // =========================================================================
  {
    id: 'CT-OFF-101',
    formType: 'office_space',
    primaryGroup: 'Commercial',
    subCategory: 'office_space',
    title: 'Boutique Plug & Play Corporate Floor — Off MG Road CBD',
    area: 'CBD / MG Road',
    priceCr: 14.5,
    hotCommercial: true,
    hotResidential: false,
    mandate: 'Direct',
    workstations: 85,
    cabins: 6,
    imageUrl: '',
    details: 'Grade-A boutique floor plate with 85 ergonomic modular workstations, 4 managerial cabins, 1 MD suite, 16-seater boardroom, dedicated server room, and 10 covered car parks. OC received, clear marketable title.',
    createdAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 'CT-OFF-102',
    formType: 'office_space',
    primaryGroup: 'Commercial',
    subCategory: 'office_space',
    title: 'Tech Studio & Executive Office Floor — Indiranagar 100ft Road',
    area: 'Indiranagar',
    priceCr: 28.0,
    hotCommercial: false,
    hotResidential: false,
    mandate: 'Direct',
    workstations: 160,
    cabins: 9,
    imageUrl: '',
    details: 'Full floor commercial office space steps from Indiranagar Metro. Equipped with 160 linear workstations, 9 acoustic glass cabins, 2 conference rooms, dry pantry, and 100% DG backup.',
    createdAt: '2026-10-21T10:00:00Z'
  },
  {
    id: 'CT-OFF-103',
    formType: 'office_space',
    primaryGroup: 'Commercial',
    subCategory: 'office_space',
    title: 'Mid-Scale Enterprise Campus Wing — Koramangala 3rd Block',
    area: 'Koramangala',
    priceCr: 46.0,
    hotCommercial: true,
    hotResidential: false,
    mandate: 'Indirect',
    workstations: 340,
    cabins: 14,
    imageUrl: '',
    details: 'Independent commercial wing configured for 340 workstations across two contiguous levels, 14 executive cabins, 120-seat townhall cafeteria, and 42 basement car parks.',
    createdAt: '2026-10-22T10:00:00Z'
  },
  {
    id: 'CT-OFF-104',
    formType: 'office_space',
    primaryGroup: 'Commercial',
    subCategory: 'office_space',
    title: 'Global Capability Center (GCC) Tower — Outer Ring Road Bellandur',
    area: 'Outer Ring Road',
    priceCr: 215.0,
    hotCommercial: false,
    hotResidential: false,
    mandate: 'Direct',
    workstations: 1850,
    cabins: 48,
    imageUrl: '',
    details: 'Institutional Grade-A LEED Platinum tech campus block accommodating 1,850 workstations, 48 leadership suites, 250-seat auditorium, NOC lab, and multi-level parking.',
    createdAt: '2026-10-23T10:00:00Z'
  },
  {
    id: 'CT-OFF-105',
    formType: 'office_space',
    primaryGroup: 'Commercial',
    subCategory: 'office_space',
    title: 'Standalone IT Park Campus Block — Whitefield EPIP Zone',
    area: 'Whitefield',
    priceCr: 380.0,
    hotCommercial: false,
    hotResidential: false,
    mandate: 'Indirect',
    workstations: 3600,
    cabins: 85,
    imageUrl: '',
    details: 'Dedicated standalone IT campus configured for 3,600 workstations, 85 executive cabins & training rooms, private HT substation, and 450 car parks right inside Whitefield EPIP.',
    createdAt: '2026-10-24T10:00:00Z'
  },

  // =========================================================================
  // 2. COMMERCIAL BUILDINGS & COMMERCIAL SITES (10-50 Cr & 50-1000 Cr & Hot)
  // =========================================================================
  {
    id: 'CT-COM-201',
    formType: 'commercial_building',
    primaryGroup: 'Commercial',
    subCategory: 'commercial_building',
    title: 'High-Street Retail & Showroom Corner Asset — Jayanagar 4th Block',
    area: 'Jayanagar / JP Nagar',
    priceCr: 8.5,
    hotCommercial: true,
    hotResidential: false,
    mandate: 'Direct',
    plotArea: 2400,
    builtUpArea: 7200,
    rentalIncome: '₹ 5.40 Lakhs / month',
    facing: 'North-East Corner',
    imageUrl: '',
    details: 'B+G+3 commercial retail building leased to a national jewellery & banking brand. 7.6% stabilized yield with 15% escalation every 3 years. Clear BDA title.',
    createdAt: '2026-10-24T11:00:00Z'
  },
  {
    id: 'CT-COM-202',
    formType: 'commercial_building',
    primaryGroup: 'Commercial',
    subCategory: 'commercial_building',
    title: 'Pre-Leased Flagship Commercial Building — Indiranagar 100ft Road',
    area: 'Indiranagar',
    priceCr: 32.5,
    hotCommercial: true,
    hotResidential: false,
    mandate: 'Direct',
    plotArea: 6000,
    builtUpArea: 22500,
    rentalIncome: '₹ 21.50 Lakhs / month',
    facing: 'East',
    imageUrl: '',
    details: 'Prime 100ft Road frontage commercial asset (2B+G+4 floors) fully leased to multinational luxury retail & fine dining tenants. 9-year lock-in remaining.',
    createdAt: '2026-10-24T12:00:00Z'
  },
  {
    id: 'CT-COM-203',
    formType: 'site',
    primaryGroup: 'Commercial',
    subCategory: 'commercial_site',
    title: 'Commercial Corner Plot (FAR 3.25) — Koramangala 80ft Road',
    area: 'Koramangala',
    priceCr: 24.0,
    hotCommercial: true,
    hotResidential: false,
    mandate: 'Direct',
    plotSize: 8000,
    dimensions: '80 × 100 ft',
    facing: 'North',
    imageUrl: '',
    details: 'Sanctioned commercial plot on 80ft main arterial road ideal for flagship showroom, boutique hospital, or corporate headquarters. Clear BDA patta.',
    createdAt: '2026-10-24T13:00:00Z'
  },
  {
    id: 'CT-COM-204',
    formType: 'commercial_building',
    primaryGroup: 'Commercial',
    subCategory: 'commercial_building',
    title: 'Trophy CBD Corporate Tower — Vittal Mallya / MG Road Vicinity',
    area: 'CBD / MG Road',
    priceCr: 84.0,
    hotCommercial: true,
    hotResidential: false,
    mandate: 'Direct',
    plotArea: 14500,
    builtUpArea: 58000,
    rentalIncome: '₹ 52.00 Lakhs / month',
    facing: 'North-East',
    imageUrl: '',
    details: 'Trophy commercial tower occupied by Fortune-500 consulting & private wealth tenants. Triple-height marble atrium, single family ownership.',
    createdAt: '2026-10-24T14:00:00Z'
  },
  {
    id: 'CT-COM-205',
    formType: 'commercial_building',
    primaryGroup: 'Commercial',
    subCategory: 'commercial_building',
    title: 'Institutional IT SEZ Twin-Tower Asset — Outer Ring Road',
    area: 'Outer Ring Road',
    priceCr: 420.0,
    hotCommercial: false,
    hotResidential: false,
    mandate: 'Indirect',
    plotArea: 130680,
    builtUpArea: 485000,
    rentalIncome: '₹ 3.15 Crore / month',
    facing: 'East',
    imageUrl: '',
    details: '100% leased institutional Grade-A commercial complex on ORR with 3 Acres land parcel, 4.85 Lakh sq.ft leasable area, WALE of 7.4 years.',
    createdAt: '2026-10-24T15:00:00Z'
  },
  {
    id: 'CT-COM-206',
    formType: 'site',
    primaryGroup: 'Commercial',
    subCategory: 'commercial_site',
    title: 'High-Density Commercial Highway Plot — Airport Road NH-44',
    area: 'Devanahalli / North',
    priceCr: 115.0,
    hotCommercial: false,
    hotResidential: false,
    mandate: 'Direct',
    plotSize: 65000,
    dimensions: '250 × 260 ft',
    facing: 'East (Service Road)',
    imageUrl: '',
    details: 'Prime commercial plot abutting 6-lane Airport Expressway service road. Ideal for 5-star hotel, super-specialty hospital, or mixed-use retail mall.',
    createdAt: '2026-10-24T16:00:00Z'
  },
  {
    id: 'CT-COM-207',
    formType: 'commercial_building',
    primaryGroup: 'Commercial',
    subCategory: 'commercial_building',
    title: 'Boutique Pre-Leased Healthcare & Diagnostic Building — Indiranagar',
    area: 'Indiranagar',
    priceCr: 16.8,
    hotCommercial: true,
    hotResidential: false,
    mandate: 'Indirect',
    plotArea: 3600,
    builtUpArea: 11800,
    rentalIncome: '₹ 10.20 Lakhs / month',
    facing: 'North',
    imageUrl: '',
    details: 'Modern commercial building on 80ft road leased to a reputed healthcare & diagnostics chain on a 12-year registered lease.',
    createdAt: '2026-10-24T17:00:00Z'
  },

  // =========================================================================
  // 3. LAND PARCELS (Agricultural, Industrial, Converted, Within City Land)
  // =========================================================================
  {
    id: 'CT-LND-301',
    formType: 'land',
    primaryGroup: 'Commercial',
    subCategory: 'land_parcel',
    title: 'Contiguous Agricultural Estate Parcel — Devanahalli North',
    area: 'Devanahalli / North',
    priceCr: 18.0,
    hotCommercial: false,
    hotResidential: false,
    mandate: 'Direct',
    surveyNo: 'Sy. No. 142/2 & 143/1',
    landType: 'Agricultural Land',
    frontage: '320 ft road frontage (₹ 2,580 / sq.ft)',
    roadWidth: '60 ft Tar Road',
    acres: 1.6,
    sqFeet: 69696,
    imageUrl: '',
    details: 'Fertile red-soil contiguous agricultural land parcel with single-family clear title, zero PTCL, compound wall fenced, 10 mins from STRR interchange.',
    createdAt: '2026-10-25T09:00:00Z'
  },
  {
    id: 'CT-LND-302',
    formType: 'land',
    primaryGroup: 'Commercial',
    subCategory: 'land_parcel',
    title: 'KIADB / General Industrial Zone Land Bank — Mysore Road Bidadi',
    area: 'Mysore Road / Bidadi',
    priceCr: 42.0,
    hotCommercial: true,
    hotResidential: false,
    mandate: 'Direct',
    surveyNo: 'Sy. No. 88/A, 89/1B',
    landType: 'Industrial Land',
    frontage: '450 ft highway frontage (₹ 2,410 / sq.ft)',
    roadWidth: '100 ft Industrial Corridor',
    acres: 4.0,
    sqFeet: 174240,
    imageUrl: '',
    details: 'Heavy & general industrial zoned parcel suited for EV manufacturing, logistics warehousing, or hyperscale data center. HT power line adjacent.',
    createdAt: '2026-10-25T10:00:00Z'
  },
  {
    id: 'CT-LND-303',
    formType: 'land',
    primaryGroup: 'Residential',
    subCategory: 'land_parcel',
    title: 'DC Converted Residential Villa / High-Rise Parcel — Sarjapur Road',
    area: 'Sarjapur Road',
    priceCr: 64.0,
    hotCommercial: false,
    hotResidential: true,
    mandate: 'Direct',
    surveyNo: 'Sy. No. 214/1, 214/2, 215',
    landType: 'Converted Land',
    frontage: '410 ft frontage (₹ 4,400 / sq.ft)',
    roadWidth: '80 ft CDP Masterplan Road',
    acres: 3.34,
    sqFeet: 145490,
    imageUrl: '',
    details: '100% Alienated / DC Converted residential land with yellow-zone CDP classification. Ready for immediate RERA plan sanction for luxury high-rise or row villas.',
    createdAt: '2026-10-25T11:00:00Z'
  },
  {
    id: 'CT-LND-304',
    formType: 'land',
    primaryGroup: 'Commercial',
    subCategory: 'land_parcel',
    title: 'Rare Trophy Development Parcel Within City Limits — Whitefield',
    area: 'Whitefield',
    priceCr: 135.0,
    hotCommercial: false,
    hotResidential: false,
    mandate: 'Indirect',
    surveyNo: 'Sy. No. 54/1 (BBMP A-Khata)',
    landType: 'Within City Land',
    frontage: '520 ft main road frontage (₹ 10,330 / sq.ft)',
    roadWidth: '120 ft Main Arterial Road',
    acres: 3.0,
    sqFeet: 130680,
    imageUrl: '',
    details: 'Ultra-rare BBMP A-Khata land island within core city limits, walkable to Metro station. Clear marketable title held by single corporate entity for 30+ years.',
    createdAt: '2026-10-25T12:00:00Z'
  },

  // =========================================================================
  // 4. BEAUTIFUL BUNGALOWS & RESIDENTIAL / GATED BUILDINGS
  // =========================================================================
  {
    id: 'CT-BNG-401',
    formType: 'bungalow_building',
    primaryGroup: 'Residential',
    subCategory: 'beautiful_bungalow',
    title: 'Heritage Tree-Lined Independent Mansion — Sadashivanagar',
    area: 'Sadashivanagar',
    priceCr: 48.0,
    hotCommercial: false,
    hotResidential: true,
    mandate: 'Direct',
    bhk: '5 BHK',
    plotArea: 9600,
    builtUpArea: 12500,
    facing: 'North-East',
    imageUrl: '',
    details: 'Architect-designed 5 BHK luxury bungalow on an 80×120 ft prime Sadashivanagar plot. Features private lap pool, internal Schindler elevator, Burma teak joinery, landscaped courtyard, and 8-car basement.',
    createdAt: '2026-10-26T09:00:00Z'
  },
  {
    id: 'CT-BNG-402',
    formType: 'bungalow_building',
    primaryGroup: 'Residential',
    subCategory: 'beautiful_bungalow',
    title: 'Contemporary Courtyard Bungalow — Defence Colony Indiranagar',
    area: 'Indiranagar',
    priceCr: 22.5,
    hotCommercial: false,
    hotResidential: true,
    mandate: 'Direct',
    bhk: '4 BHK',
    plotArea: 4500,
    builtUpArea: 6800,
    facing: 'East',
    imageUrl: '',
    details: 'Quiet cul-de-sac 4 BHK signature bungalow with double-height living pavilion, Italian travertine flooring, private home cinema, terrace garden, and 4 covered parking bays.',
    createdAt: '2026-10-26T10:00:00Z'
  },
  {
    id: 'CT-BNG-403',
    formType: 'bungalow_building',
    primaryGroup: 'Residential',
    subCategory: 'beautiful_bungalow',
    title: 'Billionaire Row Corner Bungalow — Koramangala 3rd Block',
    area: 'Koramangala',
    priceCr: 34.0,
    hotCommercial: false,
    hotResidential: true,
    mandate: 'Direct',
    bhk: '5 BHK',
    plotArea: 6000,
    builtUpArea: 9200,
    facing: 'North',
    imageUrl: '',
    details: 'Vastu-compliant 5 BHK corner residence in Koramangala 3rd Block. Includes private library, wellness spa room, solar roof integration, staff quarters, and mature rain-tree canopy.',
    createdAt: '2026-10-26T11:00:00Z'
  },
  {
    id: 'CT-BNG-404',
    formType: 'bungalow_building',
    primaryGroup: 'Residential',
    subCategory: 'beautiful_bungalow',
    title: 'Classic South Bangalore Family Residence — Jayanagar',
    area: 'Jayanagar / JP Nagar',
    priceCr: 9.2,
    hotCommercial: false,
    hotResidential: true,
    mandate: 'Direct',
    bhk: '3 BHK',
    plotArea: 2400,
    builtUpArea: 3800,
    facing: 'East',
    imageUrl: '',
    details: 'Immaculate 3 BHK + study independent bungalow opposite park in Jayanagar. Solid granite & teak wood construction, borewell, solar water heating, and 3 car parks.',
    createdAt: '2026-10-26T12:00:00Z'
  },
  {
    id: 'CT-BNG-405',
    formType: 'bungalow_building',
    primaryGroup: 'Residential',
    subCategory: 'gated_community_building',
    title: 'Golf-Course Facing Signature Villa — Devanahalli Gated Enclave',
    area: 'Devanahalli / North',
    priceCr: 15.8,
    hotCommercial: false,
    hotResidential: true,
    mandate: 'Direct',
    bhk: '4 BHK',
    plotArea: 5800,
    builtUpArea: 6400,
    facing: 'East',
    imageUrl: '',
    details: 'Ultra-luxury 4 BHK built villa inside a 250-acre championship golf gated community. Uninterrupted fairway views, heated plunge pool, concierge club membership included.',
    createdAt: '2026-10-26T13:00:00Z'
  },
  {
    id: 'CT-BNG-406',
    formType: 'bungalow_building',
    primaryGroup: 'Residential',
    subCategory: 'gated_community_building',
    title: 'Gated Enclave Triplex Mansion — Whitefield',
    area: 'Whitefield',
    priceCr: 11.5,
    hotCommercial: false,
    hotResidential: false,
    mandate: 'Indirect',
    bhk: '4 BHK',
    plotArea: 4200,
    builtUpArea: 5100,
    facing: 'North',
    imageUrl: '',
    details: 'Low-density 45-villa gated community in Whitefield. Features private elevator, expansive deck overlooking central Zen park, and 24/7 tier-3 perimeter security.',
    createdAt: '2026-10-26T14:00:00Z'
  },
  {
    id: 'CT-BNG-407',
    formType: 'bungalow_building',
    primaryGroup: 'Residential',
    subCategory: 'residential_building',
    title: 'Presidential Family Compound — Sadashivanagar',
    area: 'Sadashivanagar',
    priceCr: 85.0,
    hotCommercial: false,
    hotResidential: true,
    mandate: 'Direct',
    bhk: '6+ BHK',
    plotArea: 15000,
    builtUpArea: 21000,
    facing: 'North-East',
    imageUrl: '',
    details: 'Generational family compound spanning 15,000 sq.ft plot with two independent luxury residences, private banquet lawn, guest house, and 14-car subterranean garage.',
    createdAt: '2026-10-26T15:00:00Z'
  },

  // =========================================================================
  // 5. RESIDENTIAL & GATED COMMUNITY SITES (Below 4000 sq.ft & Above 4000 sq.ft)
  // =========================================================================
  {
    id: 'CT-SIT-501',
    formType: 'site',
    primaryGroup: 'Residential',
    subCategory: 'residential_site',
    title: 'Prime BDA Residential Plot — Jayanagar 4th Block',
    area: 'Jayanagar / JP Nagar',
    priceCr: 6.8,
    hotCommercial: false,
    hotResidential: true,
    mandate: 'Direct',
    plotSize: 2400,
    dimensions: '40 × 60 ft',
    facing: 'East',
    imageUrl: '',
    details: 'Original BDA allotted 40×60 ft residential site on a wide tree-lined avenue in Jayanagar. Single owner, up-to-date BBMP tax paid, ready for immediate registration.',
    createdAt: '2026-10-27T09:00:00Z'
  },
  {
    id: 'CT-SIT-502',
    formType: 'site',
    primaryGroup: 'Residential',
    subCategory: 'gated_community_site',
    title: 'Gated Villa Plot — Sarjapur Road Luxury Enclave',
    area: 'Sarjapur Road',
    priceCr: 4.5,
    hotCommercial: false,
    hotResidential: false,
    mandate: 'Direct',
    plotSize: 3200,
    dimensions: '40 × 80 ft',
    facing: 'North',
    imageUrl: '',
    details: 'Underground-cabled luxury gated community villa plot (3,200 sq.ft) with 50,000 sq.ft operational clubhouse, heated indoor pool, and tennis courts.',
    createdAt: '2026-10-27T10:00:00Z'
  },
  {
    id: 'CT-SIT-503',
    formType: 'site',
    primaryGroup: 'Residential',
    subCategory: 'residential_site',
    title: 'Boutique Residential Plot — Indiranagar Defence Colony',
    area: 'Indiranagar',
    priceCr: 11.2,
    hotCommercial: false,
    hotResidential: true,
    mandate: 'Direct',
    plotSize: 3600,
    dimensions: '45 × 80 ft',
    facing: 'North-East',
    imageUrl: '',
    details: 'Rare 3,600 sq.ft independent plot inside peaceful Defence Colony. Surrounded by luxury bungalows, 40ft wide residential road.',
    createdAt: '2026-10-27T11:00:00Z'
  },
  {
    id: 'CT-SIT-504',
    formType: 'site',
    primaryGroup: 'Residential',
    subCategory: 'residential_site',
    title: 'Large BDA Residential Plot — Koramangala 3rd Block',
    area: 'Koramangala',
    priceCr: 19.5,
    hotCommercial: false,
    hotResidential: true,
    mandate: 'Direct',
    plotSize: 4800,
    dimensions: '60 × 80 ft',
    facing: 'East',
    imageUrl: '',
    details: 'High-demand 60×80 ft (4,800 sq.ft) residential plot in Koramangala 3rd Block. Elevated terrain, zero encumbrance, ideal for a bespoke family mansion.',
    createdAt: '2026-10-27T12:00:00Z'
  },
  {
    id: 'CT-SIT-505',
    formType: 'site',
    primaryGroup: 'Residential',
    subCategory: 'gated_community_site',
    title: 'Signature Half-Acre Estate Plot — Whitefield Gated Community',
    area: 'Whitefield',
    priceCr: 14.0,
    hotCommercial: false,
    hotResidential: false,
    mandate: 'Direct',
    plotSize: 8000,
    dimensions: '80 × 100 ft',
    facing: 'North-East Corner',
    imageUrl: '',
    details: 'Expansive 8,000 sq.ft corner plot within an ultra-exclusive gated villa community in Whitefield. Permits custom architecture up to G+2 floors.',
    createdAt: '2026-10-27T13:00:00Z'
  },
  {
    id: 'CT-SIT-506',
    formType: 'site',
    primaryGroup: 'Residential',
    subCategory: 'residential_site',
    title: 'Trophy 10,800 sq.ft Legacy Plot — Sadashivanagar',
    area: 'Sadashivanagar',
    priceCr: 58.0,
    hotCommercial: false,
    hotResidential: true,
    mandate: 'Indirect',
    plotSize: 10800,
    dimensions: '90 × 120 ft',
    facing: 'North',
    imageUrl: '',
    details: 'Blue-chip 10,800 sq.ft residential plot in the most prestigious lane of Sadashivanagar. Unblemished 60-year parent deed history.',
    createdAt: '2026-10-27T14:00:00Z'
  }
];

const CallTigerStore = {
  getProperties() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Storage read fallback:', e);
    }
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(DEFAULT_PROPERTIES));
    return [...DEFAULT_PROPERTIES];
  },

  saveProperties(list) {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(list));
  },

  addProperty(prop) {
    const list = this.getProperties();
    list.unshift(prop);
    this.saveProperties(list);
    return prop;
  },

  updateProperty(updatedProp) {
    const list = this.getProperties().map(p => (p.id === updatedProp.id ? updatedProp : p));
    this.saveProperties(list);
    return updatedProp;
  },

  deleteProperty(id) {
    const list = this.getProperties().filter(p => p.id !== id);
    this.saveProperties(list);
  },

  getAreas() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AREAS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Areas read fallback:', e);
    }
    localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(DEFAULT_AREAS));
    return [...DEFAULT_AREAS];
  },

  saveAreas(areas) {
    localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(areas));
  },

  addArea(areaName) {
    const trimmed = areaName.trim();
    if (!trimmed) return this.getAreas();
    const areas = this.getAreas();
    if (!areas.some(a => a.toLowerCase() === trimmed.toLowerCase())) {
      areas.push(trimmed);
      this.saveAreas(areas);
    }
    return areas;
  },

  removeArea(areaName) {
    const areas = this.getAreas().filter(a => a !== areaName);
    this.saveAreas(areas);
    return areas;
  },

  getLetter() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.LETTER);
      if (raw) return { ...DEFAULT_FOUNDERS_LETTER, ...JSON.parse(raw) };
    } catch (e) {
      console.warn('Letter read fallback:', e);
    }
    return { ...DEFAULT_FOUNDERS_LETTER };
  },

  saveLetter(letterObj) {
    localStorage.setItem(STORAGE_KEYS.LETTER, JSON.stringify(letterObj));
  },

  getEnquiries() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn(e);
    }
    return [];
  },

  addEnquiry(enquiry) {
    const list = this.getEnquiries();
    list.unshift({
      id: 'ENQ-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      ...enquiry
    });
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(list));
    return list;
  },

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(DEFAULT_PROPERTIES));
    localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(DEFAULT_AREAS));
    localStorage.setItem(STORAGE_KEYS.LETTER, JSON.stringify(DEFAULT_FOUNDERS_LETTER));
  }
};
