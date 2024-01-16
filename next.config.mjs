import million from 'million/compiler'

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    ppr: true,
  },
}

export default million.next(nextConfig, { auto: { rsc: true } })
