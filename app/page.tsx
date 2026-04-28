// app/page.tsx
// The main page — pulls together all sections in order.
// This is a single-page portfolio with smooth scroll navigation.

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import CV from "@/components/CV";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky navigation bar */}
      <Navbar />

      <main>
        {/* Hero — first thing visitors see */}
        <Hero />

        {/* About — who Jolene is */}
        <About />

        {/* Portfolio — showcase of work */}
        <Portfolio />

        {/* CV — education, skills, experience, download */}
        <CV />

        {/* Contact — form + social links */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
