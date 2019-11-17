// 引入管理员
import reducer from "./reducer";

// 引入一个store的生成器
// 引入中间件
import { createStore, applyMiddleware } from "redux";

// 引入redux-thunk
import reduxThunk from "redux-thunk";

// 导出使用上了的redux-thunk

export default createStore(reducer, applyMiddleware(reduxThunk));
