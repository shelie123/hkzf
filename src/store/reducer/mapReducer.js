import { SET_CITY } from "../actionTypes";

// 定义默认的数据
const defaultState = {
  cityName: ""
};

// 导出这个函数  当修改数据的时候 会被触发！！
export default (state = defaultState, action) => {
  // 复制一个数据
  let newState = JSON.parse(JSON.stringify(state));

  // 判断action的类型
  switch (action.type) {
    case SET_CITY:
      newState.cityName = action.value;
      break;
    default:
      return state;
      break;
  }

  return newState;
};
