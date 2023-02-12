/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, route } from 'preact-router'
// eslint-disable-next-line no-unused-vars
import { Fragment } from 'preact'

import './Header.scss'

import { useAppState } from '../state'
import { storage } from '../constants/storage'
import { useTranslate } from '../hooks/useTranslate'

const Header = () => {
  const { t } = useTranslate()
  const { me, posts } = useAppState()

  const logOut = () => {
    localStorage.removeItem(storage.token)
    me.value = { id: null }
    posts.value = posts.value.map(post => ({ ...post, my_like: false }))
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
            <>
              <li>
                <Link href="/editor" className="login" activeClassName="active">
                  Editor
                </Link>
              </li>
              <li role="list" dir="rtl">
                <a href="#" aria-haspopup="listbox">
                  {me.value.name}
                </a>
                <ul role="listbox">
                  <li>
                    <Link href="/settings">{t('settings.settings')}</Link>
                  </li>
                  <li>
                    <a href="#" onClick={logOut}>
                      {t('auth.logOut')}
                    </a>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
export default Header
