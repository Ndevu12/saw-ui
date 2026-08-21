/**
 * The product name, set inline as what it is — a command. `saw` is also an English
 * word, so a bare run of it in prose stutter-reads; the mono face (the same one the
 * terminal deck paints) disambiguates it and ties every mention to the CLI identity.
 *
 * The treatment lives in the `.brandmark` utility so it is defined once; this
 * component only chooses the colour. `accent` (mint) is reserved for the single
 * hero mention where the name is the star — everywhere else it stays ink-strong so
 * the accent does not go noisy.
 */
export function Saw({ accent = false, className = '' }: { accent?: boolean; className?: string }) {
  return (
    <span className={`brandmark ${accent ? 'text-mint' : 'text-ink-strong'} ${className}`}>saw</span>
  );
}
