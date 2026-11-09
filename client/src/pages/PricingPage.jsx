import React from 'react';
import { Check, Sparkles, ArrowRight, HelpCircle, PhoneCall, Crown, AlertCircle, Info } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import FAQAccordion from '../components/ui/FAQAccordion';
import { PRICING_PACKAGES } from '../utils/pricingData';
import { FAQ_DATA } from '../utils/faqData';
import { BRAND } from '../utils/brandConstants';

export default function PricingPage() {
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
            No surprise add-ons. No hidden retainers. Choose from our 4 specialized packages tailored for your specific business stage.
          </p>
        </div>
      </section>

      {/* 4 Packages Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-surface-light">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 xl:gap-6 items-stretch">
            {PRICING_PACKAGES.map((pkg) => {
              const isGrowth = pkg.recommended || pkg.badge === 'Most Popular';
              const isPremium = pkg.isPremium || pkg.badge === 'Premium';
              const isSetup = pkg.billingType === 'One-Time';

              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                    isGrowth
                      ? 'bg-white border-2 border-primary shadow-xl ring-4 ring-primary/10 lg:-translate-y-2'
                      : isPremium
                      ? 'bg-gradient-to-b from-white via-slate-50/70 to-white border-2 border-navy-900 shadow-xl ring-4 ring-navy-900/10 lg:-translate-y-2'
                      : 'bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover'
                  }`}
                >
                  {/* Prominent Badges */}
                  {isGrowth && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-yellow text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md">
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  {isPremium && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-navy-950 text-cyan-accent border border-cyan-accent/30 font-bold text-xs uppercase tracking-wider shadow-md">
                        <Crown className="w-3.5 h-3.5 text-accent-yellow" />
                        Premium
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Top Tag & Short Label */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-content-muted">
                        {pkg.shortName || pkg.name}
                      </span>
                      <Badge
                        variant={isGrowth ? 'yellow' : isPremium ? 'blue' : isSetup ? 'blue' : 'slate'}
                        size="sm"
                      >
                        {pkg.badge}
                      </Badge>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy-950 leading-tight min-h-[56px] flex items-center">
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

                    <p className="mt-3 text-xs sm:text-sm text-content-muted leading-relaxed min-h-[50px]">
                      {pkg.description}
                    </p>

                    {/* Included List */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-navy-900 block font-mono">
                        Included in this Package:
                      </span>
                      <ul className="space-y-2 text-xs sm:text-[13px] text-content-dark">
                        {pkg.features.map((feature, idx) => {
                          const isNote = feature.toLowerCase().includes('note:') || feature.toLowerCase().includes('one-time setup');
                          return (
                            <li
                              key={idx}
                              className={`flex items-start gap-2 ${
                                isNote
                                  ? 'p-1.5 rounded-lg bg-amber-50/80 border border-amber-200/80 text-amber-900 font-semibold text-[11px]'
                                  : ''
                              }`}
                            >
                              {!isNote ? (
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
                              ) : (
                                <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                              )}
                              <span className="leading-snug">{feature}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Additional Expenses Note for Premium */}
                    {isPremium && (
                      <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] space-y-1.5 text-slate-600">
                        <div className="flex items-center gap-1.5 font-bold text-navy-950">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span>Additional Expenses Notice:</span>
                        </div>
                        <p className="text-[10px] leading-relaxed text-slate-500">
                          The following expenses are not included in the ₹80,000 package price and will be charged separately wherever applicable:
                        </p>
                        <ul className="list-disc list-inside text-[10px] text-slate-600 space-y-0.5 pl-1">
                          <li>Influencer Collaboration Fees</li>
                          <li>Model Fees / Booking Charges</li>
                          <li>Meta Ads Budget / Ad Spend</li>
                          <li>Travel & Transportation Expenses</li>
                          <li>Location / Studio Rental Charges</li>
                          <li>Props, Costumes & Extra Requirements</li>
                        </ul>
                      </div>
                    )}

                    {/* Setup Note */}
                    {isSetup && (
                      <div className="mt-3 p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-900 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Note:</strong> This is a one-time setup package, not a monthly subscription.
                        </span>
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
