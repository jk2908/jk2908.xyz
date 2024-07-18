import { useId } from 'react'

export function Spacer({
  children,
  ...rest
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  const id = useId()

  return (
    <div {...rest}>
      {children}
      
      <style href={id} precedence="medium">
        {`
          @scope {
            & + & {
              margin-block-start: var(--space-6x);

              @media (width >= 720px) {
                margin-block-start: var(--space-8x);
              }
            }
          }
        `}
      </style>
    </div>
  )
}
