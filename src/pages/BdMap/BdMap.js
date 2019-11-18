import React, { Component, Fragment } from "react";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import IndexCss from "./BdMap.module.scss";
import { connect } from "react-redux";
import axios from "../../utils/request";

const BMap = window.BMap;

class BdMap extends Component {
  componentDidMount() {
    // // 在react中要使用全局变量 必须要加上window
    // // 创建地图实例
    // var map = new BMap.Map("allmap");
    // // 创建点坐标
    // var point = new BMap.Point(116.404, 39.915);
    // // 初始化地图，设置中心点坐标和地图级别
    // map.centerAndZoom(point, 11);

    // // 平移缩放控件
    // map.addControl(new BMap.NavigationControl());
    // // 显示比例关系
    // map.addControl(new BMap.ScaleControl());
    // 右下角的小地图
    // map.addControl(new BMap.OverviewMapControl());
    // 地图 卫星  地图模式
    // map.addControl(new BMap.MapTypeControl());
    this.getCity();
  }

  getCity = async () => {
    // 获取城市的名称
    const cityName = this.props.cityName;
    // 获取该城市的id
    const id = (await axios.get("area/info?name=" + cityName)).data.body.value;
    // 获取该id下的房源数据
    const houses = (await axios.get("area/map?id=" + id)).data.body;

    this.drawCircle(houses);
  };

  // 画房源-圆圈
  drawCircle = houses => {
    const map = new BMap.Map("allmap");
    // const cityPoint = new BMap.Point(this.props.point.lng, this.props.point.lat);
    const cityName = this.props.cityName;
    // 设置当前城市的经纬度！！！ cityName="广州市"
    map.centerAndZoom(cityName, 11);
    houses.forEach(v => {
      const point = new BMap.Point(v.coord.longitude, v.coord.latitude);
      const opts = {
        position: point
      };
      const label = new BMap.Label(
        `<div class='${IndexCss.circle}'>${v.label} <br/> ${v.count}套 </div>`,
        opts
      );
      label.setStyle({
        border: "none",
        backgroundColor: "transparent"
      });
      map.addOverlay(label);
    });
  };

  render() {
    return (
      <Fragment>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          地图找房
        </NavBar>
        <div className={IndexCss.allmap} id="allmap"></div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cityName: state.mapReducer.cityName,
  point: state.mapReducer.point
});

export default connect(mapStateToProps, null)(withRouter(BdMap));
