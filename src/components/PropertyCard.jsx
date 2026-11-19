import React from 'react';
import { formatPriceWithWords, formatIndianCurrencyNumber } from '../utils/numberToWords';

export default function PropertyCard({ prop, onEnquire }) {
  const isHot = prop.hotCommercial || prop.hotResidential;
  const priceInfo = formatPriceWithWords(prop.priceCr);
  const mandateClass = (prop.mandate || 'Direct').toLowerCase() === 'indirect' ? 'indirect' : 'direct';

  const whatsappMessage = encodeURIComponent(
    `Hello Manjunath (Call Tiger), I am interested in Property [${prop.id}] — "${prop.title}" (${prop.area}) listed at ${priceInfo.short} (${prop.mandate} Listing). Please share further details.`
  );
  const whatsappUrl = `https://wa.me/919845000000?text=${whatsappMessage}`;

  const renderSpecs = () => {
    const cells = [];

    if (prop.formType === 'bungalow_building') {
      if (prop.bhk) cells.push({ k: 'Configuration', v: prop.bhk });
      if (prop.plotArea) cells.push({ k: 'Plot Area', v: `${prop.plotArea.toLocaleString('en-IN')} sq.ft` });
      if (prop.builtUpArea) cells.push({ k: 'Built-up', v: `${prop.builtUpArea.toLocaleString('en-IN')} sq.ft` });
      if (prop.dimensions) cells.push({ k: 'Dimensions', v: prop.dimensions });
      if (prop.facing) cells.push({ k: 'Facing', v: prop.facing });
      cells.push({ k: 'Position', v: prop.isCorner ? 'Corner Plot' : 'Intermediate Plot' });
    } else if (prop.formType === 'flat') {
      if (prop.coveredArea) cells.push({ k: 'Covered Area', v: `${prop.coveredArea.toLocaleString('en-IN')} sq.ft` });
      if (prop.builtUpArea) cells.push({ k: 'Built-up', v: `${prop.builtUpArea.toLocaleString('en-IN')} sq.ft` });
      if (prop.facing) cells.push({ k: 'Facing', v: prop.facing });
      if (prop.builderFloor) cells.push({ k: 'Floor Type', v: prop.builderFloor });
      if (prop.gatedCommunityName) cells.push({ k: 'Gated Enclave', v: prop.gatedCommunityName });
      if (prop.amenities) cells.push({ k: 'Key Amenities', v: prop.amenities });
    } else if (prop.formType === 'site') {
      const plotSqft = Number(prop.plotSize) || 0;
      cells.push({ k: 'Plot Size', v: `${plotSqft.toLocaleString('en-IN')} sq.ft` });
      if (prop.dimensions) cells.push({ k: 'Dimensions', v: prop.dimensions });
      if (prop.facing) cells.push({ k: 'Facing', v: prop.facing });
      cells.push({ k: 'Position', v: prop.isCorner ? 'Corner Site' : 'Intermediate Site' });
      if (plotSqft > 0 && prop.priceCr) {
        const ratePerSqft = Math.round((Number(prop.priceCr) * 10000000) / plotSqft);
        cells.push({ k: 'Approx. Rate', v: `₹ ${ratePerSqft.toLocaleString('en-IN')} / sq.ft` });
      }
    } else if (prop.formType === 'commercial_building') {
      if (prop.builtUpArea) cells.push({ k: 'Built-up Area', v: `${prop.builtUpArea.toLocaleString('en-IN')} sq.ft` });
      if (prop.plotArea) cells.push({ k: 'Plot Area', v: `${prop.plotArea.toLocaleString('en-IN')} sq.ft` });
      if (prop.rentalIncome) cells.push({ k: 'Monthly Rent', v: prop.rentalIncome });
      if (prop.facing) cells.push({ k: 'Road Facing', v: prop.facing });
      cells.push({ k: 'Position', v: prop.isCorner ? 'Corner Commercial' : 'Intermediate' });
    } else if (prop.formType === 'office_space') {
      if (prop.workstations) cells.push({ k: 'Workstations', v: `${prop.workstations} Seats` });
      if (prop.cabins) cells.push({ k: 'Cabins', v: `${prop.cabins} Executive Suites` });
      if (prop.coveredArea) cells.push({ k: 'Covered Area', v: `${prop.coveredArea.toLocaleString('en-IN')} sq.ft` });
      if (prop.buildingName) cells.push({ k: 'Building', v: prop.buildingName });
    } else if (prop.formType === 'land') {
      if (prop.landType) cells.push({ k: 'Classification', v: prop.landType });
      cells.push({
        k: 'Extent',
        v: `${prop.acres || 0} Acres ${prop.guntas ? prop.guntas + ' Guntas' : ''} (${(prop.sqFeet || 0).toLocaleString('en-IN')} sq.ft)`
      });
      if (prop.roadWidth) cells.push({ k: 'Road Width', v: prop.roadWidth });
      if (prop.frontage) cells.push({ k: 'Frontage / Rate', v: prop.frontage });
      if (prop.surveyNo) cells.push({ k: 'Cadastre', v: prop.surveyNo });
    }

    return (
      <div className="prop-spec-grid">
        {cells.map((c, i) => (
          <div key={i} className="spec-cell">
            <span className="spec-key">{c.k}</span>
            <span className="spec-val">{c.v}</span>
          </div>
        ))}
      </div>
    );
  };

  const getSubCategoryTag = () => {
    const map = {
      'beautiful_bungalow': 'Beautiful Bungalow',
      'residential_building': 'Residential Building',
      'gated_community_building': 'Gated Community Villa',
      'luxury_flat': 'Luxury Flat / Apt',
      'residential_site': 'Residential Site',
      'gated_community_site': 'Gated Villa Plot',
      'commercial_site': 'Commercial Site',
      'commercial_building': 'Commercial Building',
      'office_space': 'Office Space',
      'land_parcel': 'Land Parcel'
    };
    return map[prop.subCategory] || prop.primaryGroup;
  };

  return (
    <article className={`property-card ${isHot ? 'is-hot-deal' : ''}`}>
      <div>
        {prop.imageUrl && (
          <div className="prop-uploaded-image-wrap">
            <img src={prop.imageUrl} alt={prop.title} loading="lazy" />
          </div>
        )}

        <div className="prop-card-top">
          <div className="prop-badges-left">
            <span className="prop-id-code">{prop.id}</span>
            <span className="prop-category-tag">{getSubCategoryTag()}</span>
            <span className={`mandate-badge ${mandateClass}`}>
              {prop.mandate === 'Indirect' ? '◆ Indirect Listing' : '✓ Direct Listing'}
            </span>
            {prop.hotCommercial && <span className="hot-deal-badge">🔥 Hot Commercial</span>}
            {prop.hotResidential && <span className="hot-deal-badge">🔥 Hot Residential</span>}
            {prop.isCorner && <span className="prop-category-tag" style={{ color: 'var(--accent-gold)' }}>Corner</span>}
          </div>
          <span className="prop-area-pill">📍 {prop.area}</span>
        </div>

        <div className="prop-card-headline-row">
          <h2 className="prop-title">{prop.title}</h2>
          <div className="prop-valuation-box">
            <span className="prop-valuation-label">Asking Valuation</span>
            <span className="prop-valuation-amount">{priceInfo.short}</span>
            {priceInfo.words && (
              <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.2 }}>
                {priceInfo.words}
              </span>
            )}
          </div>
        </div>

        {renderSpecs()}

        {prop.rentalIncomeWords && prop.formType === 'commercial_building' && (
          <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', marginBottom: '0.85rem', fontWeight: 600 }}>
            Yield In Words: {prop.rentalIncomeWords}
          </div>
        )}

        <p className="prop-details-text">{prop.details}</p>

        {prop.googleLocation && (
          <div style={{ marginBottom: '1rem' }}>
            <a
              href={prop.googleLocation}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-header"
              style={{ fontSize: '0.76rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              📍 Open Google Maps Location Pin ↗
            </a>
          </div>
        )}
      </div>

      <div className="prop-card-actions">
        <span className="prop-confidential-note">
          {prop.mandate === 'Indirect'
            ? 'SHARED BY PARTNER CONSULTANT • CALL TIGER VERIFIED'
            : 'DIRECT OWNER MANDATE • CALL TIGER VERIFIED'}
        </span>
        <div className="prop-action-buttons">
          <button
            type="button"
            className="btn-prop-action call-tiger"
            onClick={() => onEnquire(prop)}
          >
            📞 Call / Enquire
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-prop-action whatsapp"
          >
            💬 WhatsApp Manjunath
          </a>
        </div>
      </div>
    </article>
  );
}
