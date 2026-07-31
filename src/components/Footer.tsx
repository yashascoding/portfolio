"use client";
import { AnimatedSection } from '@/components/animated'
import { motion } from 'framer-motion'
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons'

function FooterIconLink({ href, target, icon: Icon, label }: { href: string; target?: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <motion.a href={href} target={target} rel={target ? "noopener noreferrer" : undefined}
      className="text-muted-foreground hover:text-foreground transition-colors"
      whileHover={{ y: -3, rotate: -5, scale: 1.1 }} whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }} aria-label={label}>
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <AnimatedSection>
      <footer id="contact" className="py-8 border-t border-border">
        <div className="font-mono text-sm text-muted-foreground mb-4">
          <div>&gt; exit</div>
          <div className="mt-1">Connection closed.</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <FooterIconLink href="https://github.com/yashas-bhagwat" target="_blank" icon={GithubIcon} label="GitHub" />
            <FooterIconLink href="https://linkedin.com/in/yashas-bhagwat" target="_blank" icon={LinkedinIcon} label="LinkedIn" />
            <FooterIconLink href="mailto:yashas@example.com" icon={MailIcon} label="Email" />
          </div>
          <span className="font-mono text-sm text-muted-foreground">© {currentYear}</span>
        </div>
      </footer>
    </AnimatedSection>
  );
}
