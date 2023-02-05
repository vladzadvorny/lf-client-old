/* eslint-disable no-restricted-globals */
import { hydrate, render } from 'preact'
import { TranslateProvider } from '@denysvuika/preact-translate'

import App from './App'
import { AppStateProvider } from './state'
import en from '../public/translations/en.json'
import { isBrowser } from './constants/config'

// scroll to top
if (isBrowser) {
  const old = history.pushState
  // eslint-disable-next-line func-names
  history.pushState = function () {
    // eslint-disable-next-line prefer-rest-params
    old.apply(this, arguments)
    scrollTo(0, 0)
  }
}

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
