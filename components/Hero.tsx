"use client";
// components/Hero.tsx

import { ArrowDown, Download } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-cream"
    >
      <div className="grain-overlay" aria-hidden="true" />

      {/* Decorative circles */}
      <div
        className="hero-deco absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #C4856A 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="hero-deco absolute bottom-20 -left-16 w-64 h-64 rounded-full opacity-8"
        style={{ background: "radial-gradient(circle, #7A9A82 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="hero-deco absolute top-1/3 left-0 w-32 h-px bg-terracotta opacity-30" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 md:pt-32 w-full">
        <div className="grid md:grid-cols-12 gap-8 items-center">

          {/* Text */}
          <div className="md:col-span-7 lg:col-span-6">
            <p className="hero-subtitle section-label mb-5">Digital Media Portfolio</p>

            <h1 className="hero-title font-display leading-[0.88] tracking-tight text-charcoal mb-6">
              <span className="block text-[clamp(4rem,12vw,9rem)] font-light italic">
                Jolene
              </span>
              <span className="block text-[clamp(1.1rem,3vw,2rem)] font-light tracking-normal mt-3 text-warm-gray not-italic">
                TJ Zoomer — Content Creator & Filmmaker
              </span>
            </h1>

            <p className="hero-subtitle text-warm-gray text-base md:text-lg leading-relaxed max-w-md mb-10">
              Gen Z storytelling through humour, faith, sustainable fashion,
              and sci-fi. Based in Malaysia, building a community that thinks
              deeply, laughs freely, and lives kindly.
            </p>

            <div className="hero-cta flex flex-wrap gap-4">
              <a href="#portfolio" className="btn-primary">
                View Portfolio
                <span className="text-lg leading-none">↓</span>
              </a>
              <a href="/jolene-cv.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Download size={15} />
                Download CV
              </a>
            </div>

            {/* Social links */}
            <div className="hero-cta flex items-center gap-5 mt-8">
              <span className="text-xs tracking-widest uppercase text-warm-gray font-medium opacity-60">Find me</span>
              <div className="flex gap-4 flex-wrap">
                {[
                  { label: "Instagram", href: "https://instagram.com/tjzoomer" },
                  { label: "YouTube",   href: "https://youtube.com/@tjzoomer"  },
                  { label: "TikTok",    href: "https://tiktok.com/@tjzoomer"   },
                  { label: "Twitch",    href: "https://twitch.tv/tjzoomer"     },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="text-warm-gray hover:text-terracotta transition-colors text-sm font-medium tracking-wider">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="hero-deco md:col-span-5 lg:col-span-6 flex justify-center md:justify-end">
            <div className="relative w-72 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[480px]">

              {/* Profile photo */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/30 shadow-lg">
                <Image
                  src="/images/jolene-hero.jpg"
                  alt="Jolene — TJ Zoomer"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              {/* Floating badge — bottom left */}
              <div className="absolute -bottom-4 -left-4 bg-charcoal text-cream px-4 py-3 rounded-lg shadow-lg">
                <p className="font-display text-sm italic leading-tight">Digital Media Student</p>
                <p className="text-xs opacity-60 mt-0.5">Malaysia</p>
              </div>

              {/* Year badge — top right */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-terracotta rounded-full flex items-center justify-center shadow-md">
                <span className="font-display text-cream text-xl font-light">2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest uppercase text-warm-gray opacity-50">Scroll</span>
        <ArrowDown size={14} className="text-warm-gray opacity-50 scroll-bounce" />
      </div>
    </section>
  );
}