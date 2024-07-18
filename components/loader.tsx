import { useId } from 'react'

export function Loader({
  count = 3,
  size = 1,
  spacing = 1,
  ...rest
}: {
  count?: number
  size?: number
  spacing?: number
} & React.HTMLAttributes<HTMLDivElement>) {
  const id = useId()

  return (
    <div {...rest}>
      {Array.from({ length: count }, (_, idx) => (
        <span key={idx} style={{ animationDelay: `0.${idx * 2}s` }} />
      ))}

      <style href={id} precedence="medium">
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }

          @scope {
            :scope {
              display: flex;
              gap: ${spacing}px;
            }

            > span {
              background-color: var(--app-fg);
              block-size: ${size}px;
              border-radius: 50%;
              inline-size: ${size}px;
            }
          }
        `}
      </style>
    </div>
  )
}
