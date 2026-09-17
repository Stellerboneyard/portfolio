"use client";

import { useEffect, useState } from "react";
import { sceneState } from "@/lib/sceneState";

const PHASES = ["LOADING FOOTAGE", "CALIBRATING SCROLL", "ALMOST THERE"];

type Stage = "loading" | "gate" | "entered";

// Deliberately not tied to any real asset-load promise -- a short
// choreographed count plus a labeled phase, same spirit as a cinematic boot
// sequence. Driven by setInterval/setTimeout rather than rAF or GSAP: this
// only ever runs once, right when the tab is first opened and definitely
// foregrounded, and a macrotask timer can't get stuck mid-tween the way an
// rAF-driven one can.
export function Loader() {
  const [percent, setPercent] = useState(0);
  const [stage, setStage] = useState<Stage>("loading");

  useEffect(() => {
    if (stage !== "loading") return;
    const interval = setInterval(() => {
      setPercent((p) => Math.min(100, p + 3 + Math.random() * 6));
    }, 45);
    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (percent >= 100 && stage === "loading") {
      const t = setTimeout(() => setStage("gate"), 300);
      return () => clearTimeout(t);
    }
  }, [percent, stage]);

  // safety net: never trap a visitor behind a stalled loader
  useEffect(() => {
    const t = setTimeout(() => setStage((s) => (s === "loading" ? "gate" : s)), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = stage === "entered" ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [stage]);

  if (stage === "entered") return null;

  const phaseIndex = Math.min(PHASES.length - 1, Math.floor((percent / 100) * PHASES.length));

  const enter = () => {
    sceneState.entered = true;
    setStage("entered");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void px-6 text-center"
      aria-live="polite"
    >
      {stage === "loading" ? (
        <>
          <p className="font-mono text-xs tracking-[0.35em] text-mist-soft uppercase">{PHASES[phaseIndex]}</p>
          <p className="mt-6 font-display text-6xl tabular-nums text-mist sm:text-8xl">{Math.floor(percent)}</p>
          <div className="mt-8 h-px w-48 overflow-hidden bg-line sm:w-64">
            <div className="h-full bg-accent transition-[width] duration-150 ease-out" style={{ width: `${percent}%` }} />
          </div>
        </>
      ) : (
        <>
          <p className="font-mono text-[11px] tracking-[0.35em] text-mist-soft uppercase">A portfolio</p>
          <h1 className="mt-5 max-w-lg text-3xl leading-tight text-balance text-mist sm:text-5xl">
            Morning to night, the whole way down.
          </h1>
          <button
            onClick={enter}
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-line px-8 py-3.5 font-mono text-xs tracking-[0.3em] text-mist uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Enter
          </button>
        </>
      )}
    </div>
  );
}
