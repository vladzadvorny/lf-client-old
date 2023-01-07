import { useOutlet, Link } from "react-router-dom";

import "./Main.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Center = () => {
  const outlet = useOutlet();

  return (
    <>
      <Header />
      {outlet || (
        <div className="center">
          <div className="container center-container">
            <div className="cathegory">
              <Link to={`category`} className="theme">
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
      )}
      <Footer />
    </>
  );
};

export default Center;
