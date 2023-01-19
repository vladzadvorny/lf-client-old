import { Fragment } from 'preact'
import { Router } from 'preact-router'
import { useHead } from 'hoofd/preact'

import Header from './components/Header'
import Footer from './components/Footer'
import Notification from './components/Notification'

import Home from './pages/Home'
import Auth from './pages/Auth'

import './App.scss'

const App = ({ route }) => {
  useHead({
    language: 'ru'
  })

  return (
    <Fragment>
      <Header />
      <main>
        <Router url={route}>
          <Home path="/" />
          <Auth path="/auth" />
        </Router>
      </main>
      <Footer />
      <Notification />
    </Fragment>
  )
}

export default App
