import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function LetterModal({ isOpen, onClose }) {
  const { founderLetter, updateFounderLetter } = useApp();

  const [title, setTitle] = useState(founderLetter.title);
  const [salutation, setSalutation] = useState(founderLetter.salutation);
  const [body, setBody] = useState(founderLetter.body);
  const [signoffName, setSignoffName] = useState(founderLetter.signoffName);
  const [signoffTitle, setSignoffTitle] = useState(founderLetter.signoffTitle);
  const [phone, setPhone] = useState(founderLetter.conciergePhone);
  const [leadPhone, setLeadPhone] = useState(founderLetter.leadWhatsAppNumber || '919740402975');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFounderLetter({
      title,
      salutation,
      body,
      signoffName,
      signoffTitle,
      conciergePhone: phone,
      leadWhatsAppNumber: leadPhone
    });
    onClose();
  };

  return (
    <div className="modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-dialog">
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>

        <span className="letter-badge">HOME PAGE LETTER EDITOR</span>
        <h2 className="admin-panel-title" style={{ marginTop: '0.45rem' }}>
          Edit Manjunath T R's Letter
        </h2>
        <p className="admin-panel-subtitle">
          Customize the Subject, Salutation, Collaboration message, and Direct WhatsApp Hotline numbers.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="form-field span-2">
              <label>Subject / Headline</label>
              <input
                type="text"
                className="admin-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-field span-2">
              <label>Salutation</label>
              <input
                type="text"
                className="admin-input"
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                required
              />
            </div>

            <div className="form-field span-2">
              <label>Letter Body Text *</label>
              <textarea
                rows={6}
                className="admin-textarea"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Sign-Off Name</label>
              <input
                type="text"
                className="admin-input"
                value={signoffName}
                onChange={(e) => setSignoffName(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Sign-Off Title</label>
              <input
                type="text"
                className="admin-input"
                value={signoffTitle}
                onChange={(e) => setSignoffTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Desk Hotline Phone</label>
              <input
                type="text"
                className="admin-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Lead WhatsApp Number (Page 10 Banner)</label>
              <input
                type="text"
                className="admin-input"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
            <button type="button" className="btn-nav-wireframe" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary-submit">Save Letter to Home Page</button>
          </div>
        </form>
      </div>
    </div>
  );
}
