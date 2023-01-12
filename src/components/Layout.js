import { Outlet } from 'react-router-dom'

import './Layout.scss'

import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
