import "../styles/navigationBar.css";
import { Link } from "react-router-dom";
// Helper function that deselects a menu button specified by
// its button id
function deselectNavButton(buttonId) {
  var button = document.getElementById(buttonId);
  button.className = "navButton";
}

// Helper function that selects a menu button specified by its
// button id
function selectNavButton(buttonId) {
  var button = document.getElementById(buttonId);
  button.className = "selectedNavButton";
}

// Based on which button was pressed, select that menu nav
// button and deselect all others since they may have been
// previously pressed
function updateNavButtons(buttonName) {
  switch (buttonName) {
    case "Home":
      selectNavButton("homeButton");
      deselectNavButton("servicesButton");
      deselectNavButton("aboutButton");
      break;
    case "Services":
      selectNavButton("servicesButton");
      deselectNavButton("homeButton");
      deselectNavButton("aboutButton");
      break;
    case "About":
      selectNavButton("aboutButton");
      deselectNavButton("servicesButton");
      deselectNavButton("homeButton");
      break;
  }
}

// This component returns a an absolutely positioned div
// that represents the navigation bar for the website
const navigationBar = (
  <div className="navContainer">
    <Link to="/">
      <button
        id="homeButton"
        className="selectedNavButton"
        onClick={() => {
          updateNavButtons("Home");
        }}
      >
        Home
      </button>
    </Link>
    <Link to="/services">
      <button
        id="servicesButton"
        className="navButton"
        onClick={() => {
          updateNavButtons("Services");
        }}
      >
        Services
      </button>
    </Link>
    <Link to="/about">
      <button
        id="aboutButton"
        className="navButton"
        onClick={() => {
          updateNavButtons("About");
        }}
      >
        About
      </button>
    </Link>
  </div>
);

export default navigationBar;
