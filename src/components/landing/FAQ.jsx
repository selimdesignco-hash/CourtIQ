import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useAccordionState } from "../ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What types of videos can I upload?",
    answer: "CourtIQ accepts YouTube links, direct MP4 uploads, and most common video formats (MOV, AVI, etc.). We support footage from any source - broadcast games, hudl recordings, phone recordings, or professional game film."
  },
  {
    question: "Does CourtIQ work with youth, high school, and college basketball?",
    answer: "Absolutely! Our AI is trained on basketball at all levels. Whether you're coaching youth rec league, high school varsity, AAU, prep school, or college, CourtIQ delivers accurate analysis tailored to your level of play."
  },
  {
    question: "How accurate is the AI analysis?",
    answer: "CourtIQ maintains a 99% accuracy rate for player tracking and play detection. Our computer vision models are specifically trained on basketball footage and continuously improve. Any detected errors can be manually corrected in the interface."
  },
  {
    question: "Can I export and share reports?",
    answer: "Yes! Every scouting report can be exported as a professional PDF with your team's branding. You can share these reports with your coaching staff, send them to players, or print them for game preparation."
  },
  {
    question: "How long does it take to analyze a game?",
    answer: "Analysis time depends on video length and quality, but most full games are processed in 10-15 minutes. You'll receive real-time updates as the AI identifies players, tracks possessions, and detects plays."
  },
  {
    question: "Do I need any special equipment or software?",
    answer: "No special equipment needed! CourtIQ is a web-based platform that works on any modern browser. All you need is your game footage and an internet connection."
  },
  {
    question: "Can multiple coaches access the same account?",
    answer: "Yes, with our Team and Program plans, you can add multiple coaches to your account. Each coach can upload footage, view reports, and add their own notes and analysis."
  },
  {
    question: "What if the AI makes a mistake?",
    answer: "Our interface allows you to manually correct any detected plays, player assignments, or statistics. Your corrections also help improve our AI models for future analysis."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All plans include a 14-day free trial with full access to all features. No credit card required to start. You can analyze multiple games during your trial to see the full power of CourtIQ."
  },
  {
    question: "How is this different from Hudl or Synergy?",
    answer: "CourtIQ focuses specifically on AI-powered scouting automation. While other platforms require manual tagging and breakdown, our AI does the heavy lifting automatically, saving you hours of work while providing equally detailed insights."
  }
];

function FaqItem({ faq, defaultOpen = false }) {
  const { open, toggle } = useAccordionState(defaultOpen);

  return (
    <AccordionItem
      value={faq.question}
      className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl px-6 hover:border-orange-500/50 transition-colors"
    >
      <AccordionTrigger
        onToggle={toggle}
        className="text-left text-white hover:text-orange-400 transition-colors py-6"
      >
        {faq.question}
      </AccordionTrigger>
      <AccordionContent open={open} className="text-gray-400 pb-6 leading-relaxed">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  );
}

export default function FAQ() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about CourtIQ
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={faq.question} faq={faq} defaultOpen={index === 0} />
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a 
            href="mailto:support@courtiq.ai" 
            className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
          >
            Contact our team →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
