import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "static.wixstatic.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
