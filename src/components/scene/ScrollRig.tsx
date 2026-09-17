"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { sceneState, DAY_ARC } from "@/lib/sceneState";
import { lerpHex } from "@/lib/color";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Drives sceneState.scrollFraction purely from live scroll position (scrub,
// never a duration-based tween tied to visibility): a GSAP tween that runs
// independently of its trigger can freeze mid-flight if the tab loses focus
// mid-animation. A scrub value can't get stuck like that because it has no
// "duration" of its own -- it's always exactly wherever the actual
// scrollbar is, every tick. VideoScrollLayer reads this same value to
// scrub the footage, so the video and the accent color never drift apart.
//
// Lenis sits underneath all of this purely as an input filter: it still
// drives the real window.scrollY (default mode, no virtual scroller), just
// spring-eased instead of jumping in raw wheel deltas -- so ScrollTrigger
// and the native `scroll` event all keep working exactly as before. It's
// what makes the scroll itself feel liquid rather than stepped.
export function ScrollRig() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = reduced
      ? null
      : new Lenis({
          duration: 1.05,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          smoothWheel: true,
        });

    const onTick = (time: number) => lenis?.raf(time * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
    }

    const lastIdx = DAY_ARC.length - 1;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        sceneState.scrollFraction = self.progress;

        const pos = self.progress * lastIdx;
        const idx = Math.min(Math.floor(pos), lastIdx);
        const nextIdx = Math.min(idx + 1, lastIdx);
        const frac = idx === nextIdx ? 0 : pos - idx;
        const accent = lerpHex(DAY_ARC[idx].accent, DAY_ARC[nextIdx].accent, frac);
        document.documentElement.style.setProperty("--color-accent", accent);
      },
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      trigger.kill();
      if (lenis) {
        gsap.ticker.remove(onTick);
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
