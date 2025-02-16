import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.shields.io",
        port: "",
        pathname: "/github/stars/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
