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
        // Allow images from 10.0.80.47
        protocol: "http",
        hostname: config.serverHost,
        port: "6001",
        pathname: "**", // Allow all paths from this host
      },
    ],
  },
};

export default nextConfig;
