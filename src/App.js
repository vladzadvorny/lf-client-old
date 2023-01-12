import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.scss'
import Layout from './components/Layout'

import Home from './pages/Home'
import Category, { loader as categoryLoader } from './pages/Category'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
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
