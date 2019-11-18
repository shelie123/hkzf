import React, { Component, Fragment } from "react";
import IndexCss from "./HouseItem.module.scss";
import axios from "../../../utils/request";

class HouseItem extends Component {
  render() {
    const { houseImg, title, desc, price, tags } = this.props;
    return (
      <Fragment>
        <div className={IndexCss.house_item}>
          <div className={IndexCss.house_item_img}>
            <img src={axios.defaults.baseURL + houseImg} alt="" />
          </div>
          <div className={IndexCss.house_item_info}>
            <div className={IndexCss.house_info_title}>{title}</div>
            <div className={IndexCss.house_info_desc}>{desc}</div>
            <div className={IndexCss.house_info_tags}>
              {tags.map(v => (
                <span key={v}>{v}</span>
              ))}
            </div>
            <div className={IndexCss.house_info_price}>
              <span>{price}</span>元/月
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default HouseItem;
