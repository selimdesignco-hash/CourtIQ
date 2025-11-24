import React from 'react';
import { motion } from "framer-motion";
import { Play, User, Target, Shield, FileText } from "lucide-react";

export default function Demo() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-5xl">
        <div className="w-full h-96 bg-orange-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Professional Grade Interface
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built for coaches who demand elite-level analysis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Mock interface */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header bar */}
            <div className="bg-black/50 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="text-sm text-gray-500 font-mono">
                CourtIQ Dashboard
              </div>
              <div className="w-16" />
            </div>

            {/* Main content area */}
            <div className="flex flex-col lg:flex-row">
              {/* Sidebar */}
              <div className="lg:w-72 bg-black/30 border-r border-gray-800 p-6">
                <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Recent Uploads</h3>
                <div className="space-y-3">
                  {['vs Lakers - Finals', 'Practice Session', 'Tournament Game'].map((game, i) => (
                    <div key={i} className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 hover:border-orange-500/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Play className="w-4 h-4 text-orange-500" />
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium truncate">{game}</div>
                          <div className="text-gray-500 text-xs">2 days ago</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main panel */}
              <div className="flex-1 p-8">
                {/* Video preview mockup */}
                <div className="bg-gray-950 rounded-xl border border-gray-800 aspect-video mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
                  <Play className="w-16 h-16 text-orange-500/50" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center justify-between">
                      <span className="text-white text-sm">Q2 • 8:42</span>
                      <span className="text-orange-500 text-sm font-medium">Analyzing...</span>
                    </div>
                  </div>
                </div>

                {/* Analysis cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: User, title: "Key Players", count: "5 identified" },
                    { icon: Target, title: "Offensive Sets", count: "12 plays" },
                    { icon: Shield, title: "Defensive Coverage", count: "Man + Zone" },
                    { icon: FileText, title: "Report Ready", count: "Export PDF" }
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="bg-gray-900/50 rounded-xl border border-gray-800 p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-orange-500" />
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">{item.title}</div>
                            <div className="text-gray-500 text-xs">{item.count}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-6 -right-6 bg-orange-500 text-white px-6 py-3 rounded-full shadow-xl shadow-orange-500/50 hidden lg:block"
          >
            <span className="font-bold">99% Accurate</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
