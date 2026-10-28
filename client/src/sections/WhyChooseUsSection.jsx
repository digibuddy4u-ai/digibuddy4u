import React from 'react';
import {
  Layers,
  UserCheck,
  ClipboardCheck,
  BarChart3,
  Clapperboard,
  Code2,
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';

const ADVANTAGES = [
  {
    number: '01',
    icon: Layers,
    title: 'Marketing & Technology Under One Roof',
    tag: 'Unified Team',
    description:
      'Avoid the friction of coordinating separate design freelancers and web agencies. Our creative directors and developers collaborate in-house to keep your brand storytelling, ad funnels, and websites working as a unified engine.',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'Direct Client Communication',
    tag: 'Dedicated Buddy',
    description:
      'Enjoy fast, direct answers via WhatsApp and phone from a dedicated manager who knows your brand—without waiting in anonymous ticketing queues or dealing with automated bots.',
  },
  {
    number: '03',
    icon: ClipboardCheck,
    title: 'Client Approval Before Publishing',
    tag: 'Zero Surprises',
    description:
      'Retain complete governance over your public image. Every vertical reel, ad creative, feed post, and web deployment is shared through a pre-approval calendar for your review and sign-off before going live.',
  },
  {
    number: '04',
    icon: BarChart3,
    title: 'Transparent Reporting',
    tag: 'Honest Analytics',
    description:
      'Maintain full administrative access and ownership of all ad accounts, analytics dashboards, and source files. We deliver clear spend and lead performance reports with zero inflated vanity metrics.',
  },
  {
    number: '05',
    icon: Clapperboard,
    title: 'Short-Form Video & Creative Content',
    tag: 'High-Retention Media',
    description:
      'Stand out in fast-moving social feeds with custom-shot vertical reels, compelling 3-second hooks, and dynamic visual storytelling tailored to keep viewers watching and build authentic brand recall.',
  },
  {
    number: '06',
    icon: Code2,
    title: 'Modern Website & Software Development',
    tag: 'Clean Engineering',
    description:
      'Provide your customers with sub-second page loads and responsive mobile ergonomics. We engineer websites and custom tools using modern stacks (React, Node.js, Tailwind, Flutter) for speed, security, and clean scalability.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-slate-50/70 border-y border-slate-200/60 relative overflow-hidden">
      {/* Subtle background glow decorators */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <SectionHeader
          badge="Why DigiBuddy4U"
          badgeVariant="blue"
          title="Genuine Advantages Built for"
          titleHighlight="Your Peace of Mind"
          description="From in-house collaboration to transparent reporting and client approval, here is how our operating model protects your time and grows your brand."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12">
          {ADVANTAGES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 xl:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:shadow-card-hover hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Icon + Sequence Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-navy-950 text-cyan-accent flex items-center justify-center shadow-xs transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-105">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-primary transition-colors">
                      {item.number}
                    </span>
                  </div>

                  {/* Title & Client Benefit Description */}
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-navy-950 group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Divider & Tag */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>DigiBuddy4U Standard</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-medium">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
