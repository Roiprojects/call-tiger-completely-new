/**
 * PDF DOSSIER GENERATOR
 * Generates formatted executive property dossiers for download (Page 21 Wireframe)
 */
import { jsPDF } from 'jspdf';

export function generatePdfDossier({ properties, area, division }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  function checkPageBreak(requiredHeight) {
    if (y + requiredHeight > pageHeight - 20) {
      doc.addPage();
      y = 20;
      renderHeaderMini();
    }
  }

  function renderHeaderMini() {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(180, 128, 40);
    doc.text('CALL TIGER REAL ESTATE ADVISORY — CONFIDENTIAL DOSSIER', margin, 10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text(`Desk Line: +91 98450 00000 | +91 97404 02975`, pageWidth - margin, 10, { align: 'right' });
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, 12, pageWidth - margin, 12);
  }

  // Cover / Header on First Page
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(20, 20, 20);
  doc.text('CALL TIGER', margin, y);
  y += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 128, 40);
  doc.text('MANJUNATH T R — PRIVATE MANDATE & CONSULTANT NETWORK', margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text(`Portfolio Dossier: ${area || 'All Bangalore Areas'} | Filter: ${division || 'All Divisions'} | Count: ${properties.length} Listings`, margin, y);
  y += 4;
  doc.setDrawColor(180, 128, 40);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Iterate over properties
  properties.forEach((prop, idx) => {
    checkPageBreak(40);

    // Title box
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);
    const titleLines = doc.splitTextToSize(`${idx + 1}. [${prop.id}] ${prop.title}`, contentWidth - 40);
    doc.text(titleLines, margin, y);

    // Price on right
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(180, 128, 40);
    doc.text(`₹ ${prop.priceCr} Cr`, pageWidth - margin, y, { align: 'right' });
    y += (titleLines.length * 5) + 2;

    // Badges line
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);
    const badges = [
      `Area: ${prop.area}`,
      `Mandate: ${prop.mandate || 'Direct'} Listing`,
      prop.hotCommercial ? 'HOT COMMERCIAL' : '',
      prop.hotResidential ? 'HOT RESIDENTIAL' : '',
      prop.isCorner ? 'Corner Plot' : ''
    ].filter(Boolean).join(' | ');
    doc.text(badges, margin, y);
    y += 5;

    // Specs
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    const specs = getSpecSummary(prop);
    doc.text(`Specifications: ${specs}`, margin, y);
    y += 5;

    // Details text
    if (prop.details) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(70, 70, 70);
      const detailLines = doc.splitTextToSize(prop.details, contentWidth);
      checkPageBreak(detailLines.length * 4);
      doc.text(detailLines, margin, y);
      y += (detailLines.length * 4) + 3;
    }

    if (prop.googleLocation) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(20, 100, 180);
      doc.text(`Map Location: ${prop.googleLocation}`, margin, y);
      y += 4;
    }

    // Divider
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  });

  // Disclaimer footer on last page
  checkPageBreak(20);
  y += 4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  const disclaimer = 'Call Tiger Discretion Policy: Technical metrics, survey references and valuations provided for authorized investor & consultant evaluation. Sourced directly from owners or cross-shared by partner consultants.';
  doc.text(doc.splitTextToSize(disclaimer, contentWidth), margin, y);

  const fileName = `Call_Tiger_${(area || 'Bangalore').replace(/[^a-zA-Z0-9]/g, '_')}_Dossier.pdf`;
  doc.save(fileName);
}

function getSpecSummary(prop) {
  const parts = [];
  if (prop.formType === 'bungalow_building') {
    if (prop.bhk) parts.push(prop.bhk);
    if (prop.plotArea) parts.push(`Plot: ${prop.plotArea} sq.ft`);
    if (prop.builtUpArea) parts.push(`Built-up: ${prop.builtUpArea} sq.ft`);
    if (prop.facing) parts.push(`Facing: ${prop.facing}`);
  } else if (prop.formType === 'site') {
    if (prop.plotSize) parts.push(`Plot: ${prop.plotSize} sq.ft`);
    if (prop.dimensions) parts.push(`Dim: ${prop.dimensions}`);
    if (prop.facing) parts.push(`Facing: ${prop.facing}`);
  } else if (prop.formType === 'commercial_building') {
    if (prop.builtUpArea) parts.push(`Built-up: ${prop.builtUpArea} sq.ft`);
    if (prop.rentalIncome) parts.push(`Rent: ${prop.rentalIncome}`);
  } else if (prop.formType === 'office_space') {
    if (prop.workstations) parts.push(`${prop.workstations} Workstations`);
    if (prop.cabins) parts.push(`${prop.cabins} Cabins`);
    if (prop.coveredArea) parts.push(`Covered: ${prop.coveredArea} sq.ft`);
  } else if (prop.formType === 'land') {
    if (prop.landType) parts.push(prop.landType);
    if (prop.acres || prop.guntas) parts.push(`${prop.acres || 0}A ${prop.guntas || 0}G`);
    if (prop.roadWidth) parts.push(`Road: ${prop.roadWidth}`);
  } else if (prop.formType === 'flat') {
    if (prop.coveredArea) parts.push(`Covered: ${prop.coveredArea} sq.ft`);
    if (prop.facing) parts.push(`Facing: ${prop.facing}`);
    if (prop.builderFloor) parts.push(prop.builderFloor);
  }
  return parts.join(' • ') || 'Verified Technical Specs';
}
