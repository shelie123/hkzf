import React, { Component, Fragment } from "react";
import IndexCss from "./Search.module.scss";
import { Icon } from "antd-mobile";

class Search extends Component {
  render() {
    return (
      <Fragment>
        <div className={IndexCss.search}>
          <div className={IndexCss.searchCity}>
            <div className={IndexCss.city_info}>
              <div className={IndexCss.cityName}>
                <span>广州</span>
                <div>
                  <Icon type="down" />
                </div>
              </div>
              <input type="text" placeholder="请输入小区或者地址" />
            </div>
            <div className={IndexCss.search_icon}>
              <i
                className={["iconfont icon-map", IndexCss.iconfont].join(" ")}
              ></i>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Search;
