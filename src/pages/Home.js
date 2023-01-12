import { Link } from 'react-router-dom'

import './Home.scss'

const Home = () => {
  return (
    <div className="container home">
      <div>
        <Link to="category" className="theme">
          Тема обсуждения
        </Link>
        <ul>
          <li className="question">Вопрос</li>
          <li className="question">Вопрос</li>
          <li className="question">Вопрос</li>
        </ul>
      </div>

      <div>
        <div className="theme">Тема обсуждения</div>
        <ul>
          <li className="question">Вопрос</li>
          <li className="question">Вопрос</li>
          <li className="question">Вопрос</li>
        </ul>
      </div>

      <div>
        <div className="theme">Тема обсуждения</div>
        <ul>
          <li className="question">Вопрос</li>
          <li className="question">Вопрос</li>
          <li className="question">Вопрос</li>
        </ul>
      </div>

      <div>
        <div className="theme">Тема обсуждения</div>
        <ul>
          <li className="question">Вопрос</li>
          <li className="question">Вопрос</li>
          <li className="question">Вопрос</li>
        </ul>
      </div>
      <div>
        <div className="theme">Тема обсуждения</div>
        <ul>
          <li className="question">Вопрос</li>
          <li className="question">Вопрос</li>
          <li className="question">Вопрос</li>
        </ul>
      </div>
    </div>
  )
}

export default Home
