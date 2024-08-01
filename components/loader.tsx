import { useId } from 'react'

export function Loader({
  count = 3,
  ...rest
}: {
  count?: number
} & React.HTMLAttributes<HTMLDivElement>) {
  const id = useId()

  return (
    <div {...rest}>
      {Array.from({ length: count }, (_, idx) => (
        <span key={idx} style={{ animationDelay: `0.${idx * 2}s` }}>.</span>
      ))}

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.3;
            }
          }

          @scope {
            > span {
              animation: pulse 1s infinite;
              color: rgb(var(--neutral-500) / 100%);  
            }
          }
        `}
      </style>
    </div>
  )
}
