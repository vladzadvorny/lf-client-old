import { Outlet } from "react-router-dom";

import "./Main.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Center = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Center;
