import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import MobileBottomBar from './components/MobileBottomBar';
import HomeView from './views/HomeView';
import PremiumAreaView from './views/PremiumAreaView';
import AllAreaView from './views/AllAreaView';
import ListingView from './views/ListingView';
import AdminPortal from './views/AdminPortal';
import EnquiryModal from './components/EnquiryModal';
import CollaborateModal from './components/CollaborateModal';
import LetterModal from './components/LetterModal';
import ExportModal from './components/ExportModal';

export default function App() {
  const { currentView, toastMessage, goHome, navigateTo } = useApp();

  // Modals state
  const [selectedEnquiryProp, setSelectedEnquiryProp] = useState(null);
  const [isCollaborateOpen, setIsCollaborateOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleOpenEnquiry = (prop) => {
    setSelectedEnquiryProp(prop);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            onOpenEditLetter={() => setIsLetterOpen(true)}
            onOpenCollaborate={() => setIsCollaborateOpen(true)}
            onOpenExport={() => setIsExportOpen(true)}
            onEnquire={handleOpenEnquiry}
          />
        );

      case 'premium-areas':
        return <PremiumAreaView onEnquire={handleOpenEnquiry} />;

      case 'all-areas':
        return <AllAreaView onEnquire={handleOpenEnquiry} />;

      case 'admin':
        return <AdminPortal onOpenEditLetter={() => setIsLetterOpen(true)} />;

      default:
        // Any of the 10 listing views (Pages 11 to 20)
        return (
          <ListingView
            viewKey={currentView}
            onEnquire={handleOpenEnquiry}
          />
        );
    }
  };

  return (
    <>
      <Header
        onOpenCollaborate={() => setIsCollaborateOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      <main className="main-container">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-col-main">
            <div className="footer-title">CALL TIGER • MANJUNATH T R</div>
            <p className="footer-disclaimer">
              Built for transparent collaboration among premier real estate consultants and direct property owners. Properties sourced directly from owners are marked as <strong>Direct Listings</strong>, and properties shared by fellow consultants are clearly marked as <strong>Indirect Listings</strong>. Together, we close more deals through trust and technical accuracy.
            </p>
          </div>
          <div className="footer-links-col">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#E5B45B', letterSpacing: '0.08em' }}>
              DIRECT &amp; PARTNER MANDATE EXCHANGE
            </div>
            <div style={{ display: 'flex', gap: '0.55rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-nav-wireframe"
                style={{ background: '#1E232E', color: '#F6F3EC', borderColor: '#353D4D' }}
                onClick={goHome}
              >
                ⌂ Home
              </button>
              <button
                type="button"
                className="btn-nav-wireframe"
                style={{ background: '#1E232E', color: '#E5B45B', borderColor: '#B88028' }}
                onClick={() => setIsCollaborateOpen(true)}
              >
                + Share Your Listing
              </button>
              <button
                type="button"
                className="btn-nav-wireframe"
                style={{ background: '#1E232E', color: '#F6F3EC', borderColor: '#353D4D' }}
                onClick={() => navigateTo('admin')}
              >
                ⚙ Admin Portal
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <EnquiryModal
        prop={selectedEnquiryProp}
        isOpen={Boolean(selectedEnquiryProp)}
        onClose={() => setSelectedEnquiryProp(null)}
      />

      <CollaborateModal
        isOpen={isCollaborateOpen}
        onClose={() => setIsCollaborateOpen(false)}
      />

      <LetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Toast Notification */}
      <div className={`toast-notification ${toastMessage ? 'show' : ''}`} role="status">
        {toastMessage}
      </div>

      {/* Luxury Mobile Bottom Dock (<= 768px) */}
      <MobileBottomBar onOpenCollaborate={() => setIsCollaborateOpen(true)} />
    </>
  );
}
