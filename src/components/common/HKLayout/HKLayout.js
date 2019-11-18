import React from "react";
import { TabBar } from "antd-mobile";
// 引入withRouter 函数
import { withRouter } from "react-router-dom";

class HKLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "redTab",
      hidden: false,
      fullScreen: false
    };
  }

  render() {
    const { history } = this.props;
    // 获取url上的路径
    const path = this.props.match.path;

    return (
      <div style={{ position: "fixed", height: "100%", width: "100%", top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="Home"
            icon={<i className="iconfont icon-ind" />}
            selectedIcon={<i className="iconfont icon-ind" />}
            selected={path === "/"}
            onPress={() => {
              history.push("/");
            }}
          >
            {/* 放首页 */}
          
            {path === "/" && this.props.children}
            {/* 放首页 */}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-findHouse" />}
            selectedIcon={<i className="iconfont icon-findHouse" />}
            title="找房"
            key="HouseList"
            selected={path === "/HouseList"}
            onPress={() => {
              history.push("/HouseList");
            }}
          >
            {/* 找房 */}
            {path === "/HouseList" && this.props.children}
            {/* 找房 */}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-infom" />}
            selectedIcon={<i className="iconfont icon-infom" />}
            title="资讯"
            key="News"
            selected={path === "/News"}
            onPress={() => {
              history.push("/News");
            }}
          >
            {/* 资讯 */}
            {path === "/News" && this.props.children}
            {/* 资讯 */}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-my" />}
            selectedIcon={<i className="iconfont icon-my" />}
            title="我的"
            key="My"
            selected={path === "/My"}
            onPress={() => {
              history.push("/My");
            }}
          >
            {/* 我的 */}
            {path === "/My" && this.props.children}
            {/* 我的 */}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

// 使用withRouter 把组件包起来即可
export default withRouter(HKLayout);
