import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "developments",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,

    workboxOptions: {
        disableDevLogs: true,
    }
});

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

export default withPWA(nextConfig);
