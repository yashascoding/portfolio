"use client";
import { useEffect, useState } from "react";

export function Cursor() {
  const [ready, setReady] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    document.body.style.cursor = "none";
    let targetX = -100, targetY = -100;
    let curX = -100, curY = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => { targetX = e.clientX; targetY = e.clientY; if (!ready) setReady(true); };
    const animate = () => {
      curX += (targetX - curX) * 0.15;
      curY += (targetY - curY) * 0.15;
      setPos({ x: targetX, y: targetY });
      setTrail({ x: curX, y: curY });
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); document.body.style.cursor = ""; cancelAnimationFrame(raf); };
  }, []);

  if (!ready) return null;

  return (
    <>
      <div className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{ left: pos.x - 5, top: pos.y - 5, width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ededed" }} />
      <div className="pointer-events-none fixed z-[9998] mix-blend-difference"
        style={{ left: trail.x - 20, top: trail.y - 20, width: 40, height: 40, borderRadius: "50%", border: "1.5px solid #ededed", opacity: 0.4 }} />
    </>
  );
}
