// data/projects.ts
// ═══════════════════════════════════════════════════════════════════════════
// HOW TO ADD EACH VIDEO LINK:
//
// For every file in the "TJ Website" Google Drive folder:
//   1. Right-click the file → Share
//   2. Under "General access" change to "Anyone with the link" → Done
//   3. Click "Copy link" — it looks like:
//      https://drive.google.com/file/d/1aBcDeFgHiJkLmN.../view?usp=sharing
//   4. Paste that full URL as the videoUrl below
//
// The site converts it to an embed automatically. No extra steps needed.
// The thumbnail is also generated from Drive automatically.
// ═══════════════════════════════════════════════════════════════════════════

export type ProjectCategory =
  | "All"
  | "Design"
  | "Video"
  | "Branding"
  | "Social Media"
  | "University Work"
  | "Personal Project";

export type Project = {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, "All">;
  description: string;
  longDescription?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  tools: string[];
  year: string;
  role?: string;
  featured?: boolean;
};

export const projects: Project[] = [

  // ─── "Don't Blink" ────────────────────────────────────────────────────
  {
    id: "dont-blink",
    title: "Don't Blink",
    category: "Video",
    description:
      "A short film exploring tension, perception, and the unseen. Ambitious in scope — from concept and script through to final cut.",
    thumbnailUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
    videoUrl: "https://drive.google.com/file/d/1gMzguTYXMQV1ojwCdf40PTBGVPLtA4XV/view?usp=drive_link",
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    year: "2025",
    role: "Director, Writer",
    featured: true,
  },

  // ─── "Genuine" ────────────────────────────────────────────────────────
  {
    id: "genuine",
    title: "Genuine",
    category: "Video",
    description:
      "Most recent short film — a character study on authenticity and what it means to be real in a world of curated identities.",
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    videoUrl: "https://drive.google.com/file/d/1vIFBE8s1_wY-_P8RDMQxKm8KKOfYxSkE/view?usp=drive_link",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    year: "2026",
    role: "Director, Writer, Editor",
    featured: true,
  },

  // ─── "Yeo's Advertisement" ────────────────────────────────────────────
  {
    id: "yeos-ad",
    title: "Yeo's — Advertisement",
    category: "Branding",
    description:
      "A commercial produced for Yeo's, the iconic Malaysian food and beverage brand. Creative ad production from brief to final delivery.",
    thumbnailUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    videoUrl: "https://drive.google.com/file/d/1Zf_M4Tq9AmNFjdEQ78HJ0v92wykj4IGa/view?usp=drive_link",
    tools: ["Premiere Pro", "After Effects", "Photoshop"],
    year: "2024",
    role: "Director, Producer",
    featured: true,
  },

  // ─── "She Never Left" ─────────────────────────────────────────────────
  {
    id: "she-never-left",
    title: "She Never Left",
    category: "Video",
    description:
      "A short film grounded in emotional truth — exploring memory, presence, and the people who stay with us long after they're gone.",
    thumbnailUrl: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=800&q=80",
    videoUrl: "https://drive.google.com/file/d/1rElCjUjFf5Sfof950q_0RRkaY52ch00S/view?usp=drive_link",
    tools: ["Premiere Pro", "DaVinci Resolve"],
    year: "2025",
    role: "Director, Editor",
  },

  // ─── "Chocolate" ──────────────────────────────────────────────────────
  {
    id: "chocolate",
    title: "Chocolate",
    category: "Video",
    description:
      "A short film with rich visual storytelling — playing with texture, light, and indulgence as metaphor.",
    thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    videoUrl: "https://drive.google.com/file/d/17maYtQGZwE1AhcSBCk62ZD-KtQMfpwzk/view?usp=drive_link",
    tools: ["Premiere Pro", "After Effects", "Lightroom"],
    year: "2024",
    role: "Director, Editor",
  },

  // ─── "Alone" ──────────────────────────────────────────────────────────
  {
    id: "alone",
    title: "Alone",
    category: "Video",
    description:
      "A quiet, introspective short film about solitude — told through composition, silence, and the spaces between moments.",
    thumbnailUrl: "https://images.unsplash.com/photo-1531804055935-76f44d7cabc6?w=800&q=80",
    videoUrl: "https://drive.google.com/file/d/1baaOwvJCwpGWbrjzM1kB-B41KDK7JhX6/view?usp=drive_link",
    tools: ["Premiere Pro", "DaVinci Resolve"],
    year: "2024",
    role: "Director, Editor",
  },

  // ─── "Coolberg Advertisement" ─────────────────────────────────────────
  {
    id: "coolberg-ad",
    title: "Coolberg — Advertisement",
    category: "Branding",
    description:
      "A commercial for Coolberg — punchy, visual, and brand-forward. Creative ad production with a Gen Z aesthetic.",
    thumbnailUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    videoUrl: "https://drive.google.com/file/d/12pb5opfiJS4RgEb3El5u_dwM1ZiKsgR9/view?usp=drive_link",
    tools: ["Premiere Pro", "After Effects", "Photoshop"],
    year: "2024",
    role: "Director, Producer",
  },

  // ─── "Hope — Action Sequence" ─────────────────────────────────────────
  {
    id: "hope-action",
    title: "Hope — Action Sequence",
    category: "Video",
    description:
      "A kinetic action sequence demonstrating camera work, choreography, editing rhythm, and post-production craft.",
    thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    videoUrl: "https://drive.google.com/file/d/1vSUt9uxnNzsNn4CkKNh5xgrBUkQhH8xP/view?usp=drive_link",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    year: "2024",
    role: "Director, Editor",
  },

];

export const categories: ProjectCategory[] = [
  "All",
  "Video",
  "Branding",
  "Design",
  "Social Media",
  "University Work",
  "Personal Project",
];