"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isWxWork=exports.isPC=exports.getCurrentPage=exports.clamp=exports.addNumber=exports.toPromise=exports.groupSetData=exports.getAllRect=exports.getRect=exports.pickExclude=exports.requestAnimationFrame=exports.addUnit=exports.nextTick=exports.range=exports.getSystemInfoSync=exports.isDef=void 0;var validator_1=require("./validator"),version_1=require("./version"),validator_2=require("./validator");Object.defineProperty(exports,"isDef",{enumerable:!0,get:function(){return validator_2.isDef}});var version_2=require("./version");function range(e,t,r){return Math.min(Math.max(e,t),r)}function nextTick(e){(0,version_1.canIUseNextTick)()?wx.nextTick(e):setTimeout((function(){e()}),1e3/30)}function addUnit(e){if((0,validator_1.isDef)(e))return e=String(e),(0,validator_1.isNumber)(e)?"".concat(e,"px"):e}function requestAnimationFrame(e){return setTimeout((function(){e()}),1e3/30)}function pickExclude(e,t){return(0,validator_1.isPlainObject)(e)?Object.keys(e).reduce((function(r,n){return t.includes(n)||(r[n]=e[n]),r}),{}):{}}function getRect(e,t){return new Promise((function(r){wx.createSelectorQuery().in(e).select(t).boundingClientRect().exec((function(e){return void 0===e&&(e=[]),r(e[0])}))}))}function getAllRect(e,t){return new Promise((function(r){wx.createSelectorQuery().in(e).selectAll(t).boundingClientRect().exec((function(e){return void 0===e&&(e=[]),r(e[0])}))}))}function groupSetData(e,t){(0,version_1.canIUseGroupSetData)()?e.groupSetData(t):t()}function toPromise(e){return(0,validator_1.isPromise)(e)?e:Promise.resolve(e)}function addNumber(e,t){var r=Math.pow(10,10);return Math.round((e+t)*r)/r}Object.defineProperty(exports,"getSystemInfoSync",{enumerable:!0,get:function(){return version_2.getSystemInfoSync}}),exports.range=range,exports.nextTick=nextTick,exports.addUnit=addUnit,exports.requestAnimationFrame=requestAnimationFrame,exports.pickExclude=pickExclude,exports.getRect=getRect,exports.getAllRect=getAllRect,exports.groupSetData=groupSetData,exports.toPromise=toPromise,exports.addNumber=addNumber;var clamp=function(e,t,r){return Math.min(Math.max(e,t),r)};function getCurrentPage(){var e=getCurrentPages();return e[e.length-1]}exports.clamp=clamp,exports.getCurrentPage=getCurrentPage,exports.isPC=["mac","windows"].includes((0,version_1.getSystemInfoSync)().platform),exports.isWxWork="wxwork"===(0,version_1.getSystemInfoSync)().environment;
//# sourceMappingURL=utils.js.map