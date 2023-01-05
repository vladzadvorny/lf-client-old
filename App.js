import react from "react";

import "./styles.css";
import tiger from "./public/tiger.jpg";

const App = () => {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen! Мяу!!!</h2>
      <img src={tiger} className="Image" />
    </div>
  );
};
export default App;
