import { useEffect } from 'react'

export default function Index() {
  useEffect(() => {
    document.body.style.background = ''
  }, [])

  return <div />
}
