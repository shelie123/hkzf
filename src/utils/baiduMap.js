const BMap = window.BMap;

const geolocation = new BMap.Geolocation();

// 获取当前的经纬度

export const getCurrentPosition = () => {
  // promise
  return new Promise((resolve, reject) => {
    geolocation.getCurrentPosition(function(r) {
      resolve(r.point);
    });
  });
};

// 根据经纬度来获取所在的城市
export const getCity = () => {
  return new Promise((resolve, reject) => {
    getCurrentPosition().then(point => {
      var myGeo = new BMap.Geocoder();
      // 2、根据坐标得到地址 城市名称
      myGeo.getLocation(new BMap.Point(point.lng, point.lat), function(result) {
        const cityName = result.addressComponents.city;

        resolve({ cityName, point });
      });
    });
  });
};
