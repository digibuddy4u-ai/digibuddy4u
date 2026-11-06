import React from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../sections/HeroSection';
import PlatformsTechnologiesSection from '../sections/PlatformsTechnologiesSection';
import ServicesOverviewSection from '../sections/ServicesOverviewSection';
import WhyAgencySection from '../sections/WhyAgencySection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import FeaturedPortfolioSection from '../sections/FeaturedPortfolioSection';
import PricingPreviewSection from '../sections/PricingPreviewSection';
import AddonsSection from '../components/addons/AddonsSection';
import WorkProcessSection from '../sections/WorkProcessSection';
import FAQSection from '../sections/FAQSection';
import FinalCTASection from '../sections/FinalCTASection';
import { BRAND } from '../utils/brandConstants';

export default function HomePage() {
  return (
    <>
      <SEO
        title="We Build Brands. We Create Digital Experiences. We Drive Growth."
        description="From social media and performance marketing to websites, mobile apps, and custom software — DigiBuddy4U helps businesses build a stronger digital presence."
      />

      {/* 1. Hero Section (with Vector Reel Card, Typewriter Headline & Tilted Ribbon) */}
      <HeroSection />

      {/* 2. Our Core Services — Digital Marketing and IT Services (Stacking Cards) */}
      <ServicesOverviewSection />

      {/* 3. Platforms & Technologies Marquee Showcase (Digital Marketing & IT) */}
      <PlatformsTechnologiesSection />

      {/* 4. Why Every Business Needs A Creative & Digital Agency (Strategic Perspective) */}
      <WhyAgencySection />

      {/* 5. Why DigiBuddy4U — Genuine service benefits without fabricated statistics */}
      <WhyChooseUsSection />

      {/* 6. Featured Work — Real client showcase (RotiWala) */}
      <FeaturedPortfolioSection />

      {/* 7. Social Media Management Packages — Basic, Growth, Premium */}
      <PricingPreviewSection />

      {/* 7b. Add-Ons & Extra Services — A La Carte On-Demand Capabilities */}
      <AddonsSection />

      {/* 8. How We Work — Discover, Plan, Create, Optimize */}
      <WorkProcessSection />

      {/* 9. FAQ Section */}
      <FAQSection />

      {/* 10. Final Contact CTA */}
      <FinalCTASection />
    </>
  );
}
