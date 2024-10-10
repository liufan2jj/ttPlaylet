"use strict";var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var s in e=arguments[n])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t},__assign.apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var color_1=require("../common/color"),defaultOptions={selector:"#van-notify",type:"danger",message:"",background:"",duration:3e3,zIndex:110,top:0,color:color_1.WHITE,safeAreaInsetTop:!1,onClick:function(){},onOpened:function(){},onClose:function(){}},currentOptions=__assign({},defaultOptions);function parseOptions(t){return null==t?{}:"string"==typeof t?{message:t}:t}function getContext(){var t=getCurrentPages();return t[t.length-1]}function Notify(t){var e=((t=__assign(__assign({},currentOptions),parseOptions(t))).context||getContext()).selectComponent(t.selector);if(delete t.context,delete t.selector,e)return e.setData(t),e.show(),e;console.warn("未找到 van-notify 节点，请确认 selector 及 context 是否正确")}exports.default=Notify,Notify.clear=function(t){var e=((t=__assign(__assign({},defaultOptions),parseOptions(t))).context||getContext()).selectComponent(t.selector);e&&e.hide()},Notify.setDefaultOptions=function(t){Object.assign(currentOptions,t)},Notify.resetDefaultOptions=function(){currentOptions=__assign({},defaultOptions)};
//# sourceMappingURL=notify.js.map