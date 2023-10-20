import "./navigationBar.css";

function deselectNavButton(buttonId) {
  var button = document.getElementById(buttonId);
  button.className = "navButton";
}

function selectNavButton(buttonId) {
  var button = document.getElementById(buttonId);
  button.className = "selectedNavButton";
}

function updateNavButtons(buttonId) {
  switch (buttonId) {
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

const navigationBar = (
  <div className="navContainer">
    <button
      id="homeButton"
      className="navButton"
      onClick={() => {
        updateNavButtons("Home");
      }}
    >
      Home
    </button>
    <button
      id="servicesButton"
      className="navButton"
      onClick={() => {
        updateNavButtons("Services");
      }}
    >
      Services
    </button>
    <button
      id="aboutButton"
      className="navButton"
      onClick={() => {
        updateNavButtons("About");
      }}
    >
      About
    </button>
  </div>
);

export default navigationBar;
