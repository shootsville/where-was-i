import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <nav>
        <Link to='/index'>
          <img
            src='https://shootsville.github.io/where-was-i/example/assets/logo.svg'
            className='logo'
            alt='Where was I? logo'
          />
        </Link>
        <div style={{ flex: 1 }} />
        <Link to='/page-1' className='nav-link'>
          Page 1
        </Link>
        <Link to='/page-2' className='nav-link'>
          Page 2
        </Link>
        <Link to='/page-3' className='nav-link'>
          Page 3
        </Link>
        <a
          href='https://shootsville.github.io/where-was-i/'
          className='nav-link'
        >
          Back to examples
        </a>
      </nav>
      <main>
        <h1>Where Was I? - SPA</h1>
        <cite>
          <em>Where Was I?</em> works great with single page applications!
          Navigate between pages in the navbar and see your pages update in the
          sidebar
        </cite>
        <Outlet />
      </main>
    </>
  )
}

export default App
