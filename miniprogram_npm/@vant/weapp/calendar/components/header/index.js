"use strict";var __spreadArray=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var i,a=0,o=t.length;a<o;a++)!i&&a in t||(i||(i=Array.prototype.slice.call(t,0,a)),i[a]=t[a]);return e.concat(i||Array.prototype.slice.call(t))};Object.defineProperty(exports,"__esModule",{value:!0});var component_1=require("../../../common/component");(0,component_1.VantComponent)({props:{title:{type:String,value:"日期选择"},subtitle:String,showTitle:Boolean,showSubtitle:Boolean,firstDayOfWeek:{type:Number,observer:"initWeekDay"}},data:{weekdays:[]},created:function(){this.initWeekDay()},methods:{initWeekDay:function(){var e=["日","一","二","三","四","五","六"],t=this.data.firstDayOfWeek||0;this.setData({weekdays:__spreadArray(__spreadArray([],e.slice(t,7),!0),e.slice(0,t),!0)})},onClickSubtitle:function(e){this.$emit("click-subtitle",e)}}});
//# sourceMappingURL=index.js.map