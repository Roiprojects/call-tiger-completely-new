import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatPriceWithWords } from '../utils/numberToWords';

export default function EnquiryModal({ prop, isOpen, onClose }) {
  const { addEnquiry, founderLetter } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [callbackTime, setCallbackTime] = useState('Immediate Priority');
  const [notes, setNotes] = useState('');

  if (!isOpen || !prop) return null;

  const priceInfo = formatPriceWithWords(prop.priceCr);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnquiry({
      propertyId: prop.id,
      clientName: name,
      phone,
      callbackTime,
      notes
    });
    setName('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-dialog">
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>

        <span className="letter-badge">CALL TIGER PROPERTY ENQUIRY</span>
        <h2 className="admin-panel-title" style={{ marginTop: '0.45rem' }}>{prop.title}</h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
          Code: {prop.id} • {prop.area} • Asking: {priceInfo.short} ({prop.mandate || 'Direct'} Listing)
        </p>

        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1.15rem', fontSize: '0.86rem' }}>
          <strong>Direct Line Manjunath T R:</strong>
          <a
            href={`tel:${founderLetter.conciergePhone}`}
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-gold)', marginLeft: '0.4rem' }}
          >
            {founderLetter.conciergePhone}
          </a>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="form-field span-2">
              <label>Your Name (Buyer / Fellow Consultant) *</label>
              <input
                type="text"
                className="admin-input"
                placeholder="Your Full Name or Agency Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Phone / WhatsApp Number *</label>
              <input
                type="tel"
                className="admin-input"
                placeholder="+91 98xxx xxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Preferred Callback Time</label>
              <select
                className="admin-select"
                value={callbackTime}
                onChange={(e) => setCallbackTime(e.target.value)}
              >
                <option value="Immediate Priority">Immediate Priority</option>
                <option value="Morning (10 AM – 1 PM)">Morning (10 AM – 1 PM)</option>
                <option value="Afternoon (2 PM – 5 PM)">Afternoon (2 PM – 5 PM)</option>
                <option value="Evening (6 PM – 8 PM)">Evening (6 PM – 8 PM)</option>
              </select>
            </div>

            <div className="form-field span-2">
              <label>Requirement / Site Inspection Note</label>
              <textarea
                rows={2}
                className="admin-textarea"
                placeholder="Let Manjunath know if you have a direct buyer, term sheet query, or want to schedule a site inspection..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
            <button type="button" className="btn-nav-wireframe" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary-submit">Submit Enquiry</button>
          </div>
        </form>
      </div>
    </div>
  );
}
