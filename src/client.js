import { render } from 'preact'
import { TranslateProvider } from '@denysvuika/preact-translate'

import App from './App'
import { AppStateProvider } from './state'
import en from '../public/translations/en.json'

// TODO: Implement partial hydration.
document.body.innerHTML = ''

render(
  <TranslateProvider translations={{ en }} lang="en">
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </TranslateProvider>,
  document.body
)
