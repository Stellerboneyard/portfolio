import type { NextConfig } from "next";

// Static export for GitHub Pages -- no server, so `output: "export"` and no
// next/image optimization (unused here anyway; frames are drawn to canvas).
// basePath/assetPrefix only apply in production because GitHub Pages serves
// this as a project site at /portfolio/, not the domain root -- `next dev`
// still needs to run at "/" locally.
const repoName = "portfolio";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: { unoptimized: true },
};

export default nextConfig;
