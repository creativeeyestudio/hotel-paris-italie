import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  output: 'standalone',

  // Images
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin-dev.comavotreimage.fr",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
