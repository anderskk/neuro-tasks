import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createHashHistory, createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const hashHistory = createHashHistory()
const router = createRouter({routeTree, history: hashHistory})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
