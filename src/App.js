import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.scss'
import Layout from './components/Layout'

import Index from './pages/Index'
import Category, { loader as categoryLoader } from './pages/Category'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'category',
        element: <Category />,
        loader: categoryLoader
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
