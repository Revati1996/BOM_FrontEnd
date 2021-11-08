import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap';
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
