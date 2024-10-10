import {
  selectDramaListBy
} from '../../api/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageNo: 1,
    pageSize: 10,
    noneMore: false,
    loadingMore: true,
    loading: true, //骨架屏状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  async initPageList() {
    try {
      const {
        code,
        msg,
        data
      } = await selectDramaListBy({
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      })
      if (code === 200) {
        if (data && data.length <= 0) {
          this.setData({
            noneMore: !this.data.noneMore,
            loadingMore: !this.data.loadingMore
          })
        } else {
          this.setData({
            list: this.data.list.concat(data),
            pageNo: ++this.data.pageNo
          })
        }
      } else {
        tt.showToast({
          title: msg,
          icon: "error"
        })
      }
    } finally {
      this.setData({
        loading: false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.initPageList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.initPageList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})