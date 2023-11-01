export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-prose px-4 sm:px-8">{children}</div>
}
