import React, { Component, Fragment } from "react";
const BMap = window.BMap;

class BdMap extends Component {
  componentDidMount() {
    // 在react中要使用全局变量 必须要加上window

    // 创建地图实例
    // var map = new BMap.Map("container");

    // 创建点坐标
    // var point = new BMap.point();

    // 初始化地图，设置中心点坐标和地图级别
    // map.centerAndZoom(point, 11);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      // 创建地理编码实例
      var myGeo = new BMap.Geocoder();
      // 根据坐标得到地址描述
      myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(
        result
      ) {
        console.log(result);
        alert(result.address);
      });
    });
  }
  render() {
    return (
      <Fragment>
        {/* <div style={{ height: "200px" }} id="container"></div> */}
      </Fragment>
    );
  }
}
export default BdMap;
