import PDFDocument from 'pdfkit';

/**
 * Generates an individual, branded PDF for a DigiBuddy4U package
 * @param {Object} pkg - The package document
 * @param {Stream} res - Express response stream
 */
export function generatePackagePDF(pkg, res) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 40, bottom: 50, left: 45, right: 45 },
    bufferPages: true,
  });

  doc.pipe(res);

  const colors = {
    navyDark: '#071A38',
    navyMedium: '#0C254E',
    navyLight: '#14356B',
    blueElectric: '#0866F5',
    cyan: '#18D5E8',
    yellow: '#FFC629',
    textDark: '#172033',
    textMuted: '#52627A',
    bgLight: '#F5F8FC',
    border: '#E2E8F0',
    white: '#FFFFFF',
    green: '#10B981',
  };

  // Helper for drawing rounded boxes
  const drawBox = (x, y, w, h, bg, radius = 6) => {
    doc.save();
    doc.roundedRect(x, y, w, h, radius).fill(bg);
    doc.restore();
  };

  // Header banner on first page
  doc.rect(0, 0, 595.28, 120).fill(colors.navyDark);

  // Logo / Brand name
  doc.font('Helvetica-Bold').fontSize(22).fillColor(colors.white).text('DigiBuddy', 45, 30, { continued: true });
  doc.fillColor(colors.yellow).text('4U');
  
  doc.font('Helvetica').fontSize(9).fillColor(colors.cyan).text('YOUR DIGITAL GROWTH PARTNER', 45, 56);
  doc.font('Helvetica').fontSize(8).fillColor('#CBD5E1').text('+91 63524 78028  |  info@digibuddy4u.com  |  Ahmedabad, India', 45, 70);

  // Right-side badge
  doc.save();
  doc.roundedRect(405, 32, 145, 26, 13).fill('#0C254E');
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(colors.cyan).text('OFFICIAL SPECIFICATION', 412, 41, { width: 130, align: 'center' });
  doc.restore();

  // Package Header Box
  const startY = 135;
  drawBox(45, startY, 505.28, 65, colors.bgLight, 8);
  doc.rect(45, startY, 505.28, 65).strokeColor(colors.border).stroke();

  doc.font('Helvetica-Bold').fontSize(18).fillColor(colors.navyDark).text(`${pkg.name} Package`, 60, startY + 14);
  
  // Pricing pill
  doc.font('Helvetica-Bold').fontSize(14).fillColor(colors.blueElectric).text(pkg.priceDisplay || `₹${pkg.monthlyPrice?.toLocaleString('en-IN')}/month`, 60, startY + 38, { continued: true });
  
  if (pkg.minimumCommitment) {
    doc.font('Helvetica').fontSize(9).fillColor(colors.textMuted).text(`  •  ${pkg.minimumCommitment}`, { continued: true });
  }
  if (pkg.alternativePriceDisplay) {
    doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.textDark).text(`  •  (${pkg.alternativePriceDisplay})`);
  } else {
    doc.text('');
  }

  // Section 1: Core Deliverables Matrix
  let currentY = startY + 80;
  doc.font('Helvetica-Bold').fontSize(12).fillColor(colors.navyDark).text('1. Monthly Deliverables & Scope', 45, currentY);
  currentY += 18;

  const deliverables = [
    { label: 'Platforms Covered', value: (pkg.platforms || []).join(', ') },
    { label: 'Reels / Video Content', value: `${pkg.reelsCount || ''} ${pkg.reelsDetails ? '— ' + pkg.reelsDetails : ''}` },
    { label: 'Branded Static / Carousel Posts', value: `${pkg.postsCount || ''} ${pkg.postsDetails ? '— ' + pkg.postsDetails : ''}` },
    { label: 'Stories & Highlights', value: `${pkg.storiesCount || ''} ${pkg.storiesDetails ? '— ' + pkg.storiesDetails : ''}` },
    { label: 'Shoots & Production', value: `${pkg.shootsCount || 'Not included'} ${pkg.shootsDetails ? '— ' + pkg.shootsDetails : ''}` },
  ];

  if (pkg.influencerReels && pkg.influencerReels !== 'Not included') {
    deliverables.push({ label: 'Influencer Collaborations', value: pkg.influencerReels });
  }

  deliverables.push(
    { label: 'Copywriting & Keywords', value: pkg.captionsAndHashtags || 'Captions & targeted hashtags for all content' },
    { label: 'Competitor / Market Analysis', value: pkg.competitorCaseStudy || 'Competitor intelligence included' },
    { label: 'Meta Paid Advertising', value: `${pkg.metaAds || 'Not included'}${pkg.minSuggestedAdBudget ? ' (Suggested budget: ' + pkg.minSuggestedAdBudget + ')' : ''}` },
    { label: 'Customer Inquiry / DM Handling', value: pkg.commentsAndDMs || 'Not included' },
    { label: 'Creative Revisions', value: pkg.revisions || '1 per item' },
    { label: 'Reporting & Reviews', value: pkg.reporting || 'Monthly report' }
  );

  deliverables.forEach((item, idx) => {
    const isEven = idx % 2 === 0;
    const rowBg = isEven ? '#F8FAFC' : colors.white;
    const rowHeight = 26;

    drawBox(45, currentY, 505.28, rowHeight, rowBg, 3);
    doc.rect(45, currentY, 505.28, rowHeight).strokeColor('#E2E8F0').lineWidth(0.5).stroke();

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(colors.navyDark).text(item.label, 55, currentY + 7, { width: 145 });
    doc.font('Helvetica').fontSize(8).fillColor(colors.textDark).text(item.value, 205, currentY + 7, { width: 335, lineBreak: false });

    currentY += rowHeight + 3;
  });

  currentY += 10;

  // Check if page break needed
  if (currentY > 680) {
    doc.addPage();
    currentY = 45;
  }

  // Section 2: What Is Included vs Not Included
  doc.font('Helvetica-Bold').fontSize(12).fillColor(colors.navyDark).text('2. Inclusions & Exclusions Breakdown', 45, currentY);
  currentY += 18;

  const colWidth = 245;
  const colLeftX = 45;
  const colRightX = 305;
  const sectionTopY = currentY;

  // Left: Inclusions Box
  drawBox(colLeftX, sectionTopY, colWidth, 190, '#F0FDF4', 6);
  doc.rect(colLeftX, sectionTopY, colWidth, 190).strokeColor('#BBF7D0').lineWidth(0.75).stroke();
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#166534').text('✓  EVERYTHING INCLUDED', colLeftX + 12, sectionTopY + 10);

  let incY = sectionTopY + 28;
  const incList = (pkg.fullInclusions && pkg.fullInclusions.length > 0) ? pkg.fullInclusions : pkg.keyHighlights || [];
  incList.slice(0, 7).forEach((inc) => {
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#15803D').text('•', colLeftX + 12, incY);
    doc.font('Helvetica').fontSize(7.5).fillColor(colors.textDark).text(inc, colLeftX + 22, incY, { width: colWidth - 32 });
    incY += doc.heightOfString(inc, { width: colWidth - 32, fontSize: 7.5 }) + 4;
  });

  // Right: Exclusions Box
  drawBox(colRightX, sectionTopY, colWidth, 190, '#FEF2F2', 6);
  doc.rect(colRightX, sectionTopY, colWidth, 190).strokeColor('#FECACA').lineWidth(0.75).stroke();
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#991B1B').text('✕  EXCLUDED / NOT INCLUDED', colRightX + 12, sectionTopY + 10);

  let excY = sectionTopY + 28;
  const excList = (pkg.exclusions && pkg.exclusions.length > 0) ? pkg.exclusions : [
    'Shooting outside Ahmedabad (travel extra)',
    'Ad spend (paid directly to Meta)',
    'Full DM sales conversion handling',
    'Extra deliverables beyond monthly quota',
  ];
  excList.slice(0, 7).forEach((exc) => {
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#DC2626').text('•', colRightX + 12, excY);
    doc.font('Helvetica').fontSize(7.5).fillColor(colors.textDark).text(exc, colRightX + 22, excY, { width: colWidth - 32 });
    excY += doc.heightOfString(exc, { width: colWidth - 32, fontSize: 7.5 }) + 4;
  });

  currentY = sectionTopY + 205;

  // PAGE 2: Client Requirements, Monthly Workflow, and Terms
  doc.addPage();
  currentY = 45;

  // Mini Top Header
  doc.font('Helvetica-Bold').fontSize(14).fillColor(colors.navyDark).text(`DigiBuddy4U  •  ${pkg.name} Package Specification (Page 2)`, 45, currentY);
  doc.moveTo(45, currentY + 18).lineTo(550.28, currentY + 18).strokeColor(colors.border).stroke();
  currentY += 30;

  // Section 3: What We Need From You
  doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.navyDark).text('3. What We Need From You (Client Responsibilities)', 45, currentY);
  currentY += 15;

  drawBox(45, currentY, 505.28, 90, '#EFF6FF', 6);
  doc.rect(45, currentY, 505.28, 90).strokeColor('#BFDBFE').lineWidth(0.75).stroke();

  let reqY = currentY + 10;
  const reqList = (pkg.clientRequirements && pkg.clientRequirements.length > 0) ? pkg.clientRequirements : [
    'Send raw clips and photos by the 3rd of every month in a shared Google Drive folder.',
    'Share logo, brand colours, product offers, and details of 2 competitors.',
    'Approve content within 24 to 48 hours to maintain scheduled publishing rhythm.',
    'Add DigiBuddy4U through Meta Business Suite & Ads Manager (we never ask for passwords).',
    'Pay monthly retainer in advance before each month begins.',
  ];

  reqList.slice(0, 5).forEach((req) => {
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(colors.blueElectric).text('▶', 58, reqY);
    doc.font('Helvetica').fontSize(7.5).fillColor(colors.textDark).text(req, 70, reqY, { width: 465 });
    reqY += 15;
  });

  currentY += 105;

  // Section 4: How Every Month Works (Standard Monthly Rhythm)
  doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.navyDark).text('4. Standard Monthly Production Rhythm', 45, currentY);
  currentY += 15;

  const workflow = (pkg.monthlyWorkflow && pkg.monthlyWorkflow.length > 0) ? pkg.monthlyWorkflow : [
    { dayRange: 'Days 1 to 3', activity: 'You send raw clips, photos, offers and goals for the month.' },
    { dayRange: 'Days 3 to 6', activity: 'We send the content calendar (and ad plan, shot list where included). You approve it.' },
    { dayRange: 'Shoot days', activity: 'For Growth, Pro and Elite, shoots take place around days 6 to 10, on dates agreed in advance.' },
    { dayRange: 'Days 6 to 20', activity: 'We edit reels, design posts and stories, and prepare ad creatives.' },
    { dayRange: 'Days 20 to 24', activity: 'You review. Revisions are done within the limit of your package.' },
    { dayRange: 'Days 24 to 30', activity: 'We post, run the ads and check results every week.' },
    { dayRange: 'Last 2 days', activity: 'Report for the month.' },
  ];

  workflow.forEach((wf, i) => {
    const isEven = i % 2 === 0;
    const rowBg = isEven ? colors.bgLight : colors.white;
    drawBox(45, currentY, 505.28, 20, rowBg, 2);
    doc.rect(45, currentY, 505.28, 20).strokeColor('#E2E8F0').lineWidth(0.5).stroke();

    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(colors.navyDark).text(wf.dayRange, 55, currentY + 5, { width: 85 });
    doc.font('Helvetica').fontSize(7.5).fillColor(colors.textDark).text(wf.activity, 145, currentY + 5, { width: 395 });
    currentY += 22;
  });

  currentY += 10;

  // Section 5: Standard Operating Terms
  doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.navyDark).text('5. Terms & Operating Policies', 45, currentY);
  currentY += 14;

  const terms = (pkg.generalTerms && pkg.generalTerms.length > 0) ? pkg.generalTerms : [
    'Payment is made in advance before each month starts.',
    'Shoots take place inside Ahmedabad. Travel outside Ahmedabad is charged extra and available only for Pro and Elite.',
    'Ad spend is paid by you directly to Meta. Our fee covers strategy, setup, running, and weekly optimization.',
    'If raw material or approvals arrive late, the content schedule shifts by the corresponding number of days.',
    'Revisions are limited per item as specified in the package. Extra deliverables can be booked as add-ons.',
    'Campaign results depend on your offer, pricing, and rapid inquiry follow-up. We do not promise fixed leads or sales.',
  ];

  terms.forEach((term) => {
    doc.font('Helvetica').fontSize(7.5).fillColor(colors.textMuted).text(`•  ${term}`, 48, currentY, { width: 500 });
    currentY += doc.heightOfString(term, { width: 500, fontSize: 7.5 }) + 3;
  });

  // Bottom Contact CTA on Page 2
  const ctaBoxY = 730;
  drawBox(45, ctaBoxY, 505.28, 48, colors.navyDark, 6);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.white).text(`Ready to partner on the ${pkg.name} Package?`, 60, ctaBoxY + 12);
  doc.font('Helvetica').fontSize(8).fillColor(colors.cyan).text('WhatsApp: +91 63524 78028  |  Email: info@digibuddy4u.com  |  Web: www.digibuddy4u.com', 60, ctaBoxY + 28);

  // Add page numbers on all pages
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.font('Helvetica').fontSize(7).fillColor('#94A3B8').text(
      `DigiBuddy4U  •  ${pkg.name} Package  •  Page ${i + 1} of ${range.count}`,
      45,
      805,
      { width: 505.28, align: 'center' }
    );
  }

  doc.end();
}
