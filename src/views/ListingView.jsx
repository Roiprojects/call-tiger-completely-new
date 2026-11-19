/**
 * DEDICATED CATEGORY LISTING VIEW (PAGES 11 TO 20)
 * Handles all 10 category screens with their exact wireframe controls:
 * - Page 11: Commercial (Com Site vs Com Building, Area chips with counts)
 * - Page 12: Residential (Sites vs Home/Bungalow, Area chips with counts)
 * - Page 13: Office Space (Workstation brackets + DUAL sort by Price & Workstation Count!)
 * - Page 14: Land (Agricultural, Converted, Industrial, Within City Land)
 * - Page 15: Gated Community (Site, Villas, Flat + G.C. Name dropdown!)
 * - Page 16: Beautiful Bungalows (BHK chips, Area chips with counts)
 * - Page 17: Sites Above & Below 4000 sq.ft
 * - Page 18: Hot Commercial (Price brackets with counts)
 * - Page 19: Hot Residential (Price brackets with counts)
 * - Page 20: Commercial 10-50 Cr & 51-1000 Cr (Site vs Building sub-filters)
 */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

const VIEW_METADATA = {
  'commercial': {
    title: 'Commercial Properties',
    subtitle: 'All Commercial Sites, Yielding Buildings, Retail Assets & Showrooms',
    defaultSort: 'DESC'
  },
  'residential': {
    title: 'Residential Properties',
    subtitle: 'Luxury Independent Homes, Bungalows, Gated Enclaves & Residential Plots',
    defaultSort: 'DESC'
  },
  'office-space': {
    title: 'Office Space',
    subtitle: 'Plug & Play Floors, Executive Suites & Corporate IT Campuses (50 to 5,000 Seats)',
    defaultSort: 'DESC'
  },
  'land': {
    title: 'Land Parcels & Acreage',
    subtitle: 'Agricultural, DC Converted, Industrial & Within City Development Land Banks',
    defaultSort: 'DESC'
  },
  'gated-community': {
    title: 'Gated Community',
    subtitle: 'Ultra-Secure Private Enclave Plots, Luxury Built Villas & Exclusive Flats',
    defaultSort: 'ASC'
  },
  'beautiful-bungalows': {
    title: 'Beautiful Bungalows',
    subtitle: 'Independent Luxury Mansions, Heritage Bungalows & Bespoke Family Residences',
    defaultSort: 'DESC'
  },
  'site-below-4000': {
    title: 'Site Below 4000 sq.ft',
    subtitle: 'Prime BDA & Gated Plots Under 4,000 sq.ft (30×40, 40×60, 45×80 ft)',
    defaultSort: 'ASC'
  },
  'site-above-4000': {
    title: 'Site Above 4000 sq.ft',
    subtitle: 'Large Format Estate Plots & Trophy Sites 4,000 sq.ft and Above (60×80, 80×120 ft+)',
    defaultSort: 'ASC'
  },
  'hot-commercial': {
    title: 'Hot Commercial Properties of All Areas',
    subtitle: 'Priority High-Yield & Trophy Commercial Mandates Across Price Brackets',
    defaultSort: 'DESC'
  },
  'hot-residential': {
    title: 'Hot Residential Properties of All Areas',
    subtitle: 'Priority Luxury Residential Bungalows, Plots & Villa Mandates Across Price Brackets',
    defaultSort: 'DESC'
  },
  'comm-10-50': {
    title: 'Commercial 10 – 50 Cr',
    subtitle: 'Mid-Cap Commercial Sites & Yielding Buildings (₹10 Cr to ₹50 Cr)',
    defaultSort: 'ASC'
  },
  'comm-51-1000': {
    title: 'Commercial 51 – 1000 Cr',
    subtitle: 'Institutional Towers, SEZ Tech Campuses & Trophy Commercial Assets (₹51 Cr to ₹1,000 Cr)',
    defaultSort: 'ASC'
  }
};

export default function ListingView({ viewKey, onEnquire }) {
  const { properties, areas, goBack, goHome } = useApp();
  const meta = VIEW_METADATA[viewKey] || { title: 'Properties', subtitle: 'Verified Inventory', defaultSort: 'DESC' };

  // View state
  const [selectedArea, setSelectedArea] = useState('ALL');
  const [sortOrder, setSortOrder] = useState(meta.defaultSort);
  const [officeSortMode, setOfficeSortMode] = useState('PRICE'); // 'PRICE' | 'WORKSTATION' (Page 13 Wireframe)
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' | 'list'

  // Sub-filter switches
  const [commercialSubType, setCommercialSubType] = useState('ALL'); // 'ALL' | 'SITE' | 'BUILDING' (Page 11)
  const [residentialSubType, setResidentialSubType] = useState('ALL'); // 'ALL' | 'SITE' | 'HOME' (Page 12)
  const [scaleSubType, setScaleSubType] = useState('ALL'); // 'ALL' | 'SITE' | 'BUILDING' (Page 20)
  const [workstationBracket, setWorkstationBracket] = useState('ALL'); // 'ALL' | '50-100' | '100-200' | '200-500' | '500-5000' (Page 13)
  const [landClassification, setLandClassification] = useState('ALL'); // 'ALL' | 'Agricultural Land' | 'Converted Land' | 'Industrial Land' | 'Within City Land' (Page 14)
  const [gatedSubType, setGatedSubType] = useState('ALL'); // 'ALL' | 'SITE' | 'VILLAS' | 'FLAT' (Page 15)
  const [gatedCommunityName, setGatedCommunityName] = useState('ALL'); // Page 15 G.C. Name filter
  const [bhkFilter, setBhkFilter] = useState('ALL'); // Page 16 BHK filter
  const [hotCommBracket, setHotCommBracket] = useState('ALL'); // Page 18: '5-10', '10-20', '20-50', '50-100', '100-5000'
  const [hotResBracket, setHotResBracket] = useState('ALL'); // Page 19: '0-10', '10-20', '20-50', '50-1000'

  // 1. Base filter per segment (ensures non-blank default landing)
  const getBaseProperties = () => {
    switch (viewKey) {
      case 'commercial':
        return properties.filter(p => p.primaryGroup === 'Commercial');
      case 'residential':
        return properties.filter(p => p.primaryGroup === 'Residential');
      case 'office-space':
        return properties.filter(p => p.formType === 'office_space' || p.subCategory === 'office_space');
      case 'land':
        return properties.filter(p => p.formType === 'land' || p.subCategory === 'land_parcel');
      case 'gated-community':
        return properties.filter(p => p.subCategory === 'gated_community_site' || p.subCategory === 'gated_community_building' || p.isGatedCommunity);
      case 'beautiful-bungalows':
        return properties.filter(p => p.subCategory === 'beautiful_bungalow' || p.formType === 'bungalow_building');
      case 'site-below-4000':
        return properties.filter(p => p.formType === 'site' && Number(p.plotSize) > 0 && Number(p.plotSize) < 4000);
      case 'site-above-4000':
        return properties.filter(p => p.formType === 'site' && Number(p.plotSize) >= 4000);
      case 'hot-commercial':
        return properties.filter(p => Boolean(p.hotCommercial));
      case 'hot-residential':
        return properties.filter(p => Boolean(p.hotResidential));
      case 'comm-10-50':
        return properties.filter(p => p.primaryGroup === 'Commercial' && p.priceCr >= 10 && p.priceCr <= 50);
      case 'comm-51-1000':
        return properties.filter(p => p.primaryGroup === 'Commercial' && p.priceCr > 50 && p.priceCr <= 1000);
      default:
        return properties;
    }
  };

  const baseProps = getBaseProperties();

  // 2. Apply sub-filters
  let filtered = baseProps.filter(p => {
    // Area filter
    if (selectedArea !== 'ALL' && p.area !== selectedArea) return false;

    // Commercial view (Page 11): Com Site vs Com Building
    if (viewKey === 'commercial' && commercialSubType !== 'ALL') {
      if (commercialSubType === 'SITE' && p.formType !== 'site') return false;
      if (commercialSubType === 'BUILDING' && p.formType === 'site') return false;
    }

    // Residential view (Page 12): Sites vs Home/Bungalow
    if (viewKey === 'residential' && residentialSubType !== 'ALL') {
      if (residentialSubType === 'SITE' && p.formType !== 'site' && p.formType !== 'land') return false;
      if (residentialSubType === 'HOME' && p.formType !== 'bungalow_building' && p.formType !== 'flat') return false;
    }

    // Commercial scale views (Page 20): Site vs Building
    if (['comm-10-50', 'comm-51-1000'].includes(viewKey) && scaleSubType !== 'ALL') {
      if (scaleSubType === 'SITE' && p.formType !== 'site') return false;
      if (scaleSubType === 'BUILDING' && p.formType === 'site') return false;
    }

    // Office Space view (Page 13): Workstation brackets
    if (viewKey === 'office-space' && workstationBracket !== 'ALL') {
      const [minW, maxW] = workstationBracket.split('-').map(Number);
      const w = Number(p.workstations) || 0;
      if (w < minW || w > maxW) return false;
    }

    // Land view (Page 14): Classification
    if (viewKey === 'land' && landClassification !== 'ALL') {
      if (p.landType !== landClassification) return false;
    }

    // Gated Community view (Page 15): Site, Villas, Flat + G.C. Name
    if (viewKey === 'gated-community') {
      if (gatedSubType === 'SITE' && p.formType !== 'site') return false;
      if (gatedSubType === 'VILLAS' && p.formType !== 'bungalow_building') return false;
      if (gatedSubType === 'FLAT' && p.formType !== 'flat') return false;
      if (gatedCommunityName !== 'ALL' && p.gatedCommunityName !== gatedCommunityName) return false;
    }

    // Beautiful Bungalows (Page 16): BHK
    if (viewKey === 'beautiful-bungalows' && bhkFilter !== 'ALL') {
      if (p.bhk !== bhkFilter) return false;
    }

    // Hot Commercial (Page 18): Price brackets
    if (viewKey === 'hot-commercial' && hotCommBracket !== 'ALL') {
      const [minP, maxP] = hotCommBracket.split('-').map(Number);
      if (p.priceCr < minP || p.priceCr > maxP) return false;
    }

    // Hot Residential (Page 19): Price brackets
    if (viewKey === 'hot-residential' && hotResBracket !== 'ALL') {
      const [minP, maxP] = hotResBracket.split('-').map(Number);
      if (p.priceCr < minP || p.priceCr > maxP) return false;
    }

    return true;
  });

  // 3. Sorting (Dual sort on Office Space per Page 13: Price vs. Workstation count!)
  filtered.sort((a, b) => {
    if (viewKey === 'office-space' && officeSortMode === 'WORKSTATION') {
      const wa = Number(a.workstations) || 0;
      const wb = Number(b.workstations) || 0;
      return sortOrder === 'ASC' ? wa - wb : wb - wa;
    }
    const pa = Number(a.priceCr) || 0;
    const pb = Number(b.priceCr) || 0;
    return sortOrder === 'ASC' ? pa - pb : pb - pa;
  });

  // Unique areas in this view for filter chips
  const activeAreasInView = Array.from(new Set(baseProps.map(p => p.area)));

  // Unique G.C. Names for Page 15
  const gcNames = Array.from(new Set(baseProps.map(p => p.gatedCommunityName).filter(Boolean)));

  // Uses Area Dropdown vs Chips per wireframes
  const usesDropdownArea = ['comm-10-50', 'comm-51-1000', 'hot-commercial'].includes(viewKey);

  return (
    <div>
      {/* Listing Nav Bar (Wireframe header: [ Back ] [ Home ] Title Result Counter) */}
      <nav className="listing-nav-bar" aria-label="Category Navigation">
        <div className="nav-buttons-group">
          <button type="button" className="btn-nav-wireframe" onClick={goBack}>
            ← Back
          </button>
          <button type="button" className="btn-nav-wireframe" onClick={goHome}>
            ⌂ Home
          </button>
        </div>

        <div className="listing-title-wrap">
          <h1 className="listing-active-title">{meta.title}</h1>
          <span className="listing-active-subtitle">{meta.subtitle}</span>
        </div>

        <div className="listing-nav-right">
          <div className="layout-toggle-group">
            <button
              type="button"
              className={`layout-toggle-btn ${layoutMode === 'list' ? 'active' : ''}`}
              onClick={() => setLayoutMode('list')}
            >
              ☰ List
            </button>
            <button
              type="button"
              className={`layout-toggle-btn ${layoutMode === 'grid' ? 'active' : ''}`}
              onClick={() => setLayoutMode('grid')}
            >
              ⊞ Grid
            </button>
          </div>
          <div className="listing-result-counter">
            {filtered.length} {filtered.length === 1 ? 'Listing' : 'Listings'} Found
          </div>
        </div>
      </nav>

      {/* Filter Deck */}
      <section className="filter-deck">
        {/* Area Filter Chips (When not using dropdown) */}
        {!usesDropdownArea && (
          <div className="filter-group full-width">
            <span className="filter-label">Area Filter Chips</span>
            <div className="chip-bar">
              <button
                type="button"
                className={`filter-chip ${selectedArea === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedArea('ALL')}
              >
                <span>All Areas</span>
                <span className="chip-count-bubble">{baseProps.length}</span>
              </button>
              {activeAreasInView.map(a => {
                const count = baseProps.filter(p => p.area === a).length;
                return (
                  <button
                    key={a}
                    type="button"
                    className={`filter-chip ${selectedArea === a ? 'active' : ''}`}
                    onClick={() => setSelectedArea(a)}
                  >
                    <span>{a}</span>
                    <span className="chip-count-bubble">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="filter-row">
          {/* Area Dropdown (For Comm 10-50, 51-1000, Hot Commercial) */}
          {usesDropdownArea && (
            <div className="filter-group">
              <label className="filter-label">Area-Wise Filter</label>
              <select
                className="area-dropdown-select"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="ALL">All Areas ({baseProps.length} Listings)</option>
                {activeAreasInView.map(a => (
                  <option key={a} value={a}>
                    {a} ({baseProps.filter(p => p.area === a).length})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* PAGE 11: Commercial (Com Site vs Com Building with live counts) */}
          {viewKey === 'commercial' && (
            <div className="filter-group">
              <span className="filter-label">Asset Type</span>
              <div className="chip-bar">
                <button
                  type="button"
                  className={`filter-chip ${commercialSubType === 'ALL' ? 'active' : ''}`}
                  onClick={() => setCommercialSubType('ALL')}
                >
                  All Commercial ({baseProps.length})
                </button>
                <button
                  type="button"
                  className={`filter-chip ${commercialSubType === 'SITE' ? 'active' : ''}`}
                  onClick={() => setCommercialSubType('SITE')}
                >
                  Com Site of All Area ({baseProps.filter(p => p.formType === 'site').length})
                </button>
                <button
                  type="button"
                  className={`filter-chip ${commercialSubType === 'BUILDING' ? 'active' : ''}`}
                  onClick={() => setCommercialSubType('BUILDING')}
                >
                  Com Building of All Area ({baseProps.filter(p => p.formType !== 'site').length})
                </button>
              </div>
            </div>
          )}

          {/* PAGE 12: Residential (Sites of all area vs Home/Bungalow) */}
          {viewKey === 'residential' && (
            <div className="filter-group">
              <span className="filter-label">Residential Type</span>
              <div className="chip-bar">
                <button
                  type="button"
                  className={`filter-chip ${residentialSubType === 'ALL' ? 'active' : ''}`}
                  onClick={() => setResidentialSubType('ALL')}
                >
                  All Residential ({baseProps.length})
                </button>
                <button
                  type="button"
                  className={`filter-chip ${residentialSubType === 'SITE' ? 'active' : ''}`}
                  onClick={() => setResidentialSubType('SITE')}
                >
                  Sites of All Area ({baseProps.filter(p => p.formType === 'site' || p.formType === 'land').length})
                </button>
                <button
                  type="button"
                  className={`filter-chip ${residentialSubType === 'HOME' ? 'active' : ''}`}
                  onClick={() => setResidentialSubType('HOME')}
                >
                  Home / Bungalow of All Area ({baseProps.filter(p => p.formType === 'bungalow_building' || p.formType === 'flat').length})
                </button>
              </div>
            </div>
          )}

          {/* PAGE 13: Office Space (Workstations Capacity + Dual Sort) */}
          {viewKey === 'office-space' && (
            <div className="filter-group full-width">
              <span className="filter-label">Workstation Capacity Filter (Page 13 Wireframe)</span>
              <div className="chip-bar">
                <button
                  type="button"
                  className={`filter-chip ${workstationBracket === 'ALL' ? 'active' : ''}`}
                  onClick={() => setWorkstationBracket('ALL')}
                >
                  All Capacities ({baseProps.length})
                </button>
                {[
                  { id: '50-100', label: '50 – 100 WS' },
                  { id: '100-200', label: '100 – 200 WS' },
                  { id: '200-500', label: '200 – 500 WS' },
                  { id: '500-5000', label: '500 – 5000 WS' }
                ].map(b => {
                  const [minW, maxW] = b.id.split('-').map(Number);
                  const count = baseProps.filter(p => {
                    const w = Number(p.workstations) || 0;
                    return w >= minW && w <= maxW;
                  }).length;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      className={`filter-chip ${workstationBracket === b.id ? 'active' : ''}`}
                      onClick={() => setWorkstationBracket(b.id)}
                    >
                      <span>{b.label}</span>
                      <span className="chip-count-bubble">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PAGE 14: Land (Agricultural, Converted, Industrial, Within City) */}
          {viewKey === 'land' && (
            <div className="filter-group full-width">
              <span className="filter-label">Statutory Land Classification (Page 14 Wireframe)</span>
              <div className="chip-bar">
                <button
                  type="button"
                  className={`filter-chip ${landClassification === 'ALL' ? 'active' : ''}`}
                  onClick={() => setLandClassification('ALL')}
                >
                  All Land Types ({baseProps.length})
                </button>
                {[
                  'Agricultural Land',
                  'Converted Land',
                  'Industrial Land',
                  'Within City Land'
                ].map(lt => {
                  const count = baseProps.filter(p => p.landType === lt).length;
                  return (
                    <button
                      key={lt}
                      type="button"
                      className={`filter-chip ${landClassification === lt ? 'active' : ''}`}
                      onClick={() => setLandClassification(lt)}
                    >
                      <span>{lt}</span>
                      <span className="chip-count-bubble">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PAGE 15: Gated Community (Site, Villas, Flat + G.C. Name dropdown) */}
          {viewKey === 'gated-community' && (
            <>
              <div className="filter-group">
                <span className="filter-label">Asset Type (Page 15)</span>
                <div className="chip-bar">
                  <button
                    type="button"
                    className={`filter-chip ${gatedSubType === 'ALL' ? 'active' : ''}`}
                    onClick={() => setGatedSubType('ALL')}
                  >
                    All ({baseProps.length})
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${gatedSubType === 'SITE' ? 'active' : ''}`}
                    onClick={() => setGatedSubType('SITE')}
                  >
                    Site ({baseProps.filter(p => p.formType === 'site').length})
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${gatedSubType === 'VILLAS' ? 'active' : ''}`}
                    onClick={() => setGatedSubType('VILLAS')}
                  >
                    Villas ({baseProps.filter(p => p.formType === 'bungalow_building').length})
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${gatedSubType === 'FLAT' ? 'active' : ''}`}
                    onClick={() => setGatedSubType('FLAT')}
                  >
                    Flat ({baseProps.filter(p => p.formType === 'flat').length})
                  </button>
                </div>
              </div>

              {gcNames.length > 0 && (
                <div className="filter-group">
                  <label className="filter-label">G.C. Name ▾ (Project Filter)</label>
                  <select
                    className="area-dropdown-select"
                    value={gatedCommunityName}
                    onChange={(e) => setGatedCommunityName(e.target.value)}
                  >
                    <option value="ALL">All Gated Enclaves</option>
                    {gcNames.map(gc => (
                      <option key={gc} value={gc}>{gc}</option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          {/* PAGE 16: Beautiful Bungalows (BHK Filter) */}
          {viewKey === 'beautiful-bungalows' && (
            <div className="filter-group">
              <span className="filter-label">BHK Configuration</span>
              <div className="chip-bar">
                <button
                  type="button"
                  className={`filter-chip ${bhkFilter === 'ALL' ? 'active' : ''}`}
                  onClick={() => setBhkFilter('ALL')}
                >
                  All BHKs
                </button>
                {['3 BHK', '4 BHK', '5 BHK', '6+ BHK'].map(b => (
                  <button
                    key={b}
                    type="button"
                    className={`filter-chip ${bhkFilter === b ? 'active' : ''}`}
                    onClick={() => setBhkFilter(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 18: Hot Commercial (Price Brackets) */}
          {viewKey === 'hot-commercial' && (
            <div className="filter-group full-width">
              <span className="filter-label">Hot Commercial Price Brackets (Page 18)</span>
              <div className="chip-bar">
                <button
                  type="button"
                  className={`filter-chip hot-chip ${hotCommBracket === 'ALL' ? 'active' : ''}`}
                  onClick={() => setHotCommBracket('ALL')}
                >
                  All Brackets ({baseProps.length})
                </button>
                {[
                  { id: '5-10', label: '5 – 10 Cr' },
                  { id: '10-20', label: '10 – 20 Cr' },
                  { id: '20-50', label: '20 – 50 Cr' },
                  { id: '50-100', label: '50 – 100 Cr' },
                  { id: '100-5000', label: '100 to 5000 Cr' }
                ].map(b => {
                  const [minP, maxP] = b.id.split('-').map(Number);
                  const count = baseProps.filter(p => p.priceCr >= minP && p.priceCr <= maxP).length;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      className={`filter-chip hot-chip ${hotCommBracket === b.id ? 'active' : ''}`}
                      onClick={() => setHotCommBracket(b.id)}
                    >
                      <span>{b.label}</span>
                      <span className="chip-count-bubble">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PAGE 19: Hot Residential (Price Brackets) */}
          {viewKey === 'hot-residential' && (
            <div className="filter-group full-width">
              <span className="filter-label">Hot Residential Price Brackets (Page 19)</span>
              <div className="chip-bar">
                <button
                  type="button"
                  className={`filter-chip hot-chip ${hotResBracket === 'ALL' ? 'active' : ''}`}
                  onClick={() => setHotResBracket('ALL')}
                >
                  All Brackets ({baseProps.length})
                </button>
                {[
                  { id: '0-10', label: '0 – 10 Cr' },
                  { id: '10-20', label: '10 – 20 Cr' },
                  { id: '20-50', label: '20 – 50 Cr' },
                  { id: '50-1000', label: '50 – 1000 Cr' }
                ].map(b => {
                  const [minP, maxP] = b.id.split('-').map(Number);
                  const count = baseProps.filter(p => p.priceCr >= minP && p.priceCr <= maxP).length;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      className={`filter-chip hot-chip ${hotResBracket === b.id ? 'active' : ''}`}
                      onClick={() => setHotResBracket(b.id)}
                    >
                      <span>{b.label}</span>
                      <span className="chip-count-bubble">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PAGE 20: Commercial 10-50 Cr & 51-1000 Cr (Site vs Building) */}
          {['comm-10-50', 'comm-51-1000'].includes(viewKey) && (
            <div className="filter-group">
              <span className="filter-label">Configuration</span>
              <div className="chip-bar">
                <button
                  type="button"
                  className={`filter-chip ${scaleSubType === 'ALL' ? 'active' : ''}`}
                  onClick={() => setScaleSubType('ALL')}
                >
                  All (Site &amp; Building)
                </button>
                <button
                  type="button"
                  className={`filter-chip ${scaleSubType === 'SITE' ? 'active' : ''}`}
                  onClick={() => setScaleSubType('SITE')}
                >
                  Site of All Area ({baseProps.filter(p => p.formType === 'site').length})
                </button>
                <button
                  type="button"
                  className={`filter-chip ${scaleSubType === 'BUILDING' ? 'active' : ''}`}
                  onClick={() => setScaleSubType('BUILDING')}
                >
                  Com Building of All Area ({baseProps.filter(p => p.formType !== 'site').length})
                </button>
              </div>
            </div>
          )}

          {/* Sort Controls (Dual Mode for Office Space on Page 13: Price vs Workstation count!) */}
          <div className="filter-group">
            <span className="filter-label">
              {viewKey === 'office-space' ? 'Sorting Options (Page 13)' : 'Price Sort (₹ Cr)'}
            </span>
            <div className="chip-bar">
              {viewKey === 'office-space' && (
                <>
                  <button
                    type="button"
                    className={`filter-chip ${officeSortMode === 'WORKSTATION' ? 'active' : ''}`}
                    onClick={() => setOfficeSortMode('WORKSTATION')}
                  >
                    By Workstation Seats
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${officeSortMode === 'PRICE' ? 'active' : ''}`}
                    onClick={() => setOfficeSortMode('PRICE')}
                  >
                    By Price (Rent/Sale)
                  </button>
                </>
              )}
              <button
                type="button"
                className={`filter-chip sort-chip ${sortOrder === 'DESC' ? 'active' : ''}`}
                onClick={() => setSortOrder('DESC')}
              >
                ↓ High to Low
              </button>
              <button
                type="button"
                className={`filter-chip sort-chip ${sortOrder === 'ASC' ? 'active' : ''}`}
                onClick={() => setSortOrder('ASC')}
              >
                ↑ Low to High
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Property List Container */}
      <section
        className={`property-list-container ${layoutMode === 'grid' ? 'grid-2-col' : ''}`}
        aria-label="List of Properties"
      >
        {filtered.length > 0 ? (
          filtered.map(p => (
            <PropertyCard key={p.id} prop={p} onEnquire={onEnquire} />
          ))
        ) : (
          <div className="empty-results-notice">
            <h3 className="empty-results-title">No Matching Properties Found</h3>
            <p className="empty-results-sub">
              Try resetting the active locality or bracket filter to see all {baseProps.length} properties in this segment.
            </p>
            <button
              type="button"
              className="btn-nav-wireframe"
              onClick={() => {
                setSelectedArea('ALL');
                setCommercialSubType('ALL');
                setResidentialSubType('ALL');
                setScaleSubType('ALL');
                setWorkstationBracket('ALL');
                setLandClassification('ALL');
                setGatedSubType('ALL');
                setGatedCommunityName('ALL');
                setBhkFilter('ALL');
                setHotCommBracket('ALL');
                setHotResBracket('ALL');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
