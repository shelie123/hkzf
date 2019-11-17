import { SET_CITY } from "../actionTypes";
// const BMap = window.BMap;
import { getCity } from "../../utils/baiduMap";

// 同步设置城市的名称

export const syncSetCity = cityName => {
  return {
    type: SET_CITY,
    value: cityName
  };
};

// 异步设置城市名称
export const setCity = () => {
  return dispatch => {
    // 写异步代码
    //   var geolocation = new BMap.Geolocation();
    //   // 获取当前的经纬度
    //   geolocation.getCurrentPosition(function(r) {
    //     // 创建地理编码实例
    //     var myGeo = new BMap.Geocoder();
    //     // 根据坐标得到地址 城市名称
    //     myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(
    //       result
    //     ) {
    //       const cityName = result.addressComponents.city;
    //       dispatch({
    //         type: SET_CITY,
    //         value: cityName
    //       });
    //     });
    //   });
    // };
    getCity().then(cityName => {
      dispatch({
        type: SET_CITY,
        value: cityName
      });
    });
  };
};
