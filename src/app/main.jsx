import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../lib/AuthContext.jsx'

import Entrar from '../components/Entrar.jsx'
import App from './App.jsx'
import Home from '../components/Home.jsx'
import Checklist from '../components/Checklist.jsx'
import Movimentacoes from '../components/Movimentacoes.jsx'
import Objetivo from '../components/Objetivo.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/checklist',
        element: <Checklist />
      },
      {
        path: '/movimentacoes',
        element: <Movimentacoes />
      },
      {
        path: '/objetivo',
        element: <Objetivo />
      }
    ]
  },
  {
    path: '/entrar',
    element: <Entrar />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
