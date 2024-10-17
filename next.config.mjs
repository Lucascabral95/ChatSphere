/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/application/my-friends',
                permanent: true,
            },
        ];
    },
    images: {
        domains: [
            'lh3.googleusercontent.com'
        ],
    },
};

export default nextConfig;
