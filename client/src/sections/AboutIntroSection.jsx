import React from 'react';
import { ArrowRight, Target, Users, Zap, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { BRAND } from '../utils/brandConstants';

export default function AboutIntroSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-y border-slate-100">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Visual Brand Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Outer Decorative Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary/20 via-cyan-accent/20 to-accent-yellow/20 blur-xl opacity-70 pointer-events-none" />

              <div className="relative rounded-3xl bg-surface-light text-navy-950 p-6 sm:p-8 lg:p-9 shadow-card-soft border border-slate-200/90 space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo.jpg"
                      alt="DigiBuddy4U"
                      className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-200 p-0.5 shadow-xs"
                    />
                    <div>
                      <div className="font-heading font-bold text-sm text-navy-950">DigiBuddy4U</div>
                      <div className="text-[10px] text-primary font-bold uppercase tracking-wider">Growth Partner</div>
                    </div>
                  </div>
                  <Badge variant="blue" size="sm">
                    Our Philosophy
                  </Badge>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy-950 leading-snug">
                  More Than an Agency.{' '}
                  <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Your Dedicated Buddy.</span>
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Traditional agencies treat clients like ticket numbers. At {BRAND.name}, we embed ourselves as your internal marketing arm—learning your products, listening to your customers, and crafting campaigns with genuine care.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-950">Strategy-First Execution</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Every post, reel, and ad is rooted in a clearly defined customer journey.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-950">Attention-First Creatives</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Engineered for social algorithms with strong 3-second hooks and aesthetic layouts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-950">Direct Access & Transparency</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        No convoluted ticketing portals. Direct WhatsApp communication and regular reviews.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Transparent Marketing</span>
                  <span className="text-primary font-bold">Zero Fake Metrics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text Story and Capabilities */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <Badge variant="blue">About DigiBuddy4U</Badge>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-navy-900 tracking-tight leading-tight">
              We Help Modern Businesses Turn Online Visibility into{' '}
              <span className="text-primary">Measurable Growth.</span>
            </h2>

            <p className="text-base sm:text-lg text-content-muted leading-relaxed">
              In today's hyper-competitive digital landscape, merely having a social media profile is not enough. You need consistent storytelling, magnetic video formats, and data-backed positioning that resonates with your ideal buyer.
            </p>

            <p className="text-sm sm:text-base text-content-muted leading-relaxed">
              Whether you are an emerging local food venture like <strong>RotiWala</strong> or a growing direct-to-consumer brand, we eliminate the guesswork from digital marketing. From setting up cohesive brand visuals to managing daily publishing schedules, we ensure your brand remains top-of-mind.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-medium text-navy-900">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Custom Content Calendars</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-navy-900">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Professional Reel Editing</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-navy-900">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Pre-Approval Workflow</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-navy-900">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Targeted Ad Campaigns</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button to="/about" variant="primary" size="md" icon={ArrowRight}>
                Discover Our Story & Values
              </Button>
              <Button to="/contact" variant="secondary" size="md">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
