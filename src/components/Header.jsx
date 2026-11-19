import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function Header({ onOpenCollaborate, onOpenExport }) {
  const { founderLetter, currentView, navigateTo, goHome, theme, toggleTheme } = useApp();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Close drawer on view change or Escape key
  useEffect(() => {
    setIsMobileDrawerOpen(false);
  }, [currentView]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (viewName) => {
    navigateTo(viewName);
    setIsMobileDrawerOpen(false);
  };

  return (
    <>
      {/* Top Trust & Network Announcement Ribbon */}
      <div className="top-trust-ribbon">
        <div className="top-trust-inner">
          <div className="trust-pill-group">
            <span><span className="trust-dot"></span>VERIFIED DIRECT &amp; INDIRECT LISTINGS</span>
            <span className="hide-on-mobile">•</span>
            <span className="hide-on-mobile">CONSULTANT COLLABORATION NETWORK</span>
            <span className="hide-on-mobile">•</span>
            <span className="hide-on-mobile">COMMERCIAL, LAND &amp; LUXURY RESIDENTIAL</span>
          </div>
          <div style={{ color: '#E5B45B', fontWeight: 600, fontSize: '0.7rem' }}>
            MANJUNATH T R • CALL TIGER DESK
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand-identity" onClick={goHome} role="button" tabIndex={0}>
            <div className="brand-crest" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="brand-text-wrap">
              <span className="brand-wordmark">CALL TIGER</span>
              <span className="brand-subline">Direct &amp; Partner Network</span>
            </div>
          </div>

          {/* Desktop Actions (> 768px) */}
          <div className="header-actions header-actions-desktop">
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
              {theme === 'dark' ? '☀ Light' : '☾ Dark'}
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

          {/* Mobile Action Cluster (<= 768px) */}
          <div className="header-actions-mobile">
            <a
              href={`tel:${founderLetter.conciergePhone}`}
              className="btn-header-mobile-icon"
              title="Direct Call Concierge"
              aria-label="Direct Call"
            >
              📞
            </a>

            <button
              type="button"
              className="btn-header-mobile-icon"
              onClick={toggleTheme}
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>

            <button
              type="button"
              className="btn-header-mobile-menu"
              onClick={() => setIsMobileDrawerOpen(prev => !prev)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileDrawerOpen}
            >
              {isMobileDrawerOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      <div
        className={`mobile-drawer-backdrop ${isMobileDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsMobileDrawerOpen(false)}
      >
        <div
          className="mobile-drawer-sheet"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="drawer-header">
            <div className="brand-identity" onClick={() => { goHome(); setIsMobileDrawerOpen(false); }}>
              <div className="brand-crest" style={{ width: '38px', height: '38px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="brand-text-wrap">
                <span className="brand-wordmark" style={{ fontSize: '1.35rem' }}>CALL TIGER</span>
                <span className="brand-subline" style={{ fontSize: '0.62rem' }}>MANJUNATH T R</span>
              </div>
            </div>

            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setIsMobileDrawerOpen(false)}
              aria-label="Close Menu"
            >
              ✕
            </button>
          </div>

          <div className="drawer-content">
            {/* Quick Actions Row */}
            <div className="drawer-quick-actions">
              <button
                type="button"
                className="drawer-action-btn primary"
                onClick={() => { onOpenCollaborate(); setIsMobileDrawerOpen(false); }}
              >
                🤝 Cross-Share Listing
              </button>
              <button
                type="button"
                className="drawer-action-btn secondary"
                onClick={() => { onOpenExport(); setIsMobileDrawerOpen(false); }}
              >
                📥 PDF / Word Dossier
              </button>
            </div>

            {/* Core Navigation Links */}
            <div className="drawer-section-title">DISCOVERY CHANNELS</div>
            <div className="drawer-nav-list">
              <button
                type="button"
                className={`drawer-nav-link ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                <span>⌂ Home Hub (Wireframe Page 10)</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>

              <button
                type="button"
                className={`drawer-nav-link ${currentView === 'premium-areas' ? 'active' : ''}`}
                onClick={() => handleNavClick('premium-areas')}
              >
                <span>💎 Bangalore Premium Areas (Page 22)</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>

              <button
                type="button"
                className={`drawer-nav-link ${currentView === 'all-areas' ? 'active' : ''}`}
                onClick={() => handleNavClick('all-areas')}
              >
                <span>📍 All Areas of Bangalore (Page 23)</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
            </div>

            {/* Specialized Property Categories */}
            <div className="drawer-section-title">12 SPECIALIZED PROPERTY SEGMENTS</div>
            <div className="drawer-nav-list">
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('commercial')}>
                <span>🏢 Commercial Buildings &amp; Sites</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('residential')}>
                <span>🏡 Residential &amp; Bungalows</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('office-space')}>
                <span>💼 Office Space (Plug &amp; Play)</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('land')}>
                <span>🌾 Land (Agri, Converted, Industrial)</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('gated-community')}>
                <span>🛡️ Gated Community Enclaves</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('beautiful-bungalows')}>
                <span>🏰 Beautiful Bungalows</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('site-above-4000')}>
                <span>📐 Site Above 4000 sq.ft</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('site-below-4000')}>
                <span>📏 Sites Below 4000 sq.ft</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('hot-commercial')}>
                <span>🔥 Hot Commercial Deals</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('hot-residential')}>
                <span>🔥 Hot Residential Deals</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('comm-10-50')}>
                <span>📈 Commercial 10 – 50 Cr</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
              <button type="button" className="drawer-nav-link" onClick={() => handleNavClick('comm-51-1000')}>
                <span>🏛️ Commercial 51 – 1000 Cr</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
            </div>

            {/* Admin Portal Link */}
            <div className="drawer-section-title">ADMINISTRATION &amp; CONTROLS</div>
            <div className="drawer-nav-list">
              <button
                type="button"
                className={`drawer-nav-link ${currentView === 'admin' ? 'active' : ''}`}
                onClick={() => handleNavClick('admin')}
              >
                <span>⚙ Admin Management Portal (Pages 1-8)</span>
                <span className="drawer-arrow">&rarr;</span>
              </button>
            </div>

            {/* Concierge Contact Card */}
            <div className="drawer-contact-card">
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>
                CALL TIGER DIRECT ADVISORY
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, margin: '4px 0' }}>
                Manjunath T R
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem' }}>
                <a
                  href={`tel:${founderLetter.conciergePhone}`}
                  className="drawer-contact-btn"
                >
                  📞 Direct Call
                </a>
                <a
                  href={`https://wa.me/${founderLetter.leadWhatsAppNumber || '919740402975'}?text=${encodeURIComponent('Hello Manjunath (Call Tiger), I am reaching out from your website.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawer-contact-btn whatsapp"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
