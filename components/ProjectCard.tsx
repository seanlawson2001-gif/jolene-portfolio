"use client";
// components/ProjectCard.tsx
// Supports YouTube, Vimeo, and Google Drive video links.
// Paste the share URL directly — the component converts it automatically.

import { useState } from "react";
import { Play, ExternalLink, X } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

// ─── URL HELPERS ──────────────────────────────────────────────────────────

function toEmbedUrl(url: string): string {
  // Google Drive
  const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) ?? url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (url.includes("drive.google.com") && driveMatch)
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  // YouTube watch
  const ytWatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;
  // YouTube short
  const ytShort = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
  // Vimeo
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url;
}

function driveThumbnail(url: string): string | null {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) ?? url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (url.includes("drive.google.com") && match)
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
  return null;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [videoOpen, setVideoOpen] = useState(false);

  const thumbnail = (project.videoUrl && driveThumbnail(project.videoUrl)) ?? project.thumbnailUrl;
  const isDrive   = project.videoUrl?.includes("drive.google.com") ?? false;

  return (
    <>
      {/* ── Card ──────────────────────────────────────────────────────── */}
      <div
        className={`portfolio-card bg-cream rounded-2xl overflow-hidden border border-border reveal reveal-delay-${Math.min(index % 4 + 1, 5)}`}
      >
        {/* Thumbnail */}
        <div className="card-image relative aspect-[4/3] bg-warm-white overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt={`${project.title} thumbnail`}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Hover overlay */}
          <div className="card-overlay absolute inset-0 bg-charcoal/75 flex items-center justify-center gap-3">
            {project.videoUrl && (
              <button
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-2 bg-cream text-charcoal px-4 py-2.5 rounded-full text-sm font-medium hover:bg-terracotta hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Play size={13} fill="currentColor" />
                Watch Video
              </button>
            )}
            <button
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 bg-white/15 text-cream border border-cream/30 px-4 py-2.5 rounded-full text-sm font-medium hover:bg-cream/20 transition-colors duration-200 cursor-pointer"
            >
              <ExternalLink size={13} />
              View Project
            </button>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-cream/90 backdrop-blur-sm text-charcoal px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              {project.category}
            </span>
          </div>

          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-terracotta text-white px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="font-display text-xl font-medium text-charcoal leading-snug">{project.title}</h3>
            <span className="text-xs text-warm-gray shrink-0 mt-0.5">{project.year}</span>
          </div>
          {project.role && (
            <p className="text-xs font-medium text-terracotta tracking-wide mb-2">{project.role}</p>
          )}
          <p className="text-sm text-warm-gray leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tools.map((tool) => (
              <span key={tool} className="text-xs bg-warm-white border border-border text-warm-gray px-2.5 py-1 rounded">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Video Modal — animated open/close ─────────────────────────── */}
      {videoOpen && project.videoUrl && (
        <div
          className="modal-backdrop fixed inset-0 z-50 bg-charcoal/85 flex items-center justify-center p-4 md:p-8"
          onClick={() => setVideoOpen(false)}
        >
          {/* modal-content class triggers modalIn animation from globals.css */}
          <div
            className="modal-content relative w-full max-w-4xl bg-charcoal rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 z-10 bg-white/10 hover:bg-white/25 text-white rounded-full p-2 transition-colors duration-200 cursor-pointer"
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
            >
              <X size={18} />
            </button>

            <div className="px-5 pt-4 pb-3">
              <p className="text-cream text-sm font-medium">{project.title}</p>
              {isDrive && (
                <p className="text-cream/40 text-xs mt-0.5">
                  Hosted on Google Drive — ensure the file is shared publicly.
                </p>
              )}
            </div>

            <div className="relative aspect-video">
              <iframe
                src={toEmbedUrl(project.videoUrl)}
                title={project.title}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}