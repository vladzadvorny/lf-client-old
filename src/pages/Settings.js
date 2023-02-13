import { useEffect, useState } from 'preact/hooks'

import './Settings.scss'
import { useTranslate } from '../hooks/useTranslate'
import {
  isBrowser,
  languages as availableLanguages,
  filesUri,
  genders
} from '../constants/config'
import languages from '../constants/languages'
import { agent } from '../utils/agent'
import { useAppState } from '../state'

const getUserpicPath = path => {
  const [start, end] = path.split('.')
  return `${start}_thumb.${end}`
}

const Settings = () => {
  const { notification, me } = useAppState()
  const { t, lang, setLang } = useTranslate()
  const [error, setError] = useState(null)
  const [name, setName] = useState(me.value.name)
  const [email, setEmail] = useState(me.value.email)
  const [userpic, setUserpic] = useState(null)
  const [birthday, setBirthday] = useState(me.value.birthday)
  const [gender, setGender] = useState(me.value.gender)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

  useEffect(() => {
    if (userpic) {
      uploadUserpic()
    }
  }, [userpic])

  const uploadUserpic = async () => {
    const formData = new FormData()
    formData.append('file', userpic)

    const data = await agent('/upload?userpic=1', {
      method: 'POST',
      body: formData
    })

    console.log(data)

    if (data.error) {
      notification.value = data.error.message
    } else {
      setUserpic(null)
      me.value = { ...me.value, userpic: data.filePath }
    }
  }

  return (
    <div className="container settings-page">
      <h3>{t('settings.settings')}</h3>
      <div className="userpic">
        {me.value.userpic && (
          <img
            alt={me.value.name}
            src={`${filesUri}${getUserpicPath(me.value.userpic)}`}
          />
        )}
        <label htmlFor="userpic">
          {t('settings.userpic')}
          <input
            type="file"
            id="userpic"
            name="userpic"
            value={userpic}
            onChange={e => {
              setUserpic(e.target.files[0])
            }}
          />
        </label>
      </div>

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
          onInput={e => setName(e.target.value)}
          onFocus={() => setError(null)}
        />
      </label>

      <label htmlFor="email">
        {t('auth.email')}
        <input
          id="email"
          type="email"
          name="email"
          placeholder={t('auth.email')}
          aria-label="Email address"
          {...(error &&
            error.fields.includes('email') && { ariaInvalid: true })}
          value={email}
          onInput={e => setEmail(e.target.value)}
          onFocus={() => setError(null)}
        />
      </label>

      <label htmlFor="birthday">
        {t('settings.birthday')}
        <input
          type="date"
          id="birthday"
          name="birthday"
          min="1945-01-01"
          max="2014-12-31"
          aria-label="Birthday"
          {...(error &&
            error.fields.includes('birthday') && { ariaInvalid: true })}
          value={birthday}
          onInput={e => setBirthday(e.target.value)}
          onFocus={() => setError(null)}
        />
      </label>

      <label htmlFor="gender">
        {t('settings.gender')}
        <select
          id="gender"
          required
          value={gender}
          {...(error &&
            error.fields.includes('gender') && {
              ariaInvalid: true
            })}
          onChange={e => {
            setError(null)
            setGender(e.target.value)
          }}
        >
          <option value="" disabled selected>
            ...
          </option>
          {genders.map(item => (
            <option key={item} value={item}>
              {t(`settings.${item}`)}
            </option>
          ))}
        </select>
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

      <div className="grid buttons">
        <div />
        <button
          type="submit"
          disabled={email === me.value.email && name === me.value.name}
        >
          {t('common.save')}
        </button>
      </div>

      <h4>{t('settings.changePassword')}</h4>
      <label htmlFor="oldPassword">
        {t('settings.oldPassword')}
        <input
          id="oldPassword"
          type="password"
          name="oldPassword"
          // placeholder={t('settings.oldPassword')}
          aria-label="Password"
          {...(error &&
            error.fields.includes('oldPassword') && { ariaInvalid: true })}
          value={oldPassword}
          onInput={e => setOldPassword(e.target.value)}
          onFocus={() => setError(null)}
        />
      </label>

      <label htmlFor="newPassword">
        {t('settings.newPassword')}
        <input
          id="newPassword"
          type="password"
          name="password"
          // placeholder={t('settings.newPassword')}
          aria-label="Password"
          {...(error &&
            error.fields.includes('newPassword') && { ariaInvalid: true })}
          value={newPassword}
          onInput={e => setNewPassword(e.target.value)}
          onFocus={() => setError(null)}
        />
      </label>

      <label htmlFor="newPasswordConfirm">
        {t('settings.newPasswordConfirm')}
        <input
          id="newPasswordConfirm"
          type="password"
          name="passwordConfirm"
          // placeholder={t('settings.newPasswordConfirm')}
          aria-label="passwordConfirm"
          {...(error &&
            error.fields.includes('passwordConfirm') && {
              ariaInvalid: true
            })}
          value={newPasswordConfirm}
          onInput={e => setNewPasswordConfirm(e.target.value)}
          onFocus={() => setError(null)}
        />
      </label>

      <div className="grid buttons">
        <div />
        <button
          type="submit"
          disabled={!oldPassword || !newPassword || !newPasswordConfirm}
        >
          {t('common.save')}
        </button>
      </div>
    </div>
  )
}

export default Settings
