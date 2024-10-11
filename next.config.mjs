import { withCxx } from '@jk2908/cxx/next'

const config = {
	reactStrictMode: true,
	experimental: {
		ppr: 'incremental',
		reactCompiler: true,
	},
	async redirects() {
		return [
			{
				source: '/hey-future-colleague',
				destination: '/recent-tinkering',
				permanent: true,
			},
		]
	},
}

export default withCxx(config)
