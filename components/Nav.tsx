"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import { Logo } from "./Logo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // A Home link on every page except home itself, where it would just point at
  // the page you're already on. The logo links home too, but that isn't
  // obvious to everyone.
  const links =
    pathname === "/"
      ? NAV_LINKS
      : [{ label: "Home", href: "/" }, ...NAV_LINKS];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "border-b border-line/70 bg-bone/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-site items-center justify-between px-5 py-3.5 md:px-8">
          <Link href="/" aria-label="Sun-Man — home" className="shrink-0">
            <Logo
              variant="wordmark"
              priority
              className="h-9 transition-transform duration-300 hover:scale-[1.03] md:h-11"
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-muted transition-colors duration-300 hover:text-red"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/get"
            className="group hidden items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-bone transition-all duration-300 ease-smooth hover:bg-red-bright hover:shadow-red-glow active:scale-[0.97] lg:inline-flex"
          >
            Buy Now
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bone/20 transition-transform duration-300 group-hover:translate-x-0.5">
              <Arrow />
            </span>
          </Link>

          {/* Mobile hamburger -> X */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-50 h-8 w-8 lg:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              className="absolute left-1 right-1 top-1/2 block h-[2px] rounded bg-ink"
            />
            <motion.span
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              className="absolute left-1 right-1 top-1/2 block h-[2px] rounded bg-ink"
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-bone/95 backdrop-blur-2xl lg:hidden"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl tracking-wide text-ink transition-colors duration-300 hover:text-red"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link
              href="/get"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-red px-8 py-3 font-display text-2xl tracking-wide text-bone"
            >
              Buy Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden>
      <path
        d="M3 8h9M8 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
