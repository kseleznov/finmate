import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [{ source: '/', destination: '/overview', permanent: false }];
  },
};

export default nextConfig;
