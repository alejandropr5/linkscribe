/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '**',
        },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/auth/:path*",
          destination: "/with-modal/auth/:path*",
          has: [
            {
              type: "header",
              // is soft nav:
              key: "next-url",
            },
          ],
        },
      ],
      fallback: [
        {
          source: "/with-modal/:path*",
          destination: "/:path*",
        },
        {
          source: "/:path*",
          destination: "/with-modal/:path*",
        },
      ],
    }
  }
}

export default nextConfig;
