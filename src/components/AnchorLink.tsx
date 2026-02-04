import React from "react";

type AnchorLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  toId: string;
  children: React.ReactNode;
};

/**
 * Smooth in-app anchor link:
 * - prevents default jump
 * - sets hash via history API
 * - triggers a hashchange event so our highlighter runs
 */
export function AnchorLink({ toId, children, ...props }: AnchorLinkProps) {
  const href = `#${encodeURIComponent(toId)}`;

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();

        const newHash = `#${encodeURIComponent(toId)}`;

        // Update URL without default jump
        if (window.location.hash !== newHash) {
          history.pushState(null, "", newHash);
        } else {
          // If clicking the same hash again, still re-trigger highlight
          history.replaceState(null, "", newHash);
        }

        // Trigger our listener even when hash doesn't "change"
        window.dispatchEvent(new Event("hashchange"));
      }}
      {...props}
    >
      {children}
    </a>
  );
}
