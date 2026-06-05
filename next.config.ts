import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/not-found",
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: "/not-found",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
