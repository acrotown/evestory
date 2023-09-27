/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    useDeploymentId: true,
    serverActions: true,
  },
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "evestory.s3.ap-southeast-3.amazonaws.com",
    ],
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "utf-8-validate",
      bufferutil: "bufferutil",
      encoding: "encoding",
    })
    return config
  },
  async headers() {
    return [
      {
        source: "/login",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
      {
        source: "/register",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ]
  },
}

export default nextConfig
