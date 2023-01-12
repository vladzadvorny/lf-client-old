import { Link } from 'react-router-dom'

import './Home.scss'

const Home = () => {
  return (
    <div className="container home-page">
      <div>
        <div className="category">
          <Link to="category/name">Категория</Link>
        </div>

        <ul className="topics">
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
        </ul>
      </div>

      <div>
        <div className="category">
          <Link to="category/name">Категория</Link>
        </div>
        <ul className="topics">
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
        </ul>
      </div>

      <div>
        <div className="category">
          <Link to="category/name">Категория</Link>
        </div>
        <ul className="topics">
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
        </ul>
      </div>

      <div>
        <div className="category">
          <Link to="category/name">Категория</Link>
        </div>
        <ul className="topics">
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="category">
          <Link to="category/name">Категория</Link>
        </div>
        <ul className="topics">
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
          <li>
            <Link to="topic/meow">Топик</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
