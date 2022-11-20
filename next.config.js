/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: process.env.NODE_ENV === "development" ? "" : "/ducktape/",
  basePath: process.env.NODE_ENV === "development" ? "" : "/ducktape",
  env: {
    FRONT_URL:
      process.env.NODE_ENV === "development" ? process.env.FRONT_URL : "",
    API_URL: process.env.NODE_ENV === "development" ? process.env.API_URL : "",
  },
  images: {
    unoptimized: true,
  },
});

module.exports = nextConfig;

