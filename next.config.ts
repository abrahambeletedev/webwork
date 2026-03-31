import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // @ts-ignore - new property from next.js 15+ not yet in NextConfig types
  allowedDevOrigins: ['172.20.10.4'],
};

export default nextConfig;
