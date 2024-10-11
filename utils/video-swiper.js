// 如果要在 video 上使用，可参考逻辑自行实现：
// 用 src 替换 aid, eid
// 用 tt.preloadResourceVideo 替换 tt.preloadVideo

/**
 * 这个类会去处理 swiper 滑动切换 video-player 逻辑
 * video-player 的滑动播放模块
 * 具体逻辑逻辑如下：
 * 1. 向下滑动时，改变下下一个 video 地址预加载下下一集。例如：从 1 滑动到 2 时，去请求 3 的播放链接，然后去渲染 3 ，但不播放。
 * 2. 向上滑动时，改变上上一个 video 地址预加载上上一集。例如：从 3 滑动到 2 时，去请求 1 的播放链接，然后去渲染 1 ，但不播放。
 * 3. 当显示的为最后一个或者第一个时，关闭 swiper 的轮播。
 * 4. 当剧集总数除以 3 余数为 1 时，swiper 滑到倒数第 1 集时，swiper 的长度改为 4 个，添加的第 4 个swiper-item 为最后 1 集。当从倒数第 2 集滑到倒数第 3 集时，删除 swiper 的第 4 个 video 改为 3 个进行轮播。
 * 5. 当剧集总数除以 3 余数为 2 时，swiper 滑到倒数第 1 集时，swiper 的长度改为 2，且删除掉最后一个 video。当从倒数第 1 集滑到倒数第 2 集时，在 swiper 尾部添加倒数第 3 集。
 * 6. 当选集时，需要保证第 1 个视频永远在第一个 swiper-item 中，即初始的 swiper current 是：（当前选择的集数 - 1）除以（3）的余数。
 * 上述逻辑请参考 IDE 模板接入文档，里面有详细的分析。
 */
export class VideoSwiper {
  // 所有剧集
  videoList = [];
  // 当前集，在 videoList 中的索引
  currentIndex = 0;
  // 上一集，在 videoList 中的索引，可能是 -1
  preIndex = 0;
  // 下一集，在 videoList 中的索引，可能是 videoList.length
  nextIndex = 0;
  // bindgetsource 时会赋值，是否已经获取到资源
  hasGotSource = [];
  // 缓存的 videoContext
  cacheVideoContext = [];
  // 是否能使用 bindgetsource 回调
  canUseBindGetsource = true;
  // 是否能使用 preloadResourceVideo 方法
  canUsePreloadResourceVideo = true;
  // swiper-item 列表
  curQueue = [null, null, null];
  // swiper 配置
  swiperOptions = {
    // 当前播放列表
    // 是否可以轮播，即尾部衔接头部，永为 true
    circular: false,
    duration: 500,
    current: 0,
  };

  // 传入配置
  options = {
    // swiper 的 duration
    swiperDuration: 500,
    // 开始集数，从 0 开始
    start: 0,
    // 总集数，从 1 开始
    total: 0,
    // 获取 video 函数，调用该函数可获取指定集
    // 返回的信息需包括以下字段：
    // 1. episode ，episode 字段从 0 开始，表示第几集，需以 data-episode 的方式，放到 video-player 组件上
    // 2. id，当前聚集的 id，唯一值，需要设置到 video-player 组件上
    // 3. aid，video-player 需要的参数
    // 4. eid，video-player 需要的参数
    // 5. 其他 video-player 所需参数
    getVideo: null,
    // 滑动到列表末尾执行，例如弹框：最后一集
    onEndList: null,
    // swiperOptions 变化时触发，需要 setData 到页面中
    onSwiperOptionsChange: null,
    // curQueue 变化时触发，需要 setData 到页面中，渲染 swiper-item
    // curQueue 的每一项会包括一个 status 字段，枚举为 loading, success, error，可根据其值来设置状态
    onCurQueueChange: null,
    // video-player 会同时渲染 3 个，当有 video 销毁时触发
    onVideoDestroy: null,
  };

  constructor(options) {
    this._checkStart(options.start, options.total);

    Object.assign(this.options, options);

    if (!this.options.getVideo) {
      throw new Error('options.getVideo is required');
    }

    if (this.options.start + 1 > this.options.total || this.options.start < 0) {
      throw new Error('options.start is invalid');
    }

    if (!this.options.onSwiperOptionsChange) {
      throw new Error('options.onSwiperOptionsChange is required');
    }

    if (!this.options.onCurQueueChange) {
      throw new Error('options.onCurQueueChange is required');
    }

    const canUseBindGetsource = tt.canIUse('video-player.bindgetsource');
    this.canUseBindGetsource = canUseBindGetsource;

    const canUsePreloadResourceVideo = tt.canIUse('preloadResourceVideo');
    this.canUsePreloadResourceVideo = canUsePreloadResourceVideo;

    this._init();
  }

  runningTrigger = false;
  _triggerCurQueueChange() {
    if (this.runningTrigger) {
      return;
    }

    this.runningTrigger = true;

    Promise.resolve().then(() => {
      this.options.onCurQueueChange(this.curQueue);
      this.runningTrigger = false;
    });
  }

  _triggerSwiperOptionsChange() {
    this.options.onSwiperOptionsChange(this.swiperOptions);
  }

  _setSwiperOptions(obj) {
    Object.assign(this.swiperOptions, obj);
    this._triggerSwiperOptionsChange();
  }

  _setCurQueue(swiperIndex, info) {
    const { curQueue } = this;
    const lastVideoInfo = curQueue[swiperIndex];

    if (
      lastVideoInfo &&
      lastVideoInfo.id !== undefined &&
      lastVideoInfo.id !== info?.id
    ) {
      this.hasGotSource[lastVideoInfo.episode] = false;
      this.cacheVideoContext[lastVideoInfo.id] = undefined;
      this.options.onVideoDestroy && this.options.onVideoDestroy(lastVideoInfo);
    }

    curQueue[swiperIndex] = info;
    // console.warn('_setCurQueue', curQueue, swiperIndex);
    Object.assign(this.curQueue, curQueue);
    this._triggerCurQueueChange();
  }

  _deleteCurQueue(index) {
    const { curQueue } = this;
    const videoInfo = curQueue[index];

    if (videoInfo) {
      this.hasGotSource[videoInfo.episode] = false;
      this.cacheVideoContext[videoInfo.id] = undefined;
      this.options.onVideoDestroy && this.options.onVideoDestroy(videoInfo);
    }

    curQueue.splice(index, 1);

    this.curQueue = curQueue;
    this._triggerCurQueueChange();
  }

  _renderVideoAfterPreload(videoInfo, setCb) {
    if (!this.canUsePreloadResourceVideo) {
      setCb('fail');
      return;
    }

    const start = Date.now();
    tt.preloadResourceVideo({
      episodeId: videoInfo.eid,
      albumId: videoInfo.aid,
      cloudType: videoInfo.cloudType || 1,
      threePartyCloud: videoInfo.threePartyCloud,
      success() {
        setCb('success');
      },
      fail() {
        setCb('fail');
      },
      complete(res) {
        console.warn('preloadResourceVideo', res, Date.now() - start);
      },
    });
  }

  async _getVideo(index, swiperIndex, needRenderAfterPreload = true) {
    let info = {
      status: 'loading',
    };

    const setVideoInfo = (videoInfo) => {
      this.videoList[index] = videoInfo;
      this._setCurQueue(swiperIndex, videoInfo);
    };

    try {
      setVideoInfo(info);

      const res = await this.options.getVideo(index);

      info = {
        ...res,
        status: 'success',
      };

      if (needRenderAfterPreload) {
        this._renderVideoAfterPreload(res, (status) => {
          if (status === 'success') {
            setVideoInfo({
              ...info,
              // 预加载成功的情况下，episodes_cover 设为 undefined ，这样下一个视频会直接渲染首帧
              episodes_cover: undefined,
            });
            return;
          }
          setVideoInfo(info);
        });
      } else {
        setVideoInfo(info);
      }
    } catch (error) {
      console.error(error);
      info = {
        status: 'error',
      };
      setVideoInfo(info);
    }
  }

  _initSwiperCurrent() {
    // 初始位置需要是除以 3 的余数，
    // 这样才能满足向上滑动时，第一个视频永远在第一个 swiper-item 中
    // 具体参考 IDE 模板接入文档
    return this.options.start % 3;
  }

  _initPreload(current) {
    switch (current) {
      case 0:
        this._preload(1, 'down');
        break;
      case 1:
        this._preload(1, 'down');
        this._preload(1, 'up');
        break;
      case 2:
        this._preload(1, 'up');
        break;
      default:
        break;
    }
  }

  async _init() {
    if (this.options.total <= 3) {
      this.curQueue = new Array(this.options.total).fill(null);
    } else {
      this.curQueue = new Array(3).fill(null).fill(null);
    }

    this._changeCurrentIndex(this.options.start);

    const swiperCurrent = this._initSwiperCurrent();

    if (this._checkNeedFetchVideo(this.currentIndex)) {
      this._getVideo(this.currentIndex, swiperCurrent, false);
    } else {
      const videoInfo = this.videoList[this.currentIndex];
      this._setCurQueue(swiperCurrent, videoInfo);
    }

    this._setSwiperOptions({
      current: swiperCurrent,
    });
    this._initPreload(swiperCurrent);
  }

  // 是否需要获取 video
  _checkNeedFetchVideo(index) {
    return !this.videoList[index] || this.videoList[index].status === 'error';
  }

  // eslint-disable-next-line class-methods-use-this
  _checkPreIndexValid(preIndex) {
    return preIndex >= 0;
  }

  _checkNextIndexValid(nextIndex) {
    return nextIndex < this.options.total;
  }

  _checkCanCircular() {
    return (
      this.currentIndex !== 0 && this.currentIndex !== this.options.total - 1
    );
  }

  // eslint-disable-next-line class-methods-use-this
  _checkStart(start, total) {
    if (start + 1 > total || start < 0) {
      throw new Error('options.start is invalid');
    }
  }

  // swiperIndex 和集数到转换
  // swiper-item 只有3个，但集数有很多
  // eslint-disable-next-line class-methods-use-this
  _formatSwiperIndex(index) {
    if (index < 0) {
      const x = index % 3;

      if (x === 0) {
        return 0;
      }

      return 3 + x;
    }

    return index % 3;
  }

  _changeCurrentIndex(targetIndex) {
    this.currentIndex = targetIndex;
    this.preIndex = targetIndex - 1;
    this.nextIndex = targetIndex + 1;
  }

  // 预加载下一集
  // eslint-disable-next-line class-methods-use-this
  async _preload(count, direction) {
    const { current } = this.swiperOptions;

    // 滑动方向
    if (direction === 'down') {
      for (let index = 1; index <= count; index++) {
        const nextIndex = this.currentIndex + index;
        const nextSwiperIndex = current + index;
        let normalizedNextSwiperIndex =
          this._formatSwiperIndex(nextSwiperIndex);

        if (this._checkNextIndexValid(nextIndex)) {
          // 预加载的是最后一集，且当前 swiper-index 是最后一个
          // 需将预加载的最后一集加到 swiper 列表末尾
          if (nextIndex === this.options.total - 1 && current === 2) {
            normalizedNextSwiperIndex = 3;
          }

          if (this._checkNeedFetchVideo(nextIndex)) {
            this._getVideo(nextIndex, normalizedNextSwiperIndex);
          } else {
            const videoInfo = this.videoList[nextIndex];

            this._renderVideoAfterPreload(videoInfo, (status) => {
              if (status === 'success') {
                this._setCurQueue(normalizedNextSwiperIndex, {
                  ...videoInfo,
                  episodes_cover: undefined,
                });
                return;
              }
              this._setCurQueue(normalizedNextSwiperIndex, videoInfo);
            });
          }
        }
      }
    } else if (direction === 'up') {
      for (let index = 1; index <= count; index++) {
        const preIndex = this.currentIndex - index;
        const preSwiperIndex = current - index;
        const normalizePreSwiperIndex = this._formatSwiperIndex(preSwiperIndex);

        if (this._checkPreIndexValid(preIndex)) {
          if (this._checkNeedFetchVideo(preIndex)) {
            this._getVideo(preIndex, normalizePreSwiperIndex);
          } else {
            const videoInfo = this.videoList[preIndex];

            this._renderVideoAfterPreload(videoInfo, (status) => {
              if (status === 'success') {
                this._setCurQueue(normalizePreSwiperIndex, {
                  ...videoInfo,
                  episodes_cover: undefined,
                });
                return;
              }
              this._setCurQueue(normalizePreSwiperIndex, videoInfo);
            });
          }
        }
      }
    }
  }

  async _changeCurrent(swiperIndex, targetIndex, direction) {
    // console.warn('_changeCurrent targetIndex', targetIndex, swiperIndex);

    // 理论上不会出现
    if (targetIndex < 0 || targetIndex >= this.options.total) {
      return;
    }

    // 暂停上一个视频
    this.pause();

    // 设置当前播放的视频
    this._changeCurrentIndex(targetIndex);

    this._setSwiperOptions({
      current: swiperIndex,
      circular: this._checkCanCircular(),
    });

    // 自动播放
    if (this.canUseBindGetsource) {
      if (this.hasGotSource[targetIndex]) {
        this.play();
      }
    } else {
      // 兼容处理
      setTimeout(() => {
        this.play();
      }, 800);
    }

    const { curQueue } = this;

    // 最后一集，且当前 swiper-index 是倒数第二个
    // 需要删除最后一个 swiper-item
    if (targetIndex === this.options.total - 1 && swiperIndex === 1) {
      this._deleteCurQueue(2);
    } else if (
      targetIndex === this.options.total - 3 &&
      curQueue.length === 4
    ) {
      // 倒数第三集，且 swiper 列表为 4 项时，需要删除最后一项
      // 需要删除最后一个 swiper-item
      this._deleteCurQueue(3);
    } else {
      this._preload(1, direction);
    }
  }

  // 选集
  setStart(start) {
    this._checkStart(start, this.options.total);
    this.options.start = start;
    this._init();
  }

  // 更新当前剧集
  async updateCurrentVideo() {
    const { currentIndex } = this;
    const currentSwiperIndex = this.swiperOptions.current;

    const setVideoInfo = (videoInfo) => {
      this.videoList[currentIndex] = videoInfo;
      this._setCurQueue(currentSwiperIndex, videoInfo);
    };

    const res = await this.options.getVideo(currentIndex);

    setVideoInfo({
      ...res,
      status: 'success',
    });
  }

  // 获取当前播放的 video
  getCurrentVideo() {
    return this.videoList[this.currentIndex];
  }

  // 获取当前 video context
  getVideoContext() {
    const id = this.videoList[this.currentIndex]?.id;

    if (id === undefined) {
      return;
    }

    if (this.cacheVideoContext[id]) {
      return this.cacheVideoContext[id];
    }

    // eslint-disable-next-line no-undef
    const context = tt.createVideoContext(`${id}`);
    this.cacheVideoContext[id] = context;

    return context;
  }

  // 播放当前剧集
  play() {
    this.getVideoContext()?.play();
  }

  // 暂停当前剧集
  pause() {
    this.getVideoContext()?.pause();
  }

  // swiper bindchange 使用
  onchange(e) {
    const { current } = e.detail;
    const lastIndex = this.swiperOptions.current;
    const diff = current - lastIndex;
    const direction = diff === 1 || diff === -2 ? 'down' : 'up';

    console.warn('direction', direction, diff);

    if (lastIndex === current) {
      return;
    }

    let targetIndex = this.currentIndex;

    if (direction === 'down') {
      targetIndex = this.nextIndex;
    } else {
      targetIndex = this.preIndex;
    }

    this._changeCurrent(current, targetIndex, direction);
  }

  // video-player bindgetsource 使用
  onGetSource(e) {
    const { episode } = e.target.dataset;

    console.warn('onGetSource', episode);

    const currentVideo = this.videoList[this.currentIndex];

    if (currentVideo?.episode === episode) {
      this.play();
    }

    this.hasGotSource[episode] = true;
  }

  // video-player bindended 使用
  onEnded() {
    const { nextIndex } = this;
    const { current } = this.swiperOptions;

    if (this._checkNextIndexValid(nextIndex)) {
      this._changeCurrent(current + 1, nextIndex, 'down');
    } else if (this.options.onEndList) {
      this.options.onEndList();
    }
  }
}
