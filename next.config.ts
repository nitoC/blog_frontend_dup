import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      new URL("https://cdn.sanity.io/images/yc06zmeo/production/*"),
    ],
  },
};

export default nextConfig;
