import { useHead } from 'hoofd/preact'

import { useAppState } from '../state'

import './Auth.scss'

const Auth = () => {
  const { notification } = useAppState()
  useHead({
    title: 'Welcome to hoofd | 💭',
    metas: [{ content: 'Jovi De Croock', name: 'description' }]
  })

  return (
    <div className="container auth-page">
      <article className="grid">
        <div>
          <hgroup>
            <h1>Sign in</h1>
            <h2>A minimalist layout for Login pages</h2>
          </hgroup>

          <form onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              name="login"
              placeholder="Login"
              aria-label="Login"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
            />
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
              type="submit"
              onClick={() => {
                notification.value = !notification.value
              }}
            >
              Login
            </button>
          </form>
        </div>
        <div className="image" />
      </article>
    </div>
  )
}

export default Auth
