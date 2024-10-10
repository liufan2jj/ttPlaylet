Page({
  /**
   * 页面的初始数据
   */
  data: {
    signNum: 0, //当前签到金额
    total: 2000, //总目标金额
    percentage: 0, //金额进度条
    nextTarget: 200, //下一个消费金额,
    difference: 200, //距离目标差值
    position: "",
    ratio: 94, //比例
    steps: [{
        desc: '周卡',
        num: 200,
      },
      {
        desc: '季卡',
        num: 500,
      },
      {
        desc: '月卡',
        num: 1000,
      },
      {
        desc: '半年卡',
        num: 1500
      },
      {
        desc: '年卡',
        num: 2000
      },
    ],
    current: 0,
  },
  transformList() {
    const index = Number(this.data.current)
    const {
      num
    } = this.data.steps[index]
    const position = (num * this.data.ratio) / this.data.total + '%'
    const difference = num - this.data.signNum
    return {
      num,
      position,
      difference
    }
  },
  clickStep() {
    this.setData({
      signNum: this.data.signNum += 100,
      percentage: this.data.percentage >= 100 ? 100 : this.data.signNum / (this.data.total / this.data.ratio)
    })
    const res = this.data.signNum
    switch (true) {
      case res < 200:
        this.setData({
          current: 0,
          position: this.transformList().position,
          nextTarget: this.transformList().num, //下一个消费金额,
          difference: this.transformList().difference, //距离目标差值
        })
        break;
      case res < 500:
        this.setData({
          current: 1,
          position: this.transformList().position,
          nextTarget: this.transformList().num, //下一个消费金额,
          difference: this.transformList().difference, //距离目标差值
        })
        break;
      case res < 1000:
        this.setData({
          current: 2,
          position: this.transformList().position,
          nextTarget: this.transformList().num, //下一个消费金额,
          difference: this.transformList().difference, //距离目标差值
        })
        break;
      case res < 1500:
        this.setData({
          current: 3,
          position: this.transformList().position,
          nextTarget: this.transformList().num, //下一个消费金额,
          difference: this.transformList().difference, //距离目标差值
        })
        break;
      case res <= 2000:
        this.setData({
          current: 4,
          position: this.transformList().position,
          nextTarget: this.transformList().num, //下一个消费金额,
          difference: this.transformList().difference, //距离目标差值
        })
        break;
      default:
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})