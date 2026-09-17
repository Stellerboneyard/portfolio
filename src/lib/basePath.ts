// Mirrors next.config.ts's basePath logic. Next.js only rewrites paths
// automatically for next/image, next/link, and next/script -- a plain
// `new Image().src = "/frames/..."` (what FrameScrollLayer uses to preload
// the canvas frame sequence) needs the prefix added by hand, or every frame
// 404s once this is deployed under GitHub Pages' /portfolio/ project-site
// path instead of served from the domain root.
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/portfolio" : "";
