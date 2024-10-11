import {
  rpxToPx,
  formatNumberToW,
  formatNumberToK
} from '../../utils/index';
Component({
  data: {
    isVideoPlay: true,
    progressWidth: rpxToPx(1560),
    bottomConAnimationData: null,
    topConAnimationData: null,
    hasPlayControl: false,
    isSlideStart: false,
  },
  properties: {
    isFullScreenChangeEpisode:{
      type: Boolean,
      value: false,
      observer(val){
        if (val) {
          this.setData({
            isVideoPlay:false
          });
          this.customSliderRef.progressPause();
          setTimeout(() => {
            this.setData({
              isVideoPlay:true,
            });
            this.customSliderRef.progressRun();
          }, 300);
        }
      }
    },
    likes: {
      type: Number,
      value: 0,
      observer(value) {
        this.setData({
          likes: formatNumberToW(value)
        })
      }
    },
    collects: {
      type: Number,
      value: 0,
      observer(value) {
        this.setData({
          collects: formatNumberToW(value)
        })
      }
    },
    shares: {
      type: Number,
      value: 0,
      observer(value) {
        this.setData({
          shares: formatNumberToW(value)
        })
      }
    },
    videoDetail: {
      type: Object,
      observer(value) {
        console.log("----------videoDetail", value);
        this.setData({
          videoDetail: value,
        })
      }
    },
    
    videoTotalTime: {
      type: Number,
      value: 100,
    },
    toolAppear: {
      type: Boolean,
      value: false,
      observer(value) {
        value ? this.toolAppear() : this.toolDisappear()
      },
    },
    fullVideoCurrentTimeSec: {
      type: Number,
      value: 100,
    },
    // fullScreenIsVideoPlay:{
    //   type: Boolean,
    //   value: false,
    //   observer(value){
    //     this.setData({
    //       isVideoPlay:!value,
    //     });
    //   }
    // }
    comVideo: {
      type: Boolean,
      value: false,
    }
  },
  ready() {
    const topConHeight = rpxToPx(320),
      bottomConHeight = rpxToPx(320);
    this.setData({
      topConHeight,
      bottomConHeight,
    })
    this.bottomConAnimation = tt.createAnimation({
      duration: 300
    });
    this.topConAnimation = tt.createAnimation({
      duration: 300
    });
    setTimeout(() => {
      this.toolDisappear()
    }, 3000);
  },
  methods: {
    toolAppear() {
      console.log("toolAppear");
      if (!this.bottomConAnimation || this.topConAnimation) {
        this.bottomConAnimation = tt.createAnimation({
          duration: 300
        });
        this.topConAnimation = tt.createAnimation({
          duration: 300
        });
      }
      this.bottomConAnimation.translateY(`0px`).step();
      this.topConAnimation.translateY(`0px`).step();
      this.setData({
        bottomConAnimationData: this.bottomConAnimation.export(),
        topConAnimationData: this.topConAnimation.export(),
        hasPlayControl: true,
      });
    },
    toolDisappear() {
      if (!this.bottomConAnimation || this.topConAnimation) {
        this.bottomConAnimation = tt.createAnimation({
          duration: 300
        });
        this.topConAnimation = tt.createAnimation({
          duration: 300
        });
      }
      this.bottomConAnimation.translateY(`${this.data.topConHeight}px`).step();
      this.topConAnimation.translateY(`-${this.data.bottomConHeight}px`).step();
      this.setData({
        bottomConAnimationData: this.bottomConAnimation.export(),
        topConAnimationData: this.topConAnimation.export(),
        hasPlayControl: false,
      });
    },
    videoPlay() {
      const {
        isVideoPlay
      } = this.data;
      this.customSliderRef[isVideoPlay ? 'progressPause' : 'progressRun']();
      this.setData({
        isVideoPlay: !isVideoPlay
      })
      this.triggerEvent("fullScreenVideoPause", {
        isVideoPlay
      })
    },
    customSliderHandler(ref) {
      this.customSliderRef = ref;
    },
    progressDone() {
      //下一集
      this.setData({
        isVideoPlay: false,
      })
    },
    conHandler(e) {
      const {
        hasPlayControl
      } = this.data;
      console.log(e, hasPlayControl);
      hasPlayControl ? this.toolDisappear() : this.toolAppear()
    },
    changeVideo() {
      console.log('选集');
      this.triggerEvent("fullScreenChangeVideo")
    },
    shareVideo() {
      console.log('分享');
    },
    slideStart(e) {
      const {
        videoCurrentTimeSec
      } = e.detail;
      this.setData({
        isSlideStart: true
      })
      this.triggerEvent("fullScreenSlideStart", {
        videoCurrentTimeSec
      })
    },
    slideEnd(e) {
      const {
        videoCurrentTimeSec
      } = e.detail;
      this.setData({
        isSlideStart: false
      })
      this.triggerEvent("fullScreenSlideEnd", {
        videoCurrentTimeSec
      })
      this.setData({
        videoCurrentTimeSec,
      })
    },
    likeHandler(e) {
      // TODO: 实现逻辑
      const {
        videoitem
      } = e.currentTarget.dataset;
      videoitem.likeActive = !videoitem.likeActive;
      videoitem.likeActive ? videoitem.episodesLikes = formatNumberToK(videoitem.episodes_likes + 1) :
      videoitem.episodesLikes = formatNumberToK(videoitem.episodes_likes);
      console.log('likeHandler-------------------------------111', e, videoitem);
      this.setData({
        videoDetail: videoitem,
      })
    },
    starHandler(e) {
          // tt.requestSubscribeMessage 调起客户端订阅消息界面，返回用户订阅消息的操作结果
    tt.requestSubscribeMessage({
      tmplIds: ["MSG164158927218123174309792040"], // 需要填入开放平台申请的模版id，支持最多3个同类型模版
      success(res) {
        //订阅成功
        console.log("订阅成功", res);
        tt.showToast({
          title: "订阅成功",
          icon: "success",
        });
      },
      fail(error) {
        //订阅失败
        console.log("订阅失败, 错误详情: ", error);
        tt.showToast({
          title: "订阅失败",
          icon: "fail",
        });
      },
      complete(res) {
        //订阅完成
        console.log("tt.requestSubscribeMessage API调用完成: ", res);
      },
    });
      const {
        videoitem
      } = e.currentTarget.dataset;
      videoitem.starActive = !videoitem.starActive;
      videoitem.starActive? videoitem.episodesChasing = formatNumberToK(videoitem.episodes_chasing + 1) :
      videoitem.episodesChasing = formatNumberToK(videoitem.episodes_chasing);

      this.setData({
        videoDetail: videoitem,
      })
    },
    exitFullscreen() {
      // 退出全屏
      console.log("exitFullscreen");
      const {
        videoCurrentTimeSec,videoDetail
      } = this.data;
      this.triggerEvent("exitFullscreen", {
        videoCurrentTimeSec,
        videoDetail
      })
    }
  }
})