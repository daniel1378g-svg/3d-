import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site: every page is pre-rendered to `out/` and can be served by any host.
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: { root: path.resolve(".") },
};

export default nextConfig;
