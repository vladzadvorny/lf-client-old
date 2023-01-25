/* eslint-disable no-underscore-dangle */
import { Fragment } from 'preact'
import { Router } from 'preact-router'
import { useHead } from 'hoofd/preact'
import { useEffect, useState } from 'preact/hooks'

import Header from './components/Header'
import Footer from './components/Footer'
import Notification from './components/Notification'

import Home from './pages/Home'
import Auth from './pages/Auth'

import './App.scss'
import { agent } from './utils/agent'
import { storage } from './constants/storage'
import { useAppState } from './state'

const App = ({ route }) => {
  useHead({
    language: 'ru'
  })
  const { me } = useAppState()
  const [loading, setLoading] = useState(!true)

  useEffect(() => {
    bootstrap()
  }, [])

  const bootstrap = async () => {
    try {
      const token = localStorage.getItem(storage.token)

      if (token) {
        const data = await agent('/me')

        me.value = data.me
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loader" aria-busy />
  }

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
