import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://media.cuponeria.com.br/**')],
  },
}

export default nextConfig
