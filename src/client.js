import { hydrate } from 'preact'
import { TranslateProvider } from '@denysvuika/preact-translate'

import App from './App'
import { AppStateProvider } from './state'

hydrate(
  <TranslateProvider root="translations">
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </TranslateProvider>,
  document.body
)
