/* eslint-disable no-underscore-dangle */
import { Fragment } from 'preact'
import { useHead } from 'hoofd/preact'
import { useEffect, useState } from 'preact/hooks'

import Header from './components/Header'
import Footer from './components/Footer'
import Notification from './components/Notification'

import Routes from './Routes'

import './App.scss'
import { agent } from './utils/agent'
import { storage } from './constants/storage'
import { useAppState } from './state'

const App = ({ url }) => {
  useHead({
    language: 'ru'
  })
  const { me } = useAppState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    bootstrap()
  }, [])

  const bootstrap = async () => {
    setLoading(true)

    try {
      const token = localStorage.getItem(storage.token)

      if (token) {
        const data = await agent('/me')
        console.log(data)
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
        <Routes url={url} />
      </main>
      <Footer />
      <Notification />
    </Fragment>
  )
}

export default App
