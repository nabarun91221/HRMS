const isProd = process.env.NODE_ENV === "production";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const domain = process.env.NEXT_PUBLIC_DOMAIN;

const s3Domain = process.env.NEXT_PUBLIC_S3_DOMAIN;
const s3Url = process.env.NEXT_PUBLIC_S3_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // },

  // images: {
  //   remotePatterns: [
  //     {
  //       hostname: domain,
  //     },
  //     {
  //       hostname: s3Domain,
  //     },
  //   ],
  // },

  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: isProd
          ? "/robots.prod.txt"
          : "/robots.disallow.txt",
      },
    ];
  },
};

module.exports = nextConfig;