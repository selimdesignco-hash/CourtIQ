import React from 'react';
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter Coach",
    price: "$19",
    period: "/month",
    description: "Perfect for individual coaches getting started",
    features: [
      "10 game reports per month",
      "Basic player tracking",
      "Shot charts & stats",
      "PDF exports",
      "Email support"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Team Package",
    price: "$49",
    period: "/month",
    description: "For varsity teams and club programs",
    features: [
      "Unlimited game reports",
      "Advanced play detection",
      "Defensive scheme analysis",
      "Multiple coach access",
      "Custom branding",
      "Priority support"
    ],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Program / Club",
    price: "$99",
    period: "/month",
    description: "Elite programs with multiple teams",
    features: [
      "Everything in Team Package",
      "Unlimited coaches & players",
      "API access",
      "Custom integrations",
      "White-label option",
      "Dedicated account manager",
      "On-site training"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export default function Pricing() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start with a free trial. No credit card required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`relative h-full bg-gradient-to-b from-gray-900 to-black border rounded-2xl p-8 transition-all duration-300 ${
                plan.popular 
                  ? 'border-orange-500 shadow-xl shadow-orange-500/20 scale-105' 
                  : 'border-gray-800 hover:border-gray-700'
              }`}>
                {/* Plan name */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full mb-8 py-6 rounded-xl font-bold ${
                    plan.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>

                {/* Features */}
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Check className="w-5 h-5 text-orange-500" />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500">
            All plans include 14-day free trial • Cancel anytime • No hidden fees
          </p>
        </motion.div>
      </div>
    </section>
  );
}
