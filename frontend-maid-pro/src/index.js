import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./App.js", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <NextApp />
        </BrowserRouter>
      </Provider>,
      document.getElementById("root")
    );
  });
}

serviceWorker.unregister();
