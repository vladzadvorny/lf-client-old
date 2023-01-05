import react from "react";
import { useState, useEffect } from "react";

import "./styles.css";
import tiger from "./public/tiger.jpg";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://animechan.vercel.app/api/quotes`)
      .then((response) => response.json())
      .then((actualData) => setData(actualData))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!!!!! Мяу!!!</h2>
      <img src={tiger} className="Image" />
      {data &&
        data.map(({ anime, character, quote }) => (
          <div className="Quotation">
            <div className="header">
              <h3>{anime}</h3>
              <h4>{character}</h4>
            </div>
            <p>{`"${quote}"`}</p>
          </div>
        ))}
    </div>
  );
};

const Loader = () => {
  return <h1 className="Loader">Загрузка...</h1>;
};

export default App;
