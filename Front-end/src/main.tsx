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
import ProtectedRoute from './components/protected/index.tsx';
import Login from './pages/Login/index.tsx';
import Register from './pages/Register/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // seu layout principal
    children: [
      // públicas
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      // protegidas
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cadastrar",
        element: (
          <ProtectedRoute>
            <Cadastrar />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <ProtectedRoute>
            <TodoID />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favoritos",
        element: (
          <ProtectedRoute>
            <Favoritos />
          </ProtectedRoute>
        ),
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
