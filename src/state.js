import { signal } from '@preact/signals'
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

const createAppState = () => {
  const hello = signal(0)

  return { hello }
}

const state = createAppState()

const AppState = createContext(state)

export const AppStateProvider = ({ children }) => (
  <AppState.Provider value={state}>{children}</AppState.Provider>
)

export const useState = () => useContext(AppState)
