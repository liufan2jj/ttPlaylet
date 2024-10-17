Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    cardName: "",
    list: [{
        img: "",
        end_at: "",
        state: false,
        title: "睿秀短剧会员1天",
        subtitle: "全平台免费看剧权益1天"
      },
      {
        img: "",
        end_at: "有效期：2024-09-10至2024-09-1",
        state: true,
        title: "睿秀短剧会员2天",
        subtitle: "全平台免费看剧权益2天"
      },
      {
        img: "",
        end_at: "",
        state: false,
        title: "睿秀短剧会员3天",
        subtitle: "全平台免费看剧权益3天"
      },
      {
        img: "",
        end_at: "",
        state: false,
        title: "睿秀短剧会员4天",
        subtitle: "全平台免费看剧权益4天"
      },
      {
        img: "",
        end_at: "",
        state: false,
        title: "睿秀短剧会员5天",
        subtitle: "全平台免费看剧权益5天"
      }
    ]
  },
  onUsecard({
    target: {
      dataset: {
        index
      }
    }
  }) {
    const {
      title
    } = this.data.list[index]
    this.setData({
      show: true,
      current: index,
      cardName: title
    });
  },
  onConfirm() {
    this.setData({
      show: false
    });
  },
  onCancel() {
    this.setData({
      show: false
    });
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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