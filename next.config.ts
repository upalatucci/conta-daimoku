import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@mdx-js/mdx",
    "next-mdx-remote",
  ],
};

export default nextConfig;
