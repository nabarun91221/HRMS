import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

const domain = process.env.NEXT_PUBLIC_DOMAIN!;

const s3Domain = process.env.NEXT_PUBLIC_S3_DOMAIN!;
const s3Url = process.env.NEXT_PUBLIC_S3_URL!;

const nextConfig: NextConfig = {
  output: "export"
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
  // // async headers() {
  // //   return [
  // //     {
  // //       source: '/(.*)',
  // //       headers: [
  // //         {
  // //           key: 'X-Frame-Options',
  // //           value: 'DENY',
  // //         },
  // //         {
  // //           key: 'Strict-Transport-Security',
  // //           value: 'max-age=31536000; includeSubDomains; preload',
  // //         },
  // //         {
  // //           key: 'Content-Security-Policy',
  // //           value: `
  // //             default-src 'self'  https://*.openstreetmap.org ${baseUrl} ${s3Url};
  // //             script-src 'self' 'unsafe-inline' 'unsafe-eval'
  // //               ${baseUrl}
  // //               ${s3Url}
  // //               https://js.stripe.com
  // //               https://connect.stripe.com
  // //               https://www.googletagmanager.com
  // //               https://www.google-analytics.com
  // //               https://www.gstatic.com
  // //               https://apis.google.com;
  // //             style-src 'self' 'unsafe-inline' ${baseUrl} ${s3Url} https://fonts.googleapis.com;
  // //             img-src 'self' data: blob:
  // //               https://*.openstreetmap.org
  // //               ${baseUrl}
  // //               ${s3Url}
  // //               https://*.google-analytics.com
  // //               https://*.googletagmanager.com
  // //               https://firebasestorage.googleapis.com
  // //               https://api.iconify.design;
  // //             font-src 'self' ${baseUrl} ${s3Url} https://fonts.gstatic.com;
  // //             connect-src 'self'
  // //               https://*.openstreetmap.org
  // //               https://*.googleapis.com
  // //               https://*.firebaseio.com
  // //               https://firestore.googleapis.com
  // //               https://firebasestorage.googleapis.com
  // //               https://www.google-analytics.com
  // //               https://www.googletagmanager.com
  // //               https://*.socket.io
  // //               https://api.iconify.design
  // //               ${baseUrl}
  // //               ${s3Url} ;
  // //               wss://${domain};
  // //             frame-src 'self' ${baseUrl} ${s3Url} https://js.stripe.com https://connect.stripe.com;
  // //             object-src 'none';
  // //             base-uri 'self' ;
  // //             form-action 'self';
  // //             media-src 'self' blob: ${baseUrl} ${s3Url};
  // //           `
  // //             .replace(/\s{2,}/g, ' ')
  // //             .trim(),
  // //         },
  // //         {
  // //           key: 'X-Content-Type-Options',
  // //           value: 'nosniff',
  // //         },
  // //         {
  // //           key: 'Referrer-Policy',
  // //           value: 'no-referrer',
  // //         },
  // //         {
  // //           key: 'Permissions-Policy',
  // //           value: 'geolocation=(self), microphone=(), camera=()',
  // //         },
  // //         {
  // //           key: 'X-XSS-Protection',
  // //           value: '0',
  // //         },
  // //       ],
  // //     },
  // //   ];
  // // },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/robots.txt',
  //       destination: isProd ? '/robots.prod.txt' : '/robots.disallow.txt',
  //     },
  //   ];
  // },
};

export default nextConfig;
