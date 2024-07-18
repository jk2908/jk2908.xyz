import { NowPlaying } from '#/components/now-playing'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <p className="shrink-0">Copyright {year}</p>

      <NowPlaying />

      <style>
        {`
          @scope {
            :scope {
              align-items: center;
              border-block-start: 1px solid rgb(var(--keyline));
              display: flex;
              font-size: 14px;
              gap: var(--space-8x);
              justify-content: space-between;
              overflow: hidden;
              padding-block: var(--space-4x);
            }

            > p {
              flex-shrink: 0;
            }
          }
        `}
      </style>
    </footer>
  )
}
