"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StickyHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={cn("w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-300", scrolled && "shadow-sm", className)}>
      {children}
    </header>
  );
}
