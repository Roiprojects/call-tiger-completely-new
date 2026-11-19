/**
 * ADMIN PORTAL (PAGES 1 TO 8 WIREFRAMES)
 * - Page 1 & 2: Starting Dashboard, Bulk & Dynamic Area Ingestion (100+ Bangalore Localities)
 * - Page 3: Bungalow / Residential Bldg / Gated Bldg (Corner vs Intermediate, Dimensions, Google Location)
 * - Page 4: Flat / Apartment Form (Covered Area, Amenities, Builder Floor)
 * - Page 5: Land Form (Acres & Guntas with auto sq.ft calculation)
 * - Page 6: Office Space Form (Building Name, Covered Area, Workstations)
 * - Page 7: Commercial Building Form (Rental Income & Sale Price with Number-to-Words Converter)
 * - Page 8: Sites Form (Residential, Gated, Commercial Sites with text format converter)
 * - Inventory Management Table with Search, Edit & Delete
 */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { numberToIndianWords, formatPriceWithWords } from '../utils/numberToWords';

export default function AdminPortal({ onOpenEditLetter }) {
  const {
    properties,
    areas,
    enquiries,
    addProperty,
    updateProperty,
    deleteProperty,
    addArea,
    removeArea,
    resetToDefaults,
    goHome
  } = useApp();

  const [activeFormType, setActiveFormType] = useState('bungalow_building');
  const [editingId, setEditingId] = useState(null);
  const [newAreaInput, setNewAreaInput] = useState('');
  const [searchTableQuery, setSearchTableQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Form Fields State
  const [title, setTitle] = useState('');
  const [area, setArea] = useState(areas[0] || 'Sadashivanagar');
  const [priceCr, setPriceCr] = useState('');
  const [hotCommercial, setHotCommercial] = useState(false);
  const [hotResidential, setHotResidential] = useState(false);
  const [mandate, setMandate] = useState('Direct');
  const [googleLocation, setGoogleLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [details, setDetails] = useState('');

  // Specific Form Fields
  const [subCategory, setSubCategory] = useState('');
  const [bhk, setBhk] = useState('4 BHK');
  const [plotArea, setPlotArea] = useState('');
  const [builtUpArea, setBuiltUpArea] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [facing, setFacing] = useState('East');
  const [isCorner, setIsCorner] = useState(false); // Corner vs Intermediate (Pages 3, 7, 8)

  // Flat Fields (Page 4)
  const [coveredArea, setCoveredArea] = useState('');
  const [builderFloor, setBuilderFloor] = useState('');
  const [amenities, setAmenities] = useState('');
  const [isGatedCommunity, setIsGatedCommunity] = useState(false);
  const [gatedCommunityName, setGatedCommunityName] = useState('');

  // Land Fields (Page 5)
  const [surveyNo, setSurveyNo] = useState('');
  const [acres, setAcres] = useState('');
  const [guntas, setGuntas] = useState('');
  const [sqFeet, setSqFeet] = useState('');
  const [landType, setLandType] = useState('Converted Land');
  const [frontage, setFrontage] = useState('');
  const [roadWidth, setRoadWidth] = useState('');

  // Office Space Fields (Page 6)
  const [buildingName, setBuildingName] = useState('');
  const [workstations, setWorkstations] = useState('');
  const [cabins, setCabins] = useState('');

  // Commercial Building Fields (Page 7)
  const [rawRentalIncome, setRawRentalIncome] = useState('');
  const [rentalIncomeWords, setRentalIncomeWords] = useState('');
  const [rawSalePrice, setRawSalePrice] = useState('');
  const [salePriceWords, setSalePriceWords] = useState('');

  // Auto calculate Sqft from Acres & Guntas (Page 5: 1 Acre = 40 Guntas = 43,560 sq.ft; 1 Gunta = 1,089 sq.ft)
  const handleAcresChange = (newAcres, newGuntas = guntas) => {
    setAcres(newAcres);
    const a = parseFloat(newAcres) || 0;
    const g = parseFloat(newGuntas) || 0;
    const total = Math.round((a * 43560) + (g * 1089));
    setSqFeet(total > 0 ? String(total) : '');
  };

  const handleGuntasChange = (newGuntas, currentAcres = acres) => {
    setGuntas(newGuntas);
    const a = parseFloat(currentAcres) || 0;
    const g = parseFloat(newGuntas) || 0;
    const total = Math.round((a * 43560) + (g * 1089));
    setSqFeet(total > 0 ? String(total) : '');
  };

  // Convert Rental Income to Text (Page 7)
  const handleRentalIncomeChange = (val) => {
    setRawRentalIncome(val);
    const num = Number(val);
    if (!isNaN(num) && num > 0) {
      setRentalIncomeWords(numberToIndianWords(num));
    } else {
      setRentalIncomeWords('');
    }
  };

  // Convert Sale Price to Text (Pages 7 & 8)
  const handleSalePriceChange = (val) => {
    setRawSalePrice(val);
    const num = Number(val);
    if (!isNaN(num) && num > 0) {
      setSalePriceWords(numberToIndianWords(num));
      const inCr = (num / 10000000).toFixed(2).replace(/\.00$/, '');
      setPriceCr(inCr);
    } else {
      setSalePriceWords('');
    }
  };

  // Handle Image Upload
  const handleImageFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setImageUrl(evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle Add Area (Pages 1 & 2)
  const handleAddArea = (e) => {
    e.preventDefault();
    if (!newAreaInput.trim()) return;
    addArea(newAreaInput.trim());
    setNewAreaInput('');
  };

  // Switch form type
  const handleSelectFormType = (typeKey) => {
    setActiveFormType(typeKey);
    setEditingId(null);
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setPriceCr('');
    setHotCommercial(false);
    setHotResidential(false);
    setMandate('Direct');
    setGoogleLocation('');
    setImageUrl('');
    setDetails('');
    setPlotArea('');
    setBuiltUpArea('');
    setDimensions('');
    setIsCorner(false);
    setCoveredArea('');
    setBuilderFloor('');
    setAmenities('');
    setIsGatedCommunity(false);
    setGatedCommunityName('');
    setSurveyNo('');
    setAcres('');
    setGuntas('');
    setSqFeet('');
    setFrontage('');
    setRoadWidth('');
    setBuildingName('');
    setWorkstations('');
    setCabins('');
    setRawRentalIncome('');
    setRentalIncomeWords('');
    setRawSalePrice('');
    setSalePriceWords('');
  };

  // Populate form for Edit
  const startEdit = (p) => {
    setEditingId(p.id);
    setActiveFormType(p.formType);
    setTitle(p.title || '');
    setArea(p.area || areas[0]);
    setPriceCr(String(p.priceCr || ''));
    setHotCommercial(Boolean(p.hotCommercial));
    setHotResidential(Boolean(p.hotResidential));
    setMandate(p.mandate || 'Direct');
    setGoogleLocation(p.googleLocation || '');
    setImageUrl(p.imageUrl || '');
    setDetails(p.details || '');
    setSubCategory(p.subCategory || '');
    setBhk(p.bhk || '4 BHK');
    setPlotArea(String(p.plotArea || ''));
    setBuiltUpArea(String(p.builtUpArea || ''));
    setDimensions(p.dimensions || '');
    setFacing(p.facing || 'East');
    setIsCorner(Boolean(p.isCorner));
    setCoveredArea(String(p.coveredArea || ''));
    setBuilderFloor(p.builderFloor || '');
    setAmenities(p.amenities || '');
    setIsGatedCommunity(Boolean(p.isGatedCommunity));
    setGatedCommunityName(p.gatedCommunityName || '');
    setSurveyNo(p.surveyNo || '');
    setAcres(String(p.acres || ''));
    setGuntas(String(p.guntas || ''));
    setSqFeet(String(p.sqFeet || ''));
    setLandType(p.landType || 'Converted Land');
    setFrontage(p.frontage || '');
    setRoadWidth(p.roadWidth || '');
    setBuildingName(p.buildingName || '');
    setWorkstations(String(p.workstations || ''));
    setCabins(String(p.cabins || ''));
    setRawRentalIncome(p.rentalIncome || '');
    setRentalIncomeWords(p.rentalIncomeWords || '');

    const formCard = document.getElementById('admin-form-anchor');
    if (formCard) formCard.scrollIntoView({ behavior: 'smooth' });
  };

  // Submit Form
  const handleSubmitProperty = (e) => {
    e.preventDefault();

    const prefixMap = {
      'bungalow_building': 'CT-BNG',
      'flat': 'CT-FLT',
      'site': 'CT-SIT',
      'commercial_building': 'CT-COM',
      'office_space': 'CT-OFF',
      'land': 'CT-LND'
    };
    const propId = editingId || `${prefixMap[activeFormType] || 'CT-PRP'}-${Math.floor(100 + Math.random() * 899)}`;

    const isCommercial = ['commercial_building', 'office_space'].includes(activeFormType) || subCategory === 'commercial_site';
    const primaryGroup = isCommercial ? 'Commercial' : 'Residential';

    const propData = {
      id: propId,
      formType: activeFormType,
      primaryGroup,
      subCategory: subCategory || (activeFormType === 'flat' ? 'luxury_flat' : activeFormType),
      title: title.trim(),
      area,
      priceCr: parseFloat(priceCr) || 0,
      hotCommercial,
      hotResidential,
      mandate,
      googleLocation: googleLocation.trim(),
      imageUrl,
      details: details.trim(),
      createdAt: new Date().toISOString()
    };

    if (activeFormType === 'bungalow_building') {
      propData.bhk = bhk;
      propData.plotArea = parseFloat(plotArea) || 0;
      propData.builtUpArea = parseFloat(builtUpArea) || 0;
      propData.dimensions = dimensions.trim();
      propData.facing = facing;
      propData.isCorner = isCorner;
    } else if (activeFormType === 'flat') {
      propData.coveredArea = parseFloat(coveredArea) || 0;
      propData.builtUpArea = parseFloat(builtUpArea) || 0;
      propData.facing = facing;
      propData.builderFloor = builderFloor.trim();
      propData.amenities = amenities.trim();
      propData.isGatedCommunity = isGatedCommunity;
      propData.gatedCommunityName = gatedCommunityName.trim();
    } else if (activeFormType === 'site') {
      propData.plotSize = parseFloat(plotArea) || 0;
      propData.dimensions = dimensions.trim();
      propData.facing = facing;
      propData.isCorner = isCorner;
      propData.subCategory = subCategory || 'residential_site';
    } else if (activeFormType === 'commercial_building') {
      propData.plotArea = parseFloat(plotArea) || 0;
      propData.builtUpArea = parseFloat(builtUpArea) || 0;
      propData.rentalIncome = rawRentalIncome ? (rawRentalIncome.startsWith('₹') ? rawRentalIncome : `₹ ${Number(rawRentalIncome).toLocaleString('en-IN')} / month`) : '';
      propData.rentalIncomeWords = rentalIncomeWords;
      propData.facing = facing;
      propData.isCorner = isCorner;
    } else if (activeFormType === 'office_space') {
      propData.buildingName = buildingName.trim();
      propData.workstations = parseInt(workstations, 10) || 0;
      propData.cabins = parseInt(cabins, 10) || 0;
      propData.coveredArea = parseFloat(coveredArea) || 0;
    } else if (activeFormType === 'land') {
      propData.surveyNo = surveyNo.trim();
      propData.acres = parseFloat(acres) || 0;
      propData.guntas = parseFloat(guntas) || 0;
      propData.sqFeet = parseFloat(sqFeet) || 0;
      propData.landType = landType;
      propData.frontage = frontage.trim();
      propData.roadWidth = roadWidth.trim();
    }

    if (editingId) {
      updateProperty(propData);
      setEditingId(null);
    } else {
      addProperty(propData);
    }
    clearForm();
  };

  // KPIs
  const commCount = properties.filter(p => p.primaryGroup === 'Commercial').length;
  const resCount = properties.filter(p => p.primaryGroup === 'Residential').length;
  const hotCount = properties.filter(p => p.hotCommercial || p.hotResidential).length;
  const directCount = properties.filter(p => p.mandate === 'Direct').length;
  const indirectCount = properties.length - directCount;

  // Filter Table
  const filteredTable = properties.filter(p => {
    const q = searchTableQuery.trim().toLowerCase();
    const matchesQ = !q || p.id.toLowerCase().includes(q) || p.title.toLowerCase().includes(q) || p.area.toLowerCase().includes(q);
    const matchesCat = categoryFilter === 'ALL' || p.formType === categoryFilter;
    return matchesQ && matchesCat;
  });

  return (
    <div>
      {/* Header */}
      <div className="admin-portal-header">
        <div>
          <span className="letter-badge">ADMINISTRATION &amp; INVENTORY ENGINE (PAGES 1 TO 8)</span>
          <h1 className="listing-active-title" style={{ marginTop: '0.35rem' }}>
            Call Tiger Executive Admin Portal
          </h1>
        </div>
        <div className="header-actions">
          <button type="button" className="btn-header" onClick={onOpenEditLetter}>
            ✎ Edit Founder's Letter
          </button>
          <button type="button" className="btn-header" onClick={resetToDefaults}>
            ↺ Reset Demo Inventory
          </button>
          <button type="button" className="btn-header btn-concierge" onClick={goHome}>
            ← Return to Client Portal
          </button>
        </div>
      </div>

      {/* 1. KPIs */}
      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="stat-label">Total Active Mandates</span>
          <div className="stat-value">{properties.length}</div>
          <span className="stat-breakdown">Live across all 12 discovery segments</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">Commercial vs. Residential</span>
          <div className="stat-value">{commCount} / {resCount}</div>
          <span className="stat-breakdown">{commCount} Commercial • {resCount} Residential</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">🔥 Priority Hot Deals</span>
          <div className="stat-value" style={{ color: 'var(--accent-hot)' }}>{hotCount}</div>
          <span className="stat-breakdown">Featured in Hot Commercial &amp; Hot Residential</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">Direct vs. Indirect Listings</span>
          <div className="stat-value" style={{ color: 'var(--accent-direct)' }}>{directCount} : {indirectCount}</div>
          <span className="stat-breakdown">Total Enquiries &amp; WhatsApp Leads: {enquiries.length}</span>
        </div>
      </section>

      {/* Main Grid: Area Ingestion + Property Ingestion */}
      <div className="admin-main-grid" id="admin-form-anchor">
        {/* 2. Area Ingestion Engine (Pages 1 & 2 Wireframes) */}
        <aside className="admin-panel-card">
          <h2 className="admin-panel-title">Bulk Area Database</h2>
          <p className="admin-panel-subtitle">
            Pre-loaded with 100+ Bangalore localities. Add new areas anytime to instantly generate live filter buttons on the website.
          </p>

          <form onSubmit={handleAddArea} className="area-add-form">
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Area Type Here..."
              value={newAreaInput}
              onChange={(e) => setNewAreaInput(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary-submit" style={{ padding: '0.6rem 1rem', whiteSpace: 'nowrap' }}>
              + Add
            </button>
          </form>

          <div className="area-list-scroll">
            {areas.map(a => {
              const count = properties.filter(p => p.area === a).length;
              return (
                <div key={a} className="area-list-item">
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    📍 {a} {count > 0 && <strong style={{ color: 'var(--accent-gold)' }}>({count})</strong>}
                  </span>
                  <button
                    type="button"
                    className="btn-remove-area"
                    onClick={() => removeArea(a)}
                    title="Remove Area"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </aside>

        {/* 3. Ingestion Forms (Pages 3 to 8 Wireframes) */}
        <section className="admin-panel-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <h2 className="admin-panel-title">
              {editingId ? `Edit Mandate: ${editingId}` : 'Add Property Mandate'}
            </h2>
            {editingId && (
              <button type="button" className="btn-nav-wireframe" onClick={() => { setEditingId(null); clearForm(); }}>
                Cancel Edit
              </button>
            )}
          </div>
          <p className="admin-panel-subtitle">
            Select category to load specialized fields matching wireframe pages 3 through 8.
          </p>

          {/* Form Tabs */}
          <div className="form-type-tabs">
            {[
              { id: 'bungalow_building', ref: 'Page 3', label: 'Bungalow / Res / Gated Bldg' },
              { id: 'flat', ref: 'Page 4', label: 'Flat / Luxury Apartment' },
              { id: 'land', ref: 'Page 5', label: 'Land (Acres & Guntas)' },
              { id: 'office_space', ref: 'Page 6', label: 'Office Space' },
              { id: 'commercial_building', ref: 'Page 7', label: 'Commercial Building' },
              { id: 'site', ref: 'Page 8', label: 'Sites (Resi / Gated / Comm)' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`form-type-tab ${activeFormType === tab.id ? 'active' : ''}`}
                onClick={() => handleSelectFormType(tab.id)}
              >
                <div style={{ fontSize: '0.64rem', opacity: 0.75 }}>{tab.ref}</div>
                <div>{tab.label}</div>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmitProperty}>
            <div className="admin-form-grid">
              {/* Headline */}
              <div className="form-field span-2">
                <label>Property Headline / Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Signature Tree-Lined Independent Mansion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Area & Price */}
              <div className="form-field">
                <label>Location → Choose Area * (Pages 1-8)</label>
                <select
                  className="admin-select"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                >
                  {areas.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Asking Price (in ₹ Crores) *</label>
                <input
                  type="number"
                  step="0.01"
                  className="admin-input"
                  placeholder="e.g. 24.5"
                  value={priceCr}
                  onChange={(e) => setPriceCr(e.target.value)}
                  required
                />
              </div>

              {/* PAGE 3: Bungalow / Residential Bldg */}
              {activeFormType === 'bungalow_building' && (
                <>
                  <div className="form-field">
                    <label>Sub-Category</label>
                    <select
                      className="admin-select"
                      value={subCategory || 'beautiful_bungalow'}
                      onChange={(e) => setSubCategory(e.target.value)}
                    >
                      <option value="beautiful_bungalow">Beautiful Bungalow</option>
                      <option value="residential_building">Residential Building</option>
                      <option value="gated_community_building">Gated Community Building</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>BHK Configuration (Filterable)</label>
                    <select
                      className="admin-select"
                      value={bhk}
                      onChange={(e) => setBhk(e.target.value)}
                    >
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                      <option value="5 BHK">5 BHK</option>
                      <option value="6+ BHK">6+ BHK / Mansion</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Plot Size (sq.ft) *</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 4800"
                      value={plotArea}
                      onChange={(e) => setPlotArea(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Built-up Area (sq.ft) *</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 6800"
                      value={builtUpArea}
                      onChange={(e) => setBuiltUpArea(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Plot Dimensions (Page 3)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. 40 × 60 ft or 60 × 80 ft"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Plot Facing (N, E, S, W, NE, NW, SE, SW)</label>
                    <select
                      className="admin-select"
                      value={facing}
                      onChange={(e) => setFacing(e.target.value)}
                    >
                      {['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  {/* Corner vs Intermediate Toggle (Page 3 Wireframe) */}
                  <div className="form-field span-2">
                    <label>Plot Position (Page 3 Wireframe)</label>
                    <div className="chip-bar">
                      <button
                        type="button"
                        className={`filter-chip ${isCorner ? 'active' : ''}`}
                        onClick={() => setIsCorner(true)}
                      >
                        [✓] Corner Plot
                      </button>
                      <button
                        type="button"
                        className={`filter-chip ${!isCorner ? 'active' : ''}`}
                        onClick={() => setIsCorner(false)}
                      >
                        [✓] Intermediate Plot
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* PAGE 4: Flat / Apartment */}
              {activeFormType === 'flat' && (
                <>
                  <div className="form-field">
                    <label>Covered Area (sq.ft) * (Page 4)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 3800"
                      value={coveredArea}
                      onChange={(e) => setCoveredArea(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Built-up Area (sq.ft) * (Page 4)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 4200"
                      value={builtUpArea}
                      onChange={(e) => setBuiltUpArea(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Facing (Page 4)</label>
                    <select
                      className="admin-select"
                      value={facing}
                      onChange={(e) => setFacing(e.target.value)}
                    >
                      {['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Builder Floor (Page 4)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Independent Single Unit per Floor (2nd Floor)"
                      value={builderFloor}
                      onChange={(e) => setBuilderFloor(e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Floor with Amenities (Page 4)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Clubhouse, Pool, Gym, Private Terrace Deck"
                      value={amenities}
                      onChange={(e) => setAmenities(e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Gated Community Name (Page 4)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Kingfisher Towers or Prestige Golfshire"
                      value={gatedCommunityName}
                      onChange={(e) => {
                        setGatedCommunityName(e.target.value);
                        setIsGatedCommunity(Boolean(e.target.value.trim()));
                      }}
                    />
                  </div>
                </>
              )}

              {/* PAGE 5: Land (Acres & Guntas) */}
              {activeFormType === 'land' && (
                <>
                  <div className="form-field">
                    <label>Survey No. (Page 5)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Sy. No. 142/2 & 143/1"
                      value={surveyNo}
                      onChange={(e) => setSurveyNo(e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Land Classification Dropdown (Page 5)</label>
                    <select
                      className="admin-select"
                      value={landType}
                      onChange={(e) => setLandType(e.target.value)}
                    >
                      <option value="Agricultural Land">Agricultural Land</option>
                      <option value="Converted Land">Converted Land</option>
                      <option value="Industrial Land">Industrial Land</option>
                      <option value="Within City Land">Within City Land</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Acres * (Page 5)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="admin-input"
                      placeholder="e.g. 2"
                      value={acres}
                      onChange={(e) => handleAcresChange(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Guntas * (Page 5: 1 Acre = 40 Guntas)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 24"
                      value={guntas}
                      onChange={(e) => handleGuntasChange(e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Total Sq.Feet (Auto-calculated: Acres &times; 43,560 + Guntas &times; 1,089)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 69696"
                      value={sqFeet}
                      onChange={(e) => setSqFeet(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Road Width (Page 5)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. 80 ft Tar Road"
                      value={roadWidth}
                      onChange={(e) => setRoadWidth(e.target.value)}
                    />
                  </div>

                  <div className="form-field span-2">
                    <label>Frontage of Land / Rate per sq.ft (Page 5)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. 350 ft frontage (₹ 3,200 / sq.ft)"
                      value={frontage}
                      onChange={(e) => setFrontage(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* PAGE 6: Office Space */}
              {activeFormType === 'office_space' && (
                <>
                  <div className="form-field">
                    <label>Building Name (Page 6)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Prestige Meridian Tower"
                      value={buildingName}
                      onChange={(e) => setBuildingName(e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Covered Area (sq.ft) (Page 6)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 15000"
                      value={coveredArea}
                      onChange={(e) => setCoveredArea(e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Workstation Count * (Page 6 &amp; 13: 50-100, 100-200, 200-500, 500-5000)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 160"
                      value={workstations}
                      onChange={(e) => setWorkstations(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Cabin Count * (Page 6)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 8"
                      value={cabins}
                      onChange={(e) => setCabins(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {/* PAGE 7: Commercial Building (Rental Income & Sale Price with Words Converter) */}
              {activeFormType === 'commercial_building' && (
                <>
                  <div className="form-field">
                    <label>Plot Size (sq.ft) * (Page 7)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 6000"
                      value={plotArea}
                      onChange={(e) => setPlotArea(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Built-up Area (sq.ft) * (Page 7)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 24000"
                      value={builtUpArea}
                      onChange={(e) => setBuiltUpArea(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field span-2">
                    <label>Rental Income (e.g. 120000) &rarr; "Convert it to text format [✓]" (Page 7)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 120000"
                      value={rawRentalIncome}
                      onChange={(e) => handleRentalIncomeChange(e.target.value)}
                    />
                    {rentalIncomeWords && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                        In Words: {rentalIncomeWords}
                      </span>
                    )}
                  </div>

                  <div className="form-field span-2">
                    <label>Sale Price in Raw Rupees (e.g. 120000000) &rarr; "Convert it to text format [✓]" (Page 7)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 120000000"
                      value={rawSalePrice}
                      onChange={(e) => handleSalePriceChange(e.target.value)}
                    />
                    {salePriceWords && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                        In Words: {salePriceWords} (Auto-computed ₹ {priceCr} Cr)
                      </span>
                    )}
                  </div>

                  <div className="form-field">
                    <label>Road Facing (Page 7)</label>
                    <select
                      className="admin-select"
                      value={facing}
                      onChange={(e) => setFacing(e.target.value)}
                    >
                      {['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Position: Corner vs Intermediate (Page 7)</label>
                    <div className="chip-bar" style={{ marginTop: '0.2rem' }}>
                      <button
                        type="button"
                        className={`filter-chip ${isCorner ? 'active' : ''}`}
                        onClick={() => setIsCorner(true)}
                      >
                        [✓] Corner Asset
                      </button>
                      <button
                        type="button"
                        className={`filter-chip ${!isCorner ? 'active' : ''}`}
                        onClick={() => setIsCorner(false)}
                      >
                        [✓] Intermediate
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* PAGE 8: Sites (Residential Site, Gated Community Site, Commercial Site) */}
              {activeFormType === 'site' && (
                <>
                  <div className="form-field">
                    <label>Site Category (Page 8)</label>
                    <select
                      className="admin-select"
                      value={subCategory || 'residential_site'}
                      onChange={(e) => setSubCategory(e.target.value)}
                    >
                      <option value="residential_site">(1) Residential Site</option>
                      <option value="gated_community_site">(2) Gated Community Site</option>
                      <option value="commercial_site">(3) Commercial Site</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Plot Size (sq.ft) * (Page 8: routes &lt;4000 vs &ge;4000)</label>
                    <input
                      type="number"
                      className="admin-input"
                      placeholder="e.g. 2400 or 6000"
                      value={plotArea}
                      onChange={(e) => setPlotArea(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Dimensions * (Page 8)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. 40 × 60 ft or 60 × 80 ft"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Facing (N, E, S, W, NE, NW, SE, SW)</label>
                    <select
                      className="admin-select"
                      value={facing}
                      onChange={(e) => setFacing(e.target.value)}
                    >
                      {['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field span-2">
                    <label>Site Position: Corner vs Intermediate (Page 8)</label>
                    <div className="chip-bar">
                      <button
                        type="button"
                        className={`filter-chip ${isCorner ? 'active' : ''}`}
                        onClick={() => setIsCorner(true)}
                      >
                        [✓] Corner Site
                      </button>
                      <button
                        type="button"
                        className={`filter-chip ${!isCorner ? 'active' : ''}`}
                        onClick={() => setIsCorner(false)}
                      >
                        [✓] Intermediate Site
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Google Location Map Pin (Pages 3, 5, 6, 7, 8) */}
              <div className="form-field span-2">
                <label>Google Location Map Pin / URL (Pages 3, 5, 6, 7, 8)</label>
                <input
                  type="url"
                  className="admin-input"
                  placeholder="e.g. https://maps.google.com/?q=..."
                  value={googleLocation}
                  onChange={(e) => setGoogleLocation(e.target.value)}
                />
              </div>

              {/* Image Upload Dropzone (Optional) */}
              <div className="form-field span-2">
                <label>Image Dropzone (Optional — Wireframes [ Image ] box)</label>
                <div className="image-upload-dropzone">
                  <input type="file" accept="image/*" onChange={handleImageFile} />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Upload photo or leave empty for clean text card
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="form-field span-2">
                <label>Executive Details &amp; Specifications *</label>
                <textarea
                  rows={3}
                  className="admin-textarea"
                  placeholder="Enter key technical metrics, road approach, title deeds, or lease terms..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Checkboxes: Hot Commercial, Hot Residential, Direct, Indirect (Pages 1 to 8) */}
            <div className="universal-boxes-row">
              <div className="checkbox-group-box">
                <span className="filter-label">Hot Deal Status (Pages 1-8)</span>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={hotCommercial}
                    onChange={(e) => setHotCommercial(e.target.checked)}
                  />
                  <span>[✓] Hot Commercial</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={hotResidential}
                    onChange={(e) => setHotResidential(e.target.checked)}
                  />
                  <span>[✓] Hot Residential</span>
                </label>
              </div>

              <div className="checkbox-group-box">
                <span className="filter-label">Mandate Source (Pages 1-8)</span>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="mandateSource"
                    value="Direct"
                    checked={mandate === 'Direct'}
                    onChange={() => setMandate('Direct')}
                  />
                  <span>[✓] Direct Listing (From Owner)</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="mandateSource"
                    value="Indirect"
                    checked={mandate === 'Indirect'}
                    onChange={() => setMandate('Indirect')}
                  />
                  <span>[✓] Indirect Listing (From Consultant)</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary-submit">
              {editingId ? '✓ Update Live Property Mandate' : '+ Publish Property Mandate Live'}
            </button>
          </form>
        </section>
      </div>

      {/* 4. Active Inventory Table */}
      <section className="admin-panel-card" style={{ marginTop: '2.5rem' }}>
        <div className="filter-row" style={{ marginBottom: '1rem' }}>
          <div>
            <h2 className="admin-panel-title">Active Inventory ({filteredTable.length})</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Live directory of all properties with instant edit &amp; delete capabilities.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <input
              type="search"
              className="admin-input"
              style={{ width: '220px' }}
              placeholder="Search ID, title, area..."
              value={searchTableQuery}
              onChange={(e) => setSearchTableQuery(e.target.value)}
            />
            <select
              className="admin-select"
              style={{ width: '210px' }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option value="bungalow_building">Bungalow &amp; Buildings</option>
              <option value="flat">Flats &amp; Apartments</option>
              <option value="site">Sites (Plots)</option>
              <option value="commercial_building">Commercial Buildings</option>
              <option value="office_space">Office Space</option>
              <option value="land">Land Parcels</option>
            </select>
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
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
              {filteredTable.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{p.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {p.subCategory || p.formType} &bull; {p.primaryGroup}
                    </div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{p.area}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-gold)' }}>
                    ₹ {p.priceCr} Cr
                  </td>
                  <td>
                    <span className={`mandate-badge ${p.mandate === 'Indirect' ? 'indirect' : 'direct'}`}>
                      {p.mandate}
                    </span>
                  </td>
                  <td>
                    {p.hotCommercial && <span className="hot-deal-badge">Hot Comm </span>}
                    {p.hotResidential && <span className="hot-deal-badge">Hot Res</span>}
                    {!p.hotCommercial && !p.hotResidential && <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Standard</span>}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button
                      type="button"
                      className="table-action-btn"
                      onClick={() => startEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="table-action-btn delete"
                      onClick={() => deleteProperty(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Client Enquiries Log Table */}
      <section className="admin-panel-card" style={{ marginTop: '2.5rem' }}>
        <h2 className="admin-panel-title">Client Enquiries &amp; WhatsApp Requirement Leads ({enquiries.length})</h2>
        <p className="admin-panel-subtitle">
          Direct leads captured through property enquiries, cross-share submissions, and the Page 10 requirement banner.
        </p>

        {enquiries.length > 0 ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Lead ID</th>
                  <th>Client / Consultant Name</th>
                  <th>Mobile Phone</th>
                  <th>Property / Requirement</th>
                  <th>Callback Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map(enq => (
                  <tr key={enq.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{enq.id}</td>
                    <td style={{ fontWeight: 600 }}>{enq.clientName || 'Direct Lead'}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>
                      <a href={`tel:${enq.phone}`} style={{ textDecoration: 'none', color: 'inherit' }}>{enq.phone}</a>
                    </td>
                    <td>
                      <div><strong>{enq.propertyId || 'General'}</strong></div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{enq.notes || '—'}</div>
                    </td>
                    <td style={{ fontSize: '0.78rem' }}>{enq.callbackTime || 'Standard'}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            No client enquiries or leads logged yet.
          </div>
        )}
      </section>
    </div>
  );
}
