"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var component_1=require("../common/component"),relation_1=require("../common/relation");(0,component_1.VantComponent)({field:!0,relation:(0,relation_1.useChildren)("radio"),props:{value:{type:null,observer:"updateChildren"},direction:String,disabled:{type:Boolean,observer:"updateChildren"}},methods:{updateChildren:function(){this.children.forEach((function(e){return e.updateFromParent()}))}}});
//# sourceMappingURL=index.js.map