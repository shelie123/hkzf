import React, { Component, Fragment } from "react";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import IndexCss from "./BdMap.module.scss";
import {connect} from "react-redux";
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

  getCity = () => {
    // 创建地图实例
    var map = new BMap.Map("allmap");
    // 创建点坐标
    var point = new BMap.Point(116.417854, 39.921988);
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(point, 11);

    // 定义配置对象
    var opts = {
      position: point, //指定文本标注所在的地理位置
      offset: new BMap.Size(30, -30) //设置文本偏移量
    };

    // 定义了一个文本对象，特别要在注意动态的  其他插件所生成的标签的特点
    var label = new BMap.Label(
      `<div class='${IndexCss.circle}'>文本</div>`,
      opts
    );

    // 设置样式
    label.setStyle({
      border: "none",
      backgroundColor: "transparent"
    });
    // 把覆盖添加到地图上
    map.addOverlay(label);
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
export default withRouter(BdMap);
