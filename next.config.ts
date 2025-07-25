import { config } from "@/config/env-config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        // Allow all URLs from https protocols
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        // Allow all URLs from http protocols
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        // Allow images from server ip
        protocol: "http",
        hostname: config.serverHost,
        port: "5000",
        pathname: "**", // Allow all paths from this host
      },
    ],
  },
};

export default nextConfig;
