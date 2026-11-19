import React from 'react';
import { useApp } from '../context/AppContext';

export default function FoundersLetter({ onOpenEditLetter, onOpenCollaborate }) {
  const { founderLetter } = useApp();

  return (
    <section className="founders-letter-box" aria-label="Founder's Letter">
      <div>
        <div className="letter-top-bar">
          <span className="letter-badge">✉ {founderLetter.badge}</span>
          <button
            type="button"
            className="btn-edit-letter-inline"
            onClick={onOpenEditLetter}
          >
            ✎ Edit Letter
          </button>
        </div>

        <h1 className="letter-title">{founderLetter.title}</h1>
        <p className="letter-salutation">{founderLetter.salutation}</p>
        <div className="letter-body">{founderLetter.body}</div>
      </div>

      <div className="letter-footer">
        <div>
          <div className="letter-signature-closing">{founderLetter.signoffClosing || 'Best regards,'}</div>
          <div className="letter-signature-name">{founderLetter.signoffName}</div>
          <div className="letter-signature-role">{founderLetter.signoffTitle}</div>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-prop-action call-tiger"
            onClick={onOpenCollaborate}
          >
            + Cross-Share a Property
          </button>
        </div>
      </div>
    </section>
  );
}
