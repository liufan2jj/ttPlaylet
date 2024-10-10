import request from './utils/loginInfo'
App({
  onLaunch: function () {
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
  }
})