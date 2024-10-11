import { getVideoList } from '../../../api/common';
import { formatNumberToK, rpxToPx } from '../../../utils/index';
import { VideoSwiper } from '../../../utils/video-swiper';

function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('1');
    }, 500);
  });
}

const app = getApp();
Page({
  data: {
    windowHeight: 0,
    imgArr: [
      'https://d-ss1l.dtstatic.com/uploads/blog/202012/03/20201203112146_99027.thumb.300_0.jpeg_webp',
      'https://d-ss1l.dtstatic.com/uploads/blog/202203/10/20220310210744_0303f.thumb.300_0.png_webp',
      'https://d-ss1l.dtstatic.com/uploads/blog/202012/03/20201203112154_14ce3.thumb.300_0.jpeg_webp',
    ],

    allVideoData: [], // 数据
    windowWidth: 0, // 宽度
    showChangeVideoPopup: false, // 显示选集弹框换视频
    isFullScreen: false, // 是否全屏
    Hasbindgetsource: false, //是否可以用bindgetsource
    // swiper 配置项，VideoSwiper 给到
    swiperOptions: {
      circular: true, // 是否可以轮播，即尾部衔接头部
      duration: 500,
      current: 0,
    },
    // 当前播放列表，VideoSwiper 给到
    curQueue: [],
    // 播放信息，处理播放错误，进度条等信息
    playInfo: [],
    // 是否显示全屏工具栏
    showFullScreenTool: false,
  },
  async onLoad(option) {
    // 获取窗口高度
    const { ablum_id, episodes_id } = option;
    const { windowHeight, windowWidth } = app.globalData?.systemInfo;
    const { Hasbindgetsource = false } = app?.globalData;
    console.log(app.globalData?.systemInfo);
    this.setData({
      windowHeight,
      windowWidth: Number(windowWidth) || rpxToPx(750),
      Hasbindgetsource,
    });
    await this.formatVideoData(ablum_id, episodes_id);
    tt.disableUserScreenRecord();

    let videoSwiper = new VideoSwiper({
      swiperDuration: 500,
      start: this.data.start || 0,
      total: this.data.allVideoData.length,
      // 模拟请求
      getVideo: async index => {
        await sleep();
        let res = this.data.allVideoData[index];
        // 模拟请求出错
        // throw new Error()
        return res;
      },
      onSwiperOptionsChange: data => {
        this.setData({
          swiperOptions: {
            ...data,
          },
        });
      },
      onCurQueueChange: data => {
        this.setData({
          curQueue: [...data],
        });
      },
      onEndList: () => {
        tt.showToast({
          title: '到底了～～',
          success: res => {},
          fail: res => {},
        });
      },
      onVideoDestroy: videoInfo => {
        let episode = videoInfo.episode;
        let playInfo = this.data.playInfo;

        playInfo[episode] = {};

        this.setData({
          playInfo: [...playInfo],
        });
      },
    });
    this.videoSwiper = videoSwiper;
  },
  getsourceHandler(e) {
    this.videoSwiper.onGetSource(e);
  },

  onShow() {
    tt.disableUserScreenRecord();
  },
  onHide() {
    tt.enableUserScreenRecord();
  },
  swiperChange: function (e) {
    this.videoSwiper.onchange(e);

    const { currentAblum } = this.data;

    let currentIndex = this.videoSwiper.currentIndex;
    let currentVideo = this.videoSwiper.getCurrentVideo();

    if (currentVideo) {
      // 隐藏暂停按钮
      this.selectComponent('#customSlider' + currentVideo.id, res => {
        res?.hidePauseIcon()
      });
    }

    if (currentAblum) {
      tt.setNavigationBarTitle({
        title: `${currentAblum.ablum_name}  第${currentIndex + 1}集`,
      });
    }
  },
  // 下一个视频
  nextVideo(e) {
    const { isFullScreen } = this.data;

    if (isFullScreen) {
      return;
    }

    this.videoSwiper.onEnded(e);

    const { currentAblum } = this.data;

    let currentIndex = this.videoSwiper.currentIndex;

    if (currentAblum) {
      tt.setNavigationBarTitle({
        title: `${currentAblum.ablum_name}  第${currentIndex + 1}集`,
      });
    }
  },

  // 视频暂停/继续播放
  videoPauseOrPlay(e) {
    console.log('customSlider videoPlay', e);
    const { videoPause } = e.detail;
    this.videoSwiper[videoPause ? 'play' : 'pause']();
  },

  // 点赞
  likeHandler(e) {
    const { allVideoData } = this.data;
    const { videoitem } = e.currentTarget.dataset;
    const currentVideo = allVideoData.find(i => i.eid === videoitem.eid);

    currentVideo.likeActive = !currentVideo.likeActive;

    if (currentVideo.likeActive) {
      currentVideo.episodesLikes = formatNumberToK(
        currentVideo.episodes_likes + 1,
      );
    } else {
      currentVideo.episodesLikes = formatNumberToK(currentVideo.episodes_likes);
    }
    // 模拟向服务端发送请求-点赞
    this.setData({
      allVideoData: [...allVideoData],
    });

    // 重新获取当前 video 信息，更新点赞数量
    this.videoSwiper.updateCurrentVideo();
  },
  // 收藏
  starHandler(e) {
    // tt.requestSubscribeMessage 调起客户端订阅消息界面，返回用户订阅消息的操作结果
    tt.requestSubscribeMessage({
      tmplIds: ['MSG164158927218123174309792040'], // 需要填入开放平台申请的模版id，支持最多3个同类型模版
      success(res) {
        //订阅成功
        console.log('订阅成功', res);
        tt.showToast({
          title: '订阅成功',
          icon: 'success',
        });
      },
      fail(error) {
        //订阅失败
        console.log('订阅失败, 错误详情: ', error);
        tt.showToast({
          title: '订阅失败',
          icon: 'fail',
        });
      },
      complete(res) {
        //订阅完成
        console.log('tt.requestSubscribeMessage API调用完成: ', res);
      },
    });

    const { allVideoData,currentAblum } = this.data;
    const { videoitem } = e.currentTarget.dataset;
    const currentVideo = allVideoData.find(i => i.eid === videoitem.eid);

    currentVideo.starActive = !currentVideo.starActive;
    const getStorageSyncRes = tt.getStorageSync("likeAblum");
    if (currentVideo.starActive) {
      currentVideo.episodesChasing = formatNumberToK(
        currentVideo.episodes_chasing + 1,
      );
      const newData = getStorageSyncRes ? [...getStorageSyncRes, currentAblum] : [currentAblum];
      tt.setStorageSync("likeAblum", newData);
    } else {
      currentVideo.episodesChasing = formatNumberToK(
        currentVideo.episodes_chasing,
      );
      const newData = getStorageSyncRes.filter(i => i.ablum_id !== currentAblum.ablum_id);
      tt.setStorageSync("likeAblum", newData);
    }
    // 模拟向服务端发送请求-收藏
    this.setData({
      allVideoData: [...allVideoData],
    });

    // 重新获取当前 video 信息，更新收藏数量
    this.videoSwiper.updateCurrentVideo();
  },
  // 分享
  shareVideo(e) {
    const { allVideoData } = this.data;
    const { videoitem } = e.currentTarget.dataset;
    const currentVideo = allVideoData.find(i => i.eid === videoitem.eid);
    currentVideo.episodesShares = formatNumberToK(
      currentVideo.episodes_shares + 1,
    );
    // 改变当前那一项的值
    this.setData({
      allVideoData: [...allVideoData],
    });

    // 重新获取当前 video 信息，更新分享数量
    this.videoSwiper.updateCurrentVideo();
  },
  // 选集
  onChangeEpisode(e) {
    const { episodeitem } = e.detail;
    let episode = episodeitem.episodes_num - 1;
    this.videoSwiper.setStart(episode);
    // 需要根据选中的信息确定swier滑到哪里
    this.setData({
      showChangeVideoPopup: false,
    });
  },
  // video-player binderror 回调
  error(e) {
    console.warn('video-player error', e);
    const { episode } = e.target.dataset;
    let playInfo = this.data.playInfo;
    
    playInfo[episode].error = true;
    tt.showToast({
      title: `${e.detail.errMsg}`,
      icon: 'none',
    });
    this.setData({
      playInfo,
    });
  },
  // video-player bindtimeupdate 回调
  timeUpdateHandler(e) {
    const { currentTime, duration } = e.detail;
    const { episode } = e.target.dataset;
    let playInfo = this.data.playInfo;

    playInfo[episode].videoDuration = Math.floor(duration);
    playInfo[episode].videoCurrentTime = currentTime;

    this.setData({
      playInfo: [...playInfo],
    });
  },
  // 进度条滑动开始事件
  slideStart(e) {
    this.setData({
      isSlideStart: true,
    });
  },
  // 进度条滑动结束事件
  slideEnd(e) {
    const { videoCurrentTimeSec } = e.detail;
    this.videoSwiper.getVideoContext()?.seek(videoCurrentTimeSec);
    this.setData({
      isSlideStart: false,
    });
  },
  fullScreenSlideEnd(e) {
    console.log('fullScreenSlideEnd', e);
    const { videoCurrentTimeSec } = e.detail;
    this.videoSwiper.getVideoContext()?.seek(videoCurrentTimeSec);
  },
  // 首次加载
  async formatVideoData(aid, eid) {
    // 如果携带剧集id进来的话，需要计算他属于那个pageSize,
    const { videoPlayerList } = await getVideoList();
    // 当前剧信息
    const currentAblum = videoPlayerList.find(i => i.ablum_id == aid);
    // 当前剧集
    const currentItem = videoPlayerList.find(i => i.ablum_id == aid)?.episodes;
    const currentIndex = currentItem?.findIndex(i => i.episodes_id == eid);

    tt.setNavigationBarTitle({
      title: `${currentAblum.ablum_name}  第${currentItem[currentIndex].episodes_num}集`,
    });

    const imgArr = currentItem.map(i => i.episodes_cover);
    const allVideoData = [];
    // 播放信息，处理播放错误，进度条等信息
    let playInfo = [];

    currentItem.forEach((item, index) => {
      const i = {
        episodesLikes: formatNumberToK(item.episodes_likes),
        episodesChasing: formatNumberToK(item.episodes_chasing),
        episodesShares: formatNumberToK(item.episodes_shares),
        aid: aid,
        eid: item.episodes_id,
        // 集数，从 0 开始，赋值到 video-player 的 data-episode 属性上，供 VideoSwiper 类使用
        episode: index,
        // id，给 video-player 使用
        id: index,
        ...item,
      };
      allVideoData.push(i);
      playInfo.push({});
    });

    this.setData({
      imgArr,
      playInfo,
      allVideoData,
      currentAblum,
      ablumData: currentItem,
      start: currentIndex
    });
  },
  // 显示选集弹窗
  changeVideo() {
    this.setData({
      showChangeVideoPopup: true,
    });
  },
  // 隐藏选集弹窗
  cancelChangeVideo() {
    this.setData({
      showChangeVideoPopup: false,
    });
  },
  // 全屏观看
  changeFullScreen(e) {
    console.log('changeFullScreen', e);
    let context = this.videoSwiper.getVideoContext();

    if (context) {
      context.play();
      context.requestFullScreen();
      this.setData({
        isFullScreen: true,
      });
    }
  },
  //  退出全屏
  exitFullscreen(e) {
    console.log('exitFullscreen', e);
    this.videoSwiper.getVideoContext()?.exitFullScreen();
    this.setData({
      isFullScreen: false,
    });
  },
  // 全屏下，视频暂停/继续播放
  fullScreenVideoPause(e) {
    console.log('fullScreenVideoPause', e.detail);
    const { isVideoPlay } = e.detail;
    this.videoSwiper.getVideoContext()?.[isVideoPlay ? 'pause' : 'play']();
  },
  // 全屏下点击出现全屏工具栏
  onTapVideo(e) {
    const { isFullScreen } = this.data;
    if (isFullScreen) {
      this.setData({
        showFullScreenTool: true,
      });
    }
  },
});
