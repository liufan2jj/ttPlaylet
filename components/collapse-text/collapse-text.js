Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: ''
    },
    fontSize: {
      type: String,
      value: '28rpx'//  单位rpx
    },
    fontColor: {
      type: String,
      value: '#FFF'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    heightInfo: {
      baseHeight: 0,
      realHeight: 0
    },
    show: true,
    // 需要动态设置的外层盒子高度
    outerHeight: 0,
    paddingRight: 0
  },
  async attached() {
      this.calculateHeight()
  },
  /**
   * 组件的方法列表
   */
  methods: {
  /**
   * 动态获取展开文字宽度
   * 确保展开、收起文字能显示
   * **/ 
  async getCollapseWidth() {
    let res = await this.getHeight('.collapse')
    if(!res) return
    this.setData({
      paddingRight: `${res.width}` || 30
    })
  },  
  /**
   * 计算高度差，判断是否有省略号
   * **/ 
  async calculateHeight() {
    return Promise.all([this.getHeight('.get-height'),this.getHeight('.inner')]).then((res) => {
      let [baseRes,realRes] = res
      let baseHeight = parseInt(baseRes.height || 0)*2
      let realHeight = parseInt( realRes.height || 0)

      if(!baseHeight || !realHeight) {
        this.setData({
          outerHeight: 'auto',
        })
        return
      }
      this.setData({
        heightInfo: {
          baseHeight,
          realHeight
        },
        outerHeight: baseHeight,
        show: !(realHeight > baseHeight)
      })
    })
  },
  /**
   * 获取dom信息
   * **/ 
  getHeight(selector) {
    return new Promise((resolve) => {
      const query = tt.createSelectorQuery().in(this)
      query.select(selector).boundingClientRect(function(res){
        resolve(res) 
      }).exec()
    })
  },
  /**
   * 展开状态切换
   * **/ 
  toggle() {
    this.setData({ 
      show: !this.data.show,
      outerHeight: this.data.show ? this.data.heightInfo.baseHeight : this.data.heightInfo.realHeight
    })
  },
  }
})
