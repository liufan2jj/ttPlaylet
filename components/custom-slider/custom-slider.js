import {
  formatTime
} from "../../utils";
var startPoint;
const min = 0; // 最小宽度 单位px
Component({
  data: {
    /**
     * 页面的初始数据
     */
    lineAnimationData: null,
    activeLineAnimationData: null,
    spotAnimationData: null,
    buttonLeft: 0,
    progress: 0, // 进度条的宽度，这里的单位是px，所以在wxml文件中要改为rpx
    precent: 0, // 这个是百分比
    status: 0,
    videoCurrentTime: '00:00',
    formatTime,
    comVideoTotalTime: 0,
    VideoTimeVisible:false,
    videoPause:false,
    videoCurrentTimeSec:0,
  },
  properties: {
    highlight: {
      type: Boolean,
      value: false,
    },
    max: {
      type: Number,
      value: 300,
    },
    videoCurrentTime:{
      type: Number,
      value: 100,
      observer(value) {
        this.setData({
          videoCurrentTime: formatTime(Math.floor(value))
        })
      }
    },
    videoTotalTime: {
      type: Number,
      value: 100,
      observer(value) {
        this.setData({
          comVideoTotalTime: formatTime(Math.floor(value))
        })
      }
    },
    videoCurrentTimeSec:{
      type: Number,
      value: 100,
      observer(value){
        if (value) {
          const {max,videoTotalTime,buttonLeft} = this.data;
         let  distance = (max / videoTotalTime)*value
          this.setData({
            buttonLeft:  distance,
            progress: distance,
            precent: parseInt((distance / max) * 100),
            videoCurrentTime: formatTime(Math.floor(value)),
            videoCurrentTimeSec:value,
          })
        }
      }
    },
    isExitFullscreen:{
      type: Boolean,
      value: false,
      observer(value){
        console.log("isFullScreen",value);
        if (value) {
          this.setData({
            videoPause:false,
          })
        }
      }
    }
  },
  ready() {
    this.lineAnimation = tt.createAnimation();
    this.activeLineAnimation = tt.createAnimation();
    this.spotAnimation = tt.createAnimation();
    this.progressRun();
  },
  methods: {
    slide() {
      if (!this.activeLineAnimation || this.activeLineAnimation || this.spotAnimation) {
        this.lineAnimation = tt.createAnimation();
        this.activeLineAnimation = tt.createAnimation();
        this.spotAnimation = tt.createAnimation();
      }
      this.lineAnimation.scaleY(2).step();
      this.activeLineAnimation.scaleY(2).step();
      this.spotAnimation.scale(2).step();

      this.setData({
        activeLineAnimationData: this.activeLineAnimation.export(),
        spotAnimationData: this.spotAnimation.export(),
        lineAnimationData: this.lineAnimation.export()
      })
    },
    highlightLine() {

    },
    reset() {
      if (!this.activeLineAnimation || this.activeLineAnimation || this.spotAnimation) {
        this.lineAnimation = tt.createAnimation();
        this.activeLineAnimation = tt.createAnimation();
        this.spotAnimation = tt.createAnimation();
      }
      this.activeLineAnimation.rotate(0, 0).scale(1).translate(0, 0).skew(0, 0).step({
        duration: 0
      });
      this.spotAnimation.rotate(0, 0).scale(1).translate(0, 0).skew(0, 0).step({
        duration: 0
      });
      this.lineAnimation.rotate(0, 0).scale(1).translate(0, 0).skew(0, 0).step({
        duration: 0
      });
      this.setData({
        activeLineAnimationData: this.activeLineAnimation.export(),
        spotAnimationData: this.spotAnimation.export(),
        lineAnimationData: this.lineAnimation.export()
      });
    },
    buttonStart(e) {
      startPoint = e.touches[0]
    },
    touchend(e) {
      let that = this;
      const { videoCurrentTimeSec } = that.data;
      that.reset()
      setTimeout(() => {
        that.setData({
          // highlight: false,
          VideoTimeVisible: false,
        })
      }, 3000);
      that.triggerEvent('slideEnd',{videoCurrentTimeSec})
    },
    progressRun() {
      let that = this;
      if (that.data.precent >= 100) {
        // 重新播放
        console.log("restart");
        that.setData({
          buttonLeft: 0,
          progress: 0, 
          precent: 0,
          videoCurrentTime: '00:00',
          VideoTimeVisible:false,
          videoCurrentTimeSec:0,
        })
      }
      const {
        max,
        buttonLeft,
        videoTotalTime,
      } = that.data;
      let buttonLeftStep = 0;
      buttonLeftStep = buttonLeft && buttonLeft;
      let id = setInterval(() => {
        clearInterval(id);
        id = setInterval(() => {
          if (that.data.precent >= 100) {
            this.triggerEvent('progressDone')
            clearInterval(id);
            return;
          }
          // 19是视频总时长，实测大概1s误差 视频20s 这里要是19s
          buttonLeftStep += max / ((videoTotalTime-1) * 10)
          that.setData({
            buttonLeft: buttonLeftStep,
            progress: buttonLeftStep,
            precent: parseInt((buttonLeftStep / max) * 100),
            videoCurrentTime: formatTime(Math.floor((parseInt((buttonLeftStep / max) * 100) / 100) * videoTotalTime)),
            intervalId: id,
            videoCurrentTimeSec:Math.floor((parseInt((buttonLeft / max) * 100) / 100) * videoTotalTime),
          });
        }, 100);
      }, 100);
    },
    progressPause() {
      const {
        intervalId,
      } = this.data;
      console.log(intervalId);
      clearInterval(intervalId);
    },
    hidePauseIcon(){
      this.setData({
        videoPause: false,
      })
    },
    progressHandler(e){
      console.log('progressHandler--------------------',e);
      const {videoPause} = this.data;
      this.setData({
        videoPause:!videoPause,
        highlight:!videoPause,
      })
      if (videoPause) {
        this.progressRun();
      }else{
        this.progressPause();
      }
      this.triggerEvent("progressHandler",{videoPause})
    },
    moveTo(e) {
      this.slide();
      let that = this;
      const {
        max,
        videoTotalTime
      } = that.data;
      var endPoint = e.touches[e.touches.length - 1]
      let translateX = endPoint.clientX - startPoint.clientX;
      startPoint = endPoint;
      let buttonLeft = this.data.buttonLeft + translateX;
      if (buttonLeft > max) {
        // 滑动位置大于进度条最大宽度的时候让它为最大宽度
        buttonLeft = max
      }
      if (buttonLeft < min) {
        // 滑动位置小于进度条最大宽度的时候让它为最小宽度
        buttonLeft = min
      }
      that.setData({
        buttonLeft: buttonLeft,
        progress: buttonLeft,
        precent: parseInt((buttonLeft / max) * 100),
        videoCurrentTime: formatTime(Math.floor((parseInt((buttonLeft / max) * 100) / 100) * videoTotalTime)),
        highlight: true,
        VideoTimeVisible:true,
        videoCurrentTimeSec:Math.floor((parseInt((buttonLeft / max) * 100) / 100) * videoTotalTime),
      });
      this.triggerEvent('slideStart',{
        videoCurrentTimeSec:Math.floor((parseInt((buttonLeft / max) * 100) / 100) * videoTotalTime),
      })
    },
  }
})