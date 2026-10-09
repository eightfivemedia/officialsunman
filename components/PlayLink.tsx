"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const DESKTOP = "(min-width: 1024px)";

// A link that leads to the game's page on a desktop and straight into the
// fullscreen game on a phone, where there is no in-page play to land on.
//
// It renders the page URL on the server and narrows to the fullscreen one after
// mount, so without JavaScript — or before hydration — the link still goes
// somewhere real. A plain <a> rather than next/link: the fullscreen URL is a
// rewrite onto the game's own static document, not a route in this app.
export function PlayLink({
  pageHref,
  playHref,
  className,
  children,
}: {
  pageHref: string;
  playHref: string;
  className?: string;
  children: ReactNode;
}) {
  const [href, setHref] = useState(pageHref);

  useEffect(() => {
    if (!window.matchMedia(DESKTOP).matches) setHref(playHref);
  }, [playHref]);

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
