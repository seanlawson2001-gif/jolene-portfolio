"use client";
// components/Portfolio.tsx
// Portfolio section with category filter tabs and project card grid.
// Projects are loaded from data/projects.ts — edit that file to update content.

import { useState, useEffect, useRef } from "react";
import { projects, categories, type ProjectCategory } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter projects based on active category
  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filtered]); // Re-observe when filter changes

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 md:py-36 bg-cream">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <p className="section-label">Selected Work</p>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-tight text-charcoal">
              Portfolio
            </h2>
          </div>
          <p className="text-warm-gray text-sm max-w-xs leading-relaxed">
            A selection of projects spanning design, video, branding, and digital
            media.
          </p>
        </div>

        {/* ── Category filter tabs ─────────────────────────────────────── */}
        <div className="reveal reveal-delay-1 flex flex-wrap gap-2 mb-10 md:mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
              {/* Show count for non-All categories */}
              {cat !== "All" && (
                <span className="ml-1.5 opacity-60 text-xs">
                  {projects.filter((p) => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Project grid ────────────────────────────────────────────────
         * Uses a responsive 3-column grid on desktop.
         * The first two projects span 2 columns for visual variety.
         */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-warm-gray font-light italic">
              No projects in this category yet.
            </p>
            <p className="text-warm-gray text-sm mt-3">
              Check back soon, or view all work.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="btn-secondary mt-6"
            >
              View All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <div
                key={project.id}
                // Make the first featured project span 2 columns on lg screens
                className={
                  index === 0 && project.featured
                    ? "lg:col-span-2"
                    : "col-span-1"
                }
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        )}

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <div className="reveal text-center mt-16">
          <p className="text-warm-gray text-sm mb-5">
            More work available on request
          </p>
          <a href="#contact" className="btn-secondary">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
