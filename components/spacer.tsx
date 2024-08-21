import { clsx } from 'clsx'
import { cxx, Style } from '@jk2908/cxx'

const [styles, css] = cxx`
  .spacer {

   + & {
      margin-block-start: var(--space-6x);
      
      @media (width >= 720px) {
        margin-block-start: var(--space-8x);
      }
    }
  }
`

export function Spacer({
  children,
  className,
  ...rest
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx(styles.spacer, className)} {...rest}>
      {children}

      <Style>
        {css}
      </Style>
    </div>
  )
}
