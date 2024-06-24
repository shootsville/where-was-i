import { useEffect } from 'react'

export default function Page1() {
  useEffect(() => {
    document.body.style.background =
      'linear-gradient(to right, #2E3192, #1BFFFF)'
  }, [])

  return (
    <>
      <h1>Hello from Page 1</h1>
      <p>This is a page in the SPA</p>
    </>
  )
}
