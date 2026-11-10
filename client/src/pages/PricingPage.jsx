import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  ArrowRight,
  HelpCircle,
  PhoneCall,
  Crown,
  AlertCircle,
  Info,
  Video,
  Layers,
  Globe,
  Compass,
  Camera,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Zap,
  MessageCircle,
  Film,
  Search,
  Target,
  MapPin,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import FAQAccordion from '../components/ui/FAQAccordion';
import { PRICING_PACKAGES } from '../utils/pricingData';
import { FAQ_DATA } from '../utils/faqData';
import { BRAND } from '../utils/brandConstants';
import { getDeliverableIcon } from '../utils/featureIconHelper';

const CHIP_ICONS = {
  Video,
  Film,
  Layers,
  Globe,
  Compass,
  Camera,
  TrendingUp,
  CheckCircle2,
  Zap,
  Search,
  Target,
  MapPin,
};

export default function PricingPage() {
  const [expandedNotice, setExpandedNotice] = useState(false);

  // ₹15,000 One-Time Setup Package (Featured horizontally at the top)
  const setupPkg =
    PRICING_PACKAGES.find((p) => p.billingType === 'One-Time' || p.id === 'startup-setup') ||
    PRICING_PACKAGES[1];

  // 3 Retainer & Campaign Packages (Displayed in a 3-column grid below)
  const retainerPackages = PRICING_PACKAGES.filter(
    (p) => p.id !== setupPkg?.id && p.billingType !== 'One-Time'
  );

  return (
    <>
      <SEO
        title="Pricing & Packages — DigiBuddy4U Digital Marketing & Growth"
        description="Transparent digital marketing and social media packages tailored for startups, expanding brands, and omnichannel growth."
      />

      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-12 sm:py-16 lg:py-18 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="site-container relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Predictable Investment.{' '}
            <span className="text-cyan-accent">Dedicated Execution.</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            No surprise add-ons. No hidden retainers. Choose from our specialized packages tailored for your specific business stage.
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-surface-light">
        <div className="site-container">
          {/* ======================================================== */}
          {/* 1. HORIZONTAL FEATURED CARD: Digital Launch Kit (₹15,000 One-Time Setup) */}
          {/* ======================================================== */}
          {setupPkg && (
            <div className="w-full rounded-3xl bg-gradient-to-br from-white via-cyan-50/40 to-blue-50/50 border-2 border-cyan-300 shadow-xl shadow-cyan-900/5 relative p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16">
              {/* Ambient Lighting */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              {/* Floating Top Pill */}
              <div className="absolute -top-3.5 left-6 sm:left-10 z-20">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-cyan-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-accent-yellow fill-current" />
                  Special Foundation Setup • One-Time Investment
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch relative z-10">
                {/* Left Column: Title, Price, Description & Chips */}
                <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-between pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-6 lg:pb-0">
                  <div className="space-y-4">
                    {/* Top Bar Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 border border-cyan-200 px-2.5 py-1 rounded-lg">
                        Business Setup
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        One-Time
                      </span>
                    </div>

                    {/* Title & Price */}
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950 tracking-tight leading-tight">
                        {setupPkg.name}
                      </h2>

                      <div className="mt-2.5 pb-3 border-b border-slate-200/80">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-3xl sm:text-4xl font-heading font-black text-navy-950 tracking-tight">
                            {setupPkg.monthlyPrice}
                          </span>
                        </div>
                        <span className="text-xs text-content-muted block mt-1 font-medium">
                          {setupPkg.commitment}
                        </span>
                      </div>

                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {setupPkg.description}
                      </p>
                    </div>

                    {/* Visual Highlight Chips */}
                    <div className="pt-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Core Pillars Included:
                      </span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {(setupPkg.chips || []).map((chip, cIdx) => {
                          const IconComponent = CHIP_ICONS[chip.icon] || CheckCircle2;
                          return (
                            <div
                              key={cIdx}
                              className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold bg-white/90 border border-cyan-200/80 text-navy-950 shadow-xs"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-6 h-6 rounded-lg bg-cyan-600/10 text-cyan-700 flex items-center justify-center flex-shrink-0">
                                  <IconComponent className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-heading font-bold text-xs truncate">
                                  {chip.label}
                                </span>
                              </div>
                              <span className="text-[10px] font-medium text-slate-500 flex-shrink-0">
                                {chip.desc}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Column: Included Scope Checklist */}
                <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-between py-2 lg:py-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-navy-950 block">
                        Everything Included In This Setup:
                      </span>
                      <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-100/60 px-2.5 py-0.5 rounded-full">
                        Full Business Setup
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5 text-xs text-slate-700">
                      {(setupPkg.features || []).map((highlight, hIdx) => {
                        if (highlight.toLowerCase().includes('note:')) return null;
                        const { icon: ItemIcon, badgeClass } = getDeliverableIcon(highlight);

                        return (
                          <div key={hIdx} className="flex items-center gap-2.5 bg-white/90 p-2.5 rounded-xl border border-slate-200/80 shadow-xs hover:border-cyan-300 transition-colors">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${badgeClass}`}>
                              <ItemIcon className="w-3.5 h-3.5" />
                            </div>
                            <span className="leading-snug font-semibold text-slate-800">{highlight}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Highlight Reassurance Pill */}
                  <div className="mt-4 p-3 rounded-2xl bg-cyan-100/60 border border-cyan-200 text-xs text-cyan-950 flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-cyan-700 flex-shrink-0" />
                    <span>
                      <strong>Ready-to-Use Business Foundation:</strong> Complete website, Google Business Profile, WhatsApp setup, Instagram & Facebook setup, and directed model ad shoot.
                    </span>
                  </div>
                </div>

                {/* Right Column: Pricing & Action Buttons */}
                <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-center gap-3 pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-6 lg:pt-0">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3.5 text-center">
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>One-Time Investment</span>
                    </div>

                    <div className="pt-1">
                      <span className="text-3xl sm:text-4xl font-heading font-black text-navy-950">₹15,000</span>
                      <span className="text-xs font-bold text-slate-500 block mt-0.5">/ One-Time Setup</span>
                    </div>

                    <Button
                      to={setupPkg.ctaLink || '/packages/startup-setup'}
                      variant="primary"
                      size="md"
                      className="w-full justify-center font-heading font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
                      icon={ArrowRight}
                    >
                      Choose Plan / Enquire
                    </Button>

                    <Button
                      to={setupPkg.ctaLink || '/packages/startup-setup'}
                      variant="outline"
                      size="sm"
                      className="w-full justify-center text-xs font-bold"
                    >
                      View Full Scope
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium text-center">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Instant WhatsApp assistance available</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. THREE ONGOING & CAMPAIGN PACKAGES (3-Column Grid) */}
          {/* ======================================================== */}
          <div className="mt-8 sm:mt-12">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
                <span>Ongoing Marketing & Growth Retainers</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950 tracking-tight">
                Monthly Retainers & Brand Campaigns
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Build lasting organic presence, viral reels consistency, and high-ROAS Meta advertising campaigns with our dedicated growth tiers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 xl:gap-8 w-full items-stretch">
              {retainerPackages.map((pkg, idx) => {
                const isGrowth = pkg.recommended || pkg.badge === 'Most Popular';
                const isPremium = pkg.isPremium || pkg.badge === 'Premium';
                const chips = pkg.chips || [];

                return (
                  <div
                    key={pkg.id}
                    className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                      isGrowth
                        ? 'bg-white border-2 border-primary shadow-xl ring-4 ring-primary/10 lg:-translate-y-2.5 z-10'
                        : isPremium
                        ? 'bg-gradient-to-b from-white via-slate-50/70 to-white border-2 border-navy-900 shadow-xl ring-4 ring-navy-900/10 lg:-translate-y-2.5 z-10'
                        : 'bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover'
                    }`}
                  >
                    {/* Floating Top Ribbon */}
                    {isGrowth && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-accent-yellow text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md">
                          <Sparkles className="w-3.5 h-3.5 fill-current text-navy-950" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    {isPremium && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-navy-950 text-cyan-accent border border-cyan-accent/30 font-bold text-xs uppercase tracking-wider shadow-md">
                          <Crown className="w-3.5 h-3.5 text-accent-yellow" />
                          Premium Campaign
                        </span>
                      </div>
                    )}

                    <div>
                      {/* Top Tag & Short Label */}
                      <div className="flex items-center justify-between mb-3">
                        {isGrowth ? (
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                            Social Growth Retainer
                          </span>
                        ) : isPremium ? (
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-navy-950 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                            Omnichannel Scale
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                            Starter Plan
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy-950 leading-tight min-h-[54px] flex items-center">
                        {pkg.name}
                      </h2>

                      {/* Price and Billing */}
                      <div className="mt-2 pb-3 border-b border-slate-100">
                        <div className="text-2xl sm:text-3xl font-heading font-black text-navy-900">
                          {pkg.monthlyPrice}
                        </div>
                        <span className="text-[11px] text-content-muted block mt-0.5 font-medium">
                          {pkg.commitment}
                        </span>
                      </div>

                      <p className="mt-2.5 text-xs text-content-muted leading-relaxed min-h-[48px]">
                        {pkg.description}
                      </p>

                      {/* Visual Chips */}
                      <div className="pt-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Key Highlights:
                        </span>
                        <div className="grid grid-cols-1 gap-1.5">
                          {chips.map((chip, cIdx) => {
                            const IconComponent = CHIP_ICONS[chip.icon] || CheckCircle2;
                            return (
                              <div
                                key={cIdx}
                                className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold ${
                                  isGrowth
                                    ? 'bg-primary/5 border border-primary/20 text-navy-950'
                                    : isPremium
                                    ? 'bg-navy-950/5 border border-navy-950/15 text-navy-950'
                                    : 'bg-slate-50 border border-slate-200/80 text-navy-950'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <div
                                    className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                      isGrowth
                                        ? 'bg-primary text-white'
                                        : isPremium
                                        ? 'bg-navy-900 text-cyan-accent'
                                        : 'bg-primary/10 text-primary'
                                    }`}
                                  >
                                    <IconComponent className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="font-heading font-bold text-xs truncate">
                                    {chip.label}
                                  </span>
                                </div>
                                <span className="text-[10px] font-medium text-slate-500 flex-shrink-0">
                                  {chip.desc}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Included List */}
                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-navy-900 block font-mono">
                          Included in this Package:
                        </span>
                        <ul className="space-y-2 text-xs text-content-dark">
                          {pkg.features.map((feature, fIdx) => {
                            if (feature.toLowerCase().includes('note:')) return null;
                            const { icon: ItemIcon, badgeClass } = getDeliverableIcon(feature);

                            return (
                              <li key={fIdx} className="flex items-center gap-2.5">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${badgeClass}`}>
                                  <ItemIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="leading-snug font-medium text-slate-700">{feature}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Additional Expenses Note for Premium */}
                      {isPremium && (
                        <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1 text-slate-600">
                          <div
                            onClick={() => setExpandedNotice(!expandedNotice)}
                            className="flex items-center justify-between font-bold text-navy-950 cursor-pointer"
                          >
                            <div className="flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                              <span>Additional Expenses:</span>
                            </div>
                            <span className="text-[10px] text-primary hover:underline">
                              {expandedNotice ? 'Hide' : 'View (6)'}
                            </span>
                          </div>
                          {expandedNotice ? (
                            <div className="pt-1.5 border-t border-slate-200 space-y-1">
                              <p className="text-[10px] text-slate-500 leading-tight">
                                Charged separately wherever applicable:
                              </p>
                              <ul className="list-disc list-inside text-[10px] text-slate-600 space-y-0.5">
                                <li>Influencer Collaboration Fees</li>
                                <li>Model Fees / Booking Charges</li>
                                <li>Meta Ads Budget / Ad Spend</li>
                                <li>Travel & Transportation Expenses</li>
                                <li>Location / Studio Rental Charges</li>
                                <li>Props, Costumes & Extra Production</li>
                              </ul>
                            </div>
                          ) : (
                            <p className="text-[10px] text-slate-500 truncate">
                              Influencer, model & ads budget charged at actuals.
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <Button
                        to={pkg.ctaLink}
                        variant={isGrowth ? 'yellow' : 'primary'}
                        size="md"
                        className={`w-full justify-center shadow-sm font-bold text-xs sm:text-sm ${
                          isPremium ? 'bg-navy-950 hover:bg-navy-900 text-white' : ''
                        }`}
                        icon={ArrowRight}
                      >
                        {pkg.ctaText || 'Get Started'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Advisory Card */}
          <div className="mt-16 p-8 rounded-3xl bg-navy-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-navy-800">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase font-bold text-accent-yellow tracking-wider">
                Tailored Engagements
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Have Unique Requirements or Ad Spend Targets?
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                We design custom contracts for multi-city brands, specific product launches, and high-budget performance campaigns.
              </p>
            </div>
            <Button to="/contact" variant="yellow" size="lg" className="flex-shrink-0 font-bold">
              Request Custom Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing FAQ Section */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
        <div className="site-container max-w-4xl xl:max-w-5xl space-y-10">
          <SectionHeader
            badge="Pricing FAQ"
            title="Common Questions About"
            titleHighlight="Our Pricing & Billing"
            description="Clear details on payments, revisions, and contract terms."
            align="center"
          />
          <FAQAccordion items={FAQ_DATA.slice(3)} />
        </div>
      </section>
    </>
  );
}
