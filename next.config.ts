import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  turbopack: {
    rules: {
      '*.glsl': {
        loaders: ['raw-loader', 'glslify-loader'],
        as: '*.js',      },
      '*.vert': {
        loaders: ['raw-loader', 'glslify-loader'],
        as: '*.js',
      },
      '*.frag': {
        loaders: ['raw-loader', 'glslify-loader'],
        as: '*.js',
      },
    }
  }
};

export default nextConfig;
