import { useState, type ReactNode } from "react";

// Clamp to three lines on mobile until expanded; never clamps from sm up.
export const mobileClamp = (expanded: boolean) =>
  expanded ? "" : "line-clamp-3 sm:line-clamp-none";

interface ReadMoreProps {
  // Renders the content for the current state, e.g. using mobileClamp.
  children: (expanded: boolean) => ReactNode;
  buttonClassName?: string;
}

// Collapsible content with a "Read more" toggle shown only on mobile;
// larger screens always show everything.
export function ReadMore({ children, buttonClassName = "" }: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {children(expanded)}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className={`sm:hidden mt-1 font-medium text-[#7a9fa0] hover:text-teal-light text-sm transition-colors duration-200 ${buttonClassName}`}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </>
  );
}
