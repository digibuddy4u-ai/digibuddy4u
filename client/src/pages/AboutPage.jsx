import React from 'react';
import { Target, Compass, Award, Users, CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { BRAND } from '../utils/brandConstants';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about DigiBuddy4U's mission to empower ambitious brands through honest digital marketing, creative video storytelling, and strategic partnership."
      />

      {/* Hero Header */}
      <section className="bg-white text-navy-950 py-12 sm:py-16 lg:py-20 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="site-container relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-navy-950">
            We Are Driven by One Mission:{' '}
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Your Brand's Digital Growth.</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            DigiBuddy4U was born out of a simple frustration: brands were tired of bloated agencies that promised the moon, delivered generic templates, and hid behind vanity numbers. We built a dedicated, agile partner model.
          </p>
        </div>
      </section>

      {/* The DigiBuddy Story */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-navy-900 leading-snug">
                Why We Call Ourselves Your <span className="text-primary">"Buddy"</span>
              </h2>
              <p className="text-base text-content-muted leading-relaxed">
                In digital marketing, a vendor simply checks boxes on a contract. A <strong>Buddy</strong> stands beside you in the trenches—understanding your profit margins, tasting your recipes (like we do with client projects like RotiWala), knowing your customer's objections, and celebrating every real inquiry your business receives.
              </p>
              <p className="text-base text-content-muted leading-relaxed">
                We combine deep technical mastery of social media algorithms and ad platforms with high-production creative storytelling. Whether crafting viral reel scripts, designing sleek carousel posts, or managing community queries, we treat your brand with the same care as our own.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm font-semibold text-navy-900">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>No junior handoffs: direct access to senior creative strategists</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-navy-900">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>100% pre-approval policy on all content before publication</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-navy-900">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Transparent performance reporting with zero fabricated metrics</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-surface-light border border-slate-200/90 p-8 sm:p-10 shadow-card-soft space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo.jpg"
                      alt="DigiBuddy4U"
                      className="w-12 h-12 rounded-2xl object-contain shadow-xs border border-slate-200 bg-white p-1"
                    />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-navy-900 leading-tight">
                        What Guides Our Team
                      </h3>
                      <p className="text-xs text-content-muted">DigiBuddy4U Working Code</p>
                    </div>
                  </div>
                  <Badge variant="blue" size="sm">
                    Agency Standard
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <Target className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-bold text-navy-900 text-sm">Outcome Oriented</h4>
                    <p className="text-xs text-content-muted mt-1 leading-relaxed">
                      Every campaign is structured around commercial objectives, not vanity metrics.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <Compass className="w-8 h-8 text-cyan-hover mb-3" />
                    <h4 className="font-bold text-navy-900 text-sm">Strategic Clarity</h4>
                    <p className="text-xs text-content-muted mt-1 leading-relaxed">
                      We never post randomly; every piece aligns with structured content pillars.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <ShieldCheck className="w-8 h-8 text-emerald-600 mb-3" />
                    <h4 className="font-bold text-navy-900 text-sm">Total Honesty</h4>
                    <p className="text-xs text-content-muted mt-1 leading-relaxed">
                      We tell you the truth about algorithm shifts, budget sizing, and real timelines.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <HeartHandshake className="w-8 h-8 text-amber-500 mb-3" />
                    <h4 className="font-bold text-navy-900 text-sm">Empathetic Care</h4>
                    <p className="text-xs text-content-muted mt-1 leading-relaxed">
                      Prompt, courteous communication via WhatsApp and direct email channels.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-light border border-slate-200/90 text-navy-950 flex items-center justify-between shadow-xs">
                  <div className="space-y-0.5">
                    <div className="text-xs text-slate-500 font-medium">Headquarters</div>
                    <div className="text-sm font-bold text-navy-950">Serving Growing Brands Across India</div>
                  </div>
                  <Badge variant="blue" size="sm">
                    Active
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values Banner */}
      <section className="py-12 sm:py-16 bg-surface-light border-t border-slate-100">
        <div className="site-container max-w-5xl text-center space-y-6">
          <SectionHeader
            badge="The DigiBuddy Guarantee"
            title="Integrity & Excellence in"
            titleHighlight="Every Single Deliverable"
            description="We stand by our work. Our clients enjoy predictability, prompt turnarounds, and creative assets they are genuinely proud to put their name on."
            align="center"
          />

          <div className="pt-2 flex justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" icon={ArrowRight}>
              Partner With DigiBuddy4U
            </Button>
            <Button to="/portfolio" variant="secondary" size="lg">
              Explore Our Portfolio
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
