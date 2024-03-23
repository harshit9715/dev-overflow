/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: "devflow-rose.vercel.app",
        }]
    }
};

export default nextConfig;
