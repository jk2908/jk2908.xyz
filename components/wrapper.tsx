export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[70ch] px-4 sm:px-8">{children}</div>
}
