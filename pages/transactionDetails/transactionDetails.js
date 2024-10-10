Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    listTabs: [{
        title: '消费'
      },
      {
        title: '充值'
      }
    ],
    consumptionList: [{
        title: "剧名剧名100集",
        gold: "-100 金币",
        time: "2024-08-20   11:11:11"
      },
      {
        title: "剧名剧名100集",
        gold: "-100 金币",
        time: "2024-08-20   11:11:11"
      },
      {
        title: "剧名剧名100集",
        gold: "-100 金币",
        time: "2024-08-20   11:11:11"
      },
      {
        title: "剧名剧名100集",
        gold: "-100 金币",
        time: "2024-08-20   11:11:11"
      },

    ],
    rechargeList: [{
        title: "200金币",
        gold: "- ¥12.00",
        time: "2024-08-20   11:11:11"
      },
      {
        title: "200金币",
        gold: "- ¥12.00",
        time: "2024-08-20   11:11:11"
      },
      {
        title: "200金币",
        gold: "- ¥12.00",
        time: "2024-08-20   11:11:11"
      },
      {
        title: "200金币",
        gold: "- ¥12.00",
        time: "2024-08-20   11:11:11"
      },
    ]
  },
  onChange(e) {
    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      active: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      active: Number(options.tabs)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var current = this.data.active
    this.setData({
      active: current
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})