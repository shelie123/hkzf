import React, { Component, Fragment } from "react";
import { NavBar, Icon } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../utils/request";
import IndexCss from "./HKList.module.scss";
import { List } from "react-virtualized";
class HKList extends Component {
  state = {
    // 页面要渲染的城市列表
    totalCitys: []
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
      }
    });
    // console.log(totalCitys);
    this.setState({ totalCitys });
  }

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
      <div key={key} className={IndexCss.city_item} style={style}>
        <div className={IndexCss.city_item_title}>{property}</div>
        <div className={IndexCss.city_item_group}>
          {item[property].map((v, i) => (
            <div key={v} className={IndexCss.city_item_inner}>
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

  render() {
    // console.log(this.props);
    const { totalCitys } = this.state;
    // 获取页面的宽度即可
    // const width =document.documentElement.width
    const width = window.screen.width;

    // List高度=页面的高度-导航栏和尾部tab的高度
    let height = window.screen.height - 45 - 50;
    console.log(height);

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
            {/* {this.state.totalCitys.map((v, i) => {
              // 获取当前对象的属性名
              const property = Object.keys(v)[0];
              return (
                // {当前地址：Array(1)}
                // {热门城市：Array(4)}
                // {A:Array(1)}
                <div key={i} className={IndexCss.city_item}>
                  <div className={IndexCss.city_item_title}>{property}</div>
                  <div className={IndexCss.city_item_group}>
                    {v[property].map((vv, ii) => (
                      <div key={vv} className={IndexCss.city_item_inner}>
                        {vv}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })} */}

            {/* 使用了可视区域插件 开始 */}
            <List
              width={width}
              height={height}
              rowCount={totalCitys.length}
              rowHeight={this.rowHeight}
              rowRenderer={this.rowRenderer}
            />
            {/* 使用了可视区域插件 结束 */}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cityName: state.mapReducer.cityName
});

export default connect(mapStateToProps, null)(withRouter(HKList));
