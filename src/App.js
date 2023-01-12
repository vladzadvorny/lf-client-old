import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.scss'
import Layout from './components/Layout'

import Home from './pages/Home'
import Category, { loader as categoryLoader } from './pages/Category'
import Topic, { loader as topicLoader } from './pages/Topic'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'category/:name/:page?',
        element: <Category />,
        loader: categoryLoader
      }
      ,{
        path: 'topic/:name',
        element: <Topic />,
        loader: topicLoader
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
