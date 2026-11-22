import type { NextConfig } from "next";

// Static export so Render can host it as a free static site.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
