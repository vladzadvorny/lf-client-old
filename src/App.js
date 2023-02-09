/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'preact/hooks'

import Header from './components/Header'
import Footer from './components/Footer'
import Notification from './components/Notification'

import Routes from './Routes'

import './App.scss'
import { agent } from './utils/agent'
import { useMeta } from './utils/meta'
import { storage } from './constants/storage'
import { useAppState } from './state'
import { useTranslate } from './hooks/useTranslate'
import { isBrowser } from './constants/config'

const App = ({ url, state: _state }) => {
  const { lang } = useTranslate()
  useMeta({
    lang
  })
  const state = useAppState()
  const [loading, setLoading] = useState(!url)

  if (!isBrowser) {
    Object.keys(_state).forEach(key => {
      if (state[key]) {
        state[key].value = _state[key]
      }
    })
  }

  useEffect(() => {
    bootstrap()
  }, [])

  const bootstrap = async () => {
    // setLoading(true)

    try {
      const token = localStorage.getItem(storage.token)

      if (token) {
        const data = await agent(
          state.posts.value.length
            ? `/me?postIds=${state.posts.value.map(item => item.id).join(',')}`
            : '/me'
        )

        state.me.value = data.me
        state.posts.value = state.posts.value.map(post =>
          data.liked_post_ids.includes(post.id)
            ? {
                ...post,
                my_like: true
              }
            : post
        )
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
    <div id="app">
      <Header />
      <main>
        <Routes url={url} />
      </main>
      <Footer />
      <Notification />
    </div>
  )
}

export default App
