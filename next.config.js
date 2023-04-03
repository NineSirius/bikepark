/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
};

module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true,
  },
};
