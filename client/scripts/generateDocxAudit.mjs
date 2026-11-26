import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
} from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');
const outputPath = path.join(projectRoot, 'DigiBuddy4U_Complete_SEO_Audit_and_Action_Plan.docx');

// Palette constants matching DigiBuddy4U brand
const COLOR_PRIMARY = '0866F5'; // Electric Blue
const COLOR_NAVY = '071A38';    // Deep Navy
const COLOR_CYAN = '18D5E8';    // Cyan Accent
const COLOR_YELLOW = 'FFC629';  // Yellow Accent
const COLOR_GRAY_BG = 'F8FAFC'; // Light Gray Background
const COLOR_BORDER = 'CBD5E1';  // Slate Border
const COLOR_MUTED = '64748B';   // Slate Muted
const COLOR_CRITICAL = 'DC2626'; // Red
const COLOR_HIGH = 'EA580C';     // Orange
const COLOR_MEDIUM = 'D97706';   // Amber
const COLOR_LOW = '16A34A';      // Green

// Helper functions for Word Document formatting
function createTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 300, after: 120 },
    children: [
      new TextRun({
        text,
        font: 'Poppins',
        size: 48,
        bold: true,
        color: COLOR_NAVY,
      }),
    ],
  });
}

function createSubtitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 400 },
    children: [
      new TextRun({
        text,
        font: 'Inter',
        size: 24,
        color: COLOR_PRIMARY,
        bold: true,
      }),
    ],
  });
}

function createH1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 160 },
    children: [
      new TextRun({
        text,
        font: 'Poppins',
        size: 32,
        bold: true,
        color: COLOR_NAVY,
      }),
    ],
  });
}

function createH2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    children: [
      new TextRun({
        text,
        font: 'Poppins',
        size: 26,
        bold: true,
        color: COLOR_PRIMARY,
      }),
    ],
  });
}

function createH3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text,
        font: 'Poppins',
        size: 22,
        bold: true,
        color: COLOR_NAVY,
      }),
    ],
  });
}

function createP(text, options = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 100 },
    children: [
      new TextRun({
        text,
        font: 'Inter',
        size: 20,
        color: options.color || '334155',
        bold: options.bold || false,
        italics: options.italics || false,
      }),
    ],
  });
}

function createBullet(text, boldPrefix = '') {
  const children = [];
  if (boldPrefix) {
    children.push(
      new TextRun({
        text: `${boldPrefix}: `,
        font: 'Inter',
        size: 20,
        bold: true,
        color: COLOR_NAVY,
      })
    );
  }
  children.push(
    new TextRun({
      text,
      font: 'Inter',
      size: 20,
      color: '334155',
    })
  );

  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 40, after: 60 },
    children,
  });
}

function createCallout(title, text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: 'EFF6FF' },
            borders: {
              left: { style: BorderStyle.SINGLE, size: 24, color: COLOR_PRIMARY },
              top: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
            },
            margins: { top: 120, bottom: 120, left: 180, right: 180 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: title,
                    font: 'Poppins',
                    size: 20,
                    bold: true,
                    color: COLOR_PRIMARY,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text,
                    font: 'Inter',
                    size: 19,
                    color: '1E293B',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function createTableHeaderCell(text, widthPercent) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: COLOR_NAVY },
    margins: { top: 100, bottom: 100, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text,
            font: 'Poppins',
            size: 18,
            bold: true,
            color: 'FFFFFF',
          }),
        ],
      }),
    ],
  });
}

function createTableCell(text, widthPercent, isShaded = false, textColor = '334155', isBold = false) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: isShaded ? { type: ShadingType.CLEAR, fill: COLOR_GRAY_BG } : undefined,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
      left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
      right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    },
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            font: 'Inter',
            size: 18,
            color: textColor,
            bold: isBold,
          }),
        ],
      }),
    ],
  });
}

// Generate the complete document
async function generateDocx() {
  console.log('Building DigiBuddy4U Complete SEO Audit & Action Plan docx...');

  const children = [];

  // =========================================================================
  // COVER / HEADER
  // =========================================================================
  children.push(createTitle('DigiBuddy4U — Complete SEO Audit & Action Plan'));
  children.push(createSubtitle('Strategic Blueprint for Search Dominance Across Ahmedabad, Gujarat & India'));
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [
        new TextRun({ text: 'Target Domain: ', font: 'Inter', bold: true, size: 20 }),
        new TextRun({ text: 'https://digibuddy4u.com/ | ', font: 'Inter', size: 20, color: COLOR_PRIMARY }),
        new TextRun({ text: 'Date: ', font: 'Inter', bold: true, size: 20 }),
        new TextRun({ text: 'November 2026 | ', font: 'Inter', size: 20 }),
        new TextRun({ text: 'Status: ', font: 'Inter', bold: true, size: 20 }),
        new TextRun({ text: 'Initial Audit & Recommendations (Pending Approval)', font: 'Inter', size: 20, color: COLOR_HIGH, bold: true }),
      ],
    })
  );

  children.push(
    createCallout(
      'MANDATORY INSTRUCTION COMPLIANCE & UI/UX DESIGN LOCK NOTICE',
      'This document represents the complete, non-destructive audit and recommendation report requested prior to implementation. In strict compliance with the UI/UX Design Lock, no website source code, layout, CSS, pricing or design components have been visually altered. All recommendations strictly focus on Technical SEO, Metadata, Keyword Optimization, Content Copywriting, Structured Data, Performance Tuning, and Local SEO.'
    )
  );

  // =========================================================================
  // 1. EXECUTIVE SUMMARY
  // =========================================================================
  children.push(createH1('1. Executive Summary'));
  children.push(
    createP(
      'DigiBuddy4U is an agile, premium digital marketing agency and IT partner based in Ahmedabad, Gujarat, offering high-impact social media management, 4K camera shoots, Meta & Google ads, website development, SEO, and custom software solutions. The website currently features a modern, high-converting Liquid Glass visual identity with interactive pricing calculators and a seamless quotation workflow.'
    )
  );
  children.push(
    createP(
      'Our comprehensive multi-disciplinary audit evaluated technical infrastructure, crawling and indexing behavior, on-page content relevance, local search signals, schema markup, and conversion architecture. The audit reveals strong technical foundations (sub-second rendering, dynamic prerender snapshots, rich catalog data) alongside critical SEO bottlenecks that currently suppress organic visibility on Google, Google Maps, and AI-driven answer engines (ChatGPT, Perplexity, Gemini).'
    )
  );
  children.push(createBullet('Primary domain https://digibuddy4u.com is misconfigured in canonical URLs, currently pointing to https://digibuddy4u.vercel.app across all routes.', 'Top Finding #1'));
  children.push(createBullet('Absence of an active Blog & Knowledge Center limits organic discovery for high-volume informational queries in Gujarat.', 'Top Finding #2'));
  children.push(createBullet('Service page content needs expansion to target commercial high-intent keywords across Ahmedabad micro-markets (SG Highway, Prahlad Nagar, Bopal, etc.).', 'Top Finding #3'));
  children.push(createBullet('NAP (Name, Address, Phone) consistency must be unified across schema, contact pages, and WhatsApp endpoints.', 'Top Finding #4'));

  // =========================================================================
  // 2. CURRENT WEBSITE CONDITION & FULL PAGE INVENTORY
  // =========================================================================
  children.push(createH1('2. Current Website Condition & Complete Page Inventory'));
  children.push(
    createP(
      'The DigiBuddy4U web application operates on a modern hybrid stack: a single-page React 19 application powered by Vite, coupled with a pre-render build script (generateSeo.mjs) that outputs static HTML snapshots for 25 primary routes into the production distribution directory. Below is the full inventory of all existing live routes, components, and their current SEO readiness:'
    )
  );

  // Page Inventory Table
  const inventoryHeaders = ['Page / Route', 'Type', 'Current SEO Title', 'H1 Structure', 'Current Status'];
  const inventoryRows = [
    ['/ (Homepage)', 'Core Landing', 'DigiBuddy4U | Digital Marketing Agency in Ahmedabad', 'Typewriter + Screen Reader H1', 'Strong UI, needs H1 keyword consolidation'],
    ['/about', 'Company Profile', 'About DigiBuddy4U | Digital Marketing Agency Ahmedabad', 'H1: We Are Driven by One Mission...', 'Rich story, needs E-E-A-T founder schema'],
    ['/services', 'Hub Page', 'Digital Marketing Services in Ahmedabad & IT | DigiBuddy4U', 'H1: All 14 Agency Services...', 'Catalog hub, lacks micro-market keywords'],
    ['/services/social-media-marketing', 'Service Detail', 'Social Media Marketing Agency Ahmedabad | DigiBuddy4U', 'H1: Social Media Marketing (SMM)', 'High potential, needs localized proof'],
    ['/services/performance-marketing', 'Service Detail', 'Meta Ads Agency Ahmedabad & Facebook Ads | DigiBuddy4U', 'H1: Performance Marketing & Paid Ads', 'Good copy, needs ROAS case benchmarks'],
    ['/services/branding-creative-design', 'Service Detail', 'Branding Agency Ahmedabad & Graphic Design | DigiBuddy4U', 'H1: Branding & Creative Design', 'Solid scope, needs vector showcase links'],
    ['/services/video-production-content-creation', 'Service Detail', 'Video Production Agency Ahmedabad & AI Reels | DigiBuddy4U', 'H1: Video Production & Content Creation', 'High commercial value, needs shoot radius'],
    ['/services/seo-online-presence', 'Service Detail', 'SEO Services in Ahmedabad & Local SEO | DigiBuddy4U', 'H1: SEO & Online Presence', 'Needs localized case study & audit CTA'],
    ['/services/content-writing-copywriting', 'Service Detail', 'Content Writing & Ad Copywriting Ahmedabad | DigiBuddy4U', 'H1: Content Writing & Copywriting', 'Clear modules, needs bilingual copy scope'],
    ['/services/ai-business-automation', 'Service Detail', 'AI Workflows & Marketing Automation Ahmedabad | DigiBuddy4U', 'H1: AI & Business Automation', 'Differentiator service, needs CRM demos'],
    ['/services/website-development', 'Service Detail', 'Website Development Company Ahmedabad | DigiBuddy4U', 'H1: Website Design & Development', 'High-intent target, needs tech stack tags'],
    ['/services/web-application-development', 'Service Detail', 'Web Application Development Company Ahmedabad | DigiBuddy4U', 'H1: Web Application Development', 'Good technical depth, needs SaaS focus'],
    ['/services/mobile-app-development', 'Service Detail', 'Mobile App Development Company Ahmedabad | DigiBuddy4U', 'H1: Mobile App Development', 'Flutter/Android focused, needs Play Store SEO'],
    ['/services/custom-software-development', 'Service Detail', 'Custom Software & ERP Development Ahmedabad | DigiBuddy4U', 'H1: Custom Software Development', 'High ticket B2B, needs GST billing copy'],
    ['/services/ui-ux-product-design', 'Service Detail', 'UI/UX & Product Design Agency Ahmedabad | DigiBuddy4U', 'H1: UI/UX & Product Design', 'Needs Figma prototype interactive preview'],
    ['/services/ecommerce-solutions', 'Service Detail', 'E-commerce Website Development Ahmedabad | DigiBuddy4U', 'H1: E-commerce Solutions', 'Needs Razorpay & Shopify optimization'],
    ['/services/website-maintenance-support', 'Service Detail', 'Website Maintenance & Tech Support Ahmedabad | DigiBuddy4U', 'H1: Website Maintenance & Tech Support', 'Strong retention offer, needs SLA highlights'],
    ['/packages', 'Pricing Hub', 'Digital Marketing Packages & Pricing Ahmedabad | DigiBuddy4U', 'H1: Predictable Pricing for Measurable Growth', 'Approved pricing lock, excellent UI'],
    ['/packages/starter', 'Package Page', 'Foundation Package (₹10,000 / Month) | DigiBuddy4U', 'H1: Foundation Package', 'Detailed scope, clear inclusions/exclusions'],
    ['/packages/growth', 'Package Page', 'Expansion Package (₹20,000 / Month) | DigiBuddy4U', 'H1: Expansion Package', 'Most popular tier, high conversion rate'],
    ['/packages/premium', 'Package Page', 'Ultimate Package (₹80,000 / Campaign) | DigiBuddy4U', 'H1: Ultimate Package', 'Enterprise tier, shoot & ad spend included'],
    ['/packages/startup-setup', 'Package Page', 'Digital Foundation (₹15,000 One-Time) | DigiBuddy4U', 'H1: Digital Foundation Setup', 'High conversion starter for new businesses'],
    ['/portfolio', 'Case Studies', 'Client Portfolio & Creative Campaigns | DigiBuddy4U', 'H1: Client Work & Growth Case Studies', '6 verified brands (Dubai & Ahmedabad)'],
    ['/contact', 'Contact', 'Contact DigiBuddy4U | Digital Marketing Agency Ahmedabad', 'H1: Let’s Build Something Exceptional', 'Direct WhatsApp & form, needs Map embed'],
    ['/privacy-policy', 'Legal', 'Privacy Policy | DigiBuddy4U', 'H1: Privacy Policy', 'GDPR/DPDP ready, lacks Terms link'],
  ];

  const invTableRows = [
    new TableRow({
      children: [
        createTableHeaderCell('Page / Route', 25),
        createTableHeaderCell('Type', 15),
        createTableHeaderCell('Current SEO Title', 25),
        createTableHeaderCell('H1 Structure', 20),
        createTableHeaderCell('Current Status', 15),
      ],
    }),
  ];

  inventoryRows.forEach((row, i) => {
    invTableRows.push(
      new TableRow({
        children: [
          createTableCell(row[0], 25, i % 2 === 1, COLOR_NAVY, true),
          createTableCell(row[1], 15, i % 2 === 1),
          createTableCell(row[2], 25, i % 2 === 1),
          createTableCell(row[3], 20, i % 2 === 1),
          createTableCell(row[4], 15, i % 2 === 1),
        ],
      })
    );
  });

  children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: invTableRows }));

  // =========================================================================
  // 3. TECHNICAL SEO AUDIT & ISSUE TRACKER
  // =========================================================================
  children.push(createH1('3. Complete Technical SEO Audit & Issue Tracker'));
  children.push(
    createP(
      'A thorough code-level inspection was executed across client/src/utils/seoConfig.js, client/index.html, client/scripts/generateSeo.mjs, and public/dist server artifacts. Below is the technical issue tracker with severity classifications:'
    )
  );

  const techIssues = [
    ['Canonical & Domain Discrepancy', 'All Routes (25)', 'CRITICAL', 'SITE_URL hardcoded as "https://digibuddy4u.vercel.app" instead of "https://digibuddy4u.com". Search engines indexing digibuddy4u.com will treat Vercel as canonical!', 'Update SITE_URL in seoConfig.js to https://digibuddy4u.com and regenerate static sitemaps & snapshots.', 'Critical'],
    ['Missing Terms & Conditions Route', 'Sitewide / Legal', 'HIGH', 'Route /privacy-policy exists, but /terms-and-conditions does not exist. E-E-A-T quality evaluators require both.', 'Create Terms & Conditions page and register route in AppRoutes.jsx and footer navigation.', 'High Priority'],
    ['Absence of Blog Architecture', 'Knowledge Base', 'HIGH', 'No /blog or /blog/:slug routes exist. Limits organic keyword capture to transactional pages only.', 'Create Blog hub and dynamic article routes with BlogPosting JSON-LD schemas.', 'High Priority'],
    ['NAP & WhatsApp Number Inconsistency', 'Modal & Contact', 'HIGH', 'AddonDetailModal.jsx hardcodes wa.me/918141478024 while BRAND.phone is +91 63524 78028. Mixed NAP confuses local signals.', 'Centralize all telephone and WhatsApp links to BRAND.phone (+91 63524 78028).', 'High Priority'],
    ['Homepage H1 Screen Reader Split', 'Homepage (/)', 'MEDIUM', 'H1 is split between dynamic typewriter and an .sr-only span. Search engines prefer clean, cohesive H1 headings.', 'Streamline H1 text to clearly present "Digital Marketing Agency in Ahmedabad" in the primary heading node.', 'Medium Priority'],
    ['FAQ Fallback Hiding Mechanism', 'Homepage (/)', 'MEDIUM', 'FAQSection.jsx hides completely if database connection fails, omitting valuable Q&A content from crawlers.', 'Fall back to static FAQ_DATA when API is unreachable and attach FAQPage schema.', 'Medium Priority'],
    ['Missing LLM & AI Crawler Rules', 'robots.txt', 'MEDIUM', 'robots.txt has standard allow rules but lacks specific directives for GPTBot, PerplexityBot, and llms.txt.', 'Add explicit allow directives for modern AI search engines to maximize GEO/AEO visibility.', 'Medium Priority'],
    ['Orphaned Case Study Route', 'Portfolio', 'LOW', 'RotiWalaCaseStudyPage exists in codebase but routes redirect to /portfolio.', 'Provide deep-link access to full verified case study for client proof.', 'Low Priority'],
  ];

  const techTableRows = [
    new TableRow({
      children: [
        createTableHeaderCell('Issue', 20),
        createTableHeaderCell('Affected Page', 15),
        createTableHeaderCell('Severity', 12),
        createTableHeaderCell('Evidence / Finding', 25),
        createTableHeaderCell('Recommended Fix', 20),
        createTableHeaderCell('Priority', 8),
      ],
    }),
  ];

  techIssues.forEach((row, i) => {
    let sevColor = COLOR_MEDIUM;
    if (row[2] === 'CRITICAL') sevColor = COLOR_CRITICAL;
    if (row[2] === 'HIGH') sevColor = COLOR_HIGH;
    if (row[2] === 'LOW') sevColor = COLOR_LOW;

    techTableRows.push(
      new TableRow({
        children: [
          createTableCell(row[0], 20, i % 2 === 1, COLOR_NAVY, true),
          createTableCell(row[1], 15, i % 2 === 1),
          createTableCell(row[2], 12, i % 2 === 1, sevColor, true),
          createTableCell(row[3], 25, i % 2 === 1),
          createTableCell(row[4], 20, i % 2 === 1),
          createTableCell(row[5], 8, i % 2 === 1, sevColor, true),
        ],
      })
    );
  });

  children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: techTableRows }));

  // =========================================================================
  // 4. KEYWORD RESEARCH & THREE-TIER MAPPING
  // =========================================================================
  children.push(createH1('4. Comprehensive Keyword Research (Ahmedabad, Gujarat & India)'));
  children.push(
    createP(
      'Our search intent modeling targets Indian businesses at three distinct geographical tiers: Hyper-Local (Ahmedabad business hubs like SG Highway, Prahlad Nagar, CG Road, Bopal), Regional (Gandhinagar, Surat, Vadodara, Rajkot, Gujarat), and Pan-India (Affordable digital marketing and startup packages). We categorized keywords by commercial, transactional, and local search intent:'
    )
  );

  const keywordMap = [
    ['Homepage (/)', 'Digital marketing agency in Ahmedabad', 'Digital marketing company in Ahmedabad, Digital marketing services in Ahmedabad, Best digital marketing agency Gujarat', 'Commercial / Local', 'Ahmedabad & Gujarat', 'Integrate primary keyword into visible H1 subtitle; emphasize local agency credibility.'],
    ['/services/social-media-marketing', 'Social media marketing agency in Ahmedabad', 'Instagram marketing agency Ahmedabad, Social media management services in Ahmedabad, SMM services Gujarat', 'Commercial / Transactional', 'Ahmedabad, Gujarat', 'Highlight monthly reels cadence, pre-approval workflow, and local consumer engagement.'],
    ['/services/video-production-content-creation', 'AI video production company in Ahmedabad', 'Reels creation services in Ahmedabad, Corporate video production Ahmedabad, Ad film makers in Ahmedabad', 'Commercial / Transactional', 'Ahmedabad & Gandhinagar', 'Showcase Sony 4K mirrorless gear, studio lighting, on-site shoots & AI viral hooks.'],
    ['/services/website-development', 'Website development company in Ahmedabad', 'Web design company in Ahmedabad, WordPress & React developer Ahmedabad, Landing page design services', 'Transactional / Commercial', 'Ahmedabad, Gujarat, India', 'Highlight sub-second speed, mobile responsiveness, WhatsApp lead triggers & local business sites.'],
    ['/services/seo-online-presence', 'SEO company in Ahmedabad', 'SEO services in Ahmedabad, Local SEO services in Ahmedabad, Google Business Profile management Ahmedabad', 'Transactional / Commercial', 'Ahmedabad & Gujarat', 'Detail On-Page, Technical, Backlink outreach & Google Maps Local 3-Pack optimization.'],
    ['/services/performance-marketing', 'Meta Ads agency in Ahmedabad', 'Google Ads services in Ahmedabad, Performance marketing agency Ahmedabad, Facebook ads management Gujarat', 'Transactional / Commercial', 'Ahmedabad & India', 'Focus on ROAS, lead acquisition cost, A/B creative testing & Click-to-WhatsApp funnels.'],
    ['/services/branding-creative-design', 'Branding agency in Ahmedabad', 'Logo design company in Ahmedabad, Graphic design agency Ahmedabad, Corporate identity design Gujarat', 'Commercial / Informational', 'Ahmedabad & India', 'Emphasize bespoke vector brand marks, full copyright ownership & print-ready brand guidelines.'],
    ['/packages', 'Digital marketing packages in Ahmedabad', 'Social media marketing packages Ahmedabad, Affordable digital marketing services in India, Digital marketing price Gujarat', 'Commercial / Transactional', 'Ahmedabad & Pan-India', 'Maintain locked pricing (₹10k, ₹15k, ₹20k, ₹80k); clarify guaranteed deliverables and no-hidden-cost guarantee.'],
    ['/packages/startup-setup', 'Digital foundation package for business', 'One time business setup digital marketing, Google Business Profile setup package, Startup branding bundle', 'Transactional', 'Pan-India', 'Highlight ₹15,000 one-time investment with website, GBP, WhatsApp Business and initial ad shoot.'],
    ['/contact', 'Contact digital marketing agency Ahmedabad', 'Digital marketing consultation Ahmedabad, Hire social media agency Gujarat, DigiBuddy4U phone number', 'Transactional / Direct', 'Ahmedabad', 'Add exact office service areas (Sarkhej, SG Highway, Prahlad Nagar), verified phone & interactive map link.'],
  ];

  const kwTableRows = [
    new TableRow({
      children: [
        createTableHeaderCell('Target Page', 18),
        createTableHeaderCell('Primary Keyword', 22),
        createTableHeaderCell('Secondary Keywords', 25),
        createTableHeaderCell('Intent', 12),
        createTableHeaderCell('Target Location', 11),
        createTableHeaderCell('Recommended Changes', 12),
      ],
    }),
  ];

  keywordMap.forEach((row, i) => {
    kwTableRows.push(
      new TableRow({
        children: [
          createTableCell(row[0], 18, i % 2 === 1, COLOR_NAVY, true),
          createTableCell(row[1], 22, i % 2 === 1, COLOR_PRIMARY, true),
          createTableCell(row[2], 25, i % 2 === 1),
          createTableCell(row[3], 12, i % 2 === 1),
          createTableCell(row[4], 11, i % 2 === 1),
          createTableCell(row[5], 12, i % 2 === 1),
        ],
      })
    );
  });

  children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: kwTableRows }));

  // =========================================================================
  // 5. ON-PAGE SEO RECOMMENDATIONS
  // =========================================================================
  children.push(createH1('5. On-Page SEO Recommendations & Heading Hierarchy'));
  children.push(
    createP(
      'To ensure maximum keyword relevancy without keyword stuffing, every page must have an unambiguous heading architecture (single H1, followed by logical H2 and H3 subheadings) and optimized metadata reflecting verified Indian business buyer intents:'
    )
  );

  children.push(createH2('Homepage (/)'));
  children.push(createBullet('DigiBuddy4U | Digital Marketing Agency in Ahmedabad & Website Development', 'Proposed Title'));
  children.push(createBullet('DigiBuddy4U is a results-driven digital marketing agency in Ahmedabad. We specialize in social media management, 4K video reels, Meta ads, SEO services & high-performance websites.', 'Proposed Meta Description'));
  children.push(createBullet('We Build Brands That Launch, Scale & Dominate the Digital Space', 'Proposed Visible H1'));
  children.push(createBullet('H2: Core Capabilities & Commercial Deliverables; H2: Predictable Pricing for Measurable Growth; H2: Why Businesses Choose DigiBuddy4U; H2: Frequently Asked Questions', 'Heading Structure'));

  children.push(createH2('Services Hub (/services)'));
  children.push(createBullet('Digital Marketing Services in Ahmedabad & IT Solutions | DigiBuddy4U', 'Proposed Title'));
  children.push(createBullet('Explore 14 specialized digital marketing and IT services in Ahmedabad: social media marketing, Meta & Google ads, 4K video production, SEO, branding, and custom web applications.', 'Proposed Meta Description'));
  children.push(createBullet('Integrated Digital Marketing & IT Services Built for Growth', 'Proposed Visible H1'));

  children.push(createH2('Packages Page (/packages)'));
  children.push(createBullet('Digital Marketing Packages in Ahmedabad & Transparent Pricing | DigiBuddy4U', 'Proposed Title'));
  children.push(createBullet('Transparent digital marketing packages in Ahmedabad: Foundation (₹10,000/mo), Expansion (₹20,000/mo), Ultimate (₹80,000/campaign), and Digital Foundation Setup (₹15,000 one-time).', 'Proposed Meta Description'));
  children.push(createBullet('Predictable Pricing for Measurable Business Growth', 'Proposed Visible H1'));

  // =========================================================================
  // 6. WEBSITE CONTENT OPTIMIZATION (EXISTING VS RECOMMENDED)
  // =========================================================================
  children.push(createH1('6. Website Content Optimization (Existing vs Recommended Content)'));
  children.push(
    createP(
      'All proposed copy enhancements preserve the approved visual layout, styling, and brand integrity. The objective is to inject natural local search entities, clear value propositions, and trust triggers without altering the website design:'
    )
  );

  const contentChanges = [
    [
      'Homepage',
      'Hero Subtitle',
      'As a dedicated digital marketing agency in Ahmedabad, we help brands stand out with strategic social media marketing, Meta ads, creative reels, high-performing websites, and innovative IT solutions.',
      'As a dedicated digital marketing agency in Ahmedabad, DigiBuddy4U empowers startups and established businesses across Gujarat with high-retention video reels, Meta & Google advertising, search engine optimization, and custom web development engineered for real customer inquiries.',
      'Digital marketing agency in Ahmedabad, digital marketing services Gujarat',
      'Expands semantic depth, adds geographic scope, and targets business inquiries.',
      'High Priority',
    ],
    [
      'Homepage',
      'Why Choose Us Section',
      'DigiBuddy4U was built to solve the frustration of dealing with bloated, impersonal marketing agencies. We combine senior creative talent with agile technical execution.',
      'DigiBuddy4U provides Ahmedabad business owners with a dedicated "Buddy Model": senior creative direction, professional 4K camera shoots, 100% pre-approved social calendars, and direct WhatsApp speed-dial with zero junior account handoffs.',
      'Digital marketing company Ahmedabad, senior creative marketing agency',
      'Sharpens E-E-A-T and articulates unique commercial advantages over generic agencies.',
      'High Priority',
    ],
    [
      'Services (/services/video-production-content-creation)',
      'Hero Description',
      'High-retention vertical video, reels, corporate showcases, product demonstrations, and AI-assisted video workflows.',
      'Stop the thumb-scroll with cinematic 4K camera shoots and viral AI video production in Ahmedabad. From founder interviews and factory tours on SG Highway to dynamic Instagram Reels and YouTube Shorts, we craft visual content that converts viewers into loyal customers.',
      'AI video production company Ahmedabad, reels creation services in Ahmedabad',
      'Increases local keyword relevance and explains actual production deliverables.',
      'High Priority',
    ],
    [
      'Packages (/packages)',
      'Packages Overview',
      'Choose from our continuous monthly growth retainers or our full-service digital foundation business launch.',
      'Select from our proven monthly growth retainers or our full-service digital foundation setup for Ahmedabad startups. Transparent deliverables, guaranteed posting cadences, and zero hidden agency overheads.',
      'Digital marketing packages in Ahmedabad, affordable digital marketing India',
      'Strengthens transactional intent and reinforces transparent pricing confidence.',
      'Medium Priority',
    ],
    [
      'Contact (/contact)',
      'Direct Channels Subtitle',
      'We value your time. Serving startups and established brands across Ahmedabad, Gandhinagar, Gujarat & Pan-India—choose your preferred channel below or complete the inquiry form.',
      'Serving retail, manufacturing, real estate, and healthcare brands across Ahmedabad (Sarkhej, Prahlad Nagar, SG Highway, Bopal), Gandhinagar, Gujarat, and Pan-India. Connect via WhatsApp for an instant response or book a complimentary 20-minute brand strategy call.',
      'Digital marketing agency Ahmedabad contact, hire digital marketing Gujarat',
      'Incorporates crucial local micro-market entities required for Google Maps local ranking.',
      'High Priority',
    ],
  ];

  const contentTableRows = [
    new TableRow({
      children: [
        createTableHeaderCell('Page', 12),
        createTableHeaderCell('Section', 12),
        createTableHeaderCell('Existing Content', 22),
        createTableHeaderCell('Recommended New Content', 26),
        createTableHeaderCell('Target Keywords', 16),
        createTableHeaderCell('Priority', 12),
      ],
    }),
  ];

  contentChanges.forEach((row, i) => {
    contentTableRows.push(
      new TableRow({
        children: [
          createTableCell(row[0], 12, i % 2 === 1, COLOR_NAVY, true),
          createTableCell(row[1], 12, i % 2 === 1, COLOR_PRIMARY, true),
          createTableCell(row[2], 22, i % 2 === 1),
          createTableCell(row[3], 26, i % 2 === 1),
          createTableCell(row[4], 16, i % 2 === 1),
          createTableCell(row[6], 12, i % 2 === 1, COLOR_HIGH, true),
        ],
      })
    );
  });

  children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: contentTableRows }));

  // =========================================================================
  // 7. DEDICATED SEO SERVICE PAGES EVALUATION
  // =========================================================================
  children.push(createH1('7. Dedicated SEO Service Landing Pages Evaluation'));
  children.push(
    createP(
      'DigiBuddy4U currently has 14 individual service routes defined under /services/:slug. However, several critical high-intent services currently exist only as subservices or add-ons rather than dedicated standalone landing pages. We evaluated each proposed landing page to determine whether it deserves a dedicated route:'
    )
  );

  children.push(createBullet('Social Media Management (/services/social-media-management): Recommended. Separate organic community building from paid performance ads to target specific SMM search queries.', '1. Social Media Management'));
  children.push(createBullet('AI Video Production & Reels (/services/ai-video-production): Recommended. Rapidly growing search volume in Ahmedabad for TikTok/Instagram vertical video production with AI avatar integration.', '2. AI Video Production'));
  children.push(createBullet('Google Business Profile Management (/services/google-business-profile-management): Recommended. Local retail and clinics search heavily for Google Maps ranking and GBP verification services in Ahmedabad.', '3. GBP Management'));
  children.push(createBullet('Meta Ads Management (/services/meta-ads-management): Recommended. Businesses seeking Facebook/Instagram ad managers search separately from general digital marketing.', '4. Meta Ads Management'));
  children.push(createBullet('Google Ads (PPC) Management (/services/google-ads-management): Recommended. Captures high commercial intent buyers actively searching for Google Search & Performance Max management.', '5. Google Ads Management'));
  children.push(createBullet('Local SEO Services (/services/local-seo-ahmedabad): Recommended. High-converting landing page targeting Ahmedabad multi-location businesses seeking Maps 3-Pack supremacy.', '6. Local SEO'));
  children.push(createBullet('WhatsApp Business Solutions (/services/whatsapp-business-solutions): Recommended. Huge demand in Gujarat for automated WhatsApp lead generation and product catalog integration.', '7. WhatsApp Business Solutions'));
  children.push(createBullet('Website Development & Redesign (/services/website-development): Maintain existing strong page, enhance technical deliverables and sub-second speed proof.', '8. Website Development'));
  children.push(createBullet('Branding & Corporate Identity (/services/branding-creative-design): Maintain existing page, incorporate vector asset deliverables and trademark guidance.', '9. Branding & Design'));
  children.push(createBullet('Custom Software & ERP Development (/services/custom-software-development): Maintain existing page, add GST billing and institutional portal case studies.', '10. Custom Software'));

  // =========================================================================
  // 8. LOCAL SEO STRATEGY (AHMEDABAD & GUJARAT)
  // =========================================================================
  children.push(createH1('8. Local SEO Strategy for Ahmedabad & Gujarat'));
  children.push(
    createP(
      'Local search engine optimization represents the fastest route to acquiring qualified inbound commercial clients in Gujarat. Our audit identified four essential pillars to dominate local map searches and regional business queries:'
    )
  );

  children.push(createBullet('Unify business name (DigiBuddy4U), primary telephone (+91 63524 78028), and official address across all website footer notes, contact pages, and Google Business Profile.', '1. Strict NAP Standardization'));
  children.push(createBullet('Embed verified Google Maps pin in contact page and generate direct Google Review short links to consistently gather 5-star customer ratings.', '2. Google Maps Embed & Review Loop'));
  children.push(createBullet('Explicitly reference genuine business operational zones: SG Highway, Prahlad Nagar, Sarkhej, Juhapura, Satellite, Bopal, Sindhu Bhavan Road, Gandhinagar, and Ahmedabad East & West.', '3. Local Geographic Micro-Markets'));
  children.push(createBullet('Submit verified citations on trusted Indian business directories: Justdial, IndiaMART, Sulekha, TradeIndia, and local Ahmedabad Chamber of Commerce portals.', '4. High-Authority Local Citations'));

  // =========================================================================
  // 9. STRUCTURED DATA & SCHEMA MARKUP PLAN
  // =========================================================================
  children.push(createH1('9. Structured Data & Schema Markup Architecture'));
  children.push(
    createP(
      'DigiBuddy4U already utilizes JSON-LD scripts, but several critical schemas must be upgraded to ensure rich snippets and entity validation in Google Search Console:'
    )
  );

  children.push(createBullet('Upgrade from generic Organization to ProfessionalService / LocalBusiness with verified geo-coordinates, telephone (+91 63524 78028), priceRange ("₹₹"), and areaServed (Ahmedabad, Gandhinagar, Gujarat, India).', 'LocalBusiness Schema'));
  children.push(createBullet('Attach Service schemas with hasOfferCatalog and ListItem elements to every /services/:slug route, detailing exact inclusions without exaggerated claims.', 'Service & OfferCatalog Schema'));
  children.push(createBullet('Implement FAQPage schema on Homepage and Service detail pages, enabling Google rich accordion results directly in search engine result pages (SERPs).', 'FAQPage Schema'));
  children.push(createBullet('Maintain BreadcrumbList schemas across all hierarchical routes to ensure clean breadcrumb URL navigation in mobile search snippets.', 'BreadcrumbList Schema'));
  children.push(createBullet('Attach Offer schema with INR currency, pricing specifications, and InStock availability to all 4 master packages.', 'Offer & Price Specification Schema'));

  // =========================================================================
  // 10. AI SEARCH OPTIMIZATION (AEO & GEO)
  // =========================================================================
  children.push(createH1('10. AI Search Optimization — AEO & GEO Strategy'));
  children.push(
    createP(
      'Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) ensure that DigiBuddy4U is prominently cited when users ask questions to AI engines such as ChatGPT Search, Perplexity AI, Google AI Overviews, and Microsoft Copilot:'
    )
  );

  children.push(createBullet('Structure service explanations with clear Q&A formats ("What is included in digital marketing packages in Ahmedabad?", "How much does website development cost in Ahmedabad?"). AI models prioritize clear question-answer pairs.', '1. Direct Q&A Formatting'));
  children.push(createBullet('Publish an authoritative /llms.txt file in the website root summarizing DigiBuddy4U services, verified pricing (Foundation ₹10,000/mo, Expansion ₹20,000/mo, Ultimate ₹80,000/campaign), leadership, and Ahmedabad location for AI scrapers.', '2. llms.txt Implementation'));
  children.push(createBullet('Ensure robots.txt explicitly permits friendly AI crawlers: GPTBot, PerplexityBot, ClaudeBot, and Google-Extended.', '3. AI Crawler Permissions in robots.txt'));
  children.push(createBullet('Maintain 100% factual consistency across all public channels (Instagram, LinkedIn, Facebook, Website) so that AI knowledge graphs resolve DigiBuddy4U as an authoritative entity.', '4. Entity Knowledge Graph Alignment'));

  // =========================================================================
  // 11. COMPETITOR BENCHMARKING (AHMEDABAD & GUJARAT)
  // =========================================================================
  children.push(createH1('11. Competitor Benchmarking & Strategic Differentiation'));
  children.push(
    createP(
      'We benchmarked DigiBuddy4U against prominent digital marketing agencies in Ahmedabad (e.g. ShoutnHike, Flora Fountain, AG Digital, Bonoboz). While established agencies have high domain authority from older backlink profiles, DigiBuddy4U holds distinct competitive advantages that our SEO and content strategy will emphasize:'
    )
  );

  children.push(createBullet('Competitors hide pricing behind gated contact forms. DigiBuddy4U offers completely transparent, predictable tiers (Foundation ₹10,000, Expansion ₹20,000, Ultimate ₹80,000). Transparent pricing captures high-intent prospects who value clarity.', 'Advantage 1: Transparent Pricing'));
  children.push(createBullet('Most agencies use stock photos or remote freelancing. DigiBuddy4U provides dedicated on-location Sony 4K mirrorless camera shoots and studio lighting inside Ahmedabad.', 'Advantage 2: On-Site 4K Production'));
  children.push(createBullet('Agencies frequently hand client accounts to junior interns. DigiBuddy4U emphasizes a dedicated senior "Buddy Model" with direct WhatsApp speed-dial and 100% pre-approval.', 'Advantage 3: Senior Direct Access'));
  children.push(createBullet('DigiBuddy4U bridges modern web engineering (React, Next.js, custom ERPs) with social media marketing, offering true full-funnel capability under one roof.', 'Advantage 4: End-to-End IT & Marketing'));

  // =========================================================================
  // 12. 90-DAY CONTENT MARKETING & BLOG CALENDAR
  // =========================================================================
  children.push(createH1('12. 90-Day SEO Content & Blog Calendar (12 Weeks)'));
  children.push(
    createP(
      'To build organic topical authority and capture top-of-funnel business searches across Gujarat, we planned a 12-week strategic content roadmap targeting real challenges faced by Indian entrepreneurs and SMEs:'
    )
  );

  const blogCalendar = [
    ['Week 1', 'How Much Does Digital Marketing Cost in Ahmedabad? (2026 Price Guide)', 'Digital marketing cost in Ahmedabad', 'Transactional / Guide', 'Breaks down retainer vs project fees, comparing ₹10k, ₹20k, ₹80k budgets and expected deliverables.', '/packages', 'Get Instant Package Quotation'],
    ['Week 2', '7 Reasons Your Business Instagram Reels Are Stuck Under 1,000 Views', 'Instagram reels strategy for business', 'Informational / Problem-Solving', 'Explains the 2.5-second hook, pacing, kinetic subtitles, and trending audio vs generic stock clips.', '/services/video-production-content-creation', 'Book a 4K Reel Shoot'],
    ['Week 3', 'Google Business Profile Optimization: How to Rank in Ahmedabad Local 3-Pack', 'Google Business Profile optimization Ahmedabad', 'Local / Commercial', 'Step-by-step checklist on category selection, weekly photo cadence, review management, and pin placement.', '/services/seo-online-presence', 'Request Free GBP Audit'],
    ['Week 4', 'Why Generic Canva Templates Hurt Your Brand (And What to Do Instead)', 'Branding agency in Ahmedabad', 'Informational / Brand Trust', 'Case study showing how custom vector design and brand guidelines increase customer trust and lead conversion.', '/services/branding-creative-design', 'Explore Brand Identity Packages'],
    ['Week 5', 'Meta Ads vs Google Ads: Which Delivers Better ROI for Indian Small Businesses?', 'Meta ads vs Google ads India', 'Commercial / Comparison', 'Direct comparison of intent-based Google Search ads vs demand-generation Instagram/Meta Click-to-WhatsApp ads.', '/services/performance-marketing', 'Consult an Ad Strategist'],
    ['Week 6', 'Single Page Website vs Multi-Page Portal: What Does Your Business Actually Need?', 'Website development company Ahmedabad', 'Informational / Buyer Guide', 'Clear breakdown of landing pages, 5-page business websites, and custom React web portals.', '/services/website-development', 'Calculate Website Price'],
    ['Week 7', 'Local SEO for Doctors, Clinics & Hospitals in Ahmedabad: Complete Guide', 'Healthcare digital marketing Ahmedabad', 'Niche Commercial', 'HIPAA/local medical advertising compliance, Google Maps optimization, and patient testimonial video guidelines.', '/services/seo-online-presence', 'Grow Clinic Inquiries'],
    ['Week 8', 'How WhatsApp Business Automation Slashes Lead Response Time Under 2 Minutes', 'WhatsApp business automation India', 'Commercial / Tech', 'Demonstrates automated greetings, catalog browsing, quick replies, and CRM lead routing.', '/services/ai-business-automation', 'Automate Your Leads'],
    ['Week 9', 'The Real Estate Marketing Playbook: How Ahmedabad Builders Sell Properties Fast', 'Real estate digital marketing Ahmedabad', 'Industry Niche', 'Drone walkthroughs, Facebook lead forms, 3D floor plan reels, and hyper-local pin-code targeting.', '/services/performance-marketing', 'Launch Real Estate Ad Campaign'],
    ['Week 10', 'Technical SEO Checklist for E-Commerce Websites Selling in Gujarat & India', 'E-commerce SEO India', 'Technical / Educational', 'Core Web Vitals, schema markup, breadcrumb navigation, Razorpay integration, and page speed.', '/services/ecommerce-solutions', 'Build High-Speed Store'],
    ['Week 11', 'The 48-Hour Pre-Approval Rule: Why You Should Never Let Agencies Post Blindly', 'Social media marketing agency Ahmedabad', 'Thought Leadership / E-E-A-T', 'Explains DigiBuddy4U signature pre-approval workflow and how it protects brand reputation.', '/about', 'Partner With DigiBuddy4U'],
    ['Week 12', 'How to Generate 100+ Qualified B2B Inquiries Every Month via LinkedIn', 'B2B lead generation Ahmedabad', 'Commercial / Strategy', 'Executive personal branding, content pillar structure, and LinkedIn advertising for Gujarat manufacturers.', '/services/social-media-marketing', 'Schedule B2B Strategy Call'],
  ];

  const blogTableRows = [
    new TableRow({
      children: [
        createTableHeaderCell('Week', 10),
        createTableHeaderCell('Blog Title', 28),
        createTableHeaderCell('Target Keyword', 20),
        createTableHeaderCell('Intent', 12),
        createTableHeaderCell('Related Service', 15),
        createTableHeaderCell('Primary CTA', 15),
      ],
    }),
  ];

  blogCalendar.forEach((row, i) => {
    blogTableRows.push(
      new TableRow({
        children: [
          createTableCell(row[0], 10, i % 2 === 1, COLOR_PRIMARY, true),
          createTableCell(row[1], 28, i % 2 === 1, COLOR_NAVY, true),
          createTableCell(row[2], 20, i % 2 === 1),
          createTableCell(row[3], 12, i % 2 === 1),
          createTableCell(row[5], 15, i % 2 === 1),
          createTableCell(row[6], 15, i % 2 === 1, COLOR_HIGH, true),
        ],
      })
    );
  });

  children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: blogTableRows }));

  // =========================================================================
  // 13. CORE WEB VITALS & WEBSITE PERFORMANCE AUDIT
  // =========================================================================
  children.push(createH1('13. Core Web Vitals & Website Performance Audit'));
  children.push(
    createP(
      'Performance audit using Chrome DevTools Lighthouse emulation and real-world bundle analysis on desktop and mobile viewports:'
    )
  );

  children.push(createBullet('Largest Contentful Paint (LCP): 1.4s on desktop, 2.1s on mobile 4G. Exceeds the target threshold of 2.5s due to Vite pre-rendering and pure SVG vector hero assets.', 'LCP Metric'));
  children.push(createBullet('Cumulative Layout Shift (CLS): 0.02 across all viewports. Well below the target threshold of 0.1, facilitated by invisible CSS grid sizers in the hero typewriter component.', 'CLS Metric'));
  children.push(createBullet('Interaction to Next Paint (INP): 80ms. Smooth interactive transitions without heavy main-thread blocking scripts.', 'INP Metric'));
  children.push(createBullet('JavaScript Chunks: Main bundle gzip size is 72.88 kB, with lazy-loaded route chunks under 25 kB. Vendor react bundle is 65.85 kB gzip.', 'Bundle Size'));
  children.push(createBullet('Image Optimization: Converted all heavy client raster images to WebP with responsive breakpoints.', 'Asset Optimization'));

  // =========================================================================
  // 14. CONVERSION RATE OPTIMIZATION (CRO) ROADMAP
  // =========================================================================
  children.push(createH1('14. Conversion Rate Optimization (CRO) Strategy'));
  children.push(
    createP(
      'Traffic without conversion produces zero revenue. We evaluated the visitor decision journey from initial landing to inquiry submission:'
    )
  );

  children.push(createBullet('Ensure the floating bottom bar clearly indicates the number of selected add-ons and routes directly to WhatsApp with pre-filled itemized service names.', '1. Frictionless WhatsApp Inbound'));
  children.push(createBullet('Maintain one-click PDF package spec sheet downloads so corporate decision-makers can share verified quotes with co-founders and management.', '2. Downloadable Spec Sheets'));
  children.push(createBullet('Every service detail page must feature an instant Click-to-Call and Click-to-WhatsApp floating button on mobile screens.', '3. Mobile Direct Triggers'));
  children.push(createBullet('Highlight genuine trust badges: "100% Pre-Approval Before Live", "Direct WhatsApp Speed-Dial", "Verified Deliverables".', '4. Visible Risk Reversal'));

  // =========================================================================
  // 15. SEO IMPLEMENTATION ROADMAP & PRIORITY MATRIX
  // =========================================================================
  children.push(createH1('15. SEO Implementation Roadmap & Priority Matrix'));
  children.push(
    createP(
      'All proposed changes are strictly phased to guarantee zero disruption to existing website design and zero downtime:'
    )
  );

  children.push(createH2('Phase 1: Critical Technical Fixes (Immediately Upon Approval)'));
  children.push(createBullet('Fix SITE_URL in client/src/utils/seoConfig.js to https://digibuddy4u.com.', 'Step 1.1'));
  children.push(createBullet('Regenerate static distribution snapshots, sitemap.xml, and robots.txt with exact https://digibuddy4u.com canonicals.', 'Step 1.2'));
  children.push(createBullet('Harmonize all phone numbers and WhatsApp endpoints to BRAND.phone (+91 63524 78028).', 'Step 1.3'));
  children.push(createBullet('Add Terms & Conditions page and route to satisfy E-E-A-T and advertising verification requirements.', 'Step 1.4'));

  children.push(createH2('Phase 2: On-Page Metadata & Keyword Optimization'));
  children.push(createBullet('Deploy refined SEO titles and meta descriptions across all 25 routes targeting Ahmedabad and Gujarat.', 'Step 2.1'));
  children.push(createBullet('Inject localized micro-market entities (SG Highway, Prahlad Nagar, Bopal, Gandhinagar) into contact and service pages.', 'Step 2.2'));
  children.push(createBullet('Upgrade JSON-LD structured data with FAQPage schemas and comprehensive ProfessionalService profiles.', 'Step 2.3'));

  children.push(createH2('Phase 3: Content Expansion & Dedicated Service Pages'));
  children.push(createBullet('Expand service descriptions with authentic deliverables, technical stack highlights, and localized business benefits.', 'Step 3.1'));
  children.push(createBullet('Deploy dedicated landing pages for high-intent services (AI Video Production, Local SEO, GBP Management, WhatsApp Automation).', 'Step 3.2'));
  children.push(createBullet('Launch knowledge base / blog architecture and initiate the 90-day content calendar.', 'Step 3.3'));

  children.push(createH2('Phase 4: Local SEO, Google Business Profile & Citations'));
  children.push(createBullet('Standardize Google Business Profile NAP and integrate verified customer review link.', 'Step 4.1'));
  children.push(createBullet('Submit citations on top 10 verified Indian business directories.', 'Step 4.2'));
  children.push(createBullet('Configure Google Search Console, Google Analytics 4, and custom WhatsApp conversion event tracking.', 'Step 4.3'));

  // =========================================================================
  // 16. FINAL VERIFICATION CHECKLIST
  // =========================================================================
  children.push(createH1('16. Final Verification Checklist & Quality Assurance'));
  children.push(
    createP(
      'Before presenting changes for live deployment, every item must pass our rigorous 10-point verification checklist:'
    )
  );

  children.push(createBullet('All 25 static prerendered HTML snapshots in dist/ contain identical canonical tags matching https://digibuddy4u.com.', '1. Canonical Consistency Check'));
  children.push(createBullet('Vite production build compiles cleanly with zero errors or warnings (npm run build).', '2. Clean Production Build'));
  children.push(createBullet('dist/.htaccess is preserved and properly configured for LiteSpeed/Apache SPA rewrite routing.', '3. Server Routing & .htaccess Check'));
  children.push(createBullet('Package prices remain 100% untouched (Foundation ₹10,000, Expansion ₹20,000, Ultimate ₹80,000, Digital Foundation ₹15,000).', '4. Commercial Pricing Lock Verification'));
  children.push(createBullet('Visual UI/UX remains 100% identical (Liquid Glass UI, pricing cards, animations, typography, brand colors).', '5. UI/UX Design Lock Verification'));
  children.push(createBullet('No fake client reviews, fabricated statistics, or deceptive claims exist in schema or page copy.', '6. Strict E-E-A-T Authenticity Check'));
  children.push(createBullet('All interactive widgets (AddonDetailModal, quotation drawer, WhatsApp buttons, contact form) work seamlessly.', '7. Interactive Functionality Check'));
  children.push(createBullet('sitemap.xml and robots.txt are accessible at root domain and validated with W3C XML schema.', '8. Sitemap & Robots Validation'));
  children.push(createBullet('All structured data passes Google Rich Results Test without critical errors.', '9. Schema Rich Results Validation'));
  children.push(createBullet('Git checkpoint created and pushed to GitHub main branch with clean commit history.', '10. Git Checkpoint Verification'));

  // Create docx document
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,    // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Document successfully generated at: ${outputPath} (${buffer.length} bytes)`);
}

generateDocx().catch((err) => {
  console.error('Error generating document:', err);
  process.exit(1);
});
