/**
 * A link that leaves the site. Always opens in a new tab and drops the referrer/opener
 * so the site's "loads nothing, tells no one" posture holds even on click-through.
 * Internal anchors (e.g. #main) use a plain <a>, not this.
 */
export function ExtLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
