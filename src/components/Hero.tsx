"use client";
import { DitherShader } from '@/components/ui/dither-shader'
import { InteractiveTerminal } from '@/components/animated'
import { motion } from 'framer-motion'
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons'

function SocialIconLink({ href, target, icon: Icon, label }: { href: string; target?: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <motion.a href={href} target={target} rel={target ? "noopener noreferrer" : undefined}
      className="text-muted-foreground hover:text-foreground transition-colors"
      whileHover={{ y: -3, rotate: 5, scale: 1.1 }} whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }} aria-label={label}>
      <Icon className="w-6 h-6" />
    </motion.a>
  );
}

export default function Hero() {
  return (
    <section className="pt-14 pb-10 md:pt-16 md:pb-12">
      <div className="flex flex-col sm:flex-row sm:items-start gap-8">
        <div className="w-36 h-36 sm:w-40 sm:h-40 border-2 border-foreground/10 flex items-center justify-center shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 overflow-hidden bg-muted">
            <DitherShader src="/my_face.png" gridSize={1} ditherMode="bayer" colorMode="duotone"
              primaryColor="#000000" secondaryColor="#ffffff" backgroundColor="#ffffff" threshold={0.5} objectFit="contain" className="h-full w-full" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <InteractiveTerminal className="max-w-[580px]" />
          <div className="flex items-center gap-5 mt-6">
            <SocialIconLink href="https://github.com/yashascoding" target="_blank" icon={GithubIcon} label="GitHub" />
            <SocialIconLink href="https://linkedin.com/in/yashas-bhagwat" target="_blank" icon={LinkedinIcon} label="LinkedIn" />
            <SocialIconLink href="mailto:yashas@example.com" icon={MailIcon} label="Email" />
          </div>
        </div>
      </div>
    </section>
  );
}
