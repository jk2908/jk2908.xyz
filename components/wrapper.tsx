import { clsx } from 'clsx'
import { cxx, Style } from '@jk2908/cxx'

const [styles, css] = cxx`
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
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx(styles.wrapper, className)} {...rest}>
			{children}

      <Style>
        {css}
      </Style>
		</div>
	)
}
