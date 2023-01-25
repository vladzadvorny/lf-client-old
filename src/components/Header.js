/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, route } from 'preact-router'

import './Header.scss'

import { useAppState } from '../state'
import { storage } from '../constants/storage'

const Header = () => {
  const { me } = useAppState()

  const logOut = () => {
    localStorage.removeItem(storage.token)
    me.value = { id: null }
    route('/')
  }

  return (
    <header className="header">
      <nav className="container header-container">
        <ul>
          <li>
            <Link className="logo" href="/">
              LilyFamily
            </Link>
          </li>
        </ul>

        <ul>
          {!me.value.id ? (
            <li>
              <Link href="/auth" className="login" activeClassName="active">
                Войти
              </Link>
            </li>
          ) : (
            <li role="list" dir="rtl">
              <a href="#" aria-haspopup="listbox">
                {me.value.name}
              </a>
              <ul role="listbox">
                <li>
                  <a href="#" onClick={logOut}>
                    Log out
                  </a>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
export default Header
