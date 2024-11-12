import type { NextConfig } from "next";
if (process.env.NODE_ENV === 'production') {
  require('./cronJobs.js');
}

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
