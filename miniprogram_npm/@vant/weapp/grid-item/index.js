"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var component_1=require("../common/component"),relation_1=require("../common/relation"),link_1=require("../mixins/link");(0,component_1.VantComponent)({relation:(0,relation_1.useParent)("grid"),classes:["content-class","icon-class","text-class"],mixins:[link_1.link],props:{icon:String,iconColor:String,iconPrefix:{type:String,value:"van-icon"},dot:Boolean,info:null,badge:null,text:String,useSlot:Boolean},data:{viewStyle:""},mounted:function(){this.updateStyle()},methods:{updateStyle:function(){if(this.parent){var e=this.parent,n=e.data,t=e.children,i=n.columnNum,o=n.border,r=n.square,c=n.gutter,l=n.clickable,a=n.center,s=n.direction,u=n.reverse,d=n.iconSize;this.setData({center:a,border:o,square:r,gutter:c,clickable:l,direction:s,reverse:u,iconSize:d,index:t.indexOf(this),columnNum:i})}},onClick:function(){this.$emit("click"),this.jumpLink()}}});
//# sourceMappingURL=index.js.map