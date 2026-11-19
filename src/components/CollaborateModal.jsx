import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function CollaborateModal({ isOpen, onClose }) {
  const { areas, addProperty, addEnquiry, showToast } = useApp();

  const [partnerName, setPartnerName] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [mandate, setMandate] = useState('Indirect');
  const [formType, setFormType] = useState('bungalow_building');
  const [area, setArea] = useState(areas[0] || 'Sadashivanagar');
  const [priceCr, setPriceCr] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const prefixMap = {
      'bungalow_building': 'CT-BNG',
      'flat': 'CT-FLT',
      'site': 'CT-SIT',
      'commercial_building': 'CT-COM',
      'office_space': 'CT-OFF',
      'land': 'CT-LND'
    };
    const randId = `${prefixMap[formType] || 'CT-PRP'}-${Math.floor(100 + Math.random() * 899)}`;

    const isCommercial = ['commercial_building', 'office_space'].includes(formType);
    const subCatMap = {
      'bungalow_building': 'beautiful_bungalow',
      'flat': 'luxury_flat',
      'site': 'residential_site',
      'commercial_building': 'commercial_building',
      'office_space': 'office_space',
      'land': 'land_parcel'
    };

    const newProp = {
      id: randId,
      formType,
      primaryGroup: isCommercial ? 'Commercial' : 'Residential',
      subCategory: subCatMap[formType] || formType,
      title: title.trim(),
      area,
      priceCr: parseFloat(priceCr) || 0,
      hotCommercial: false,
      hotResidential: false,
      mandate,
      details: `${details.trim()} (Submitted by: ${partnerName.trim()}, Ph: ${partnerPhone.trim()})`,
      createdAt: new Date().toISOString()
    };

    addProperty(newProp);
    addEnquiry({
      propertyId: randId,
      clientName: partnerName.trim(),
      phone: partnerPhone.trim(),
      callbackTime: 'Partner Listing Cross-Share Submission',
      notes: title.trim()
    });

    onClose();
    showToast(`Property ${randId} successfully listed as a ${mandate} Listing!`);
  };

  return (
    <div className="modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-dialog">
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>

        <span className="letter-badge">🤝 CONSULTANT &amp; OWNER COLLABORATION</span>
        <h2 className="admin-panel-title" style={{ marginTop: '0.45rem' }}>
          Cross-Share Your Property with Call Tiger
        </h2>
        <p className="admin-panel-subtitle">
          If you are a fellow real estate consultant, your property will be marked as an <strong>"Indirect Listing."</strong> If you are a direct property owner, it will be marked as a <strong>"Direct Listing."</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="form-field">
              <label>Your Name *</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Ramesh Kumar"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Mobile / WhatsApp *</label>
              <input
                type="tel"
                className="admin-input"
                placeholder="+91 98xxx xxxxx"
                value={partnerPhone}
                onChange={(e) => setPartnerPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>You Are Submitting As *</label>
              <select
                className="admin-select"
                value={mandate}
                onChange={(e) => setMandate(e.target.value)}
                required
              >
                <option value="Indirect">Fellow Real Estate Consultant (Indirect Listing)</option>
                <option value="Direct">Direct Property Owner (Direct Listing)</option>
              </select>
            </div>

            <div className="form-field">
              <label>Property Category *</label>
              <select
                className="admin-select"
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                required
              >
                <option value="bungalow_building">Beautiful Bungalow / Independent Building</option>
                <option value="flat">Luxury Flat / Apartment (Covered Area &amp; Amenities)</option>
                <option value="site">Plot / Site (Residential, Gated, Commercial)</option>
                <option value="commercial_building">Commercial Building (Pre-Leased / Retail)</option>
                <option value="office_space">Office Space (Workstations &amp; Cabins)</option>
                <option value="land">Land Parcel (Agri / Converted / Industrial / City)</option>
              </select>
            </div>

            <div className="form-field">
              <label>Locality / Area *</label>
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
              <label>Asking Valuation (in ₹ Crores) *</label>
              <input
                type="number"
                step="0.01"
                className="admin-input"
                placeholder="e.g. 18.5"
                value={priceCr}
                onChange={(e) => setPriceCr(e.target.value)}
                required
              />
            </div>

            <div className="form-field span-2">
              <label>Property Headline / Title *</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. 40x60 BDA East Facing Corner Plot in Indiranagar"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-field span-2">
              <label>Technical Details &amp; Specifications *</label>
              <textarea
                rows={3}
                className="admin-textarea"
                placeholder="Share key specs (plot size, built-up, facing, rent yield, workstation count, road width)..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
            <button type="button" className="btn-nav-wireframe" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary-submit">+ Add to Call Tiger Inventory</button>
          </div>
        </form>
      </div>
    </div>
  );
}
