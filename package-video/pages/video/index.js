import {
  getVideoList
} from "../../../api/common";
const app = getApp()


Page({
  data: {
    currSwiperIdx: 0,
    windowHeight: 0,
    imgArr: ["https://d-ss1l.dtstatic.com/uploads/blog/202012/03/20201203112146_99027.thumb.300_0.jpeg_webp",
      "https://d-ss1l.dtstatic.com/uploads/blog/202203/10/20220310210744_0303f.thumb.300_0.png_webp",
      "https://d-ss1l.dtstatic.com/uploads/blog/202012/03/20201203112154_14ce3.thumb.300_0.jpeg_webp",
    ],

    showMediaPosterBg: false,
    currIdx: 0,
    isLoadFinish: true,
    urlArray: ["https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/1534422848153.mp4",
      "https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/1534422848153.mp4",
      "https://sf1-ttcdn-tos.pstatp.com/obj/developer/sdk/1534422848153.mp4",
    ],
    showVideoImgBg: false, // 是否显示背景
    lastVideoContext: undefined, // 上一个video上下文
    currentVideoContext: undefined, // 当前video上下文
    nextVideoContext: undefined, // 下一个video上下文
    videoPause:false, // 控制视频显示隐藏
    windowWidth:0,
    needChangeVideo:false, // 需要选集
    isFullScreen:false, // 是否全屏
    needVideoLoading:true, // 需要加载态
  },
  async onLoad (option) {
    const{ablum_id,episodes_id}=option;
    // 获取窗口高度
    const {windowHeight,windowWidth}=app.globalData?.systemInfo;
    console.log(app.globalData?.systemInfo);
    this.setData({
      windowHeight,
      windowWidth:Number(windowWidth),
    });
    await this.formatVideoData(ablum_id,episodes_id);
    tt.disableUserScreenRecord()
  },
  onShow(){
    tt.disableUserScreenRecord()
  },
  onHide(){
    tt.enableUserScreenRecord()
  },
  onReady: function () {
    this.currentVideoContext = tt.createVideoContext(0 + "");
    this.currentVideoContext.play();
    const res = tt.canIPutStuffOverComponent('video');
    console.log('tt.canIPutStuffOverComponent',res);
  },
  swiperChange: function (e) {
    const lastId = this.data.currIdx;
    this.setData({
      currSwiperIdx: e.detail.current,
      currIdx: e.detail.current,
      videoPause:false,
      videoError:false,
      needVideoLoading:true,
    });
    const currentId = this.data.currIdx;
    console.log("lastId = " + lastId + ", currentId = " + currentId)
    this.lastVideoContext = tt.createVideoContext(lastId + "");
    this.currentVideoContext = tt.createVideoContext(currentId + "");
    this.lastVideoContext.pause();
    setTimeout(() => {
      this.currentVideoContext.play();
    }, 300);
  },
  start(e) {
    // TODO: 实现逻辑
  },
  // 控制视频播放&暂停
  videoPlay(e) {
    const {videoPause} = e.detail;
    this.currentVideoContext[videoPause ? 'play' : 'pause']();
  },
  move: function () {
  },
  // 退出全屏
  exitFullscreen(e){
    const{videoCurrentTimeSec}=e.detail
    console.log("exitFullscreenv",videoCurrentTimeSec);
    this.setData({
      isFullScreen:false,
      isExitFullscreen:true,
    })
    this.currentVideoContext.exitFullScreen();
  },
  // 全屏控制视频播放与暂停
  fullScreenVideoPause(e){
    console.log(e.detail);
    const {isVideoPlay} = e.detail;
    this.currentVideoContext[isVideoPlay ? 'pause' : 'play']();
   },
  videoSeekHandler(){
    console.log('videoSeekHandler');
  },
  end: function () {
    // TODO: 实现逻辑
  },
  playerPlay: function () {
    // TODO: 实现逻辑
  },
  error(e) {
    tt.showToast({
      title: `${e.detail.errMsg}`,
      icon: "none",
    });
    console.log(e);
    this.setData({
      videoError:true,
      needVideoLoading:false,
    })
  },
  fullScreenChangeVideo(){
    console.log("fullScreenChangeVideo");
    this.setData({
      needChangeVideo:true,
    })
  },
  // 首次加载
  async formatVideoData(aid, eid) {
    // 如果携带剧集id进来的话，需要计算他属于那个pageSize,
    const { videoList } = await getVideoList();
    const currentAblum = videoList.find(i=>i.ablum_id == aid);
    const currentItem =  videoList.find(i => i.ablum_id === Number(aid))?.episodes;
    const urlArray = currentItem.map(i=>i.episodes_resource);
    const videoCurrentIndex = urlArray.findIndex(i => i.episodes_id === Number(eid)) || -1;
    const imgArr =  currentItem.map(i=>i.episodes_resource);
    tt.setNavigationBarTitle({
      title: `${currentAblum.ablum_name}`,
    });
    this.setData({
      urlArray,
      imgArr,
      ablumData:currentItem,
      currSwiperIdx:videoCurrentIndex,
      currentAblum,
    });
  },
  // 根据索引求出当前这个视频在那一页
  getPageNoByIndex(data, index, pageSize) {
    const pageNo = Math.ceil((index + 1) / pageSize);
    return pageNo;
  },
  // 分页
  paginate(data, pageNo, pageSize) {
    const startIndex = (pageNo - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = data.slice(startIndex, endIndex);
    return pageData
  },
  timeUpdateHandler(e){
    const {once} = this.data
    const { currentTime, duration } = e.detail;
    if (!once) {
      this.setData({
        videoDuration:duration,
        once:true,
      })
    }
    this.setData({
      videoCurrentTime:currentTime,
    })
  },
  slideStart(e){
    this.setData({
      isSlideStart:true,
    })
  },
  loadedmetadataHandler(){
    this.setData({
      needVideoLoading: false,
    })
  },
  slideEnd(e){
    const{videoCurrentTimeSec}=e.detail;
    this.currentVideoContext.seek(videoCurrentTimeSec)
    this.setData({
      isSlideStart:false,
    })
  },
  customSliderHandler(ref){
    this.customSliderRef = ref;
  },
  changeVideoDialogHandler(ref){
    this.changeVideoDialogRef = ref; 
  },
  fullScreenSlideEnd(e){
    console.log("fullScreenSlideEnd",e);
    const { videoCurrentTimeSec } = e.detail;
        this.currentVideoContext.seek(videoCurrentTimeSec)

  },
  changeVideo(){
    this.setData({
      needChangeVideo:true,
    })
  },
  cancelChangeVideo(){
    this.setData({
      needChangeVideo:false,
    })
  },
  changeFullScreen(){
    this.setData({
      isFullScreen:true,
    })
    this.currentVideoContext.play()
    setTimeout(() => {
      this.currentVideoContext.requestFullScreen();
    }, 100);
  },
  fullScreenToolHandler(ref){
    this.fullScreenToolRef = ref; 
  },
  onTapVideo(e){
    const {isFullScreen} = this.data;
    console.log(e,this.fullScreenToolRef,isFullScreen);
    if (isFullScreen) {
      this.setData({
        toolAppear:true
      })
      // this.fullScreenToolRef.toolAppear();
    }
  }
})