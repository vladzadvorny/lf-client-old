import { hydrate, render } from 'preact'
import { TranslateProvider } from '@denysvuika/preact-translate'

import App from './App'
import { AppStateProvider } from './state'
import en from '../public/translations/en.json'

// TODO: Implement partial hydration.
// document.body.innerHTML = ''

const Root = () => (
  <TranslateProvider translations={{ en }} lang="en">
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </TranslateProvider>
)

const app = document.getElementById('app')

if (app) {
  hydrate(<Root />, document.body, app)
} else {
  render(<Root />, document.body)
}
