"use client";
// components/Footer.tsx

import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal dark:bg-[#090B10] text-cream/70 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="hover:opacity-75 transition-opacity duration-200"
            aria-label="TJ Zoomer — back to top"
          >
            <Image
              src="/images/tj-logo.png"
              alt="TJ Zoomer logo"
              width={40}
              height={40}
              className="w-9 h-9 object-contain brightness-0 invert"
            />
          </a>

          <nav className="flex flex-wrap justify-center gap-6">
            {[
              { label: "About",     href: "#about"     },
              { label: "Portfolio", href: "#portfolio" },
              { label: "CV",        href: "#cv"        },
              { label: "Contact",   href: "#contact"   },
            ].map((link) => (
              <a key={link.href} href={link.href}
                className="text-xs tracking-widest uppercase hover:text-cream transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-xs tracking-wide">© {currentYear} Tang Jolene. All rights reserved.</p>
        </div>

        <div className="border-t border-cream/10 mt-8 pt-6 text-center">
          <p className="text-xs opacity-40 italic">
            &ldquo;For we can do nothing against the truth, but for the truth.&rdquo;
            &nbsp;— 2 Corinthians 13:8
          </p>
        </div>
      </div>
    </footer>
  );
}