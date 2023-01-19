import { Router } from 'preact-router'
import { useHead } from 'hoofd/preact'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Auth from './pages/Auth'

import './App.scss'

const App = ({ route }) => {
  useHead({
    language: 'ru'
  })

  return (
    <div>
      <Header />
      <div className="content">
        <Router url={route}>
          <Home path="/" />
          <Auth path="/auth" />
        </Router>
      </div>
      <Footer />
    </div>
  )
}

export default App
