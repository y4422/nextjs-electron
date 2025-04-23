/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // ビルド時に相対パスを使用するように設定
    assetPrefix: './',
    // 静的エクスポート時の設定
    trailingSlash: true
};

module.exports = nextConfig;