// 1 用上axios
import axios from "axios";
import { Toast } from "antd-mobile";
// axios.defaults.baseURL = 'http://hkzf.zbztb.cn';
axios.defaults.baseURL = process.env.REACT_APP_NOT_BASE_URL;

// 拦截器
// 请求拦截 显示正在等待的图标
axios.interceptors.request.use(
  function(config) {
    Toast.loading("正在加载中", 0);
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截 隐藏 等待图标
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    Toast.hide();
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;
