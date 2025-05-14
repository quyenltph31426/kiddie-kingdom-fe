import type { NextConfig } from 'next';

const webpack = (config: any) => {
  // Grab the existing rule that handles SVG imports
  const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));

  config.module.rules.push(
    // Reapply the existing rule, but only for svg imports ending in ?url
    {
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/, // *.svg?url
    },
    // Convert all other *.svg imports to React components
    {
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
      use: ['@svgr/webpack'],
    }
  );

  // Modify the file loader rule to ignore *.svg, since we have it handled now.
  fileLoaderRule.exclude = /\.svg$/i;

  return config;
};

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    turbo: {
      // For development
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
        resolveExtensions: ['.tsx', '.ts', '.json'],
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'battle-of-ai-agents.s3.ap-southeast-1.amazonaws.com' },
      { protocol: 'https', hostname: 'battle-of-ai-agents.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'static.wikia.nocookie.net' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  webpack: process.env.NODE_ENV === 'development' ? undefined : webpack,
};

export default nextConfig;
