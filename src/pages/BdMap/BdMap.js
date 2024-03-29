import React, { Component, Fragment } from "react";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import IndexCss from "./BdMap.module.scss";
import { connect } from "react-redux";
import axios from "../../utils/request";
import HouseItem from "../../components/common/HouseItem/HouseItem";

const BMap = window.BMap;

/* 
1 第一次加载的时候
  1 缩放倍数 10 
  2 label 是一个圆
  3 再点击 放大被点击-加载被点击的房源数据
2 第二次点击的时候 
  1 缩放倍数 12 
  2 label 是一个圆
  3 移除其他没有被点击的房源数据  （点击的是花都，天河就应该被移除）
  4 再点击 放大被点击-加载被点击的房源数据
3 第三次点击
  1 缩放倍数 15
  2 label 是一个矩形
  3 移除其他没有被点击的房源数据
  4 再点击 
    1 居中被点击的城市
    2 从下往上显示被点击的 房源列表
 */

class BdMap extends Component {
  // 地图对象 没有把它放入state中 没有必要
  // state中的数据 都是要在视图中显示 渲染
  Map = null;

  state = {
    showCss: false,
    // 详细的房源列表数组
    houses: []
  };
  componentDidMount() {
    // // 平移缩放控件
    // map.addControl(new BMap.NavigationControl());
    // // 显示比例关系
    // map.addControl(new BMap.ScaleControl());
    // 右下角的小地图
    // map.addControl(new BMap.OverviewMapControl());
    // 地图 卫星  地图模式
    // map.addControl(new BMap.MapTypeControl());
    //     this.getCity();
    //   }

    //   getCity = async () => {
    //     // 获取城市的名称
    //     const cityName = this.props.cityName;
    //     // 获取该城市的id
    //     const id = (await axios.get("area/info?name=" + cityName)).data.body.value;
    //     // 获取该id下的房源数据
    //     const houses = (await axios.get("area/map?id=" + id)).data.body;

    //     this.drawCircle(houses);

    // 获取城市名称
    this.Map = new BMap.Map("allmap");
    this.Map.addControl(new BMap.NavigationControl());

    // 绑定了地图的拖拽事件
    this.Map.addEventListener("dragstart", () => {
      this.setState({ showCss: false });
    });

    const cityName = this.props.cityName;
    const id = null;
    const currentPoint = {
      longitude: this.props.point.lng,
      latitude: this.props.point.lat
    };
    this.drawHouse(cityName, id, currentPoint);
  }

  // 返回当前的缩放层级等数据
  getZoom = (function() {
    let arr = [
      { id: 0, zoom: 10, cls: "circle" },
      { id: 1, zoom: 12, cls: "circle" },
      { id: 2, zoom: 15, cls: "rect" }
    ];
    let index = -1;
    return function() {
      index++;
      index = index === 3 ? 0 : index;
      return arr[index];
    };
  })();

  // 画房源-圆圈
  //   1 封装旧的代码
  //     1 接收两个参数
  //       cityName
  //       id
  //     2 业务
  //       1 根据该 cityName 做地图居中
  //       2 根据 id 获取城市下的房源数据
  //       3 有了房源数组后 循环 来画 label
  //       4 在循环里面 给label标签 绑定点击事件
  //         事件触发了 获取到被点击的对象
  //           该对象中 存在
  //           城市的名称 和 城市的 id

  //   drawCircle = houses => {
  drawHouse = async (cityName, id, currentPoint) => {
    const map = this.Map;
    // const map = new BMap.Map("allmap");
    // const cityPoint = new BMap.Point(this.props.point.lng, this.props.point.lat);
    // const cityName = this.props.cityName;
    // 设置当前城市的经纬度！！！ cityName="广州市"
    const tmpPoint = new BMap.Point(
      currentPoint.longitude,
      currentPoint.latitude
    );
    const zoomObj = this.getZoom();
    map.centerAndZoom(tmpPoint, zoomObj.zoom);

    if (!id) {
      id = (await axios.get("area/info?name=" + cityName)).data.body.value;
    }
    const houses = (await axios.get("area/map?id=" + id)).data.body;
    houses.forEach(v => {
      const point = new BMap.Point(v.coord.longitude, v.coord.latitude);
      const opts = {
        position: point
      };
      const label = new BMap.Label(
        `<div class='${IndexCss[zoomObj.cls]}'>${v.label} <br/> ${
          v.count
        }套 </div>`,
        opts
      );
      label.addEventListener("click", e => {
        //   1、获取被点击的城市名称和id
        const name = v.label;
        const id = v.value;

        if (zoomObj.id === 2) {
          // 加载该房源下的详情数据
          // axios.get("/houses?cityId=" + id).then(res => {
          //   console.log(res);
          // });
          this.getHouses(id);

          // 获取手指按下的坐标
          const client = e.changedTouches[0];
          // x y 如何计算？？
          const y = client.clientY - 100 - 45;
          const x = client.clientX - window.screen.width / 2;
          // 从目前的位置出发 移动多少px 不是类似定位
          this.Map.panBy(-x, -y);
        } else {
          // 清除覆盖物
          this.Map.clearOverlays();
          this.drawHouse(name, id, v.coord);
        }
      });
      label.setStyle({
        border: "none",
        backgroundColor: "transparent"
      });
      map.addOverlay(label);
    });
  };

  // 获取最底层的房源列表信息 -- 详情
  getHouses = async id => {
    const res = await axios.get("/houses?cityId=" + id);

    this.setState({ houses: res.data.body.list, showCss: true });
  };

  showDetail = () => {
    console.log("显示房源列表");
    this.setState({ showCss: true });
  };

  render() {
    return (
      <Fragment>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          <span onClick={this.showDetail}>地图找房</span>
        </NavBar>
        <div className={IndexCss.bd_view}>
          <div className={IndexCss.allmap} id="allmap"></div>
          <div
            className={[
              IndexCss.house_detail,
              this.state.showCss ? IndexCss.show_css : ""
            ].join(" ")}
          >
            <div className={IndexCss.house_detail_title}>
              <span>房屋列表</span>
              <span>更多房源</span>
            </div>
            <div className={IndexCss.house_detail_content}>
              {this.state.houses.map((v, i) => (
                <div key={i} className={IndexCss.house_bd_item}>
                  <HouseItem {...v} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cityName: state.mapReducer.cityName,
  point: state.mapReducer.point
});

export default connect(mapStateToProps, null)(withRouter(BdMap));
