"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const AnimatedThemeToggler = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const [theme, setTheme] = React.useState<"light" | "dark">("light");
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
      const stored = localStorage.getItem("theme") as "light" | "dark" | null;
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = stored || (systemDark ? "dark" : "light");
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    }, []);

    const toggleTheme = () => {
      const next = theme === "light" ? "dark" : "light";
      setTheme(next);
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    };

    if (!mounted) {
      return (
        <button ref={ref} className={cn("relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent", className)} {...props}>
          <Sun className="h-4 w-4" />
        </button>
      );
    }

    return (
      <button ref={ref} onClick={toggleTheme}
        className={cn("relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent", className)}
        aria-label="Toggle theme" {...props}>
        <Sun className={cn("absolute h-4 w-4 transition-all duration-300", theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
        <Moon className={cn("absolute h-4 w-4 transition-all duration-300", theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")} />
      </button>
    );
  }
);
AnimatedThemeToggler.displayName = "AnimatedThemeToggler";

export { AnimatedThemeToggler };
