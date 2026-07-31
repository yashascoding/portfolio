"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { BlinkingCursor } from "./BlinkingCursor";

interface Line { type: "input" | "output" | "error" | "success" | "info"; text: string }

const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    { type: "info", text: "Available Commands:" },
    { type: "output", text: "" },
    { type: "output", text: "  projects    - View my projects" },
    { type: "output", text: "  skills      - View my skills" },
    { type: "output", text: "  resume      - Download resume" },
    { type: "output", text: "  github      - Open GitHub profile" },
    { type: "output", text: "  linkedin    - Open LinkedIn profile" },
    { type: "output", text: "  contact     - Get contact info" },
    { type: "output", text: "  clear       - Clear terminal" },
  ],
  projects: () => [
    { type: "info", text: "Projects:" },
    { type: "output", text: "" },
    { type: "success", text: "  ✔ URL Shortener" },
    { type: "output", text: "    Node.js, PostgreSQL, Express" },
    { type: "output", text: "" },
    { type: "success", text: "  ✔ Go Moto" },
    { type: "output", text: "    React, Express, Node.js, MongoDB" },
  ],
  skills: () => [
    { type: "info", text: "Skills:" },
    { type: "output", text: "" },
    { type: "output", text: "  Languages:  C, C++, Java, Python, JavaScript" },
    { type: "output", text: "  Frameworks: React, Node.js, Express" },
    { type: "output", text: "  Tools:      Git, GitHub, Docker, Postman, Linux" },
    { type: "output", text: "  Databases:  MySQL, MongoDB, PostgreSQL" },
  ],
  resume: () => [{ type: "success", text: "Opening resume..." }, { type: "info", text: "Download: yashas_resume_JUL_4.pdf" }],
  github: () => [{ type: "success", text: "Opening GitHub profile..." }, { type: "info", text: "https://github.com/yashas-bhagwat" }],
  linkedin: () => [{ type: "success", text: "Opening LinkedIn profile..." }, { type: "info", text: "https://linkedin.com/in/yashas-bhagwat" }],
  contact: () => [
    { type: "info", text: "Contact:" },
    { type: "output", text: "" },
    { type: "output", text: "  Email: yashas@example.com" },
    { type: "output", text: "  GitHub: github.com/yashas-bhagwat" },
    { type: "output", text: "  LinkedIn: linkedin.com/in/yashas-bhagwat" },
  ],
  clear: () => [],
  "sudo hire yashas": () => [
    { type: "success", text: "Access Granted." },
    { type: "output", text: "" },
    { type: "info", text: "Downloading Resume..." },
    { type: "output", text: "" },
    { type: "success", text: "Thank you for visiting!" },
  ],
};

const INTRO: Line[] = [
  { type: "input", text: "> whoami" },
  { type: "success", text: "✔ Name: Yashas Bhagwat" },
  { type: "success", text: "✔ Role: Computer Science Student" },
  { type: "input", text: "" },
  { type: "input", text: "> cat about.txt" },
  { type: "output", text: "Computer Science undergraduate with a strong foundation in Java, Python, Data Structures, Operating Systems, and Computer Networks. Passionate about software development and problem-solving, with hands-on experience building academic and personal projects." },
  { type: "input", text: "" },
  { type: "input", text: "> ls skills/" },
  { type: "info", text: "ℹ Languages: C, C++, Java, Python, JavaScript" },
  { type: "info", text: "ℹ Frameworks: React, Node.js, Express" },
  { type: "info", text: "ℹ Tools: Git, GitHub, Docker, Postman, Linux" },
  { type: "input", text: "" },
  { type: "success", text: "Success! Ready to build something great." },
  { type: "output", text: "" },
  { type: "output", text: 'Type "help" for available commands.' },
];

function LineView({ line }: { line: Line }) {
  if (!line || typeof line.text === "undefined") return null;
  const c = line.type === "success" ? "text-green-500" : line.type === "error" ? "text-red-500" : line.type === "info" ? "text-blue-500" : line.type === "input" ? "text-foreground" : "text-muted-foreground";
  return <div className={cn("font-mono leading-relaxed", c)}>{line.text}</div>;
}

export function InteractiveTerminal({ className }: { className?: string }) {
  const [shown, setShown] = useState<Line[]>([]);
  const [hist, setHist] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    const t = setInterval(() => {
      if (idx.current < INTRO.length) {
        const line = INTRO[idx.current];
        if (line) setShown((p) => [...p, line]);
        idx.current++;
      } else {
        clearInterval(t);
        setDone(true);
      }
    }, 80);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { box.current?.scrollTo(0, box.current.scrollHeight); }, [shown, hist]);

  const submit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (cmd === "clear") { setHist([]); setInput(""); return; }
    const out = COMMANDS[cmd.trim().toLowerCase()]?.() ?? [{ type: "error" as const, text: `Command not found: ${cmd}. Type "help" for available commands.` }];
    setHist((p) => [...p, { type: "input", text: `> ${cmd}` }, ...out]);
    setInput("");
  }, [input]);

  return (
    <div className={cn("rounded-md border border-border bg-background font-mono text-sm overflow-hidden", className)} onClick={() => ref.current?.focus()}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
      </div>
      <div ref={box} className="p-4 max-h-[400px] overflow-y-auto">
        {shown.map((l, i) => <LineView key={`s${i}`} line={l} />)}
        {hist.map((l, i) => <LineView key={`h${i}`} line={l} />)}
        {done && (
          <form onSubmit={submit} className="flex items-center">
            <span className="text-foreground/70 mr-1">&gt;</span>
            <input ref={ref} type="text" value={input} onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground font-mono" autoFocus aria-label="Terminal input" />
            <BlinkingCursor />
          </form>
        )}
      </div>
    </div>
  );
}
