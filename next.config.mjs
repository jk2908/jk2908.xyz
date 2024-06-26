const config = {
  reactStrictMode: true,
  experimental: {
    ppr: 'incremental',
    reactCompiler: true,
  },
  redirects() {
    return [
      {
        source: '/hey-future-colleague',
        destination: '/recent-tinkering',
        permanent: true,
      },
    ]
  },
}

export default config
