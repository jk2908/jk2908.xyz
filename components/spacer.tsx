import { clsx } from 'clsx'
import { id } from 'lib/utils'

const e = id()

export function Spacer({
  children,
  className,
  ...rest
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx(e, className)} {...rest}>
      {children}

      <style href={e} precedence="medium">
        {`
          .${e} + .${e} {
            margin-block-start: var(--space-6x);

            @media (width >= 720px) {
              margin-block-start: var(--space-8x);
            }
        `}
      </style>
    </div>
  )
}
