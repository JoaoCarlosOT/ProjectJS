import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css';
import Home from './pages/Home/index.tsx'
import Cadastrar from './pages/Cadastrar/index.tsx'
import Edit from './pages/Edit/index.tsx';
import TodoID from './pages/TodoID/index.tsx';
import Favoritos from './pages/favoritos/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cadastrar",
        element: <Cadastrar />
      },
      {
        path: "/edit/:id",
        element: <Edit />
      },
      {
        path: "/details/:id",
        element: <TodoID />
      },
      {
        path: "/favoritos",
        element: <Favoritos />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
