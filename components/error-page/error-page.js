// /Users/bytedance/Desktop/video-template/miniprogram-templates/templates/microapp/javascript/video-template/components/error-page/error-page.js
Component({
  data: {

  },
  properties: {
    needRetryBtn:{
      type:Boolean,
    },
    errTitle:{
      type:String,
    },
    errDesc:{
      type:String,
    },  
    errImage:{
      type:String,
    },
    needErrTips:{
      type:Boolean,
    }
  },
  methods: {
    retry(){
      this.triggerEvent("errPageRetry")
    }
  }
})