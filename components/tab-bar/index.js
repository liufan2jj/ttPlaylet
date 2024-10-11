Component({
  data:{
    needLeft:false,
    needRight:false,
  },
  properties: {
    options: { // 接收外部传入的选项
      type: Array,
      value: []
    },
    current: { // 接收外部传入的当前选中的选项
      type: Number,
      value: 0,
      observer(newVal,oldVal){
        const { options } = this.data;
        if (options.length>5) {
          console.log('检测',newVal,oldVal);
          if (newVal>oldVal&&(newVal==3||newVal==4)) {
            this.setData({
              needLeft:true,
              needRight:false,
            })
            console.log('该左滑');
          }else if(newVal<oldVal&&(newVal==options.length-4||newVal==2)){
            console.log('该右滑le');
            this.setData({
              needRight:true,
              needLeft:false
            })
          }
        }
      }
    }
  },
  methods: {
    handleTabbarClick(event) { // 处理tabbar选项的点击事件
      const index = event.currentTarget.dataset.index
      this.setData({
        current: index
      })
      this.triggerEvent('change', { // 将当前选中的选项通过properties传递给外部
        current: index
      })
    }
  }
})
