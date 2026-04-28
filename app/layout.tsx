// app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jolene | TJ Zoomer — Digital Media & Content Creator",
  description:
    "Digital media student and content creator based in Malaysia. Gen Z storytelling through humour, faith, sustainable fashion, and sci-fi. Follow @tjzoomer on Instagram, YouTube, and TikTok.",
  keywords: ["TJ Zoomer", "Jolene", "digital media", "content creator", "Malaysia", "Gen Z"],
  metadataBase: new URL("https://tjzoomer.com"),
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
    // suppressHydrationWarning is required by next-themes to avoid hydration mismatch
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-cream text-charcoal font-body antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"          // adds "dark" class to <html>
          defaultTheme="system"       // follow system preference by default
          enableSystem               // honour prefers-color-scheme
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}