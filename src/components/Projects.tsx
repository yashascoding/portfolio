"use client";
import { useEffect, useState } from "react";
import { AnimatedSection } from '@/components/animated'
import { SpotlightCard } from '@/components/animated'
import { motion } from 'framer-motion'
import { GithubIcon, ExternalLinkIcon } from './Icons'

const projects = [
  {
    title: 'URL Shortener',
    description: 'Built a RESTful URL Shortening Service using Node.js, Express.js, and PostgreSQL, with JWT-based authentication and bcrypt password hashing for secure user access. Developed CRUD REST APIs for URL creation, management, automatic redirection, and click analytics.',
    technologies: ['Node.js', 'PostgreSQL', 'Express'],
    github: 'https://github.com/yashas-bhagwat/url-shortener',
    website: '#',
  },
  {
    title: 'Go Moto',
    description: 'Developed a full-stack ride booking platform with secure user authentication, ride search, booking management, and responsive UI. Implemented JWT-based authentication and authorization, enabling secure login, registration, and protected user routes.',
    technologies: ['React', 'Express', 'Node.js', 'MongoDB'],
    github: 'https://github.com/yashas-bhagwat/go-moto',
    website: '#',
  },
]

function TechBadge({ tech }: { tech: string }) {
  return (
    <motion.span className="font-mono text-xs text-muted-foreground border border-border rounded px-2 py-0.5 bg-muted/50"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(120,120,120,0.1)" }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}>
      {tech}
    </motion.span>
  );
}

function ProjectIconLink({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground transition-colors"
      whileHover={{ y: -2, scale: 1.15 }} whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }} aria-label={label}>
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}

export default function Projects() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatedSection>
      <section id="projects" className="py-10 md:py-12 border-t border-border">
        <AnimatedSection delay={0.1}>
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Projects</h2>
          <p className="text-muted-foreground mb-6">Some of the projects I've been building.</p>
        </AnimatedSection>
        <div className="space-y-4">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={0.15 + i * 0.1}>
              <SpotlightCard className="rounded-lg border border-border bg-card">
                <motion.div className="p-6" whileHover={{ y: -6, boxShadow: isDark ? "0 8px 30px rgba(255,255,255,0.06)" : "0 8px 30px rgba(0,0,0,0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-card-foreground">{project.title}</h3>
                    <div className="flex items-center gap-3 shrink-0">
                      <ProjectIconLink href={project.github} icon={GithubIcon} label={`${project.title} GitHub`} />
                      <ProjectIconLink href={project.website} icon={ExternalLinkIcon} label={`${project.title} Website`} />
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => <TechBadge key={tech} tech={tech} />)}
                  </div>
                </motion.div>
              </SpotlightCard>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
