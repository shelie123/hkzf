import React, { PureComponent, Fragment } from "react";
import IndexCss from "./Search.module.scss";
import { Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";

// 引入store的接收器
import { connect } from "react-redux";

// 引入action
// import { setCity } from "../../../store/actionCreator";

class Search extends PureComponent {
  // componentDidMount() {
  //   this.props.setCit();
  // }

  render() {
    return (
      <Fragment>
        <div className={IndexCss.search}>
          <div className={IndexCss.searchCity}>
            <div className={IndexCss.city_info}>
              <div className={IndexCss.cityName}>
                <span
                  onClick={() => {
                    this.props.history.push("/HKList");
                  }}
                >
                  {this.props.cityName}
                </span>
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

// 负责将store的数据映射到组合的props rcre
const mapStateToProps = state => {
  console.log(state);
  return {
    cityName: state.mapReducer.cityName
  };
};

// // 2 负责 将 组件中的事件 props.event  映射到 reducer中
// const mapDispatchToProps = dispatch => {
//   return {
//     setCit() {
//       // 有dispatch 下一步就会到reducer中了！！！
//       dispatch(setCity());
//     }
//   };
// };

export default connect(mapStateToProps, null)(withRouter(Search));
