"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

// Gentle fade-up as the element scrolls into view.
//
// The hidden state lives in CSS behind a `.js` class (see globals.css), not in
// this component's markup. That matters: a JS-driven `opacity: 0` ships in the
// SSR HTML, so a hydration failure leaves the content permanently invisible.
// Here the server renders everything visible and JS only opts into hiding it.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-in");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }

    // Generous margin so the reveal fires just before the element arrives.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    io.observe(el);

    // Safety net. A masonry grid re-packs when its images finish decoding,
    // which moves tiles without any scroll — an IntersectionObserver can miss
    // that and leave a tile stuck at opacity 0 forever. Re-check on resize and
    // once shortly after mount, so content can never be trapped invisible.
    const recheck = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 200 && r.bottom > -200) {
        show();
        io.disconnect();
      }
    };
    const timer = window.setTimeout(recheck, 1200);
    window.addEventListener("resize", recheck, { passive: true });

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("resize", recheck);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
