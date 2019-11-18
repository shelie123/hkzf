import React, { Component, Fragment } from "react";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import Search from "../../components/common/Search/Search";
import IndexCss from "./HouseList.module.scss";
import FilterForm from "../../components/HouseList/FilterForm/FilterForm";

class HouseList extends Component {
  render() {
    return (
      <Fragment>
        <div className={IndexCss.content}>
          <div className={IndexCss.house_list}>
            <div className={IndexCss.house_top}>
              <NavBar
                mode="light"
                icon={<Icon type="left" className={IndexCss.icon_left} />}
                onLeftClick={() => this.props.history.go(-1)}
                style={{ backgroundColor: "#f5f5f5" }}
                className={IndexCss.NavBar}
              ></NavBar>
              <div className={IndexCss.search}>
                <Search />
              </div>
            </div>
          </div>
          {/* 筛选组件开始 */}
          <div className="house_filterform">
            <FilterForm />
          </div>
          {/* 筛选组件结束 */}
        </div>
      </Fragment>
    );
  }
}

export default withRouter(HouseList);
