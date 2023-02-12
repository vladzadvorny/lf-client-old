import { useState } from 'preact/hooks'

import './Settings.scss'
import { useTranslate } from '../hooks/useTranslate'
import { isBrowser, languages as availableLanguages } from '../constants/config'
import languages from '../constants/languages'

const Settings = () => {
  const { t, lang, setLang } = useTranslate()
  const [error, setError] = useState(null)
  const [name, setName] = useState('')

  console.log(lang)
  return (
    <div className="container settings-page">
      <h3>{t('settings.settings')}</h3>

      <label htmlFor="name">
        {t('auth.name')}
        <input
          type="text"
          name="name"
          placeholder={t('auth.name')}
          aria-label="Name"
          {...(error && error.fields.includes('name') && { ariaInvalid: true })}
          // aria-invalid="true"
          value={name}
          onChange={e => setName(e.target.value)}
          onFocus={() => setError(null)}
        />
      </label>

      <label htmlFor="interfaceLanguage">
        {t('settings.interfaceLanguage')}
        <select
          id="interfaceLanguage"
          required
          value={lang}
          {...(error &&
            error.fields.includes('interfaceLanguage') && {
              ariaInvalid: true
            })}
          onChange={e => {
            setError(null)
            setLang(e.target.value)
            if (isBrowser) {
              console.log(e.target.value)
              localStorage.setItem('@interfaceLanguage', e.target.value)
            }
          }}
        >
          {availableLanguages.map(language => (
            <option key={language} value={language}>
              {`${languages[language][0]} / ${languages[language][1]}`}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default Settings
