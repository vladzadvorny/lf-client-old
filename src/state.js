/* eslint-disable no-underscore-dangle */
import { signal, effect } from '@preact/signals'
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

const createAppState = () => {
  const hello = signal(0)
  const notification = signal(false)

  return { hello, notification }
}

const state = createAppState()

// auto hidding notifications
let timeout
effect(() => {
  if (state.notification.value) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      state.notification.value = false
    }, 4000)
  }
})

setTimeout(() => {
  if (typeof window !== 'undefined' && window.__STATE__) {
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
