/* eslint-disable no-restricted-globals */
import { hydrate, render } from 'preact'
import { TranslateProvider } from '@denysvuika/preact-translate'
import getLocale from 'browser-locale'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import App from './App'
import { AppStateProvider } from './state'
import en from '../public/translations/en.json'
import ru from '../public/translations/ru.json'
import { isBrowser, languages } from './constants/config'

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

const getLang = () => {
  const defaultLang = 'en'
  let locale = isBrowser ? getLocale().split('-')[0].toLowerCase() : defaultLang
  locale = languages.includes(locale) ? locale : defaultLang

  let storage = isBrowser && localStorage.getItem('@interfaceLanguage')
  storage = languages.includes(locale) && storage

  dayjs.locale(storage || locale)
  return storage || locale
}

const Root = () => (
  <TranslateProvider translations={{ en, ru }} lang={getLang()}>
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
