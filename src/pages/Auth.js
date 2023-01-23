import { useHead } from 'hoofd/preact'
import { useState } from 'preact/hooks'

import { useAppState } from '../state'

import './Auth.scss'

const Auth = () => {
  const { notification } = useAppState()
  useHead({
    title: 'Welcome to hoofd | 💭',
    metas: [{ content: 'Jovi De Croock', name: 'description' }]
  })
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="container auth-page">
      <article className="grid">
        <div>
          <hgroup>
            <h1>{isRegister ? 'Register' : 'Login'}</h1>
            <h2>A minimalist layout for Login pages</h2>
          </hgroup>

          <form onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              name="login"
              placeholder="Login"
              aria-label="Login"
              aria-invalid="true"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
            />
            {isRegister && (
              <input
                type="password"
                name="PasswordConfirm"
                placeholder="Password Confirm"
                aria-label="PasswordConfirm"
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
                notification.value = !notification.value
              }}
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
