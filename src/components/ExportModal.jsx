/**
 * PAGE 21 WIREFRAME: PDF & WORD FORMAT DOSSIER EXPORT MODAL
 * "When Click on PDF format all properties or Word format
 * Choose Area ▾
 * Choose Word format | Choose PDF format
 * [Com ✓] [Resi ✓]
 * All the properties should be downloaded in word format or pdf format.
 * It can be downloaded to any one mobile / desktop."
 */
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateDocxDossier } from '../utils/docxGenerator';
import { generatePdfDossier } from '../utils/pdfGenerator';

export default function ExportModal({ isOpen, onClose }) {
  const { properties, areas, showToast } = useApp();

  const [selectedArea, setSelectedArea] = useState('ALL');
  const [includeCommercial, setIncludeCommercial] = useState(true);
  const [includeResidential, setIncludeResidential] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  // Filter properties according to selections
  let targetProps = properties.filter(p => {
    const matchesArea = selectedArea === 'ALL' || p.area === selectedArea;
    const isCommercial = p.primaryGroup === 'Commercial';
    const isResidential = p.primaryGroup === 'Residential';

    if (!includeCommercial && isCommercial) return false;
    if (!includeResidential && isResidential) return false;
    return matchesArea;
  });

  const handleDownloadPdf = () => {
    if (targetProps.length === 0) {
      showToast('No properties found matching your export filter.');
      return;
    }
    setIsExporting(true);
    try {
      generatePdfDossier({
        properties: targetProps,
        area: selectedArea === 'ALL' ? 'All Areas' : selectedArea,
        division: includeCommercial && includeResidential ? 'Commercial & Residential' : includeCommercial ? 'Commercial' : 'Residential'
      });
      showToast('PDF Dossier downloaded successfully!');
      onClose();
    } catch (err) {
      console.error(err);
      showToast('Failed to generate PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadWord = async () => {
    if (targetProps.length === 0) {
      showToast('No properties found matching your export filter.');
      return;
    }
    setIsExporting(true);
    try {
      await generateDocxDossier({
        properties: targetProps,
        area: selectedArea === 'ALL' ? 'All Areas' : selectedArea,
        division: includeCommercial && includeResidential ? 'Commercial & Residential' : includeCommercial ? 'Commercial' : 'Residential'
      });
      showToast('Word Document (.docx) downloaded successfully!');
      onClose();
    } catch (err) {
      console.error(err);
      showToast('Failed to generate Word document.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-dialog">
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">✕</button>

        <span className="letter-badge">PAGE 21 WIREFRAME SPECIFICATION</span>
        <h2 className="admin-panel-title" style={{ marginTop: '0.45rem' }}>
          Download Properties in PDF or Word Format
        </h2>
        <p className="admin-panel-subtitle">
          Export verified property briefs into executive PDF or Microsoft Word documents for client presentations.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: '1.25rem 0' }}>
          {/* Choose Area */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
              Choose Area / Locality ▾
            </label>
            <select
              className="admin-select"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              <option value="ALL">All Bangalore Areas ({properties.length} Properties)</option>
              {areas.map(a => {
                const count = properties.filter(p => p.area === a).length;
                return (
                  <option key={a} value={a}>
                    {a} ({count} listings)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Division Checkboxes: [ Com ✓ ] [ Resi ✓ ] */}
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', padding: '0.9rem 1.15rem' }}>
            <span style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.55rem', textTransform: 'uppercase' }}>
              Select Real Estate Division
            </span>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={includeCommercial}
                  onChange={(e) => setIncludeCommercial(e.target.checked)}
                />
                <span>[✓] Commercial Properties</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={includeResidential}
                  onChange={(e) => setIncludeResidential(e.target.checked)}
                />
                <span>[✓] Residential Properties</span>
              </label>
            </div>
          </div>

          {/* Matching Summary */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
            <span>Filtered Properties:</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{targetProps.length} Listings Selected</span>
          </div>

          {/* Action Buttons: Choose PDF Format / Choose Word Format */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
            <button
              type="button"
              className="btn-primary-submit"
              disabled={isExporting || targetProps.length === 0}
              onClick={handleDownloadPdf}
              style={{ textAlign: 'center' }}
            >
              📄 Choose PDF Format
            </button>

            <button
              type="button"
              className="btn-primary-submit"
              disabled={isExporting || targetProps.length === 0}
              onClick={handleDownloadWord}
              style={{ textAlign: 'center', background: 'linear-gradient(135deg, #1C2331 0%, #2A364E 100%)' }}
            >
              📝 Choose Word Format
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
