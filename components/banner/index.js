const app = getApp();
Component({
    data: {
      current:0,
      
    },
    properties: {
      videoList: {
        type: Array
      }
    },
    methods: {
      toVideoPlay(e){
        const { item } = e.currentTarget.dataset;
        tt.navigateTo({
          url: `/package-video-player/pages/video-player/index?ablum_id=${item.ablum_id}&episodes_id=${item.episodes[0].episodes_id}`,
          success: (res) => {
            
          },
          fail: (res) => {
            console.log(res);
          },
        });
      },
      switchTap(e){
        const {current} = e.detail;
        this.setData({
          current,
        })
      }
    }
  })