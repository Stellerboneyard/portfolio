"use client";

import { useEffect, useRef } from "react";
import { sceneState } from "@/lib/sceneState";

const FRAME_COUNT = 90;
const frameSrc = (i: number) => `/frames/f-${String(i + 1).padStart(3, "0")}.jpg`;

// Scroll-scrubbed video, done as a preloaded image sequence instead of
// seeking an actual <video> element. Setting video.currentTime on every
// scroll tick stutters badly: seeking a compressed (H.264) video usually
// means decoding forward from the last keyframe, too slow to keep up with
// rapid scroll-driven seeks. A frame sequence has no decode cost at draw
// time -- each frame is a fully-decoded image sitting in memory.
//
// On top of that, snapping to the single nearest of only 90 frames is
// visible as a step for a *small* scroll nudge (a tiny scroll can still
// cross a whole frame boundary and jump). So the draw is a cross-dissolve
// between the two frames straddling the exact scroll position -- frame idx
// drawn opaque, frame idx+1 drawn over it at the fractional-position alpha
// -- which makes every in-between scroll position visibly distinct instead
// of only the 90 sampled ones, so it reads as continuous motion rather than
// discrete steps even for sub-frame scroll deltas.
export function FrameScrollLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadedRef = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));
  const lastPosRef = useRef(-1);
  const lastGoodIndexRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      img.onload = () => {
        loadedRef.current[i] = true;
      };
      images.push(img);
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
    };

    // object-fit: cover math -- scale the image up to fill the canvas on
    // whichever axis is the tighter fit, then center-crop the other axis
    const drawOne = (img: HTMLImageElement, alpha: number) => {
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let dw = canvas.width;
      let dh = canvas.height;
      let dx = 0;
      let dy = 0;
      if (imgRatio > canvasRatio) {
        dh = canvas.height;
        dw = dh * imgRatio;
        dx = (canvas.width - dw) / 2;
      } else {
        dw = canvas.width;
        dh = dw / imgRatio;
        dy = (canvas.height - dh) / 2;
      }
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.globalAlpha = 1;
    };

    // finds the nearest loaded frame to `from`, searching outward -- used
    // whenever the exact frame(s) a position calls for haven't finished
    // loading yet, so the picture still moves instead of freezing on frame 0
    const nearestLoaded = (from: number) => {
      for (let offset = 0; offset < FRAME_COUNT; offset++) {
        const lo = from - offset;
        const hi = from + offset;
        if (lo >= 0 && loadedRef.current[lo]) return lo;
        if (hi < FRAME_COUNT && loadedRef.current[hi]) return hi;
      }
      return -1;
    };

    const renderAt = (pos: number) => {
      const idx = Math.floor(pos);
      const nextIdx = Math.min(idx + 1, FRAME_COUNT - 1);
      const frac = idx === nextIdx ? 0 : pos - idx;

      resize();

      const idxReady = loadedRef.current[idx];
      const nextReady = loadedRef.current[nextIdx];

      if (idxReady && nextReady) {
        drawOne(images[idx], 1);
        if (frac > 0) drawOne(images[nextIdx], frac);
        lastGoodIndexRef.current = idx;
      } else if (idxReady) {
        drawOne(images[idx], 1);
        lastGoodIndexRef.current = idx;
      } else if (nextReady) {
        drawOne(images[nextIdx], 1);
        lastGoodIndexRef.current = nextIdx;
      } else {
        const fallback = nearestLoaded(idx);
        if (fallback !== -1) {
          drawOne(images[fallback], 1);
          lastGoodIndexRef.current = fallback;
        }
        // nothing loaded at all yet -- leave the canvas as-is rather than
        // drawing nothing meaningful
      }
    };

    let raf = 0;
    const tick = () => {
      const pos = sceneState.scrollFraction * (FRAME_COUNT - 1);
      // redraw on any sub-pixel-of-scroll change, not just whole-frame steps
      if (Math.abs(pos - lastPosRef.current) > 0.001) {
        renderAt(pos);
        lastPosRef.current = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // as frames finish loading in, re-render the current position so a
    // frame that just landed (and is part of the active blend) shows up
    // immediately instead of waiting for the next scroll event
    const onAnyLoad = () => {
      if (lastPosRef.current >= 0) renderAt(lastPosRef.current);
    };
    images.forEach((img) => img.addEventListener("load", onAnyLoad));

    const onResize = () => {
      if (lastPosRef.current >= 0) renderAt(lastPosRef.current);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      images.forEach((img) => img.removeEventListener("load", onAnyLoad));
    };
  }, []);

  return (
    <div className="video-layer">
      <canvas ref={canvasRef} />
      <div className="video-scrim" />
    </div>
  );
}
