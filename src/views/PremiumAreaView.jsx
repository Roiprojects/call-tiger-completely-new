/**
 * PAGE 22 WIREFRAME: BANGALORE PREMIUM AREA VIEW
 * "When you click on [Premium Area] in home page -> Bangalore Premium Area.
 * Only premium area listed here.
 * Indiranagar, HRBR, Sadashivanagar, HSR, Koramangala, RMV, Jayanagar, Banashankari...
 * Filters: [ R - Residential ] [ C - Commercial ] [ O - Office Space ]
 * Sort: [ High to Low ] [ Low to High ]"
 */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function PremiumAreaView({ onEnquire }) {
  const { properties, premiumAreas, goBack, goHome } = useApp();

  const [selectedArea, setSelectedArea] = useState(premiumAreas[0] || 'Sadashivanagar');
  const [categoryType, setCategoryType] = useState('ALL'); // 'ALL' | 'R' | 'C' | 'O'
  const [sortOrder, setSortOrder] = useState('DESC'); // 'DESC' | 'ASC'

  // Filter properties
  let filtered = properties.filter(p => {
    // Area match (flexible match for premium area names)
    const matchesArea = p.area.toLowerCase().includes(selectedArea.toLowerCase()) ||
                        selectedArea.toLowerCase().includes(p.area.toLowerCase());
    if (!matchesArea) return false;

    // Category Type Filter: R (Residential), C (Commercial), O (Office Space)
    if (categoryType === 'R') {
      return p.primaryGroup === 'Residential';
    } else if (categoryType === 'C') {
      return p.primaryGroup === 'Commercial' && p.formType !== 'office_space';
    } else if (categoryType === 'O') {
      return p.formType === 'office_space';
    }
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    const pa = Number(a.priceCr) || 0;
    const pb = Number(b.priceCr) || 0;
    return sortOrder === 'ASC' ? pa - pb : pb - pa;
  });

  return (
    <div>
      {/* Listing Nav Bar */}
      <nav className="listing-nav-bar" aria-label="Premium Area Navigation">
        <div className="nav-buttons-group">
          <button type="button" className="btn-nav-wireframe" onClick={goBack}>
            ← Back
          </button>
          <button type="button" className="btn-nav-wireframe" onClick={goHome}>
            ⌂ Home
          </button>
        </div>
        <div className="listing-title-wrap">
          <h1 className="listing-active-title">Bangalore Premium Areas</h1>
          <span className="listing-active-subtitle">
            Curated Blue-Chip Localities • Luxury Residences, Trophy Buildings &amp; High-End Office Spaces
          </span>
        </div>
        <div className="listing-result-counter">
          {filtered.length} {filtered.length === 1 ? 'Listing' : 'Listings'} in {selectedArea}
        </div>
      </nav>

      {/* Grid of Curated Premium Areas (Page 22 Wireframe) */}
      <section
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.65rem',
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <span className="filter-label" style={{ marginBottom: '0.65rem', display: 'block' }}>
          Select Premium Locality (Page 22 Wireframe)
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.65rem' }}>
          {premiumAreas.map(areaName => {
            const count = properties.filter(p =>
              p.area.toLowerCase().includes(areaName.toLowerCase()) ||
              areaName.toLowerCase().includes(p.area.toLowerCase())
            ).length;
            const isSelected = selectedArea === areaName;

            return (
              <button
                key={areaName}
                type="button"
                className={`filter-chip ${isSelected ? 'active' : ''}`}
                style={{
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.95rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.86rem'
                }}
                onClick={() => setSelectedArea(areaName)}
              >
                <span>{areaName}</span>
                <span className="chip-count-bubble">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Category [ R ] [ C ] [ O ] & Sort Filters (Page 22 Wireframe) */}
      <section className="filter-deck" style={{ marginBottom: '1.75rem' }}>
        <div className="filter-row">
          <div className="filter-group">
            <span className="filter-label">Category Filters (Page 22)</span>
            <div className="chip-bar">
              <button
                type="button"
                className={`filter-chip ${categoryType === 'ALL' ? 'active' : ''}`}
                onClick={() => setCategoryType('ALL')}
              >
                All Categories
              </button>
              <button
                type="button"
                className={`filter-chip ${categoryType === 'R' ? 'active' : ''}`}
                onClick={() => setCategoryType('R')}
              >
                [ R ] Residential (Bungalows, Villas, Flats)
              </button>
              <button
                type="button"
                className={`filter-chip ${categoryType === 'C' ? 'active' : ''}`}
                onClick={() => setCategoryType('C')}
              >
                [ C ] Commercial (Buildings &amp; Sites)
              </button>
              <button
                type="button"
                className={`filter-chip ${categoryType === 'O' ? 'active' : ''}`}
                onClick={() => setCategoryType('O')}
              >
                [ O ] Office Space (Plug &amp; Play Floors)
              </button>
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Sort Valuation (₹ Crores)</span>
            <div className="chip-bar">
              <button
                type="button"
                className={`filter-chip sort-chip ${sortOrder === 'DESC' ? 'active' : ''}`}
                onClick={() => setSortOrder('DESC')}
              >
                ↓ High to Low (H-L)
              </button>
              <button
                type="button"
                className={`filter-chip sort-chip ${sortOrder === 'ASC' ? 'active' : ''}`}
                onClick={() => setSortOrder('ASC')}
              >
                ↑ Low to High (L-H)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="property-list-container grid-2-col" aria-label="Premium Area Properties">
        {filtered.length > 0 ? (
          filtered.map(p => (
            <PropertyCard key={p.id} prop={p} onEnquire={onEnquire} />
          ))
        ) : (
          <div className="empty-results-notice">
            <h3 className="empty-results-title">No Listings Match in {selectedArea}</h3>
            <p className="empty-results-sub">
              Try switching the category filter back to "All Categories" or pick another prime area above.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
