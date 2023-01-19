import { Link } from 'preact-router'
import './Header.scss'

const Header = () => {
  return (
    <header className="header">
      <nav className="container header-container">
        <Link className="logo" href="/">
          LilyFamily
        </Link>
        <Link href="/auth" className="login" activeClassName="active">
          Войти
        </Link>
      </nav>
    </header>
  )
}
export default Header
