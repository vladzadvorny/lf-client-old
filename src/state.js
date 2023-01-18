/* eslint-disable no-underscore-dangle */
import { signal } from '@preact/signals'
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

const createAppState = () => {
  const hello = signal(0)

  return { hello }
}

const state = createAppState()

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

export const useState = () => useContext(AppState)
