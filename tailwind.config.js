/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Anton", "Impact", "sans-serif"],
        sans: ["Geist", "system-ui", "sans-serif"],
      },
      colors: {
        // Off-white base system — near-neutral, only a trace of warmth so the
        // gold and red accents stay the only real colour on the page.
        bone: "#FCFBF9",
        cream: "#F5F2EB",
        sand: "#EAE5D9",
        line: "#DFD9CB",

        // Text: warm near-black, never pure #000 on off-white.
        ink: "#1C1613",
        "ink-muted": "#6B6055",
        "ink-faint": "rgba(28,22,19,0.06)",

        // Brand red, sampled from the logo's 3D extrusion (#951515 is the
        // single most common pixel value in the artwork). Primary CTAs and
        // interactive states.
        red: "#951515",
        "red-bright": "#C1201C",
        "red-deep": "#6B0F0F",

        // Brand gold, from the logo's letter faces. `gold` is the decorative
        // fill (sunburst, marks, washes); `gold-deep` is the text-safe amber
        // (≈4.9:1 on bone) used for eyebrows, numerals and hover states.
        gold: "#FDB813",
        "gold-deep": "#A8760A",
        "gold-soft": "#F2D9A0",
      },
      boxShadow: {
        // Warm, soft elevation — the old near-black cinematic shadows read as
        // dirt on a cream ground.
        cinematic: "0 24px 60px -28px rgba(70,45,20,0.30)",
        "cinematic-sm": "0 14px 34px -20px rgba(70,45,20,0.24)",
        "red-glow": "0 18px 44px -18px rgba(149,21,21,0.45)",
      },
      maxWidth: {
        site: "1280px",
        wide: "1000px",
        prose: "680px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};
