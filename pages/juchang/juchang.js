import {
  getVideoList
} from "../../api/common"
const app = getApp()

Page({
  data: {
    videoList: [],
    iconList: [{
        icon: "../../static/img/paihangbang.png",
        text: "排行"
      },
      {
        icon: "../../static/img/qiandao.png",
        text: "签到"
      },
      {
        icon: "../../static/img/huangguan.png",
        text: "VIP"
      }
    ],
    videoPlayerList: []
  },
  async onLoad() {
    const {
      videoList,
      videoPlayerList
    } = await getVideoList();
    this.setData({
      videoList,
      videoPlayerList
    })
  },
  // 搜索栏跳转搜索页
  goSearchPage() {
    tt.navigateTo({
      url: '/pages/searchPage/searchPage',
    })
  },
  // 排行 福利 Vip 跳转事件
  goClassification: function (e) {
    const type = e.currentTarget.dataset.type;
    switch (type) {
      case "排行":
        tt.navigateTo({
          url: '/pages/rankingList/rankingList',
        });
        break;
      case "签到":
        tt.navigateTo({
          url: '/pages/signPage/signPage',
        });
        break;
      case "VIP":
        tt.navigateTo({
          url: '/pages/recharge/recharge',
        });
        break;
      default:
        break;
    }
  },
  //跳转至 video-player
  goVideoPlayer(e) {
    const ablumId = e.currentTarget.dataset?.id
    const episodesId = e.currentTarget.dataset?.episodesid
    console.log("广场页videoPlayer-aid&eid:", ablumId, episodesId);
    tt.navigateTo({
      url: `/package-video-player/pages/video-player/index?ablum_id=${ablumId}&episodes_id=${episodesId}`,
      success: (res) => {

      },
      fail: (res) => {

      },
    });
  }
})