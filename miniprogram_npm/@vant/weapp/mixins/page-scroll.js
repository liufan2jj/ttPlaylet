"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.pageScrollMixin=void 0;var validator_1=require("../common/validator"),utils_1=require("../common/utils");function onPageScroll(e){var r=(0,utils_1.getCurrentPage)().vanPageScroller;(void 0===r?[]:r).forEach((function(r){"function"==typeof r&&r(e)}))}function pageScrollMixin(e){return Behavior({attached:function(){var r=(0,utils_1.getCurrentPage)();if((0,utils_1.isDef)(r)){var l=e.bind(this),o=r.vanPageScroller,i=void 0===o?[]:o;(0,validator_1.isFunction)(r.onPageScroll)&&r.onPageScroll!==onPageScroll&&i.push(r.onPageScroll.bind(r)),i.push(l),r.vanPageScroller=i,r.onPageScroll=onPageScroll,this._scroller=l}},detached:function(){var e=this,r=(0,utils_1.getCurrentPage)();if((0,utils_1.isDef)(r)&&(0,utils_1.isDef)(r.vanPageScroller)){var l=r.vanPageScroller.findIndex((function(r){return r===e._scroller}));l>-1&&r.vanPageScroller.splice(l,1),this._scroller=void 0}}})}exports.pageScrollMixin=pageScrollMixin;
//# sourceMappingURL=page-scroll.js.map