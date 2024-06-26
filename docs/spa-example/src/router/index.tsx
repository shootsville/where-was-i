import { useEffect } from 'react'

export default function Index() {
  useEffect(() => {
    document.body.style.background = ''
  }, [])

  return (
    <div className='wwi-bubble'>
      <div className='content'>
        <h1>Hi!</h1>
        <h2>
          This is your <strong>Where Was I?</strong> button
        </h2>
      </div>
      <div className='arrow'></div>
    </div>
  )
}
