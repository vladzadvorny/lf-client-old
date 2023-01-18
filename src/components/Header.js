import { Link } from 'preact-router'
import './Header.scss'

const Header = () => {
  return (
    <div className="header">
      <div className="container header-container">
        <Link className="logo" href="/">
          LilyFamily
        </Link>
        <span className="login">Войти</span>
      </div>
    </div>
  )
}
export default Header
