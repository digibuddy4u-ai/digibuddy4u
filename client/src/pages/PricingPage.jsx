import React from 'react';
import { Check, Sparkles, ArrowRight, HelpCircle, PhoneCall } from 'lucide-react';
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
        title="Pricing & Packages — Transparent Digital Marketing"
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
            No surprise add-ons. No hidden retainers. Choose the plan that fits your current ambitions, or let us craft a customized package for your specific goals.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 sm:py-16 lg:py-20 bg-surface-light">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PRICING_PACKAGES.map((pkg) => {
              const isFeatured = pkg.recommended;
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                    isFeatured
                      ? 'bg-white border-2 border-primary shadow-xl ring-4 ring-primary/10 -translate-y-2'
                      : 'bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover'
                  }`}
                >
                  {isFeatured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-yellow text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md">
                        <Sparkles className="w-3.5 h-3.5" />
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-content-muted">
                        {pkg.name}
                      </span>
                      {!isFeatured && (
                        <Badge variant="slate" size="sm">
                          {pkg.badge}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold font-heading text-navy-900">
                      {pkg.monthlyPrice}
                    </h3>

                    <p className="mt-3 text-sm text-content-muted leading-relaxed min-h-[48px]">
                      {pkg.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-3.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-navy-900 block">
                        Included in this Package:
                      </span>
                      <ul className="space-y-3 text-sm text-content-dark">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isFeatured ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <Button
                      to={pkg.ctaLink}
                      variant={isFeatured ? 'yellow' : 'primary'}
                      size="md"
                      className="w-full justify-center shadow-sm"
                      icon={ArrowRight}
                    >
                      {pkg.ctaText}
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
            <Button to="/contact" variant="yellow" size="lg" className="flex-shrink-0">
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
