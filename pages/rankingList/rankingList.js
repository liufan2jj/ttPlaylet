import {
  getVideoList
} from "../../api/common"
Page({
  data: {
    videoPlayerList: [],
    pageNo: 1,
    pageSize: 10,
    noneMore: false,
    loadingMore: true,
    loading: false, //骨架屏状态
  },
  async onLoad() {
    const {
      videoPlayerList
    } = await getVideoList();
    this.setData({
      videoPlayerList
    })
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
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {}
})