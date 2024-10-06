import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'

const [css, styles, href] = cxx`
  .wrapper {
    inline-size: 100%;
    margin-inline: auto;
    max-inline-size: var(--wrapper-max);
    padding-inline: var(--wrapper-px);
  }
`

export function Wrapper({
	children,
	className,
	...rest
}: { children: React.ReactNode } & React.ComponentPropsWithRef<'div'>) {
	return (
		<div className={clsx(styles.wrapper, className)} {...rest}>
			{children}

			<style href={href} precedence="medium">
        {css}
      </style>
		</div>
	)
}
