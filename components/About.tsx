"use client";
// components/About.tsx

import { useEffect, useRef } from "react";
import Image from "next/image";

const skills = [
  "Video Production",
  "Scriptwriting",
  "Directing",
  "Video Editing",
  "Motion Graphics",
  "Cinematography",
  "Adobe Premiere Pro",
  "Adobe After Effects",
  "Content Creation",
  "Brand Storytelling",
  "Sustainable Fashion",
  "Digital Media",
];

const focusAreas = [
  "Video & Short Film",
  "Brand Campaigns",
  "Thrift & Fashion",
  "Sci-fi Storytelling",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-36 bg-warm-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="reveal mb-14 md:mb-20">
          <p className="section-label">Who I Am</p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-tight text-charcoal">
            About Me
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Photo */}
          <div className="reveal reveal-delay-1 md:col-span-5">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-md"
              style={{ aspectRatio: "3/4" }}>
              <Image
                src="/images/jolene-profile.jpg"
                alt="Jolene — TJ Zoomer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(28,25,23,0.45), transparent)" }}
              />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs text-cream/90 font-medium tracking-widest uppercase bg-black/25 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  Petaling Jaya, Malaysia
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span key={area}
                  className="text-xs font-medium text-warm-gray bg-cream border border-border px-3 py-1.5 rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-7 space-y-8">

            <div className="reveal reveal-delay-2 space-y-5">
              <p className="text-charcoal text-lg md:text-xl leading-relaxed font-light">
                Hi, I&apos;m Tang Jolene — a Digital Media Production student & Film Maker at the University
                of Wollongong Malaysia, and a content creator known as TJ Zoomer.
              </p>
              <p className="text-warm-gray text-base leading-relaxed">
                I have hands-on experience in video production, scriptwriting, directing,
                and editing. Passionate about storytelling through film and short-form
                content, with a focus on thought-provoking and creative visual narratives.
                Experienced in managing projects from concept creation to post-production,
                motion graphics, and creating engaging content for digital platforms.
              </p>
              <p className="text-warm-gray text-base leading-relaxed">
                I create because I&apos;m inspired by my Creator, my curiosity and tenacity
                for the Truth shine through everything I make. Alongside my content work,
                I run{" "}
                <a
                  href="https://instagram.com/thriftyjaye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta hover:text-terracotta-dark underline underline-offset-2 font-medium transition-colors"
                >
                  Thrifty Jaye
                </a>
                {" "}— a sustainable vintage thrift store celebrating fashion with history.
              </p>
            </div>

            {/* Stats */}
            <div className="reveal reveal-delay-3 flex flex-wrap gap-8 pt-5 border-t border-border">
              <div>
                <p className="font-display text-4xl text-charcoal font-light">UOW</p>
                <p className="text-xs tracking-widest uppercase text-warm-gray mt-1">Malaysia</p>
              </div>
              <div>
                <p className="font-display text-4xl text-charcoal font-light">8</p>
                <p className="text-xs tracking-widest uppercase text-warm-gray mt-1">Films & Ads</p>
              </div>
              <div>
                <p className="font-display text-4xl text-charcoal font-light">4+</p>
                <p className="text-xs tracking-widest uppercase text-warm-gray mt-1">Platforms</p>
              </div>
            </div>

            {/* Skills */}
            <div className="reveal reveal-delay-4">
              <p className="text-xs tracking-widest uppercase text-warm-gray font-medium mb-4">
                Skills &amp; Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={skill} className="skill-tag text-xs font-medium"
                    style={{
                      background: i % 3 === 0 ? "#F3EFE8" : i % 3 === 1 ? "#EAF0EA" : "#F0ECE8",
                      color:      i % 3 === 0 ? "#6B5E58" : i % 3 === 1 ? "#5A7A62" : "#7A6050",
                      border:     `1px solid ${i % 3 === 0 ? "#E5DED5" : i % 3 === 1 ? "#C0D4C0" : "#DDCFC0"}`,
                    }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal reveal-delay-5 pt-2">
              <a href="#portfolio" className="btn-primary inline-flex">See My Work</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}