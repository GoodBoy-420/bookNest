import { Outlet } from "react-router-dom";

import logo from "../assets/logo.svg";

const HomePage = () => {
  return (
    <div>
      <img src={logo} alt="Home" width="150px" />
      <Outlet />
    </div>
  );
};

export default HomePage;
