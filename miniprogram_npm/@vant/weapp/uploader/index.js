"use strict";var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(e){for(var t,i=1,a=arguments.length;i<a;i++)for(var n in t=arguments[i])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},__assign.apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var component_1=require("../common/component"),validator_1=require("../common/validator"),shared_1=require("./shared"),utils_1=require("./utils");(0,component_1.VantComponent)({props:__assign(__assign(__assign(__assign({disabled:Boolean,multiple:Boolean,uploadText:String,useBeforeRead:Boolean,afterRead:null,beforeRead:null,previewSize:{type:null,value:80},name:{type:null,value:""},accept:{type:String,value:"image"},fileList:{type:Array,value:[],observer:"formatFileList"},maxSize:{type:Number,value:Number.MAX_VALUE},maxCount:{type:Number,value:100},deletable:{type:Boolean,value:!0},showUpload:{type:Boolean,value:!0},previewImage:{type:Boolean,value:!0},previewFullImage:{type:Boolean,value:!0},videoFit:{type:String,value:"contain"},imageFit:{type:String,value:"scaleToFill"},uploadIcon:{type:String,value:"photograph"}},shared_1.imageProps),shared_1.videoProps),shared_1.mediaProps),shared_1.messageFileProps),data:{lists:[],isInCount:!0},methods:{formatFileList:function(){var e=this.data,t=e.fileList,i=void 0===t?[]:t,a=e.maxCount,n=i.map((function(e){return __assign(__assign({},e),{isImage:(0,utils_1.isImageFile)(e),isVideo:(0,utils_1.isVideoFile)(e),deletable:!(0,validator_1.isBoolean)(e.deletable)||e.deletable})}));this.setData({lists:n,isInCount:n.length<a})},getDetail:function(e){return{name:this.data.name,index:null==e?this.data.fileList.length:e}},startUpload:function(){var e=this,t=this.data,i=t.maxCount,a=t.multiple,n=t.lists;t.disabled||(0,utils_1.chooseFile)(__assign(__assign({},this.data),{maxCount:i-n.length})).then((function(t){e.onBeforeRead(a?t:t[0])})).catch((function(t){e.$emit("error",t)}))},onBeforeRead:function(e){var t=this,i=this.data,a=i.beforeRead,n=i.useBeforeRead,s=!0;"function"==typeof a&&(s=a(e,this.getDetail())),n&&(s=new Promise((function(i,a){t.$emit("before-read",__assign(__assign({file:e},t.getDetail()),{callback:function(e){e?i():a()}}))}))),s&&((0,validator_1.isPromise)(s)?s.then((function(i){return t.onAfterRead(i||e)})):this.onAfterRead(e))},onAfterRead:function(e){var t=this.data,i=t.maxSize,a=t.afterRead;(Array.isArray(e)?e.some((function(e){return e.size>i})):e.size>i)?this.$emit("oversize",__assign({file:e},this.getDetail())):("function"==typeof a&&a(e,this.getDetail()),this.$emit("after-read",__assign({file:e},this.getDetail())))},deleteItem:function(e){var t=e.currentTarget.dataset.index;this.$emit("delete",__assign(__assign({},this.getDetail(t)),{file:this.data.fileList[t]}))},onPreviewImage:function(e){if(this.data.previewFullImage){var t=e.currentTarget.dataset.index,i=this.data,a=i.lists,n=i.showmenu,s=a[t];wx.previewImage({urls:a.filter((function(e){return(0,utils_1.isImageFile)(e)})).map((function(e){return e.url})),current:s.url,showmenu:n,fail:function(){wx.showToast({title:"预览图片失败",icon:"none"})}})}},onPreviewVideo:function(e){if(this.data.previewFullImage){var t=e.currentTarget.dataset.index,i=this.data.lists,a=[],n=i.reduce((function(e,i,n){return(0,utils_1.isVideoFile)(i)?(a.push(__assign(__assign({},i),{type:"video"})),n<t&&e++,e):e}),0);wx.previewMedia({sources:a,current:n,fail:function(){wx.showToast({title:"预览视频失败",icon:"none"})}})}},onPreviewFile:function(e){var t=e.currentTarget.dataset.index;wx.openDocument({filePath:this.data.lists[t].url,showMenu:!0})},onClickPreview:function(e){var t=e.currentTarget.dataset.index,i=this.data.lists[t];this.$emit("click-preview",__assign(__assign({},i),this.getDetail(t)))}}});
//# sourceMappingURL=index.js.map