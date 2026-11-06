import React, { useState, useEffect, useRef } from 'react';

/**
 * IntroSplash Component
 * Exactly as requested by user:
 * - Only the brand wordmark: DigiBuddy 4U (no extra tagline clutter)
 * - Distinct step-by-step staggered reveal:
 *   1. "Digi" slides up first
 *   2. "Buddy" (#FFC629) slides up second
 *   3. "4U" (#18D5E8) slides up third
 * - Brief pause to admire the full brand, then the screen wipes up smoothly.
 * - Respects prefers-reduced-motion: skips immediately to avoid locking user view.
 * - Safely cleans up all timers and document.body scroll locks on unmount.
 */
export default function IntroSplash() {
  const [stage, setStage] = useState('entering'); // 'entering' | 'wiping' | 'done'
  const dismissTimerRef = useRef(null);

  useEffect(() => {
    // Respect user's motion preference: skip splash immediately if reduced motion is requested
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) {
        setStage('done');
        document.body.style.overflow = '';
        return;
      }
    }

    // 1. Lock scroll while intro is playing
    document.body.style.overflow = 'hidden';

    // 2. Wipe up after sequence finishes (2.45s)
    const wipeTimer = setTimeout(() => {
      setStage('wiping');
      document.body.style.overflow = '';
    }, 2450);

    // 3. Remove completely from DOM after wipe animation finishes (3.4s)
    const removeTimer = setTimeout(() => {
      setStage('done');
    }, 3400);

    return () => {
      clearTimeout(wipeTimer);
      clearTimeout(removeTimer);
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
      }
      document.body.style.overflow = '';
    };
  }, []);

  const handleDismiss = () => {
    setStage('wiping');
    document.body.style.overflow = '';
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
    }
    dismissTimerRef.current = setTimeout(() => {
      setStage('done');
    }, 850);
  };

  if (stage === 'done') return null;

  return (
    <div
      id="intro"
      onClick={handleDismiss}
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] flex items-center justify-center select-none cursor-pointer overflow-hidden ${
        stage === 'wiping' ? 'intro-wiping' : ''
      }`}
      style={{
        backgroundColor: '#071A38',
        background: 'radial-gradient(ellipse at center, #0B2B5C 0%, #071A38 70%, #030711 100%)',
      }}
    >
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/15 filter blur-[110px] animate-pulse pointer-events-none" />

      {/* Main Brand Wordmark: Digi -> Buddy -> 4U (Step-by-Step Sequence) */}
      <div className="relative z-10 flex items-baseline gap-1 sm:gap-2.5 md:gap-3 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-heading tracking-tight leading-none overflow-hidden py-3 px-4">
        {/* Step 1: "Digi" (slides up first) */}
        <span className="splash-span splash-digi text-white inline-block">
          Digi
        </span>

        {/* Step 2: "Buddy" (slides up second) */}
        <span
          className="splash-span splash-buddy inline-block"
          style={{ color: '#FFC629' }}
        >
          Buddy
        </span>

        {/* Step 3: "4U" (slides up third) */}
        <span
          className="splash-span splash-4u inline-block"
          style={{ color: '#18D5E8' }}
        >
          4U
        </span>
      </div>

      <style>{`
        .splash-span {
          display: inline-block;
          transform: translateY(125%);
          will-change: transform;
        }

        /* 1. Digi enters first */
        .splash-digi {
          animation: wordmarkUp 0.65s 0.08s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* 2. Buddy enters second */
        .splash-buddy {
          animation: wordmarkUp 0.65s 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* 3. 4U enters third */
        .splash-4u {
          animation: wordmarkUp 0.65s 1.02s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* Wipe screen upward */
        .intro-wiping {
          transform: translateY(-100%);
          transition: transform 0.95s cubic-bezier(0.7, 0, 0.2, 1);
        }

        @keyframes wordmarkUp {
          to {
            transform: translateY(0%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-span {
            transform: none !important;
            animation: none !important;
          }
          .intro-wiping {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
