import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SmallNavBar from "../components/SmallNavBar.js";

function Layout(props) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  // Add an event listener to update the viewport width when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <SmallNavBar />
      <Outlet />
    </>
  );
}

export default Layout;
