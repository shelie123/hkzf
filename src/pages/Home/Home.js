import React, { Component, Fragment } from "react";
import { Carousel } from "antd-mobile";
import axios from "../../utils/request";
import IndexCss from "./Home.module.scss";

// 引入搜索框
import Search from "../../components/common/Search/Search";

// 引入本地的图片，类似js文件一样来引入
import nav1 from "../../assets/images/nav-1.png";
import nav2 from "../../assets/images/nav-2.png";
import nav3 from "../../assets/images/nav-3.png";
import nav4 from "../../assets/images/nav-4.png";

class Home extends Component {
  state = {
    swiperList: [],
    imgHeight: 176,

    // 首页导航的数组
    navList: [
      { id: 0, text: "整租", src: nav1 },
      { id: 1, text: "合租", src: nav2 },
      { id: 2, text: "地图找房", src: nav3 },
      { id: 3, text: "去出租", src: nav4 }
    ],

    // 租房小组
    groups: [],

    // 资讯
    news: []
  };

  componentDidMount() {
    axios.get("/home/swiper").then(res => {
      this.setState({ swiperList: res.data.body });
    });

    axios.get("/home/groups").then(res => {
      this.setState({ groups: res.data.body });
    });
    axios.get("/home/news").then(res => {
      this.setState({ news: res.data.body });
    });
  }

  render() {
    const { swiperList } = this.state;

    return (
      <Fragment>
        {/* jsx中  普通的变量和便签可以在一起写 */}

        {/* 轮播图开始 */}
        <div className={IndexCss.home_Carousel}>
          <div className={IndexCss.search}>
            <Search />
          </div>
          {swiperList.length && (
            <Carousel autoplay infinite>
              {swiperList.map(val => (
                <a
                  key={val.id}
                  href="http://www.alipay.com"
                  style={{
                    display: "inline-block",
                    width: "100%",
                    height: this.state.imgHeight
                  }}
                >
                  <img
                    src={axios.defaults.baseURL + val.imgSrc}
                    alt=""
                    style={{ width: "100%", verticalAlign: "top" }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event("resize"));
                      this.setState({ imgHeight: "auto" });
                    }}
                  />
                </a>
              ))}
            </Carousel>
          )}
        </div>
        {/* 轮播图结束 */}

        {/* 首页导航开始 */}
        <div className={IndexCss.home_nav}>
          {this.state.navList.map(v => (
            <div key={v.id} className={IndexCss.nav_item}>
              <img src={v.src} alt="" />
              <p>{v.text}</p>
            </div>
          ))}
        </div>
        {/* 首页导航结束 */}

        {/* 租房小组开始 */}
        <div className={IndexCss.groups}>
          <div className={IndexCss.groups_top}>
            <span>租房小组</span>
            <span>更多</span>
          </div>
          <div className={IndexCss.groups_info}>
            {this.state.groups.map(v => (
              <div key={v.id} className={IndexCss.groups_left}>
                <div className={IndexCss.groups_title}>
                  <span>{v.title}</span>
                  <span>{v.desc}</span>
                </div>
                <div className={IndexCss.groups_image}>
                  <img src={axios.defaults.baseURL + v.imgSrc} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 租房小组结束 */}

        {/* 资讯开始 */}
        <div className={IndexCss.news}>
          <div className={IndexCss.news_top}>最新资讯</div>
          <div className={IndexCss.news_content}>
            {this.state.news.map(v => (
              <div key={v.id} className={IndexCss.news_center}>
                <div className={IndexCss.news_image}>
                  <img src={axios.defaults.baseURL + v.imgSrc} alt="" />
                </div>
                <div className={IndexCss.news_right}>
                  <div className={IndexCss.news_title}>{v.title}</div>
                  <div className={IndexCss.news_bottom}>
                    <span>{v.from}</span>
                    <span>{v.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 资讯结束 */}
      </Fragment>
    );
  }
}

export default Home;
