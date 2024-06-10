/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  styledComponents: true,
  compiler: {
    reactStrictMode: true,
  },
};

export default nextConfig;
