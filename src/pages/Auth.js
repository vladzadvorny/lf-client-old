import { useHead } from 'hoofd/preact'
import { useState } from 'preact/hooks'
import { route } from 'preact-router'

import { useAppState } from '../state'
import { uri, siteName } from '../constants/config'
import { useTranslate } from '../hooks/useTranslate'

import './Auth.scss'
import { storage } from '../constants/storage'

const Auth = () => {
  const { t } = useTranslate()
  const { notification, me } = useAppState()

  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(null)

  useHead({
    title: `${isRegister ? t('auth.register') : t('auth.login')} — ${siteName}`
  })

  const send = async () => {
    setLoading(true)
    try {
      let data
      if (isRegister) {
        const res = await fetch(`${uri}/auth/local`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password, passwordConfirm })
        })
        data = await res.json()
      } else {
        const res = await fetch(`${uri}/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
        data = await res.json()
      }

      if (data.error) {
        notification.value = t(`auth.${data.error.message}`)

        setError(data.error)
      } else {
        localStorage.setItem(storage.token, data.token)
        route('/')
        me.value = data.me
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container auth-page">
      <article className="grid">
        <div>
          <hgroup>
            <h1>{isRegister ? t('auth.register') : t('auth.login')}</h1>
            <p>{t('auth.welcome')}</p>
          </hgroup>

          <form onSubmit={e => e.preventDefault()}>
            {isRegister && (
              <input
                type="text"
                name="name"
                placeholder={t('auth.name')}
                aria-label="Name"
                {...(error &&
                  error.fields.includes('name') && { ariaInvalid: true })}
                // aria-invalid="true"
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={() => setError(null)}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder={t('auth.email')}
              aria-label="Email address"
              {...(error &&
                error.fields.includes('email') && { ariaInvalid: true })}
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setError(null)}
            />
            <input
              type="password"
              name="password"
              placeholder={t('auth.password')}
              aria-label="Password"
              {...(error &&
                error.fields.includes('password') && { ariaInvalid: true })}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setError(null)}
            />
            {isRegister && (
              <input
                type="password"
                name="passwordConfirm"
                placeholder={t('auth.passwordConfirm')}
                aria-label="passwordConfirm"
                {...(error &&
                  error.fields.includes('passwordConfirm') && {
                    ariaInvalid: true
                  })}
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                onFocus={() => setError(null)}
              />
            )}
            <fieldset>
              <label htmlFor="remember">
                <input
                  type="checkbox"
                  role="switch"
                  id="remember"
                  name="remember"
                />
                {t('auth.rememberMe')}
              </label>
            </fieldset>
            <button
              className={isRegister ? 'secondary' : 'primaruy'}
              type="submit"
              onClick={() => {
                send()
              }}
              aria-busy={loading}
            >
              {isRegister ? t('auth.register') : t('auth.login')}
            </button>
            <button
              className={`outline ${isRegister ? 'primaruy' : 'secondary'}`}
              type="submit"
              onClick={() => {
                setIsRegister(!isRegister)
                setError(null)
              }}
            >
              {isRegister ? t('auth.goToLogin') : t('auth.goToRegister')}
            </button>
          </form>
        </div>
        <div className={isRegister ? 'register' : 'login'} />
      </article>
    </div>
  )
}

export default Auth
