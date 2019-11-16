// 1 用上axios 
import axios from "axios";
// axios.defaults.baseURL = 'http://hkzf.zbztb.cn';
axios.defaults.baseURL = process.env.REACT_APP_NOT_BASE_URL;

export default axios;