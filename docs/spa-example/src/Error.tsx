import { useNavigation, useRouteError } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Error = () => {
  const error = useRouteError()
  const nav = useNavigation()

  console.error('ERROR ::', error)

  console.log('LOCATION ::', nav.location)

  return (
    <div>
      <h1>Error</h1>
    </div>
  )
}
