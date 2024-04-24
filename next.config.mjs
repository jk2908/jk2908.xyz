const config = {
  reactStrictMode: true,
  experimental: {
    ppr: true,
  },
  redirects: async () => [
    {
      source: '/hey-future-colleague',
      destination: '/recent-tinkering',
      permanent: true,
    },
  ],
}

export default config
