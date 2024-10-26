import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'

import { NowPlaying } from '#/ui/now-playing'

const [css, styles, href] = cxx`
  .footer {
    align-items: center;
    border-block-start: 1px solid rgb(var(--keyline));
    display: flex;
    font-size: 14px;
    gap: var(--space-8x);
    justify-content: space-between;
    overflow: hidden;
    padding-block: var(--space-4x);

    > p {
      flex-shrink: 0;
    }
  }
`

async function Copyright() {
  'use cache'
  return <p>Copyright {new Date().getFullYear()}</p>
}

export function Footer({ className, ...rest }: React.ComponentPropsWithRef<'footer'>) {
	return (
		<footer className={clsx(styles.footer, className)} {...rest}>
			<Copyright />
			<NowPlaying />

			<style href={href} precedence="medium">
				{css}
			</style>
		</footer>
	)
}
