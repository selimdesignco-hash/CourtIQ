import React from 'react';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import Demo from '../components/landing/Demo';
import Pricing from '../components/landing/Pricing';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <HowItWorks />
      <Features />
      <Demo />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
