import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    // ATENÇÃO: Isso ignora TODOS os erros de TypeScript durante o build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
