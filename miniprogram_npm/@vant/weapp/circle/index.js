"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var color_1=require("../common/color"),component_1=require("../common/component"),utils_1=require("../common/utils"),validator_1=require("../common/validator"),version_1=require("../common/version"),canvas_1=require("./canvas");function format(e){return Math.min(Math.max(e,0),100)}var PERIMETER=2*Math.PI,BEGIN_ANGLE=-Math.PI/2,STEP=1;(0,component_1.VantComponent)({props:{text:String,lineCap:{type:String,value:"round"},value:{type:Number,value:0,observer:"reRender"},speed:{type:Number,value:50},size:{type:Number,value:100,observer:function(){this.drawCircle(this.currentValue)}},fill:String,layerColor:{type:String,value:color_1.WHITE},color:{type:null,value:color_1.BLUE,observer:function(){var e=this;this.setHoverColor().then((function(){e.drawCircle(e.currentValue)}))}},type:{type:String,value:""},strokeWidth:{type:Number,value:4},clockwise:{type:Boolean,value:!0}},data:{hoverColor:color_1.BLUE},methods:{getContext:function(){var e=this,t=this.data,r=t.type,a=t.size;if(""===r||!(0,version_1.canIUseCanvas2d)()){var n=wx.createCanvasContext("van-circle",this);return Promise.resolve(n)}var o=(0,utils_1.getSystemInfoSync)().pixelRatio;return new Promise((function(t){wx.createSelectorQuery().in(e).select("#van-circle").node().exec((function(n){var i=n[0].node,l=i.getContext(r);e.inited||(e.inited=!0,i.width=a*o,i.height=a*o,l.scale(o,o)),t((0,canvas_1.adaptor)(l))}))}))},setHoverColor:function(){var e=this,t=this.data,r=t.color,a=t.size;return(0,validator_1.isObj)(r)?this.getContext().then((function(t){if(t){var n=t.createLinearGradient(a,0,0,0);Object.keys(r).sort((function(e,t){return parseFloat(e)-parseFloat(t)})).map((function(e){return n.addColorStop(parseFloat(e)/100,r[e])})),e.hoverColor=n}})):(this.hoverColor=r,Promise.resolve())},presetCanvas:function(e,t,r,a,n){var o=this.data,i=o.strokeWidth,l=o.lineCap,s=o.clockwise,c=o.size/2,u=c-i/2;e.setStrokeStyle(t),e.setLineWidth(i),e.setLineCap(l),e.beginPath(),e.arc(c,c,u,r,a,!s),e.stroke(),n&&(e.setFillStyle(n),e.fill())},renderLayerCircle:function(e){var t=this.data,r=t.layerColor,a=t.fill;this.presetCanvas(e,r,0,PERIMETER,a)},renderHoverCircle:function(e,t){var r=this.data.clockwise,a=PERIMETER*(t/100),n=r?BEGIN_ANGLE+a:3*Math.PI-(BEGIN_ANGLE+a);this.presetCanvas(e,this.hoverColor,BEGIN_ANGLE,n)},drawCircle:function(e){var t=this,r=this.data.size;this.getContext().then((function(a){if(a){a.clearRect(0,0,r,r),t.renderLayerCircle(a);var n=format(e);0!==n&&t.renderHoverCircle(a,n),a.draw()}}))},reRender:function(){var e=this,t=this.data,r=t.value,a=t.speed;if(a<=0||a>1e3)this.drawCircle(r);else{this.clearMockInterval(),this.currentValue=this.currentValue||0;var n=function(){e.interval=setTimeout((function(){e.currentValue!==r?(Math.abs(e.currentValue-r)<STEP?e.currentValue=r:e.currentValue<r?e.currentValue+=STEP:e.currentValue-=STEP,e.drawCircle(e.currentValue),n()):e.clearMockInterval()}),1e3/a)};n()}},clearMockInterval:function(){this.interval&&(clearTimeout(this.interval),this.interval=null)}},mounted:function(){var e=this;this.currentValue=this.data.value,this.setHoverColor().then((function(){e.drawCircle(e.currentValue)}))},destroyed:function(){this.clearMockInterval()}});
//# sourceMappingURL=index.js.map