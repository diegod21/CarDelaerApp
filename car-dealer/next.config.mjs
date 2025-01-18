/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix: '/',
    basePath: '/car-dealer',
    trailingSlash: true,
    output: "export",  // <=== habilita o export estático
    reactStrictMode: true,
};


export default nextConfig;
