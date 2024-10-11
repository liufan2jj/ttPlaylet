import request from './utils/loginInfo'
App({
  globalData: {
    systemInfo: null,
  },
  onLaunch: function () {
    this.globalData.systemInfo = tt.getSystemInfoSync();
    const Hasbindgetsource = tt.canIUse('video-player.bindgetsource');
    this.setGlobalData('Hasbindgetsource', Hasbindgetsource)
    // 登录接口
    wx.login({
      async success(res) {
        if (res.code) {
          var code = res.code
          await request.loginUser(code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  setGlobalData(key, value) {
    this.globalData[key] = value;
  },
})