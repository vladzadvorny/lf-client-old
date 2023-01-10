import { useLoaderData } from 'react-router-dom'

import './Category.scss'

const Category = () => {
  const { data } = useLoaderData()

  return (
    <div className="center">
      <div className="container center-container">
        <div className="category">
          <div className="theme">Тема обсуждения</div>
          <ul>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
            <li className="question">Вопрос</li>
          </ul>
        </div>
        {/* {data &&
          data.map(({ anime, character, quote }) => (
            <div className="Quotation">
              <div>
                <h3>Тема: {anime}</h3>
                <h4>Автор: {character}</h4>
              </div>
              <p>Вопрос: "{quote}?"</p>
            </div>
          ))} */}
      </div>
    </div>
  )
}

export async function loader() {
  const response = await fetch(`https://animechan.vercel.app/api/quotes`)
  const data = await response.json()

  return { data }
}

export default Category
