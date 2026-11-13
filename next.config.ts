import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/altuit-dashboard/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
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
  async rewrites() {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://fbvmqyavgeqgvxoxhffi.supabase.co";

    return [
      {
        source: "/_api/supabase/:path*",
        destination: `${supabaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
