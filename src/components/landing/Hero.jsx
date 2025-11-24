import React from 'react';
import { Button } from '../ui/button';
import { Upload, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-400 text-sm font-medium">AI-Powered Basketball Intelligence</span>
          </div>

          {/* Main headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white">AI Scouting.</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Instant Game Plans.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Upload film → get an automatic scouting report your team can use tomorrow.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate(createPageUrl('Upload'))}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
            >
              <Play className="w-5 h-5 mr-2" />
              Try the Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate(createPageUrl('Upload'))}
              className="border-2 border-gray-700 hover:border-orange-500 text-white px-8 py-6 text-lg rounded-xl bg-transparent hover:bg-orange-500/10 transition-all"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Game Film
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-orange-500 rounded-full" />
              <span>Trusted by 500+ Coaches</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-orange-500 rounded-full" />
              <span>10,000+ Games Analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-orange-500 rounded-full" />
              <span>99% Accuracy Rate</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
