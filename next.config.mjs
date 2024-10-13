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
};

export default nextConfig;
