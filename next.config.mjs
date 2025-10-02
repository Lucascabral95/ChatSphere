// @type {import('next').NextConfig}
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/application/my-friends",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
