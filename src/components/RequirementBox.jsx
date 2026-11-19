/**
 * PAGE 10 WIREFRAME: REQUIREMENT CAPTURE & WHATSAPP DASHBOARD ALERT BOX
 * "Whats your requirement with your mob no:
 * Dashboard -> 9740402975
 * WhatsApp should come from these mobile no with their requirement in DASHboard."
 */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function RequirementBox() {
  const { addEnquiry, founderLetter } = useApp();
  const [requirement, setRequirement] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requirement.trim() || !mobile.trim()) return;

    // Log to Dashboard store
    addEnquiry({
      clientName: name.trim() || 'Direct WhatsApp Buyer / Investor',
      phone: mobile.trim(),
      notes: requirement.trim(),
      callbackTime: 'Immediate WhatsApp Lead (Page 10 Banner)',
      propertyId: 'GENERAL-REQUIREMENT'
    });

    // Auto trigger WhatsApp to 9740402975 (from wireframe Page 10)
    const targetPhone = founderLetter.leadWhatsAppNumber || '919740402975';
    const text = encodeURIComponent(
      `Hello Manjunath (Call Tiger),\nMy Requirement: ${requirement.trim()}\nMy Mobile: ${mobile.trim()}\nName: ${name.trim() || 'Investor'}`
    );
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${text}`;

    setRequirement('');
    setMobile('');
    setName('');

    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="collaboration-vault-card" style={{ marginTop: '2.5rem', background: 'linear-gradient(135deg, #161A22 0%, #202735 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <span className="letter-badge" style={{ background: 'rgba(229,180,91,0.18)', color: '#E5B45B', borderColor: 'rgba(229,180,91,0.4)' }}>
            DIRECT CONSULTANT CONCIERGE &amp; ADVISORY DESK
          </span>
          <h2 className="vault-title" style={{ marginTop: '0.65rem', fontSize: '1.75rem' }}>
            What Is Your Property Requirement?
          </h2>
          <p className="vault-desc" style={{ marginTop: '0.25rem', maxWidth: '680px' }}>
            Looking for a specific commercial floor, trophy bungalow, pre-leased asset, or land parcel? Share your requirement with your mobile number below. It logs instantly to Manjunath T R's dashboard and connects directly to WhatsApp.
          </p>
        </div>
        <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
          <span style={{ fontSize: '0.72rem', color: '#B4B0A6', display: 'block' }}>DIRECT ADVISORY HOTLINE:</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#E5B45B' }}>+91 97404 02975</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '1.25rem' }}>
        <div className="req-form-grid">
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#D9D4C7', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
              Your Mobile Number *
            </label>
            <input
              type="tel"
              className="admin-input"
              style={{ background: '#101319', border: '1px solid #353D4D', color: '#F6F3EC' }}
              placeholder="+91 98xxx xxxxx"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#D9D4C7', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
              Your Name / Agency (Optional)
            </label>
            <input
              type="text"
              className="admin-input"
              style={{ background: '#101319', border: '1px solid #353D4D', color: '#F6F3EC' }}
              placeholder="e.g. Ramesh Chandra (Family Office)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="req-field-span-2">
            <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#D9D4C7', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
              Specific Property Requirement (Locality, Budget &amp; Scale) *
            </label>
            <input
              type="text"
              className="admin-input"
              style={{ background: '#101319', border: '1px solid #353D4D', color: '#F6F3EC' }}
              placeholder="e.g. Need 4 BHK Bungalow in Sadashivanagar or 150-workstation office on ORR under ₹25 Cr..."
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="req-footer-row">
          <span style={{ fontSize: '0.76rem', color: '#B4B0A6', fontFamily: 'var(--font-mono)' }}>
            ✓ Instant Lead Logged to Dashboard &bull; Direct Message to +91 97404 02975
          </span>
          <button type="submit" className="btn-share-listing-cta req-submit-btn">
            <span>💬 Send Requirement via WhatsApp &rarr;</span>
          </button>
        </div>
      </form>
    </section>
  );
}
