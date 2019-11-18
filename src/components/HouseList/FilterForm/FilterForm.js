import React, { Component, Fragment } from "react";
import IndexCss from "./FilterForm.module.scss";

class FilterForm extends Component {
  state = {
    // 筛选标题组
    titleGroups: [
      { id: 0, title: "区域" },
      { id: 1, title: "方式" },
      { id: 2, title: "租金" },
      { id: 3, title: "筛选" }
    ],
    // 当前选中的筛选条件的索引
    currentIndex: 0
  };

  // 添加点击事件
  handleTitleChange = index => {
    this.setState({ currentIndex: index });
  };

  render() {
    const { titleGroups, currentIndex } = this.state;
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
          <div className={IndexCss.filter_form_content}></div>
          <div className={IndexCss.filter_form_btns}></div>
        </div>
      </Fragment>
    );
  }
}

export default FilterForm;
