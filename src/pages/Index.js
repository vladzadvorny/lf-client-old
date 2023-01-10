import { Link } from 'react-router-dom'

import './Index.scss'

const Index = () => {
  return (
    <div className="center">
      <div className="container center-container">
        <div className="cathegory">
          <Link to="category" className="theme">
            Тема обсуждения
          </Link>
          <ul>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
          </ul>
        </div>

        <div className="cathegory">
          <div className="theme">Тема обсуждения</div>
          <ul>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
          </ul>
        </div>

        <div className="cathegory">
          <div className="theme">Тема обсуждения</div>
          <ul>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
          </ul>
        </div>

        <div className="cathegory">
          <div className="theme">Тема обсуждения</div>
          <ul>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
          </ul>
        </div>
        <div className="cathegory">
          <div className="theme">Тема обсуждения</div>
          <ul>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Index
