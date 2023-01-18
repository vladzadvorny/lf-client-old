import { hydrate } from 'preact'

import App from './App'
import { AppStateProvider } from './state'

const rootElement = document.getElementById('root')

hydrate(
  <AppStateProvider>
    <App />
  </AppStateProvider>,
  rootElement
)
