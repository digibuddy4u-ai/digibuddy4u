import React from 'react';
import { Search, Compass, Palette, Rocket, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';

const STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Discover',
    subtitle: 'Discovery & Audit',
    description:
      'We analyze your current digital presence, competitor landscape, target audience pain points, and technical or conversion bottlenecks.',
    deliverable: 'Comprehensive audit & strategic gap analysis',
  },
  {
    step: '02',
    icon: Compass,
    title: 'Plan',
    subtitle: 'Strategy & Architecture',
    description:
      'We formulate data-driven content pillars, video shoot shot-lists, advertising funnels, or web/software engineering specifications.',
    deliverable: 'Monthly roadmap & execution sprint plan',
  },
  {
    step: '03',
    icon: Palette,
    title: 'Create',
    subtitle: 'Production & Engineering',
    description:
      'Our team shoots and edits dynamic vertical reels, designs brand collateral, and writes clean code, submitting all assets for your pre-approval.',
    deliverable: 'Batched creatives & software builds ready for review',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Optimize',
    subtitle: 'Launch, Measure & Iterate',
    description:
      'We publish, monitor ad spend, track Core Web Vitals, manage community interactions, and refine campaigns based on real-world data.',
    deliverable: 'Transparent reporting & continuous growth iteration',
  },
];

export default function WorkProcessSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white text-navy-950 relative overflow-hidden border-t border-slate-100">
      {/* Subtle Glow Accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative site-container">
        <SectionHeader
          badge="How We Work"
          badgeVariant="blue"
          title="A Structured 4-Step"
          titleHighlight="Execution Roadmap"
          description="From initial brand discovery to performance tuning, our disciplined process balances creative intuition with pre-approval and transparent tracking."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-6 xl:gap-8 mt-8 sm:mt-10">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative rounded-2xl bg-surface-light border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 group hover:-translate-y-1 shadow-card-soft"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black font-heading text-slate-200 group-hover:text-primary/20 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      Step {item.step}
                    </div>
                    <h3 className="text-xl font-bold font-heading text-navy-950 group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <span>{item.title}</span>
                      <span className="text-xs font-normal text-slate-500">({item.subtitle})</span>
                    </h3>
                  </div>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-navy-900 block">
                    Deliverable
                  </span>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{item.deliverable}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Button
            to="/contact"
            variant="yellow"
            size="lg"
            icon={ArrowRight}
          >
            Start Your Growth Journey With Us
          </Button>
        </div>
      </div>
    </section>
  );
}
