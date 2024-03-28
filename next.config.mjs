/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: "devflow-rose.vercel.app",
        }, {
            hostname: "img.clerk.com",
        }]
    }
};

export default nextConfig;
