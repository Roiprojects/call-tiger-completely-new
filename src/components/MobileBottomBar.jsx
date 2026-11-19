import React from 'react';
import { useApp } from '../context/AppContext';

export default function MobileBottomBar({ onOpenCollaborate }) {
  const { currentView, navigateTo, goHome, founderLetter } = useApp();

  const handleWhatsApp = () => {
    const targetPhone = founderLetter.leadWhatsAppNumber || '919740402975';
    const text = encodeURIComponent(
      'Hello Manjunath (Call Tiger), I am looking to inquire / collaborate on real estate mandates.'
    );
    window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
  };

  return (
    <nav className="mobile-bottom-dock" aria-label="Mobile Navigation Dock">
      <button
        type="button"
        className={`dock-item ${currentView === 'home' ? 'active' : ''}`}
        onClick={goHome}
      >
        <span className="dock-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </span>
        <span className="dock-label">Home</span>
      </button>

      <button
        type="button"
        className={`dock-item ${currentView === 'premium-areas' ? 'active' : ''}`}
        onClick={() => navigateTo('premium-areas')}
      >
        <span className="dock-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="6 3 18 3 22 9 12 22 2 9" />
          </svg>
        </span>
        <span className="dock-label">Premium</span>
      </button>

      <button
        type="button"
        className={`dock-item ${currentView === 'all-areas' ? 'active' : ''}`}
        onClick={() => navigateTo('all-areas')}
      >
        <span className="dock-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
        <span className="dock-label">All Areas</span>
      </button>

      <button
        type="button"
        className="dock-item"
        onClick={onOpenCollaborate}
      >
        <span className="dock-icon dock-icon-accent">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </span>
        <span className="dock-label">Share</span>
      </button>

      <button
        type="button"
        className="dock-item dock-whatsapp"
        onClick={handleWhatsApp}
      >
        <span className="dock-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </span>
        <span className="dock-label">WhatsApp</span>
      </button>
    </nav>
  );
}
