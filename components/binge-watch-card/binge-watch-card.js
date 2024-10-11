Component({
  data: {

  },
  properties: {
    chasingList: {
      type: Array,
      value: [],
      observer(value){
        console.log("组件监听chasingList",value)
      }
    }
  },
  methods: {
    // goPlay() 跳转至播放页
    goPlay(e) {
      const currentArr = e.currentTarget.dataset.item.episodes;
      // 获取当前剧的最新可播放剧集id：ablum_id
      const index = currentArr.findLastIndex((item) => item.episodes_locking == false)
      const ablumId = e.currentTarget.dataset.item.ablum_id
      const episodesId = e.currentTarget.dataset.item.episodes[index].episodes_id
      console.log("收藏 剧卡片点击跳转带参：",ablumId,episodesId);
      tt.navigateTo({
        url: `/package-video-player/pages/video-player/index?ablum_id=${ablumId}&episodes_id=${episodesId}`,
        success: (res) => {

        },
        fail: (res) => {

        },
      });
    }
  }
})