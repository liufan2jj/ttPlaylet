Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    listTabs: [{
        title: '充值规则'
      },
      {
        title: '会员协议'
      }
    ],
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