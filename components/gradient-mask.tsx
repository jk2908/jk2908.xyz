import { clsx } from 'clsx'

export function GradientMask({
	isVisible,
	toMirrored,
	className,
	...rest
}: { isVisible?: boolean; toMirrored?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(className)}
			style={{
				background: `linear-gradient(${toMirrored ? 'to-left' : 'to-right'}, var(--app-bg) 0%, transparent 100%)`,
				opacity: isVisible ? 1 : 0,
				transition: 'opacity 100ms',
				zIndex: 10,
			}}
			aria-hidden="true"
			{...rest}
		/>
	)
}
