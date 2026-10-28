import React from 'react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import Badge from '../components/common/Badge';
import { BRAND } from '../utils/brandConstants';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="DigiBuddy4U's Privacy Policy explaining our data handling, client confidentiality, and communication practices."
      />

      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-12 sm:py-16">
        <div className="site-container max-w-4xl text-center">
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Last Updated: October 2026. Your privacy and brand confidentiality are paramount.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="site-container max-w-4xl space-y-8 text-content-dark text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900 mb-3">
              1. Introduction
            </h2>
            <p className="text-content-muted">
              At <strong>{BRAND.name}</strong> ("we", "our", or "us"), accessible via our website, we are committed to safeguarding the privacy and security of visitors, prospective clients, and partners. This Privacy Policy details the types of information we collect, how it is used, and the steps we take to protect your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900 mb-3">
              2. Information We Collect
            </h2>
            <p className="text-content-muted mb-2">
              We collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-content-muted">
              <li>Submit a project inquiry through our contact or consultation form (such as your name, business email, contact phone number, brand handle, and project requirements).</li>
              <li>Communicate with our team via WhatsApp, phone, or email.</li>
              <li>Request a digital audit or proposal.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900 mb-3">
              3. How We Use Your Information
            </h2>
            <p className="text-content-muted mb-2">
              The information we collect is strictly utilized for legitimate business purposes, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-content-muted">
              <li>Reviewing your business needs and formulating relevant digital marketing proposals.</li>
              <li>Responding directly to your inquiries and scheduling strategic consultations.</li>
              <li>Providing transparent campaign management and project delivery.</li>
              <li>Maintaining client records and billing accuracy.</li>
            </ul>
            <p className="text-content-muted mt-3">
              <strong>We do not sell, rent, or trade your personal or brand information to third-party data brokers or advertisers.</strong>
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900 mb-3">
              4. Client Confidentiality & Asset Protection
            </h2>
            <p className="text-content-muted">
              Any proprietary client materials, unpublished brand graphics, video footage, customer lists, or ad spend account credentials shared with {BRAND.name} are treated with strict confidentiality. Creative assets are used solely for the agreed-upon marketing campaigns and are never reused for competitors.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900 mb-3">
              5. Third-Party Platforms
            </h2>
            <p className="text-content-muted">
              Our website provides links to external services such as WhatsApp (Meta Platforms) and social channels. Please review their respective privacy policies when engaging with third-party applications.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy-900 mb-3">
              6. Contacting Our Data Officer
            </h2>
            <p className="text-content-muted">
              If you have any questions regarding this Privacy Policy or wish to request the deletion or correction of your inquiry details, please contact us at:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-surface-light border border-slate-200 text-sm space-y-1">
              <div><strong>Brand:</strong> {BRAND.name}</div>
              <div><strong>Email:</strong> <a href={`mailto:${BRAND.email}`} className="text-primary hover:underline">{BRAND.email}</a></div>
              <div><strong>Phone:</strong> <a href={`tel:${BRAND.phone}`} className="text-primary hover:underline">{BRAND.phone}</a></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
