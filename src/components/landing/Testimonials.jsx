import React from 'react';
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Coach Michael Thompson",
    role: "Head Coach, St. John's Prep",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    quote: "CourtIQ has completely transformed how we prepare for games. What used to take hours of film study now takes minutes, and the insights are incredibly detailed.",
    rating: 5
  },
  {
    name: "Sarah Martinez",
    role: "Skills Trainer & Development Coach",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    quote: "The player tracking and shot chart features are game-changers. I can show my players exactly where they're most effective and where they need to improve.",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "AAU Program Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    quote: "Managing multiple teams is so much easier now. The organizational tools and ability to share reports with all our coaches has been invaluable.",
    rating: 5
  },
  {
    name: "Coach Lisa Chen",
    role: "Assistant Coach, Division I",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    quote: "The defensive scheme detection is phenomenal. We can instantly identify what coverages opponents are running and adjust our game plan accordingly.",
    rating: 5
  },
  {
    name: "Marcus Johnson",
    role: "Video Coordinator",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    quote: "This is the future of basketball analytics. The AI accuracy is impressive, and it saves our staff countless hours every week.",
    rating: 5
  },
  {
    name: "Coach David Park",
    role: "High School Head Coach",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    quote: "Even with a limited budget, CourtIQ gives us pro-level scouting capabilities. It's leveled the playing field for our program.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Trusted by Elite Coaches
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what coaches and trainers are saying about CourtIQ
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 h-full hover:border-orange-500/50 transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-white font-semibold">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
