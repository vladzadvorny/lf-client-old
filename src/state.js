/* eslint-disable no-underscore-dangle */
import { signal, effect } from '@preact/signals'
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { isBrowser, isProduction } from './constants/config'

const createAppState = () => {
  const notification = signal(null)
  const me = signal({ id: null })
  const posts = signal([])

  return { notification, me, posts }
}

const state = createAppState()

setTimeout(() => {
  if (isBrowser && window.__STATE__) {
    Object.keys(window.__STATE__).forEach(key => {
      if (state[key]) {
        state[key].value = window.__STATE__[key]
      }
    })

    delete window.__STATE__
  }
}, 0)

const AppState = createContext(state)

export const AppStateProvider = ({ children }) => (
  <AppState.Provider value={state}>{children}</AppState.Provider>
)

export const useAppState = () => useContext(AppState)

// auto hidding notifications
let timeout
effect(() => {
  if (state.notification.value) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      state.notification.value = null
    }, 4000)
  }
})

// redux devtools
if (isBrowser && !isProduction && window.__REDUX_DEVTOOLS_EXTENSION__) {
  const devTools = {}

  window.__REDUX_DEVTOOLS_EXTENSION__({ latency: 0 })
  devTools.current = window.__REDUX_DEVTOOLS_EXTENSION__.connect()

  devTools.current.init()

  const obj = {}
  const flags = {}

  effect(() => {
    Object.keys(state).forEach(key => {
      obj[key] = state[key].value
    })
  })

  Object.keys(state).forEach(key => {
    effect(() => {
      // eslint-disable-next-line prefer-destructuring
      const value = state[key].value
      if (flags[key]) {
        devTools.current.send(key, { ...obj, [key]: value })
      } else {
        flags[key] = true
      }
    })
  })
}
