import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Store from "./store/Store";
import { Provider } from "react-redux";
import "./style/basic/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
