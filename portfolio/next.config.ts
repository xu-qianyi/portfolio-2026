import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/portfolio-2026" : "";

const nextConfig: NextConfig = {
  output: isProd ? "export" : undefined,
  basePath,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
