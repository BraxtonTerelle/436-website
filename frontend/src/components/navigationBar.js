import "../styles/NavigationBar.css";
import { useNavigate } from "react-router-dom";

// This component returns a an absolutely positioned div
// that represents the navigation bar for the website
function NavigationBar(props) {
  const url = window.location.href;
  var currentPage;
  if (url.includes("/")) {
    const path = url.substring(url.lastIndexOf("/"));
    if (path.includes("services")) {
      currentPage = "Services";
    } else if (path.includes("about")) {
      currentPage = "About";
    } else {
      currentPage = "Home";
    }
  } else {
    currentPage = "Home";
  }
  const navigate = useNavigate();
  return (
    <div className="navContainer">
      <button
        id="homeButton"
        className={currentPage == "Home" ? "selectedNavButton" : "navButton"}
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <button
        id="servicesButton"
        className={
          currentPage == "Services" ? "selectedNavButton" : "navButton"
        }
        onClick={() => {
          navigate("/services");
        }}
      >
        Services
      </button>
      <button
        id="aboutButton"
        className={currentPage == "About" ? "selectedNavButton" : "navButton"}
        onClick={() => {
          navigate("/about");
        }}
      >
        About
      </button>
    </div>
  );
}

export default NavigationBar;
