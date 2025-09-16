/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false, 
    output: "export",
    images: {
        unoptimized: false,
    }
};

export default nextConfig;
