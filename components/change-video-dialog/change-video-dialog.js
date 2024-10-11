import { rpxToPx } from "../../utils";
Component({
  data: {
    sortList: ['1-30', '31-60', '61-90', "91-120", '1-30', '31-60', '61-90', "91-120"],
    swiperHeight: 0,
    animationData:null,
    skitTitle:"",
    ablumEpisodes:0,
    needLoading:true,
  },
  properties: {
    needChangeVideo:{
      type:Boolean,
      value:false,
    },
    isFullScreen:{
      type:Boolean,
      value:false,
    },
    currentAblum:{
      type:Object,
    },
    currentVideo:{
      type:Object,
      observer(value){
        console.log("currentVideo",value);
      }
    }
  },
  ready() {
      const dialogHeight = rpxToPx(1204);
      this.setData({
        dialogHeight,
      });
    setTimeout(() => {
      this.setData({
        needLoading:false,
      })
    }, 3000);
      
  },
  methods: {
    handleTabbarChange(event) {
      const current = event.detail.current
      this.setData({
        current: current
      });
    },
    switchTap(e) {
      const {
        current
      } = e.detail;
      console.log(current);
      this.setData({
        current,
      });
    },
   async requestData(){
     console.log("这里需要请求数据");
   },
   onTapEpisodes(e){
     const {episodeitem} = e.currentTarget.dataset;
     if (episodeitem.episodes_locking) {
       tt.showToast({
         title: "积分不足",
         icon:"none"
       });
       return;
     }
     this.triggerEvent("episodesChangeHandler",{episodeitem})
   },
   maskHandler(){
     this.setData({
      needChangeVideo:false,
     })
   },
    cancel() {
      this.triggerEvent('cancel');
    },
  }
})