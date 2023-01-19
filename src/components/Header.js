import { Link } from 'preact-router'
import './Header.scss'

const Header = () => {
  return (
    <header className="header">
      <nav className="container header-container">
        <Link className="logo" href="/">
          LilyFamily
        </Link>
        <span className="login">Войти</span>
      </nav>
    </header>
  )
}
export default Header
