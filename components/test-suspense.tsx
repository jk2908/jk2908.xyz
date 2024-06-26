import { Suspense } from 'react'

async function a() {
  return await new Promise(resolve => setTimeout(resolve, 5000))
}

async function B() {
  await a()
  return <div>Test</div>
}

export async function TestSuspense() {
  return (
    <div>
      <Suspense fallback="Loading...">
        <B />
      </Suspense>
    </div>
  )
}
