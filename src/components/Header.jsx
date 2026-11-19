import React from 'react';
import { useApp } from '../context/AppContext';

export default function Header({ onOpenCollaborate, onOpenExport }) {
  const { founderLetter, currentView, navigateTo, goHome, theme, toggleTheme } = useApp();

  return (
    <>
      {/* Top Trust & Network Announcement Ribbon */}
      <div className="top-trust-ribbon">
        <div className="top-trust-inner">
          <div className="trust-pill-group">
            <span><span className="trust-dot"></span>VERIFIED DIRECT &amp; INDIRECT LISTINGS</span>
            <span>•</span>
            <span>CONSULTANT COLLABORATION NETWORK</span>
            <span>•</span>
            <span>COMMERCIAL, LAND &amp; LUXURY RESIDENTIAL</span>
          </div>
          <div style={{ color: '#E5B45B', fontWeight: 600 }}>
            MANJUNATH T R • CALL TIGER DESK
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand-identity" onClick={goHome} role="button" tabIndex={0}>
            <div className="brand-crest" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="brand-text-wrap">
              <span className="brand-wordmark">CALL TIGER</span>
              <span className="brand-subline">Direct &amp; Partner Real Estate Network</span>
            </div>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="btn-header"
              onClick={onOpenExport}
              title="Download Portfolio in PDF or Word"
            >
              📥 PDF / Word Dossier
            </button>

            <button
              type="button"
              className="btn-header btn-collaborate"
              onClick={onOpenCollaborate}
            >
              🤝 Cross-Share Listing
            </button>

            <button
              type="button"
              className="btn-header"
              onClick={toggleTheme}
              title="Switch Color Theme"
            >
              {theme === 'dark' ? '☀ Light Mode' : '☾ Dark Mode'}
            </button>

            <a href={`tel:${founderLetter.conciergePhone}`} className="btn-header btn-concierge">
              📞 {founderLetter.conciergePhone}
            </a>

            <button
              type="button"
              className={`btn-header ${currentView === 'admin' ? 'btn-admin-active' : ''}`}
              onClick={() => navigateTo(currentView === 'admin' ? 'home' : 'admin')}
            >
              {currentView === 'admin' ? '← Client View' : '⚙ Admin Portal'}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
