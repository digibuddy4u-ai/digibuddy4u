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
  Zap,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import FAQAccordion from '../components/ui/FAQAccordion';
import { PRICING_PACKAGES, ADDITIONAL_PRICING_PACKAGES } from '../utils/pricingData';
import { FAQ_DATA } from '../utils/faqData';
import { BRAND } from '../utils/brandConstants';

const CHIP_ICONS = {
  Video,
  Layers,
  Globe,
  Compass,
  Camera,
  TrendingUp,
  CheckCircle2,
  Zap,
};

export default function PricingPage() {
  const [expandedNotice, setExpandedNotice] = useState(false);

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
          {/* 1. Main 4 Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 xl:gap-6 items-stretch">
            {PRICING_PACKAGES.map((pkg, idx) => {
              const isGrowth = pkg.recommended || pkg.badge === 'Most Popular' || idx === 2;
              const isPremium = pkg.isPremium || pkg.badge === 'Premium' || idx === 3;
              const isSetup = pkg.billingType === 'One-Time' || idx === 1;
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
                      ) : isSetup ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 border border-cyan-200 px-2.5 py-1 rounded-lg">
                            Business Setup
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            One-Time
                          </span>
                        </div>
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

                    {/* 🌟 KEY DELIVERABLES / KHAS HIGHLIGHTS (Visual Chips) */}
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
                                  : isSetup
                                  ? 'bg-cyan-50/80 border border-cyan-200/60 text-navy-950'
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
                      <ul className="space-y-1.5 text-xs text-content-dark">
                        {pkg.features.map((feature, idx) => {
                          if (feature.toLowerCase().includes('note:')) return null;

                          return (
                            <li key={idx} className="flex items-start gap-2">
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  isGrowth
                                    ? 'bg-primary text-white'
                                    : isPremium
                                    ? 'bg-navy-900 text-cyan-accent'
                                    : 'bg-primary/10 text-primary'
                                }`}
                              >
                                <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                              </div>
                              <span className="leading-snug">{feature}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Setup Note */}
                    {isSetup && (
                      <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>
                          <strong>One-Time Setup:</strong> Ready-to-use business foundation.
                        </span>
                      </div>
                    )}

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
                      variant={isGrowth ? 'yellow' : isPremium ? 'primary' : 'primary'}
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

          {/* ======================================================== */}
          {/* 2. TWO ADDITIONAL SERVICE PACKAGES */}
          {/* ======================================================== */}
          <div className="mt-14 sm:mt-18 pt-12 sm:pt-16 border-t border-slate-200/80">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
                <span>Specialized Additional Services</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-navy-950 tracking-tight">
                Targeted Service Packages
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Need standalone video editing or professional platform setup without an ongoing monthly retainer? Choose from our specialized execution packages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
              {ADDITIONAL_PRICING_PACKAGES.map((pkg) => {
                const isOneTime = pkg.billingType === 'One-Time';
                const chips = pkg.chips || [];

                return (
                  <div
                    key={pkg.id}
                    className="rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:border-primary/40"
                  >
                    <div className="space-y-4">
                      {/* Top Label */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                          {pkg.badge}
                        </span>
                        {isOneTime && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            One-Time
                          </span>
                        )}
                      </div>

                      {/* Title & Price */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold font-heading text-navy-950 leading-tight">
                          {pkg.name}
                        </h3>

                        <div className="mt-2 pb-3 border-b border-slate-100">
                          <div className="text-2xl sm:text-3xl font-heading font-black text-navy-900">
                            {pkg.monthlyPrice}
                          </div>
                          <span className="text-[11px] text-content-muted block mt-0.5 font-medium">
                            {pkg.commitment}
                          </span>
                        </div>

                        <p className="mt-2.5 text-xs text-content-muted leading-relaxed min-h-[44px]">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Highlights Chips */}
                      <div className="pt-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Key Highlights:
                        </span>
                        <div className="grid grid-cols-1 gap-1.5">
                          {chips.map((chip, cIdx) => {
                            const IconComponent = CHIP_ICONS[chip.icon] || CheckCircle2;
                            return (
                              <div
                                key={cIdx}
                                className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold bg-surface-light border border-slate-200/80 text-navy-950"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
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

                      {/* What's Included List */}
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-navy-900 block font-mono">
                          What's Included:
                        </span>
                        <ul className="space-y-1.5 text-xs text-content-dark">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                              </div>
                              <span className="leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <Button
                        to={pkg.ctaLink}
                        variant="primary"
                        size="md"
                        className="w-full justify-center shadow-sm font-bold text-xs sm:text-sm"
                        icon={ArrowRight}
                      >
                        {pkg.ctaText || 'Enquire Now'}
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
