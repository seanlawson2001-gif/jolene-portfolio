"use client";
// components/Navbar.tsx

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "About",     href: "#about"     },
  { label: "Portfolio", href: "#portfolio" },
  { label: "CV",        href: "#cv"        },
  { label: "Contact",   href: "#contact"   },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [mounted,     setMounted]     = useState(false);

  const { theme, setTheme } = useTheme();

  // Wait until mounted to read theme — avoids hydration mismatch
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "navbar-scrolled" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">

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
            className="w-9 h-9 md:w-10 md:h-10 object-contain"
            priority
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium tracking-widest uppercase text-warm-gray hover:text-terracotta transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-terracotta transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: theme toggle + hamburger */}
        <div className="flex items-center gap-1">

          {/* Dark / light toggle — only renders after mount to avoid hydration flash */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-warm-gray hover:text-terracotta hover:bg-warm-white transition-all duration-200"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark"
                ? <Sun  size={18} />
                : <Moon size={18} />
              }
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-charcoal hover:text-terracotta transition-colors duration-200 rounded"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className={`block transition-transform duration-200 ${mobileOpen ? "rotate-90" : "rotate-0"}`}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="nav-drawer md:hidden bg-cream/96 backdrop-blur-md border-t border-border px-6 py-6 shadow-sm">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="block text-base font-medium tracking-widest uppercase text-warm-gray hover:text-terracotta transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}