import React, { Component, Fragment } from "react";
import IndexCss from "./FilterForm.module.scss";
import { connect } from "react-redux";
import { PickerView } from "antd-mobile";
import axios from "../../../utils/request";
import { withRouter } from "react-router-dom";

class FilterForm extends Component {
  state = {
    // 筛选标题组
    titleGroups: [
      { id: 0, title: "区域", cols: 3 },
      { id: 1, title: "方式", cols: 1 },
      { id: 2, title: "租金", cols: 1 },
      { id: 3, title: "筛选", cols: -1 }
    ],
    // 当前选中的筛选条件的索引
    currentIndex: 2,

    // 筛选条件--大小组
    filterList: []
  };

  componentDidMount() {
    this.getConditions();
  }

  //   获取筛选条件的数据
  getConditions = async () => {
    const { cityName } = this.props;
    // console.log(cityName);
    const id = (await axios.get("area/info?name=" + cityName)).data.body.value;
    // console.log(id);
    const conditions = await axios.get("houses/condition?id=" + id);
    // console.log(conditions);
    const { area, subway, rentType, price } = conditions.data.body;
    // console.log(area, subway)
    const filterList = [
      // 区域和地铁
      [area, subway],
      //   方式
      rentType,
      // 租金
      price
      // 筛选
    ];

    this.setState({ filterList });
  };

  //   根据索引来决定渲染哪个内容
  renderMain = () => {
    const { currentIndex, filterList,titleGroups } = this.state;
    if (currentIndex === -1) {
      return <Fragment />;
    } else if (currentIndex === 3) {
      return <div>还没有实现</div>;
    } else {
      return <PickerView data={filterList[currentIndex]}
      cols={titleGroups[currentIndex].cols}
      />;
    }
  };

  // 添加点击事件
  handleTitleChange = index => {
    this.setState({ currentIndex: index });
  };

  render() {
    const { titleGroups, currentIndex, filterList } = this.state;
    return (
      <Fragment>
        <div className={IndexCss.filter_form}>
          <div className={IndexCss.filter_form_title}>
            {titleGroups.map((v, i) => (
              <div
                onClick={() => this.handleTitleChange(i)}
                key={v.id}
                className={[
                  IndexCss.title_item,
                  currentIndex === i ? IndexCss.active : ""
                ].join(" ")}
              >
                {v.title}
              </div>
            ))}
          </div>
          <div className={IndexCss.filter_form_content}>
            {this.renderMain()}
          </div>
          <div className={IndexCss.filter_form_btns}></div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cityName: state.mapReducer.cityName
});

export default connect(mapStateToProps, null)(withRouter(FilterForm));
