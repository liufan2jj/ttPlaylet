"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var component_1=require("../common/component"),utils_1=require("./utils");function simpleTick(t){return setTimeout(t,30)}(0,component_1.VantComponent)({props:{useSlot:Boolean,millisecond:Boolean,time:{type:Number,observer:"reset"},format:{type:String,value:"HH:mm:ss"},autoStart:{type:Boolean,value:!0}},data:{timeData:(0,utils_1.parseTimeData)(0),formattedTime:"0"},destroyed:function(){clearTimeout(this.tid),this.tid=null},methods:{start:function(){this.counting||(this.counting=!0,this.endTime=Date.now()+this.remain,this.tick())},pause:function(){this.counting=!1,clearTimeout(this.tid)},reset:function(){this.pause(),this.remain=this.data.time,this.setRemain(this.remain),this.data.autoStart&&this.start()},tick:function(){this.data.millisecond?this.microTick():this.macroTick()},microTick:function(){var t=this;this.tid=simpleTick((function(){t.setRemain(t.getRemain()),0!==t.remain&&t.microTick()}))},macroTick:function(){var t=this;this.tid=simpleTick((function(){var i=t.getRemain();(0,utils_1.isSameSecond)(i,t.remain)&&0!==i||t.setRemain(i),0!==t.remain&&t.macroTick()}))},getRemain:function(){return Math.max(this.endTime-Date.now(),0)},setRemain:function(t){this.remain=t;var i=(0,utils_1.parseTimeData)(t);this.data.useSlot&&this.$emit("change",i),this.setData({formattedTime:(0,utils_1.parseFormat)(this.data.format,i)}),0===t&&(this.pause(),this.$emit("finish"))}}});
//# sourceMappingURL=index.js.map