"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "top", label: "Hello" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "focus", label: "Focus" },
  { id: "contact", label: "Contact" },
];

// Tracks which section is active via IntersectionObserver rather than
// deriving it from sceneState.scrollFraction math -- section boundaries
// don't line up evenly with the 0..1 morph range, so watching the actual
// DOM sections stays correct even if a section's height changes later.
export function ChapterNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="content-layer pointer-events-none fixed inset-y-0 right-6 z-20 hidden flex-col items-end justify-center gap-3 sm:right-10 md:flex"
      aria-label="Chapter navigation"
    >
      {CHAPTERS.map((c) => (
        <button
          key={c.id}
          onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="pointer-events-auto group flex items-center gap-3"
          aria-current={active === c.id}
        >
          <span
            className={`font-mono text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 ${
              active === c.id ? "text-accent" : "text-mist-soft group-hover:text-mist"
            }`}
          >
            {c.label}
          </span>
          <span
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              active === c.id ? "scale-125 bg-accent" : "bg-mist-soft group-hover:bg-mist"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
