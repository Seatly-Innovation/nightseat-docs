import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // github pages requires basePath if it's not a user domain, but for custom domains it's empty
  // Assuming it might be Seatly-Innovation.github.io/nightseat-docs
  basePath: '/nightseat-docs',
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
