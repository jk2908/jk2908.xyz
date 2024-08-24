import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'

const [styles, css, href] = cxx`
	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}

	.loader {

		> span {
			animation: pulse 1s infinite;
    	color: rgb(var(--neutral-500) / 100%);
		}
	}
`

export function Loader({
	count = 3,
	className,
	...rest
}: {
	count?: number
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx(styles.loader, className)} {...rest}>
			{Array.from({ length: count }, (_, idx) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: nah, it's fine here
				<span key={idx} style={{ animationDelay: `0.${idx * 2}s` }}>
					.
				</span>
			))}

			<style href={href} precedence="medium">
        {css}
      </style>
		</div>
	)
}
