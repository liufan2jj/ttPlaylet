"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var relation_1=require("../common/relation"),component_1=require("../common/component");(0,component_1.VantComponent)({classes:["item-title-class"],field:!0,relation:(0,relation_1.useParent)("dropdown-menu",(function(){this.updateDataFromParent()})),props:{value:{type:null,observer:"rerender"},title:{type:String,observer:"rerender"},disabled:Boolean,titleClass:{type:String,observer:"rerender"},options:{type:Array,value:[],observer:"rerender"},popupStyle:String,useBeforeToggle:{type:Boolean,value:!1},rootPortal:{type:Boolean,value:!1}},data:{transition:!0,showPopup:!1,showWrapper:!1,displayTitle:"",safeAreaTabBar:!1},methods:{rerender:function(){var e=this;wx.nextTick((function(){var t;null===(t=e.parent)||void 0===t||t.updateItemListData()}))},updateDataFromParent:function(){if(this.parent){var e=this.parent.data,t=e.overlay,o=e.duration,r=e.activeColor,a=e.closeOnClickOverlay,n=e.direction,i=e.safeAreaTabBar;this.setData({overlay:t,duration:o,activeColor:r,closeOnClickOverlay:a,direction:n,safeAreaTabBar:i})}},onOpen:function(){this.$emit("open")},onOpened:function(){this.$emit("opened")},onClose:function(){this.$emit("close")},onClosed:function(){this.$emit("closed"),this.setData({showWrapper:!1})},onOptionTap:function(e){var t=e.currentTarget.dataset.option.value,o=this.data.value!==t;this.setData({showPopup:!1,value:t}),this.$emit("close"),this.rerender(),o&&this.$emit("change",t)},toggle:function(e,t){var o=this;void 0===t&&(t={});var r=this.data.showPopup;"boolean"!=typeof e&&(e=!r),e!==r&&this.onBeforeToggle(e).then((function(r){var a;r&&(o.setData({transition:!t.immediate,showPopup:e}),e?null===(a=o.parent)||void 0===a||a.getChildWrapperStyle().then((function(e){o.setData({wrapperStyle:e,showWrapper:!0}),o.rerender()})):o.rerender())}))},onBeforeToggle:function(e){var t=this;return this.data.useBeforeToggle?new Promise((function(o){t.$emit("before-toggle",{status:e,callback:function(e){return o(e)}})})):Promise.resolve(!0)}}});
//# sourceMappingURL=index.js.map