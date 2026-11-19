/**
 * PAGE 23 WIREFRAME: ALL AREA OF BANGALORE VIEW
 * "When you click on [All Area] in home page ->
 * All area of Bangalore where we have properties.
 * HRBR [4], Koramangala [1], Domlur [2], Whitefield [3], Chandapura [1], Sarjapur Road [5]...
 * Clicking an area immediately filters and lists properties for that locality."
 */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function AllAreaView({ onEnquire }) {
  const { properties, areas, goBack, goHome } = useApp();

  const [selectedArea, setSelectedArea] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [searchAreaInput, setSearchAreaInput] = useState('');

  // Collect areas that have at least 1 property, plus all master areas
  const areasWithCounts = areas.map(areaName => {
    const count = properties.filter(p => p.area === areaName).length;
    return { name: areaName, count };
  });

  // Sort areas so those with active properties appear first, followed by alphabetical
  areasWithCounts.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name);
  });

  // Filtered properties
  let filtered = properties.filter(p => {
    if (selectedArea === 'ALL') return true;
    return p.area === selectedArea;
  });

  filtered.sort((a, b) => {
    const pa = Number(a.priceCr) || 0;
    const pb = Number(b.priceCr) || 0;
    return sortOrder === 'ASC' ? pa - pb : pb - pa;
  });

  const displayedAreas = searchAreaInput.trim()
    ? areasWithCounts.filter(a => a.name.toLowerCase().includes(searchAreaInput.trim().toLowerCase()))
    : areasWithCounts;

  return (
    <div>
      {/* Listing Nav Bar */}
      <nav className="listing-nav-bar" aria-label="All Area Navigation">
        <div className="nav-buttons-group">
          <button type="button" className="btn-nav-wireframe" onClick={goBack}>
            ← Back
          </button>
          <button type="button" className="btn-nav-wireframe" onClick={goHome}>
            ⌂ Home
          </button>
        </div>
        <div className="listing-title-wrap">
          <h1 className="listing-active-title">All Areas of Bangalore</h1>
          <span className="listing-active-subtitle">
            Complete Registry of Bangalore Localities with Active Verified Inventory
          </span>
        </div>
        <div className="listing-result-counter">
          {filtered.length} {filtered.length === 1 ? 'Listing' : 'Listings'} Found
        </div>
      </nav>

      {/* Area Directory Grid with Live Count Badges (Page 23 Wireframe) */}
      <section
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '1.35rem 1.65rem',
          marginBottom: '1.75rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div>
            <span className="filter-label">Master Locality Directory (Page 23 Wireframe)</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Click any area box to instantly view active properties in that locality.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <input
              type="search"
              className="admin-input"
              style={{ width: '220px', padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
              placeholder="Find area name..."
              value={searchAreaInput}
              onChange={(e) => setSearchAreaInput(e.target.value)}
            />
            <button
              type="button"
              className={`filter-chip ${selectedArea === 'ALL' ? 'active' : ''}`}
              onClick={() => setSelectedArea('ALL')}
            >
              All Bangalore ({properties.length})
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.65rem', maxHeight: '340px', overflowY: 'auto', paddingRight: '0.35rem' }}>
          {displayedAreas.map(item => {
            const isSelected = selectedArea === item.name;
            return (
              <button
                key={item.name}
                type="button"
                className={`filter-chip ${isSelected ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.84rem',
                  background: isSelected ? 'var(--text-primary)' : item.count > 0 ? 'var(--bg-elevated)' : 'var(--bg-primary)'
                }}
                onClick={() => setSelectedArea(item.name)}
              >
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {item.name}
                </span>
                <span
                  className="chip-count-bubble"
                  style={{
                    fontWeight: item.count > 0 ? 700 : 400,
                    color: item.count > 0 && !isSelected ? 'var(--accent-gold)' : undefined
                  }}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Sort Bar */}
      <section className="filter-deck" style={{ marginBottom: '1.75rem' }}>
        <div className="filter-row">
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Showing listings for: <strong style={{ color: 'var(--text-primary)' }}>{selectedArea === 'ALL' ? 'All Areas of Bangalore' : selectedArea}</strong>
            </span>
          </div>

          <div className="filter-group">
            <span className="filter-label">Sort by Price (₹ Crores)</span>
            <div className="chip-bar">
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

      {/* Property Listings */}
      <section className="property-list-container grid-2-col" aria-label="All Area Properties">
        {filtered.length > 0 ? (
          filtered.map(p => (
            <PropertyCard key={p.id} prop={p} onEnquire={onEnquire} />
          ))
        ) : (
          <div className="empty-results-notice">
            <h3 className="empty-results-title">No Active Listings in {selectedArea}</h3>
            <p className="empty-results-sub">
              No properties are currently listed in {selectedArea}. Click "All Bangalore" or pick another locality from the directory.
            </p>
            <button type="button" className="btn-nav-wireframe" onClick={() => setSelectedArea('ALL')}>
              View All Bangalore Properties ({properties.length})
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
