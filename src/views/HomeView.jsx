/**
 * PAGE 10 WIREFRAME: CLIENT MAIN HOME PAGE
 * Features:
 * - Logo & Letter (provided by me)
 * - [ Premium Area ] & [ All Area of Bangalore ] Top Buttons
 * - 12 Category Launchpads with Live Count Badges:
 *    Com, Resi, Off Space, Land, Gated Community, Beautiful Bungalow,
 *    Site Above 4000 sq.ft, Sites below 4000 sq.ft, Hot Commercial,
 *    Hot Residential, Com 10-50 Cr, Com 51-1000 Cr
 * - PDF / Word Format Download Banner (Page 10 & 21)
 * - Lead / Requirement Capture Box connected to WhatsApp 9740402975 & Dashboard
 */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FoundersLetter from '../components/FoundersLetter';
import RequirementBox from '../components/RequirementBox';
import PropertyCard from '../components/PropertyCard';

export default function HomeView({ onOpenEditLetter, onOpenCollaborate, onOpenExport, onEnquire }) {
  const { properties, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [hotTab, setHotTab] = useState('ALL');

  // Count helper for any view
  const getCountFor = (viewKey) => {
    switch (viewKey) {
      case 'commercial':
        return properties.filter(p => p.primaryGroup === 'Commercial').length;
      case 'residential':
        return properties.filter(p => p.primaryGroup === 'Residential').length;
      case 'office-space':
        return properties.filter(p => p.formType === 'office_space' || p.subCategory === 'office_space').length;
      case 'land':
        return properties.filter(p => p.formType === 'land' || p.subCategory === 'land_parcel').length;
      case 'gated-community':
        return properties.filter(p => p.subCategory === 'gated_community_site' || p.subCategory === 'gated_community_building' || p.isGatedCommunity).length;
      case 'beautiful-bungalows':
        return properties.filter(p => p.subCategory === 'beautiful_bungalow' || p.formType === 'bungalow_building').length;
      case 'site-above-4000':
        return properties.filter(p => p.formType === 'site' && Number(p.plotSize) >= 4000).length;
      case 'site-below-4000':
        return properties.filter(p => p.formType === 'site' && Number(p.plotSize) > 0 && Number(p.plotSize) < 4000).length;
      case 'hot-commercial':
        return properties.filter(p => Boolean(p.hotCommercial)).length;
      case 'hot-residential':
        return properties.filter(p => Boolean(p.hotResidential)).length;
      case 'comm-10-50':
        return properties.filter(p => p.primaryGroup === 'Commercial' && p.priceCr >= 10 && p.priceCr <= 50).length;
      case 'comm-51-1000':
        return properties.filter(p => p.primaryGroup === 'Commercial' && p.priceCr > 50 && p.priceCr <= 1000).length;
      default:
        return 0;
    }
  };

  const segments = [
    { key: 'commercial', title: 'Commercial', subtitle: 'Yield Buildings, Showrooms, Offices & Plots', icon: '🏢', isHot: false },
    { key: 'residential', title: 'Residential', subtitle: 'Independent Homes, Luxury Villas & Sites', icon: '🏡', isHot: false },
    { key: 'office-space', title: 'Office Space', subtitle: '50 to 5,000 Plug & Play Workstations', icon: '💼', isHot: false },
    { key: 'land', title: 'Land', subtitle: 'Agri, Converted, Industrial & Within City', icon: '🌾', isHot: false },
    { key: 'gated-community', title: 'Gated Community', subtitle: 'Secure Enclave Plots, Villas & Luxury Flats', icon: '🛡️', isHot: false },
    { key: 'beautiful-bungalows', title: 'Beautiful Bungalow', subtitle: 'Independent Luxury Mansions & Residences', icon: '🏰', isHot: false },
    { key: 'site-above-4000', title: 'Site Above 4000 sq.ft', subtitle: 'Large Format Estate Plots ≥ 4,000 sq.ft', icon: '📐', isHot: false },
    { key: 'site-below-4000', title: 'Sites below 4000 sq.ft', subtitle: 'Prime BDA & Gated Plots < 4,000 sq.ft', icon: '📏', isHot: false },
    { key: 'hot-commercial', title: 'Hot Commercial', subtitle: 'Priority Commercial Deals (5 to 100+ Cr)', icon: '🔥', isHot: true },
    { key: 'hot-residential', title: 'Hot Residential', subtitle: 'Priority Residential Deals (0 to 100+ Cr)', icon: '🔥', isHot: true },
    { key: 'comm-10-50', title: 'Com 10 – 50 Cr', subtitle: 'Mid-Scale Commercial Sites & Yield Buildings', icon: '📈', isHot: false },
    { key: 'comm-51-1000', title: 'Com 51 – 1000 Cr', subtitle: 'Institutional Towers, SEZ Parks & Tech Campuses', icon: '🏛️', isHot: false }
  ];

  // Quick search filter
  const q = searchQuery.trim().toLowerCase();
  const searchResults = q
    ? properties.filter(
        p =>
          p.id.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          (p.details && p.details.toLowerCase().includes(q))
      )
    : [];

  // Hot deals for preview
  let featuredHot = properties.filter(p => p.hotCommercial || p.hotResidential);
  if (hotTab === 'COMMERCIAL') featuredHot = featuredHot.filter(p => p.hotCommercial);
  if (hotTab === 'RESIDENTIAL') featuredHot = featuredHot.filter(p => p.hotResidential);

  return (
    <div>
      {/* 1. Founder's Letterhead */}
      <FoundersLetter
        onOpenEditLetter={onOpenEditLetter}
        onOpenCollaborate={onOpenCollaborate}
      />

      {/* 2. Top Navigation Hub (Page 10 Wireframe: [ Premium Area ] & [ All Area of Bangalore ]) */}
      <div style={{ margin: '2rem 0 1.5rem 0' }}>
        <div className="section-eyebrow">
          <span>PAGE 10 WIREFRAME HUB • SELECT AREA DISCOVERY MODE</span>
          <span>CURATED VS. FULL BANGALORE REGISTRY</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
          <button
            type="button"
            className="primary-category-btn"
            style={{ borderLeftColor: 'var(--accent-gold)' }}
            onClick={() => navigateTo('premium-areas')}
          >
            <div className="cat-icon-circle" style={{ background: 'var(--accent-gold-soft)', color: 'var(--accent-gold)' }}>
              💎
            </div>
            <div className="cat-btn-body">
              <span className="cat-btn-title" style={{ fontSize: '1.65rem' }}>Premium Area</span>
              <span className="cat-btn-sub">Only High-Value Prime Localities Listed Here</span>
              <div className="cat-btn-tags">
                <span className="cat-mini-tag">Sadashivanagar</span>
                <span className="cat-mini-tag">Indiranagar</span>
                <span className="cat-mini-tag">Koramangala</span>
                <span className="cat-mini-tag">Lavelle Road</span>
                <span className="cat-mini-tag">HSR / HRBR</span>
              </div>
            </div>
            <div className="cat-btn-right">
              <span className="cat-btn-arrow">&rarr;</span>
            </div>
          </button>

          <button
            type="button"
            className="primary-category-btn"
            style={{ borderLeftColor: '#2EB872' }}
            onClick={() => navigateTo('all-areas')}
          >
            <div className="cat-icon-circle" style={{ background: 'rgba(46, 184, 114, 0.1)', color: '#2EB872' }}>
              📍
            </div>
            <div className="cat-btn-body">
              <span className="cat-btn-title" style={{ fontSize: '1.65rem' }}>All Area of Bangalore</span>
              <span className="cat-btn-sub">Where We Have Verified Properties Listed</span>
              <div className="cat-btn-tags">
                <span className="cat-mini-tag">Complete Directory</span>
                <span className="cat-mini-tag">100+ Localities</span>
                <span className="cat-mini-tag">Live Property Counts</span>
              </div>
            </div>
            <div className="cat-btn-right">
              <span className="cat-btn-arrow">&rarr;</span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Instant Search Bar */}
      <div className="home-search-bar-wrap">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2.2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          className="home-search-input"
          placeholder={`Quick search across all ${properties.length} listings by Area, ID (e.g. CT-COM-202), or keywords...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="btn-nav-wireframe"
            onClick={() => setSearchQuery('')}
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Instant Search Results Container */}
      {searchQuery && (
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="section-header-bar">
            <div>
              <span className="section-eyebrow">INSTANT SEARCH RESULTS</span>
              <h2 className="section-main-heading">
                Found {searchResults.length} Properties Matching "{searchQuery}"
              </h2>
            </div>
          </div>
          <div className="property-list-container grid-2-col">
            {searchResults.length > 0 ? (
              searchResults.map(p => (
                <PropertyCard key={p.id} prop={p} onEnquire={onEnquire} />
              ))
            ) : (
              <div className="empty-results-notice">
                <h3 className="empty-results-title">No Listings Match "{searchQuery}"</h3>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. 12 Segment Launchpad Grid (Page 10 Wireframe) */}
      <div className="section-header-bar" style={{ marginTop: '2.5rem' }}>
        <div>
          <span className="section-eyebrow">12 SPECIALIZED PROPERTY LAUNCHPADS (WIREFRAME PAGE 10)</span>
          <h2 className="section-main-heading">Explore by Specific Real Estate Segment</h2>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          CLICK ANY LAUNCHPAD TO FILTER &amp; SORT
        </span>
      </div>

      <section className="segment-launch-grid" aria-label="12 Property Segments">
        {segments.map((seg, idx) => {
          const count = getCountFor(seg.key);
          return (
            <button
              key={seg.key}
              type="button"
              className={`segment-card ${seg.isHot ? 'segment-hot' : ''}`}
              onClick={() => navigateTo(seg.key)}
            >
              <div className="segment-card-left">
                <div className="segment-icon-box" aria-hidden="true" style={{ fontSize: '1.4rem' }}>
                  {seg.icon}
                </div>
                <div className="segment-text-col">
                  <span className="segment-index">
                    {seg.isHot ? '🔥 ' : ''}SEGMENT {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="segment-name">{seg.title}</span>
                  <span className="segment-desc">{seg.subtitle}</span>
                </div>
              </div>

              <div className="segment-card-right">
                <span className="segment-badge-count">{count}</span>
                <span className="segment-enter-label">Open &rarr;</span>
              </div>
            </button>
          );
        })}
      </section>

      {/* 5. PDF / Word Format Download Banner (Page 10 & 21 Wireframes) */}
      <section
        style={{
          background: 'var(--bg-surface)',
          border: '1.5px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.65rem',
          margin: '2rem 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          flexWrap: 'wrap',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>📥</div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, margin: 0 }}>
              PDF Format or Word Format of All Properties
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Download complete formatted property briefs to your mobile or desktop with 1-click.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn-primary-submit"
          onClick={onOpenExport}
          style={{ whiteSpace: 'nowrap' }}
        >
          📄 Choose Download Format &rarr;
        </button>
      </section>

      {/* 6. Lead & Requirement Capture Box (Page 10 Wireframe: WhatsApp 9740402975 & Dashboard) */}
      <RequirementBox />

      {/* 7. Featured Hot Deals Showcase */}
      <div className="section-header-bar" style={{ marginTop: '3.5rem' }}>
        <div>
          <span className="section-eyebrow" style={{ color: 'var(--accent-hot)' }}>
            🔥 PRIORITY MANDATE FEED
          </span>
          <h2 className="section-main-heading">Featured Hot Commercial &amp; Hot Residential Listings</h2>
        </div>
        <div className="chip-bar">
          <button
            type="button"
            className={`filter-chip hot-chip ${hotTab === 'ALL' ? 'active' : ''}`}
            onClick={() => setHotTab('ALL')}
          >
            All Hot Deals ({properties.filter(p => p.hotCommercial || p.hotResidential).length})
          </button>
          <button
            type="button"
            className={`filter-chip hot-chip ${hotTab === 'COMMERCIAL' ? 'active' : ''}`}
            onClick={() => setHotTab('COMMERCIAL')}
          >
            Hot Commercial ({getCountFor('hot-commercial')})
          </button>
          <button
            type="button"
            className={`filter-chip hot-chip ${hotTab === 'RESIDENTIAL' ? 'active' : ''}`}
            onClick={() => setHotTab('RESIDENTIAL')}
          >
            Hot Residential ({getCountFor('hot-residential')})
          </button>
        </div>
      </div>

      <section className="property-list-container grid-2-col" aria-label="Featured Hot Deals">
        {featuredHot.slice(0, 6).map(p => (
          <PropertyCard key={p.id} prop={p} onEnquire={onEnquire} />
        ))}
      </section>
    </div>
  );
}
