/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, route } from 'preact-router'
// eslint-disable-next-line no-unused-vars
import { Fragment } from 'preact'

import './Header.scss'

import { useAppState } from '../state'
import { storage } from '../constants/storage'
import { useTranslate } from '../hooks/useTranslate'
import { filesUri } from '../constants/config'
import userColors from '../constants/userColors'

const getUserpicPath = path => {
  const [start, end] = path.split('.')
  return `${start}_thumb.${end}`
}

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
                {t('auth.login')}
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link href="/editor" className="editor">
                  <span className="material-symbols-outlined">edit_note</span>
                  {t('common.newPost')}
                </Link>
              </li>
              <li role="list" dir="rtl" className="userpic">
                <a href="#" aria-haspopup="listbox">
                  {/* {me.value.name} */}

                  {me.value.userpic ? (
                    <img
                      alt=""
                      src={`${filesUri}${getUserpicPath(me.value.userpic)}`}
                    />
                  ) : (
                    <span
                      className="empty-avatar"
                      style={{
                        backgroundColor: userColors[me.value.color]?.color
                      }}
                    >
                      {me.value.name[0]}
                    </span>
                  )}
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
