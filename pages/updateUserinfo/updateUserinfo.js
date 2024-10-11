import {
  upateUserInfo
} from '../../api/login.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    name: "",
    userInfo: null
  },
  onChange(e) {
    this.setData({
      name: e.detail,
    });
  },
  getUserProfile() {
    tt.getUserProfile({
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
        });
        const {
          avatarUrl,
          nickName
        } = res.userInfo
        this.setData({
          avatarUrl,
          name: nickName
        })
      },
      fail(err) {
        console.log('tt.getUserProfile failed', err.errMsg);
        tt.showModal({
          title: '获取用户信息失败',
          content: err.errMsg,
          showCancel: false,
        });
      },
      complete() {},
    });
  },
  submitUserInfo: async function () {
    this.data.userInfo.nickName = this.data.name
    const {
      code,
      msg,
      data
    } = await upateUserInfo(this.data.userInfo)
    if (code === 200) {
      tt.showToast({
        title: '更新成功',
        icon: "success"
      })
      tt.setStorageSync('userInfo', data);
      this.setData({
        userInfo: this.data.userInfo
      })
    } else {
      tt.showToast({
        title: msg,
        icon: "error"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.data.userInfo = tt.getStorageSync('userInfo')
    if (this.data.userInfo) {
      this.setData({
        userInfo: this.data.userInfo
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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