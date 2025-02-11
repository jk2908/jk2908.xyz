import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'

const [css, styles, href] = cxx`
  .footer {
    display: flex;
    font-size: 14px;
    gap: var(--space-8x);
    justify-content: space-between;
    overflow: hidden;

    > p {
      flex-shrink: 0;
    }
  }
`

export function Footer({ children, className, ...rest }: React.ComponentPropsWithRef<'footer'>) {
	return (
		<footer className={clsx(styles.footer, className)} {...rest}>
			{children}

			<style href={href} precedence="medium">
				{css}
			</style>
		</footer>
	)
}
