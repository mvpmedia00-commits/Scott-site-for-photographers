import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/mvp-media-portraits.zip",
        headers: [
          { key: "Content-Type", value: "application/zip" },
          {
            key: "Content-Disposition",
            value: 'attachment; filename="mvp-media-portraits.zip"',
          },
        ],
      },
      {
        source: "/downloads/mvp-media-portraits.zip",
        headers: [
          { key: "Content-Type", value: "application/zip" },
          {
            key: "Content-Disposition",
            value: 'attachment; filename="mvp-media-portraits.zip"',
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dg4xwrzu9/**",
      },
    ],
  },
}

export default nextConfig
