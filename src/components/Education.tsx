"use client";
import { AnimatedSection } from '@/components/animated'

export default function Education() {
  return (
    <AnimatedSection>
      <section className="py-10 md:py-12 border-t border-border">
        <AnimatedSection delay={0.1}>
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">Education</h2>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
              <h3 className="font-semibold text-base">BMS College of Engineering</h3>
              <span className="font-mono text-sm text-muted-foreground shrink-0">Oct 2024 - Jul 2028</span>
            </div>
            <p className="text-muted-foreground mb-1">Bangalore</p>
            <p className="text-muted-foreground mb-2">Bachelor of Engineering in Computer Science and Data Science</p>
            <p className="font-mono text-sm text-muted-foreground">CGPA: 8.85</p>
          </div>
        </AnimatedSection>
      </section>
    </AnimatedSection>
  );
}
