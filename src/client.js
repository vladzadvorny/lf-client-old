import { hydrate } from 'preact'

import App from './App'
import { AppStateProvider } from './state'

hydrate(
  <AppStateProvider>
    <App />
  </AppStateProvider>,
  document.body
)
