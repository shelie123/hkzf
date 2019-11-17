import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// 引入字体图标
import "./assets/fonts/iconfont.css";
import App from "./App";

// 引入store
import store from "./store";

// 引入store接收器
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
