"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var component_1=require("../common/component"),relation_1=require("../common/relation"),button_1=require("../mixins/button"),link_1=require("../mixins/link");(0,component_1.VantComponent)({mixins:[link_1.link,button_1.button],relation:(0,relation_1.useParent)("goods-action"),props:{text:String,color:String,size:{type:String,value:"normal"},loading:Boolean,disabled:Boolean,plain:Boolean,type:{type:String,value:"danger"},customStyle:{type:String,value:""}},methods:{onClick:function(t){this.$emit("click",t.detail),this.jumpLink()},updateStyle:function(){if(null!=this.parent){var t=this.index,e=this.parent.children,n=void 0===e?[]:e;this.setData({isFirst:0===t,isLast:t===n.length-1})}}}});
//# sourceMappingURL=index.js.map