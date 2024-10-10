import {
  prePayVip,
  selectRechargeProjectList
} from '../../api/index.js'
import {
  userCenter
} from '../../api/login.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: -1,
    checked: false,
    total: 0,
    balance: 0,
    chargeList: [{
        discount: '',
        original_price: "¥2",
        discount_price: "200金币"
      },
      {
        discount: '特惠',
        original_price: "¥9.9",
        discount_price: "990+送200"
      },
      {
        discount: '',
        original_price: "¥29.9",
        discount_price: "2990+送1000"
      },
      {
        discount: '',
        original_price: "¥49.9",
        discount_price: "4990+送2500"
      },
      {
        discount: '会员1天',
        original_price: "¥19.9",
        discount_price: "解锁观看全站1天"
      },
      {
        discount: '会员2天',
        original_price: "¥30",
        discount_price: "解锁观看全站2天"
      },
    ],
  },
  gomemberPage() {
    tt.navigateTo({
      url: '/pages/member/member',
    })
  },
  // 充值选择
  checkCharge(e) {
    const {
      index,
      originalprice,
    } = e.currentTarget.dataset
    this.setData({
      current: index
    })
    this.setData({
      total: originalprice
    })
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  // 充值按钮
  async openMembership() {
    const selectIndex = this.data.current
    if (selectIndex < 0) {
      tt.showToast({
        icon: 'none',
        title: '请选择一个充值方案'
      })
      return
    }
    const item = this.data.chargeList[selectIndex]
    tt.showToast({
      icon: 'none',
      title: '您选充值' + item.original_price
    })
    const {
      msg,
      code,
      data
    } = await prePayVip({
      id: 1
    })
    if (data) {
      tt.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package_,
        signType: data.signType,
        paySign: data.paySign,
        success(res) {
          console.log(res)
        },
        fail(res) {
          tt.showToast({
            title: '您取消了支付',
            icon: 'none'
          })
        }
      })
    } else {
      tt.showToast({
        title: '支付参数获取异常',
        icon: "error"
      })
    }
  },
  // 充值规则
  gochargeRule() {
    tt.navigateTo({
      url: '/pages/userAgreement/userAgreement?tabs=0',
    })
  },
  // 会员协议
  gomemberAgreement() {
    tt.navigateTo({
      url: '/pages/userAgreement/userAgreement?tabs=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const {
      msg,
      code,
      data
    } = await selectRechargeProjectList({

    })
    console.log(msg, code, data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  // 初始化用户信息
  async initUserinfo() {
    try {
      const {
        msg,
        code,
        data
      } = await userCenter({})
      if (code === 200) {
        if (data) {
          const storageUseInfo = tt.getStorageSync('userInfo')
          const newData = {
            ...storageUseInfo,
            data
          }
          this.setData({
            balance: data.view_point
          })
          tt.setStorageSync('userInfo', newData);
        }
      } else {
        tt.showToast({
          title: msg,
          icon: "error"
        })
      }
    } catch (error) {
      tt.showToast({
        title: error,
        icon: 'error'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.initUserinfo()
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