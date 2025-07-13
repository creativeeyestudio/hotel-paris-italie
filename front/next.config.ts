import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

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
