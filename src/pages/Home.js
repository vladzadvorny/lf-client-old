import { Link } from 'react-router-dom'

import './Home.scss'

const Home = () => {
  return (
    <div className="container home-page">
      <div>
        <Link to="category" className="category">
          Категория
        </Link>
        <ul>
          <li className="topic">Топик</li>
          <li className="topic">Топик</li>
          <li className="topic">Топик</li>
        </ul>
      </div>

      <div>
        <div className="category">Категория</div>
        <ul>
          <li className="topic">Топик</li>
          <li className="topic">Топик</li>
          <li className="topic">Топик</li>
        </ul>
      </div>

      <div>
        <div className="category">Категория</div>
        <ul>
          <li className="topic">Топик</li>
          <li className="topic">Топик</li>
          <li className="topic">Топик</li>
        </ul>
      </div>

      <div>
        <div className="category">Категория</div>
        <ul>
          <li className="topic">Топик</li>
          <li className="topic">Топик</li>
          <li className="topic">Топик</li>
        </ul>
      </div>
      <div>
        <div className="category">Категория</div>
        <ul>
          <li className="topic">Топик</li>
          <li className="topic">Топик</li>
          <li className="topic">Топик</li>
        </ul>
      </div>
    </div>
  )
}

export default Home
