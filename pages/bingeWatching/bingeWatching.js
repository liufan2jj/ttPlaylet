import {
  getVideoList
} from "../../api/common"
const app = getApp()
Page({
  data: {
    videoList: [],
    chasingList: [] //chasingList：正在追剧list
  },
  async onLoad() {
    const {
      videoList
    } = await getVideoList();
    this.setData({
      videoList
    })
    // const { videoPlayerList } = await getVideoList();
    // this.getChasingList()
  },
  onShow() {
    this.getChasingList()
  },
  //跳转至 video
  goVideo(e) {
    const ablumId = e.currentTarget.dataset?.id
    const episodesId = e.currentTarget.dataset?.episodesid
    console.log("广场页video-aid&eid:", ablumId, episodesId);
    tt.navigateTo({
      url: `/package-video/pages/video/index?ablum_id=${ablumId}&episodes_id=${episodesId}`,
      success: (res) => {

      },
      fail: (res) => {

      },
    });
  },
  //获取本地缓存 用户收藏剧集数据
  getChasingList() {
    const getStorageSyncRes = tt.getStorageSync("likeAblum");
    console.log("likeAblum", getStorageSyncRes);
    const chasingArr = Array.isArray(getStorageSyncRes) ? getStorageSyncRes.filter(i => i !== null) : [];
    console.log("获取缓存的收藏剧:", chasingArr);
    //  相同剧集去重
    const uniqueArr = Array.from(new Set(chasingArr.map(item => item.ablum_id))).map(id => chasingArr.find(item => item.ablum_id === id));
    this.setData({
      chasingList: uniqueArr,
    })
    console.log("将获取缓存收藏剧去重:", uniqueArr);
  },
})