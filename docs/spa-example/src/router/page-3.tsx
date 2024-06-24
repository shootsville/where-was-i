import { useEffect } from 'react'

export default function Page1() {
  useEffect(() => {
    document.body.style.background =
      'linear-gradient(to right, #009245, #FCEE21)'
  }, [])
  return (
    <>
      <h1>Hello from Page 3</h1>
      <p>And what do you know, this is yet another page in the SPA</p>
    </>
  )
}
