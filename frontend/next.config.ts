import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: [
    "*.cloudworkstations.dev",
    "*.firebase-itogit*.cloudworkstations.dev",
  ],
};

export default nextConfig;
