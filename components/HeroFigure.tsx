"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { HERO_TURN } from "@/lib/data";

// Scroll-scrubbed turnaround. Nothing animates on its own — the frame shown is
// bound to how far the hero has scrolled, so he turns as you go down and
// unwinds coming back up.
//
// Frames are drawn to a canvas, which preserves WebP's alpha so the sunburst
// stays visible behind him.
export function HeroTurn({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const target = useRef(0);
  const eased = useRef(0);
  const drawn = useRef(-1);
  const [ready, setReady] = useState(false);

  // Progress across the whole hero: 0 at the top, 1 once it has scrolled out.
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", () => {
    const el = canvasRef.current?.closest("section");
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.min(Math.max(-r.top / Math.max(r.height, 1), 0), 1);
    target.current = p * (HERO_TURN.count - 1);
  });

  useEffect(() => {
    let cancelled = false;

    function draw(i: number) {
      const canvas = canvasRef.current;
      const img = frames.current[i];
      if (!canvas || !img?.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      drawn.current = i;
    }

    frames.current = Array.from({ length: HERO_TURN.count }, (_, i) => {
      const img = new Image();
      img.src = HERO_TURN.src(i);
      if (i === 0) {
        img.onload = () => {
          if (cancelled) return;
          setReady(true);
          draw(0);
        };
      }
      return img;
    });

    // Reduced motion: hold on the first frame, no scrubbing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        cancelled = true;
      };
    }

    let raf = 0;
    const tick = () => {
      const d = target.current - eased.current;
      if (Math.abs(d) > 0.01) eased.current += d * 0.16;
      const i = Math.round(eased.current);
      if (i !== drawn.current) draw(i);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={HERO_TURN.width}
      height={HERO_TURN.height}
      aria-hidden
      className={`w-auto max-w-none transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}

// Sunburst motif behind the hero. No warm gradient wash here — the hero is
// plain bone so the figure and type carry it. Kept restrained because the matte
// leaves his hair partially transparent, and a bright backdrop shines through.
export function HeroBackdrop() {
  return (
    <div className="edge-fade pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[125vh] w-[125vh] -translate-x-1/2 -translate-y-1/2">
        <div className="sunburst animate-spin-slow h-full w-full rounded-full opacity-30" />
      </div>
    </div>
  );
}
