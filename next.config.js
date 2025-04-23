/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    images: {
        unoptimized: true,
    },
    // ビルド時に相対パスを使用するように設定
    assetPrefix: './',
    basePath: '',
    // 静的エクスポート時の設定
    trailingSlash: true
};

module.exports = nextConfig;