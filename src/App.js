import React, { Component, Fragment } from "react";

import { HashRouter as Router, Route } from "react-router-dom";
import HKLayout from "./components/common/HKLayout/HKLayout";
import Home from "./pages/Home/Home";
import HKList from "./pages/HKList/HKList";
import News from "./pages/News/News";
import My from "./pages/My/My";
import BdMap from "./pages/BdMap/BdMap";

// 引入ant组件
// import {Button} from "antd-mobile"

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Route
            exact
            path="/"
            render={() => (
              <HKLayout>
                <Home />
              </HKLayout>
            )}
          ></Route>
          <Route
            path="/HKList"
            render={() => (
              <HKLayout>
                <HKList />
              </HKLayout>
            )}
          ></Route>
          <Route
            path="/News"
            render={() => (
              <HKLayout>
                <News />
              </HKLayout>
            )}
          ></Route>
          <Route
            path="/My"
            render={() => (
              <HKLayout>
                <My />
              </HKLayout>
            )}
          ></Route>
          <Route path="/BdMap" component={BdMap}></Route>
        </Router>
      </Fragment>
    );
  }
}

export default App;
