import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Page1 from './router/page-1.tsx'
import Page3 from './router/page-3.tsx'
import Page2 from './router/page-2.tsx'
import WhereWasI from 'where-was-i'
import Index from './router/index.tsx'
import { Error } from './Error.tsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      errorElement: <Error />,
      element: <App />,
      children: [
        { index: true, path: '/', element: <Index /> },
        {
          path: '/index',
          element: <Index />,
        },
        {
          path: '/page-1',
          element: <Page1 />,
        },
        {
          path: '/page-2',
          element: <Page2 />,
        },
        {
          path: '/page-3',
          element: <Page3 />,
        },
      ],
    },
  ],
  {
    basename: '/where-was-i/spa-example/dist',
  },
)

const wwi = new WhereWasI({
  isSpa: true,
  navigationCallback: (path: string) => router.navigate(path),
  basePath: '/where-was-i/spa-example/dist',
})

wwi.initiate()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
