const WORDS = [
  "Over 40 Years",
  "The Original",
  "Rulers of the Sun",
  "Before It Was Mainstream",
  "Royal African Ancestry",
];

export function Marquee() {
  return (
    <div className="bg-bone py-5 overflow-hidden">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {WORDS.map((w) => (
              <span key={w} className="flex items-center">
                <span className="font-display text-2xl tracking-wide text-ink/70 md:text-3xl">
                  {w}
                </span>
                <span className="mx-8 h-1.5 w-1.5 rotate-45 bg-gold md:mx-12" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
