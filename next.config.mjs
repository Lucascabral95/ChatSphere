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
    domains: ["lh3.googleusercontent.com", "www.shutterstock.com"],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
    // ignoreBuildErrors: true, // Temporal
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
