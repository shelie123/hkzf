import React, { Component, Fragment } from "react";
import { NavBar, Icon, Toast } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../utils/request";
import IndexCss from "./HKList.module.scss";
import { List, AutoSizer } from "react-virtualized";
import { syncSetCity } from "../../store/actionCreator";
class HKList extends Component {
  state = {
    // 页面要渲染的城市列表
    totalCitys: [],
    // 右侧的字母列表
    letterList: [],
    // 当前显示的索引
    currentIndex: 0
  };

  componentDidMount() {
    this.getCitys();
  }
  // 获取最终的数组
  async getCitys() {
    // console.log(this.props.cityName);
    // 获取 当前的城市
    // 获取 热门城市

    // 定义总的城市的数组
    let totalCitys = [];

    let letterList = ["#", "热"];

    // 获取当前的城市
    const cityName = this.props.cityName;
    // 获取热门城市
    const hotCitys = (await axios.get("area/hot")).data.body;

    // 获取所有城市
    const allCitys = (await axios.get("area/city?level=1")).data.body;
    // console.log(allCitys);

    totalCitys.push({ 当前地址: [cityName] });
    totalCitys.push({ 热门城市: hotCitys.map(v => v.label) });
    // console.log(totalCitys);

    // 1、先判断 对象{"A":[...]} 是否存在 obj={"A":[...]}
    // 2、假设该对象存在  obj.A.push("对象的label")
    // 3、假设该对象 不存在 tatalCitys.push({"A":["被循环的对象的label"]})

    // 如果要交换位置 返回-1 否则返回1
    allCitys.sort((a, b) => (b.short > a.short ? -1 : 1));
    // console.log(allCitys);
    allCitys.forEach((v, i) => {
      // label: "北京"
      // pinyin: "beijing"
      // short: "bj"
      // value: "AREA|88cff55c-aaa4-e2e0"

      // 获取首字母 A
      let firstLetter = v.short[0].toUpperCase();

      // 如何判断 首字母是否存在于大的数组中
      const index = totalCitys.findIndex(vv => {
        // vv
        // { "当前地址": [ "全国" ] },
        // { "热门城市": [ "北京", "广州", "上海", "深圳" ] },
        // { "A": [ "安庆" ] },
        return vv[firstLetter];
      });

      // 判断是否存在于totalCitys
      if (index !== -1) {
        // 存在 totalCitys[index]={"A":["安庆"]}
        totalCitys[index][firstLetter].push(v.label);
      } else {
        // 不存在 totalCitys
        // firstLetter = A | B | C;
        totalCitys.push({
          [firstLetter]: [v.label]
        });
        letterList.push(firstLetter);
      }
    });
    // console.log(totalCitys);
    this.setState({ totalCitys, letterList });
  }

  // 点击城市列表的事件、
  cityItemChange = cityName => {
    // 判断该城市下有没有房源信息
    if (["北京", "上海", "深圳", "广州"].includes(cityName)) {
      this.props.setCity(cityName);
      // 跳转页面
      this.props.history.push("/");
    } else {
      Toast.info("该城市下没有房源信息", 1);
    }
  };

  // 城市列表每一行如何渲染
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) => {
    const { totalCitys } = this.state;
    // {totalCitys[index]}=> {当前地址：Array(1)}
    // 获取对象中的属性名
    const property = Object.keys(totalCitys[index])[0];
    const item = totalCitys[index];
    return (
      // {当前地址：Array(1)}
      // {热门城市：Array(4)}
      // {A:Array(1)}
      <div className={IndexCss.city_item} key={key} style={style}>
        <div className={IndexCss.city_item_title}>{property}</div>
        <div className={IndexCss.city_item_group}>
          {item[property].map((v, i) => (
            <div
              key={v}
              onClick={() => this.cityItemChange(v)}
              className={IndexCss.city_item_inner}
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 决定 每一行多高
  rowHeight = ({ index }) => {
    const { totalCitys } = this.state;
    const property = Object.keys(totalCitys[index])[0];
    // 获取每一行的对象
    // {totalCitys[index]}  =>  {当前地址: Array(1)}
    const item = totalCitys[index];

    // item 的数组 长度*40 +item 标题的高度（40px）
    const rowHeight = item[property].length * 40 + 40;
    return rowHeight;
  };

  // 右侧字母的点击事件
  handleLetterClick = index => {
    this.setState({ currentIndex: index });
  };

  // 行渲染完毕事件
  // startIndex 行渲染完毕之后的 第一行的索引
  rowsRendered = ({ startIndex }) => {
    this.setState({ currentIndex: startIndex });
  };

  render() {
    // console.log(this.props);
    const { totalCitys, letterList, currentIndex } = this.state;
    // 获取页面的宽度即可
    // const width =document.documentElement.width
    // const width = window.screen.width;

    // // List高度=页面的高度-导航栏和尾部tab的高度
    // let height = window.screen.height - 45 - 50;
    // console.log(height);

    return (
      <Fragment>
        <div className="hk_list">
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.go(-1)}
          >
            城市选择
          </NavBar>
          <div className={IndexCss.main_list}>    
            {/* 使用了可视区域插件 开始 */}
            <AutoSizer>
              {({ width, height }) => (
                <List
                  // 容器的宽度
                  width={width}
                  // 可视区域的高度
                  height={height}
                  // 列表的数组的长度
                  rowCount={totalCitys.length}
                  // 每一行的高度
                  rowHeight={this.rowHeight}
                  // 每一行如何渲染
                  rowRenderer={this.rowRenderer}
                  // 设置滚动到第几行
                  scrollToIndex={currentIndex}
                  // 设置对齐方式即可
                  scrollToAlignment="start"
                  // 行渲染完毕事件
                  onRowsRendered={this.rowsRendered}
                />
              )}
            </AutoSizer>
            {/* 使用了可视区域插件 结束 */}

            {/* 字母列表 开始 */}
            <div className={IndexCss.letter_list}>
              {letterList.map((v, i) => (
                <div
                  onClick={() => this.handleLetterClick(i)}
                  key={v}
                  className={[
                    IndexCss.letter_item,
                    i === currentIndex ? IndexCss.active : ""
                  ].join(" ")}
                >
                  {v}
                </div>
              ))}
            </div>
            {/* 字母列表 结束 */}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cityName: state.mapReducer.cityName
});

const mapDispatchToProps = dispatch => {
  return {
    setCity(cityName) {
      dispatch(syncSetCity(cityName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HKList));
