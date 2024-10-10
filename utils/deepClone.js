// 对象深拷贝函数
const deepClone = function (initalObj) {
    var obj = {};
    obj = JSON.parse(JSON.stringify(initalObj));
    return obj;
  }
  
  // 将深拷贝函数暴露出去
  export default {
    deepClone
  }