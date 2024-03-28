/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: "devflow-rose.vercel.app",
        }, {
            hostname: "https://img.clerk.com/",
        }]
    }
};

export default nextConfig;
