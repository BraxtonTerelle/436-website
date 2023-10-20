import logo from "../images/logo.svg";
import { useState, useEffect } from "react";
import "../styles/App.css";
import navBar from "../components/navigationBar.js";

function App() {
  const [currentPage, setCurrentPage] = useState(null);
  var homePage, defaultPage;
  // Show loading symbol until useEffect initializes and we set current
  // page to homePage. Eventually we'll have a top menu that upon clicking
  // on a page name we'll call setCurrentPage to update the view, or just use
  // React Router

  useEffect(() => {
    setCurrentPage(homePage);
  }, []);

  function defaultPage() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/Home.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

  function homePage() {
    return <div className="homeContainer">{navBar}</div>;
  }

  return currentPage;
}

export default App;
