"use client";
import { AnimatedSection } from '@/components/animated'
import { motion } from 'framer-motion'

const skillCategories = [
  { title: 'Programming Languages', skills: ['C', 'C++', 'Java', 'Python', 'JavaScript'] },
  { title: 'Frameworks & Libraries', skills: ['React', 'Node.js', 'Express'] },
  { title: 'Tools & Platforms', skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Linux'] },
  { title: 'Databases', skills: ['MySQL', 'MongoDB', 'PostgreSQL'] },
];

export default function Skills() {
  return (
    <AnimatedSection>
      <section id="skills" className="py-10 md:py-12 border-t border-border">
        <AnimatedSection delay={0.1}>
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">Skills</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
          {skillCategories.map((category, ci) => (
            <AnimatedSection key={category.title} delay={0.15 + ci * 0.08}>
              <div>
                <h3 className="font-semibold text-base mb-2">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span key={skill} className="font-mono text-sm text-muted-foreground border border-border rounded px-2.5 py-1 bg-muted/30"
                      whileHover={{ scale: 1.08, backgroundColor: "rgba(120,120,120,0.1)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
