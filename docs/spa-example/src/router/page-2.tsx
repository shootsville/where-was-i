import { useEffect } from 'react'

export default function Page2() {
  useEffect(() => {
    document.body.style.background =
      'linear-gradient(to right, #D4145A, #FBB03B)'
  }, [])
  return (
    <>
      <h1>Hello from Page 2</h1>
      <p>This is another page in the SPA</p>
    </>
  )
}
