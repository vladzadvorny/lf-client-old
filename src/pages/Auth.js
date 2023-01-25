import { useHead } from 'hoofd/preact'
import { useState } from 'preact/hooks'
import { route } from 'preact-router'

import { useAppState } from '../state'
import { uri } from '../constants/config'

import './Auth.scss'
import { storage } from '../constants/storage'

const Auth = () => {
  const { notification, me } = useAppState()
  useHead({
    title: 'Welcome to hoofd | 💭'
  })
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(null)

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
        notification.value = data.error.message
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
            <h1>{isRegister ? 'Register' : 'Login'}</h1>
            <h2>A minimalist layout for Login pages</h2>
          </hgroup>

          <form onSubmit={e => e.preventDefault()}>
            {isRegister && (
              <input
                type="text"
                name="name"
                placeholder="Name"
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
              placeholder="Email address"
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
              placeholder="Password"
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
                placeholder="Password Confirm"
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
                Remember me
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
              {isRegister ? 'Register' : 'Login'}
            </button>
            <button
              className={`outline ${isRegister ? 'primaruy' : 'secondary'}`}
              type="submit"
              onClick={() => {
                setIsRegister(!isRegister)
              }}
            >
              {isRegister ? 'Go to Login' : 'Go to Register'}
            </button>
          </form>
        </div>
        <div className={isRegister ? 'register' : 'login'} />
      </article>
    </div>
  )
}

export default Auth
