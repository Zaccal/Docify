import '@Docify/env/web'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  output: 'standalone',
  cacheComponents: true
}

export default nextConfig
