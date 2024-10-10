"use strict";var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var e,a=1,n=arguments.length;a<n;a++)for(var i in e=arguments[a])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},__assign.apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var component_1=require("../common/component"),validator_1=require("../common/validator"),LONG_PRESS_START_TIME=600,LONG_PRESS_INTERVAL=200;function add(t,e){var a=Math.pow(10,10);return Math.round((t+e)*a)/a}function equal(t,e){return String(t)===String(e)}(0,component_1.VantComponent)({field:!0,classes:["input-class","plus-class","minus-class"],props:{value:{type:null},integer:{type:Boolean,observer:"check"},disabled:Boolean,inputWidth:String,buttonSize:String,asyncChange:Boolean,disableInput:Boolean,decimalLength:{type:Number,value:null,observer:"check"},min:{type:null,value:1,observer:"check"},max:{type:null,value:Number.MAX_SAFE_INTEGER,observer:"check"},step:{type:null,value:1},showPlus:{type:Boolean,value:!0},showMinus:{type:Boolean,value:!0},disablePlus:Boolean,disableMinus:Boolean,longPress:{type:Boolean,value:!0},theme:String,alwaysEmbed:Boolean},data:{currentValue:""},watch:{value:function(){this.observeValue()}},created:function(){this.setData({currentValue:this.format(this.data.value)})},methods:{observeValue:function(){var t=this.data.value;this.setData({currentValue:this.format(t)})},check:function(){var t=this.format(this.data.currentValue);equal(t,this.data.currentValue)||this.setData({currentValue:t})},isDisabled:function(t){var e=this.data,a=e.disabled,n=e.disablePlus,i=e.disableMinus,s=e.currentValue,r=e.max,o=e.min;return"plus"===t?a||n||+s>=+r:a||i||+s<=+o},onFocus:function(t){this.$emit("focus",t.detail)},onBlur:function(t){var e=this.format(t.detail.value);this.setData({currentValue:e}),this.emitChange(e),this.$emit("blur",__assign(__assign({},t.detail),{value:e}))},filter:function(t){return t=String(t).replace(/[^0-9.-]/g,""),this.data.integer&&-1!==t.indexOf(".")&&(t=t.split(".")[0]),t},format:function(t){return t=""===(t=this.filter(t))?0:+t,t=Math.max(Math.min(this.data.max,t),this.data.min),(0,validator_1.isDef)(this.data.decimalLength)&&(t=t.toFixed(this.data.decimalLength)),t},onInput:function(t){var e=(t.detail||{}).value,a=void 0===e?"":e;if(""!==a){var n=this.format(a);this.emitChange(n)}},emitChange:function(t){this.data.asyncChange||this.setData({currentValue:t}),this.$emit("change",t)},onChange:function(){var t=this.type;if(this.isDisabled(t))this.$emit("overlimit",t);else{var e="minus"===t?-this.data.step:+this.data.step,a=this.format(add(+this.data.currentValue,e));this.emitChange(a),this.$emit(t)}},longPressStep:function(){var t=this;this.longPressTimer=setTimeout((function(){t.onChange(),t.longPressStep()}),LONG_PRESS_INTERVAL)},onTap:function(t){var e=t.currentTarget.dataset.type;this.type=e,this.onChange()},onTouchStart:function(t){var e=this;if(this.data.longPress){clearTimeout(this.longPressTimer);var a=t.currentTarget.dataset.type;this.type=a,this.isLongPress=!1,this.longPressTimer=setTimeout((function(){e.isLongPress=!0,e.onChange(),e.longPressStep()}),LONG_PRESS_START_TIME)}},onTouchEnd:function(){this.data.longPress&&clearTimeout(this.longPressTimer)}}});
//# sourceMappingURL=index.js.map