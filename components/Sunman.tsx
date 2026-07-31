// The brand name with its trademark mark set as a superscript at the word's
// top right. Using a component keeps the sizing and offset identical wherever
// the name appears, rather than scattering literal ™ characters through copy.
export function Sunman({ className }: { className?: string }) {
  return (
    <span className={`whitespace-nowrap ${className ?? ""}`}>
      Sun-Man
      <sup className="ml-[0.06em] align-super text-[0.52em] font-medium tracking-normal">
        ™
      </sup>
    </span>
  );
}

// Renders a plain string, swapping every "Sun-Man" for the marked-up name.
// Lets copy stay as strings in lib/data.ts instead of becoming JSX.
export function withTM(text: string) {
  const parts = text.split("Sun-Man");
  return parts.map((part, i) => (
    <span key={i}>
      {i > 0 && <Sunman />}
      {part}
    </span>
  ));
}
