import React from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../sections/HeroSection';
import PlatformsTechnologiesSection from '../sections/PlatformsTechnologiesSection';
import ClientsSection from '../sections/ClientsSection';
import ServicesOverviewSection from '../sections/ServicesOverviewSection';
import WhyAgencySection from '../sections/WhyAgencySection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import PricingPreviewSection from '../sections/PricingPreviewSection';
import AddonsSection from '../components/addons/AddonsSection';
import WorkProcessSection from '../sections/WorkProcessSection';
import FAQSection from '../sections/FAQSection';
import FinalCTASection from '../sections/FinalCTASection';
import {
  getOrganizationSchema,
  getProfessionalServiceSchema,
  getWebSiteSchema,
} from '../utils/seoConfig';

export default function HomePage() {
  return (
    <>
      <SEO
        title="DigiBuddy4U | Digital Marketing Agency in Ahmedabad"
        description="DigiBuddy4U is a digital marketing agency in Ahmedabad offering social media management, Meta ads, video reels production, SEO services & website development."
        keywords="Digital Marketing Agency in Ahmedabad, Digital Marketing Services in Ahmedabad, Social Media Marketing Agency Ahmedabad, Website Development Company Ahmedabad, SEO Services in Ahmedabad, Meta Ads Agency Ahmedabad"
        canonical="/"
        schema={[
          getOrganizationSchema(),
          getProfessionalServiceSchema(),
          getWebSiteSchema(),
        ]}
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

      {/* 6. Brands We've Worked With — Animated Horizontal Scrolling Carousel */}
      <ClientsSection />

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
