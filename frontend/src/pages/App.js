import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Layout from "../pages/Layout.js";
import HomePage from "../pages/Home.js";
import ServicesPage from "../pages/Services.js";
import AboutPage from "../pages/About.js";
import ErrorPage from "../pages/Error.js";
import Admin from "../pages/Admin.js";

function App() {
  document.head.append();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
