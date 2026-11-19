/**
 * WORD (.DOCX) DOSSIER GENERATOR
 * Generates formatted executive property dossiers for download (Page 21 Wireframe)
 */
import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';

export async function generateDocxDossier({ title, properties, area, division }) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header / Letterhead
          new Paragraph({
            text: 'CALL TIGER REAL ESTATE ADVISORY',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 }
          }),
          new Paragraph({
            text: `Executive Property Portfolio Dossier — ${area || 'All Bangalore Areas'} (${division || 'All Divisions'})`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Desk Line: ', bold: true }),
              new TextRun('+91 98450 00000 | +91 97404 02975 | calltiger.in'),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),

          // Properties Listing
          ...properties.flatMap((prop, index) => [
            new Paragraph({
              text: `${index + 1}. [${prop.id}] ${prop.title}`,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 240, after: 120 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Locality / Area: ', bold: true }),
                new TextRun(`${prop.area} | `),
                new TextRun({ text: 'Mandate Type: ', bold: true }),
                new TextRun(`${prop.mandate || 'Direct'} Listing | `),
                new TextRun({ text: 'Asking Valuation: ', bold: true }),
                new TextRun(`₹ ${prop.priceCr} Crore`)
              ],
              spacing: { after: 120 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Key Specifications: ', bold: true }),
                new TextRun(getSpecSummary(prop))
              ],
              spacing: { after: 120 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Executive Details: ', bold: true }),
                new TextRun(prop.details || '—')
              ],
              spacing: { after: 200 }
            }),
            ...(prop.googleLocation ? [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Location Map Pin: ', bold: true }),
                  new TextRun(prop.googleLocation)
                ],
                spacing: { after: 200 }
              })
            ] : []),
            new Paragraph({
              text: '—'.repeat(45),
              spacing: { after: 240 }
            })
          ]),

          // Footer disclaimer
          new Paragraph({
            children: [
              new TextRun({
                text: 'Confidentiality Notice: This portfolio document is issued for evaluation by authorized buyers, investors, and collaborating consultants. Site inspections strictly by prior appointment.',
                italics: true,
                size: 18
              })
            ],
            spacing: { before: 400 }
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `Call_Tiger_${(area || 'Bangalore').replace(/[^a-zA-Z0-9]/g, '_')}_Portfolio.docx`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function getSpecSummary(prop) {
  const parts = [];
  if (prop.formType === 'bungalow_building') {
    if (prop.bhk) parts.push(`Configuration: ${prop.bhk}`);
    if (prop.plotArea) parts.push(`Plot Area: ${prop.plotArea} sq.ft`);
    if (prop.builtUpArea) parts.push(`Built-up: ${prop.builtUpArea} sq.ft`);
    if (prop.facing) parts.push(`Facing: ${prop.facing}`);
    if (prop.isCorner) parts.push('Corner Plot');
  } else if (prop.formType === 'site') {
    if (prop.plotSize) parts.push(`Plot Size: ${prop.plotSize} sq.ft`);
    if (prop.dimensions) parts.push(`Dimensions: ${prop.dimensions}`);
    if (prop.facing) parts.push(`Facing: ${prop.facing}`);
    if (prop.isCorner) parts.push('Corner Site');
  } else if (prop.formType === 'commercial_building') {
    if (prop.builtUpArea) parts.push(`Built-up: ${prop.builtUpArea} sq.ft`);
    if (prop.rentalIncome) parts.push(`Rent Yield: ${prop.rentalIncome}`);
    if (prop.facing) parts.push(`Facing: ${prop.facing}`);
  } else if (prop.formType === 'office_space') {
    if (prop.workstations) parts.push(`Workstations: ${prop.workstations} Seats`);
    if (prop.cabins) parts.push(`Cabins: ${prop.cabins}`);
    if (prop.coveredArea) parts.push(`Covered Area: ${prop.coveredArea} sq.ft`);
  } else if (prop.formType === 'land') {
    if (prop.landType) parts.push(`Zoning: ${prop.landType}`);
    if (prop.acres) parts.push(`Acres: ${prop.acres}`);
    if (prop.guntas) parts.push(`Guntas: ${prop.guntas}`);
    if (prop.roadWidth) parts.push(`Road Width: ${prop.roadWidth}`);
  } else if (prop.formType === 'flat') {
    if (prop.coveredArea) parts.push(`Covered Area: ${prop.coveredArea} sq.ft`);
    if (prop.facing) parts.push(`Facing: ${prop.facing}`);
    if (prop.builderFloor) parts.push(`Type: ${prop.builderFloor}`);
  }
  return parts.join(' | ') || 'Verified Technical Specifications';
}
