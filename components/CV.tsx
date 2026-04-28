"use client";
// components/CV.tsx

import { useEffect, useRef } from "react";
import { Download, GraduationCap, Briefcase, Award, Wrench } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Arts (Honours) in Digital Media Production (UBDP)",
    institution: "University of Wollongong Malaysia",
    years: "Jan 2024 – Dec 2026",
    details: "Skills: Video Editing, Graphic Design, Cinematography, Scriptwriting, Motion Graphics.",
  },
  {
    degree: "Cambridge International Advanced Level (A Levels)",
    institution: "Sunway College",
    years: "2019 – 2020",
    details: "Head of Logistics — Sunway Model United Nations Conference 2019 (SUNMUN19). Peer-to-Peer (P2P) Counsellor. Cell Group Leader, Sunway Christian Fellowship.",
  },
];

const experience = [
  {
    role: "Part Time Retail Associate",
    company: "UNIQLO",
    years: "Feb 2026 – Present",
    details: "Customer service and customer satisfaction in a fast-paced retail environment. Petaling Jaya, Selangor — On-site.",
  },
  {
    role: "Content Creator",
    company: "TJ Zoomer (Independent)",
    years: "2022 – Present",
    details: "Creating original digital content across Instagram, TikTok, YouTube, and Twitch. Short films, advertisements, brand campaigns, and community-driven storytelling.",
  },
  {
    role: "Founder & Creative Director",
    company: "Thrifty Jaye",
    years: "2022 – Present",
    details: "Founded and operate a sustainable vintage thrift brand — sourcing, styling, photographing, and selling on Instagram and via Wix storefront.",
  },
];

const softwareTools = [
  "Adobe Premiere Pro",
  "Adobe After Effects",
  "DaVinci Resolve",
  "Adobe Photoshop",
  "Adobe Lightroom",
  "CapCut",
  "Canva Pro",
  "Figma",
  "Final Cut Pro",
  "Microsoft Office",
];

const mediaSkills = [
  "Video Editing (Adobe Premiere Pro)",
  "VFX & Motion Graphics (Adobe After Effects)",
  "Scriptwriting & Story Development",
  "Cinematography",
  "Social Media Content Creation (Instagram Reels, YouTube Shorts)",
  "Video Production & Direction",
  "Post-Production",
  "Brand Storytelling",
  "Photography & Styling",
  "Creative Direction",
];

const achievements = [
  {
    title: "Under-Secretary-General (USG) of Logistics",
    body: "Sunway Model United Nations Conference 2019 (SUNMUN19)",
    year: "2019",
  },
  {
    title: "Peer-to-Peer (P2P) Counsellor Volunteer",
    body: "Sunway College",
    year: "2019",
  },
  {
    title: "Vice President",
    body: "Malaysian Red Crescent Society, SMK Damansara Jaya",
    year: "2014–2018",
  },
  {
    title: "Head of Events Department",
    body: "Christian Fellowship Club, SMK Damansara Jaya",
    year: "2014–2018",
  },
];

export default function CV() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cv" ref={sectionRef} className="py-24 md:py-36 bg-warm-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="section-label">Qualifications</p>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-tight text-charcoal">
              Curriculum Vitae
            </h2>
          </div>
          {/* Place Jolene's actual CV PDF at /public/jolene-cv.pdf */}
          <a href="/jolene-cv.pdf" download="Jolene-CV.pdf" target="_blank"
            rel="noopener noreferrer" className="btn-primary self-start md:self-auto">
            <Download size={15} />
            Download CV (PDF)
          </a>
        </div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16">

          {/* Left */}
          <div className="md:col-span-7 space-y-14">

            {/* Education */}
            <div className="reveal reveal-delay-1">
              <div className="flex items-center gap-2.5 mb-7">
                <GraduationCap size={17} className="text-terracotta" />
                <h3 className="text-xs font-semibold tracking-widest uppercase text-charcoal">Education</h3>
              </div>
              <div className="space-y-7">
                {education.map((item, i) => (
                  <div key={i} className="relative pl-5 border-l border-border">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-terracotta" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h4 className="font-medium text-charcoal text-sm leading-snug">{item.degree}</h4>
                      <span className="text-xs text-warm-gray shrink-0">{item.years}</span>
                    </div>
                    <p className="text-sm text-terracotta font-medium mb-1">{item.institution}</p>
                    <p className="text-sm text-warm-gray leading-relaxed">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="reveal reveal-delay-2">
              <div className="flex items-center gap-2.5 mb-7">
                <Briefcase size={17} className="text-terracotta" />
                <h3 className="text-xs font-semibold tracking-widest uppercase text-charcoal">Experience</h3>
              </div>
              <div className="space-y-7">
                {experience.map((item, i) => (
                  <div key={i} className="relative pl-5 border-l border-border">
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-sage" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h4 className="font-medium text-charcoal text-sm">{item.role}</h4>
                      <span className="text-xs text-warm-gray shrink-0">{item.years}</span>
                    </div>
                    <p className="text-sm text-sage-dark font-medium mb-1">{item.company}</p>
                    <p className="text-sm text-warm-gray leading-relaxed">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="reveal reveal-delay-3">
              <div className="flex items-center gap-2.5 mb-7">
                <Award size={17} className="text-terracotta" />
                <h3 className="text-xs font-semibold tracking-widest uppercase text-charcoal">Leadership & Achievements</h3>
              </div>
              <div className="space-y-4">
                {achievements.map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-charcoal text-sm">{item.title}</p>
                      <p className="text-xs text-warm-gray mt-0.5">{item.body}</p>
                    </div>
                    <span className="text-xs text-warm-gray shrink-0">{item.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-5 space-y-10">

            <div className="reveal reveal-delay-2">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-3.5 h-3.5 rounded-sm bg-terracotta opacity-75" />
                <h3 className="text-xs font-semibold tracking-widest uppercase text-charcoal">Media Skills</h3>
              </div>
              <div className="space-y-2.5">
                {mediaSkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <span className="text-terracotta text-[10px]">◆</span>
                    <span className="text-sm text-warm-gray">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal reveal-delay-3">
              <div className="flex items-center gap-2.5 mb-5">
                <Wrench size={15} className="text-sage" />
                <h3 className="text-xs font-semibold tracking-widest uppercase text-charcoal">Software &amp; Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {softwareTools.map((tool) => (
                  <span key={tool}
                    className="text-xs bg-cream border border-border text-warm-gray px-3 py-1.5 rounded-lg">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal reveal-delay-4 bg-cream dark:bg-[oklch(0.17_0.022_252)] rounded-2xl border border-border p-6">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-charcoal mb-4">Languages</h3>
              <div className="space-y-3">
                {[
                  { lang: "English",  level: "Native — IELTS Band 8" },
                  { lang: "Malay",    level: "Fluent"                },
                  { lang: "Cantonese", level: "Basic"                },
                ].map(({ lang, level }) => (
                  <div key={lang} className="flex justify-between items-center text-sm">
                    <span className="text-charcoal">{lang}</span>
                    <span className="text-xs text-warm-gray bg-warm-white border border-border px-2 py-0.5 rounded-full">{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}