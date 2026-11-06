import React from 'react';

// Custom clean black SVG for LinkedIn (ensures 100% reliable rendering without CDN variance)
const LinkedInBlackIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="#000000"
    className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// 1. Digital Marketing & Paid Media Platforms (Row 1 — Scrolls Left)
const MARKETING_PLATFORMS = [
  { name: 'Google Ads', slug: 'google', category: 'Search & PPC' },
  { name: 'Meta Ads', slug: 'meta', category: 'Paid Social' },
  { name: 'Instagram', slug: 'instagram', category: 'Organic & Reels' },
  { name: 'Facebook', slug: 'facebook', category: 'Community & Ads' },
  { name: 'WhatsApp', slug: 'whatsapp', category: 'Business API' },
  { name: 'LinkedIn', isCustomSvg: true, category: 'B2B Growth' },
  { name: 'YouTube', slug: 'youtube', category: 'Video & Shorts' },
  { name: 'Shopify', slug: 'shopify', category: 'E-Commerce' },
  { name: 'X (Twitter)', slug: 'x', category: 'Live Updates' },
  { name: 'Pinterest', slug: 'pinterest', category: 'Visual Search' },
  { name: 'Snapchat', slug: 'snapchat', category: 'Gen-Z Reach' },
  { name: 'TikTok', slug: 'tiktok', category: 'Viral Trends' },
  { name: 'Mailchimp', slug: 'mailchimp', category: 'Email Automation' },
];

// 2. IT, Web Development & Cloud Technologies (Row 2 — Scrolls Right)
const IT_TECHNOLOGIES = [
  { name: 'React.js', slug: 'react', category: 'Frontend' },
  { name: 'Next.js', slug: 'nextdotjs', category: 'Fullstack' },
  { name: 'Node.js', slug: 'nodedotjs', category: 'Backend' },
  { name: 'TypeScript', slug: 'typescript', category: 'Languages' },
  { name: 'JavaScript', slug: 'javascript', category: 'Languages' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', category: 'UI Styling' },
  { name: 'MongoDB', slug: 'mongodb', category: 'NoSQL Database' },
  { name: 'MySQL', slug: 'mysql', category: 'SQL Database' },
  { name: 'PostgreSQL', slug: 'postgresql', category: 'Relational DB' },
  { name: 'Flutter', slug: 'flutter', category: 'Mobile App' },
  { name: 'Python', slug: 'python', category: 'Backend & AI' },
  { name: 'Docker', slug: 'docker', category: 'DevOps' },
  { name: 'Figma', slug: 'figma', category: 'UI/UX Design' },
  { name: 'WordPress', slug: 'wordpress', category: 'CMS Platform' },
  { name: 'Firebase', slug: 'firebase', category: 'Cloud Backend' },
  { name: 'Vue.js', slug: 'vuedotjs', category: 'Frontend' },
  { name: 'HTML5', slug: 'html5', category: 'Semantic Web' },
  { name: 'Git', slug: 'git', category: 'Version Control' },
];

// Platform Bubble Item Component (Card with Crisp Black Icon)
function PlatformBubble({ item, isAriaHidden = false }) {
  const iconSrc = item.isCustomSvg
    ? null
    : `https://cdn.simpleicons.org/${item.slug}/000000`;

  return (
    <div
      className="group relative flex-shrink-0 flex flex-col items-center mx-2.5 sm:mx-3.5 my-2"
      title={`${item.name} (${item.category})`}
      aria-hidden={isAriaHidden}
    >
      {/* The White / Light Card Bubble with Black Icon */}
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm shadow-slate-200 flex items-center justify-center p-3 sm:p-4 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/15 group-hover:border-primary/50 cursor-pointer select-none motion-reduce:transition-none motion-reduce:transform-none"
      >
        {item.isCustomSvg ? (
          <LinkedInBlackIcon />
        ) : (
          <img
            src={iconSrc}
            alt={isAriaHidden ? '' : item.name}
            width={44}
            height={44}
            className="w-7 h-7 sm:w-9 sm:h-9 object-contain filter contrast-125 transition-transform duration-200 group-hover:scale-105 pointer-events-none motion-reduce:transition-none motion-reduce:transform-none"
            loading="lazy"
            draggable="false"
            onError={(e) => {
              // Graceful fallback to initial text if offline
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Floating Name Tooltip / Pill on Hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-7 pointer-events-none z-20 whitespace-nowrap">
        <span className="px-2.5 py-0.5 rounded-md bg-[#071A38] text-white border border-slate-700 text-[10px] font-mono font-bold shadow-lg">
          {item.name}
        </span>
      </div>
    </div>
  );
}

export default function PlatformsTechnologiesSection() {
  return (
    <section
      id="platforms-technologies"
      className="bg-white text-navy-950 py-16 sm:py-20 lg:py-24 relative overflow-hidden border-t border-b border-slate-200/80 select-none"
      aria-label="Platforms and technologies we work with"
    >
      {/* Background ambient lighting for soft depth */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Heading */}
      <div className="site-container relative text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-navy-950 tracking-tight leading-tight">
          Platforms &{' '}
          <span className="bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Technologies We Work With
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-3 font-medium leading-relaxed">
          From high-converting advertising channels to modern cloud and fullstack software frameworks — our agency deploys battle-tested technologies for dependable commercial performance.
        </p>
      </div>

      {/* Marquee Wrapper with White Edge Fade Gradient Masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Edge Vignette Fades in White */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 lg:w-48 bg-gradient-to-r from-white via-white/85 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 lg:w-48 bg-gradient-to-l from-white via-white/85 to-transparent z-10" />

        {/* ======================================================== */}
        {/* ROW 1: Scrolling Left (Marketing Platforms)             */}
        {/* ======================================================== */}
        <div className="mb-3 sm:mb-4">
          <div className="relative overflow-x-auto overflow-y-hidden w-full flex scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
            <div className="animate-marquee-left flex py-1 will-change-transform">
              {MARKETING_PLATFORMS.map((item, index) => (
                <PlatformBubble
                  key={`mkt-pri-${item.name}-${index}`}
                  item={item}
                  isAriaHidden={false}
                />
              ))}
              {MARKETING_PLATFORMS.map((item, index) => (
                <PlatformBubble
                  key={`mkt-dup-${item.name}-${index}`}
                  item={item}
                  isAriaHidden={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ROW 2: Scrolling Right (IT & Cloud Frameworks)           */}
        {/* ======================================================== */}
        <div>
          <div className="relative overflow-x-auto overflow-y-hidden w-full flex scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
            <div className="animate-marquee-right flex py-1 will-change-transform">
              {IT_TECHNOLOGIES.map((item, index) => (
                <PlatformBubble
                  key={`it-pri-${item.name}-${index}`}
                  item={item}
                  isAriaHidden={false}
                />
              ))}
              {IT_TECHNOLOGIES.map((item, index) => (
                <PlatformBubble
                  key={`it-dup-${item.name}-${index}`}
                  item={item}
                  isAriaHidden={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
