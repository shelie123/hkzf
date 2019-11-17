// 引入要使用的其他的管理员
import mapReducer from "./mapReducer";

// 引入负责合并管理员的函数
import { combineReducers } from "redux";

// 导出即可
export default combineReducers({ mapReducer });
