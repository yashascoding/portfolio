"use client";
import { AnimatedThemeToggler } from '@/registry/magicui/animated-theme-toggler'
import { StickyHeader, useActiveSection } from '@/components/animated'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: "#projects", label: "projects", id: "projects" },
  { href: "#skills", label: "skills", id: "skills" },
  { href: "#contact", label: "contact", id: "contact" },
];

export default function Header() {
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));

  return (
    <StickyHeader>
      <div className="max-w-3xl mx-auto flex items-center justify-between py-5 px-6 sm:px-8 lg:px-4">
        <a href={`${import.meta.env.BASE_URL}`} className="font-mono text-base font-medium hover:opacity-70 transition-opacity">
          yashas bhagwat
        </a>
        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map(({ href, label, id }) => (
            <a
              key={label}
              href={href}
              className={cn(
                "font-mono text-sm transition-colors relative py-1",
                active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
              {active === id && (
                <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-foreground rounded-full" />
              )}
            </a>
          ))}
          <AnimatedThemeToggler />
        </nav>
      </div>
    </StickyHeader>
  );
}
