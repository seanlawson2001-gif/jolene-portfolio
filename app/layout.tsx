// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jolene | TJ Zoomer — Digital Media & Content Creator",
  description:
    "Digital media student and content creator based in Malaysia. Gen Z storytelling through humour, faith, sustainable fashion, and sci-fi. Follow @tjzoomer on Instagram, YouTube, and TikTok.",
  keywords: [
    "TJ Zoomer",
    "Jolene",
    "digital media",
    "content creator",
    "Malaysia",
    "Gen Z",
    "sustainable fashion",
    "Thrifty Jaye",
    "TikTok creator",
    "YouTube",
    "student",
    "Christian",
    "faith",
    "website",
  ],
  metadataBase: new URL("https://tjzoomer.com"),
  // ── Favicon — shows in browser tab ──────────────────────────────────────
  // Place favicon.png in /public/favicon.png
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Jolene | TJ Zoomer",
    description: "Digital media student & content creator — humour, faith, sustainable fashion, and sci-fi storytelling.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-cream text-charcoal font-body antialiased">
        {children}
      </body>
    </html>
  );
}