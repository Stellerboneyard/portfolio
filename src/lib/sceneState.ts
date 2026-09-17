// Shared, plain-mutable scroll state. Deliberately not React state: ScrollRig
// writes to it every scrub tick from the user's actual scroll position, and
// consumers (VideoScrollLayer's rAF loop, the accent-color interpolation)
// read it fresh every frame. Nothing here is animated "toward a target"
// independently of its own live source, so nothing can freeze mid-transition
// if a frame gets skipped -- it just picks up wherever scroll currently is.
export type DayStop = {
  name: string;
  accent: string; // hex, drives --color-accent to track the video's mood
};

// Traces the same morning-to-night arc as the video: dawn coral -> midday
// gold -> dusk amber -> night indigo.
export const DAY_ARC: DayStop[] = [
  { name: "dawn", accent: "#e8a06a" },
  { name: "midday", accent: "#f0d089" },
  { name: "dusk", accent: "#d97a4a" },
  { name: "night", accent: "#6f6fae" },
];

export const sceneState = {
  // 0..1 overall page scroll fraction -- drives the video scrub position and
  // the accent color arc
  scrollFraction: 0,
  // becomes true only after the loader's "Enter" gesture
  entered: false,
};
