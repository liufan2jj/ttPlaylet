Component({
  data: {

  },
  properties: {
    title: {
      type: String,
      value: "提示"
    },
    copnfirmText: {
      type: String,
      value: "确认"
    },
    titleFlag: {
      type: Boolean,
      value: true,
    },
    copnfirmFlag: {
      type: Boolean,
      value: true,
    },
    background: {
      type: Boolean,
      value: true,
    },
    show: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        // 监听show属性变化，控制遮罩层显示
      }
    }
  },
  methods: {
    closePopup() {
      this.setData({
        show: false
      });
      this.triggerEvent('close'); // 触发关闭事件
    },
    preventTouchMove() {
      // 阻止遮罩层下的触摸移动事件
      return false
    }
  }
})