import { Outlet, Link } from "react-router-dom";
import navBar from "../components/navigationBar.js";

const Layout = () => {
  return (
    <>
      {navBar}
      <Outlet />
    </>
  );
};

export default Layout;
