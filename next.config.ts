import type { NextConfig } from "next";

const nextConfig: any = {
  /* config options here */
  allowedDevOrigins: ["192.168.185.161", "192.168.185.161:3000"],
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
