"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Palette, Shield, Rocket, LineChart, Clock
} from 'lucide-react';

const capabilities = [
  {
    icon: <Palette className="w-7 h-7" />,
    title: "Design That Converts",
    description: "Every pixel serves a purpose. We create interfaces that don't just look premium — they guide users to take action, boosting your conversion rates.",
    tags: ["UI/UX Design", "Brand Identity", "Design Systems"],
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Lightning-Fast Performance",
    description: "Sub-second load times. We build with Next.js, React, and modern tooling so your site scores 95+ on Core Web Vitals — which means better SEO and happier users.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: <Rocket className="w-7 h-7" />,
    title: "Ship in Weeks, Not Months",
    description: "From first call to production in as little as 2–4 weeks. We move fast with clear milestones so you can launch and start growing sooner.",
    tags: ["Agile Delivery", "Vercel", "CI/CD"],
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Built to Scale",
    description: "Clean architecture and reliable backends mean your product handles 10 users or 10,000 without breaking a sweat. We plan for your growth from day one.",
    tags: ["Node.js", "PostgreSQL", "REST APIs"],
  },
  {
    icon: <LineChart className="w-7 h-7" />,
    title: "SEO & Analytics Baked In",
    description: "Every site launches with proper meta tags, structured data, and performance tuning. You'll rank higher and understand your traffic from day one.",
    tags: ["SEO", "Core Web Vitals", "Analytics"],
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: "Ongoing Support",
    description: "Launch is just the beginning. We offer maintenance plans and priority support so your product stays fast, secure, and up to date.",
    tags: ["Maintenance", "Updates", "Priority Support"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-32 w-full relative z-10 overflow-hidden text-left">
      <div className="w-full mx-auto px-6 sm:px-8 md:px-12 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.2 }}
           className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Why <span className="text-gradient">Us</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">We don't just write code — we solve business problems. Here's what you get when you work with UNIMITY.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group glass rounded-3xl p-8 flex flex-col h-full border hover:border-white/20 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 text-white group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                {cap.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white tracking-tight mb-3 font-display">{cap.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{cap.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[11px] uppercase tracking-wider font-medium text-gray-500 bg-white/5 rounded-full border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background handled dynamically by layout's DynamicBackground component */}
    </section>
  );
};

export default Skills;