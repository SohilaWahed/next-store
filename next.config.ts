import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "linked-posts.routemisr.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/**", 
      },
       {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
      },
    ],
  },
};

export default nextConfig;
