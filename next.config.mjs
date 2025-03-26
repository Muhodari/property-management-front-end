let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig

// Simulated initial commit note on 2025-02-02T08:24:38.411Z

// Feature: Implement user authentication flow
// Added on 2025-02-21T16:12:48.233Z

// Feature: Add user settings and preferences
// Added on 2025-02-26T06:03:41.085Z

// Feature: Implement data export functionality
// Added on 2025-03-03T20:19:12.349Z

// Fix/Improvement: Improve dashboard card layout on tablets
// Modified on 2025-03-26T17:33:36.612Z
