import react from "react";
import { useState, useEffect } from "react";

import "./App.scss";
import lily from "../public/lily.jpg";

const App = () => {
  return (
    <div className="app">
      <div className="header">
        <div className="container header-container">
          <span className="logo">LilyFamily</span>
          <span className="login">Войти</span>
        </div>
      </div>
      <div className="center">
        <div className="container center-container">Center</div>
      </div>
      <div className="footer">
        <div className="container footer-container">
          © 2023 GitHub, Inc. Terms Privacy Security Status Docs Contact GitHub
          Pricing API Training Blog About
        </div>
      </div>
    </div>
  );
};

export default App;
