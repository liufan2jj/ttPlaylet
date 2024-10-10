/**
 * 验证URL格式
 */
export function urlRegExp(value) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value)
  }
  
  export function compareDates(specifiedDateString) {
    if (specifiedDateString) {
      const currentDate = Date.parse(new Date());
      const specifiedDate = Date.parse(new Date(specifiedDateString.replace(/-/g, '/')));
      // 截取时分秒
      let res = specifiedDateString.substring(0, 10); //要截取时间的字符串
      if (currentDate > specifiedDate) {
        return "会员已过期";
      } else if (currentDate <= specifiedDate) {
        return `会员有效期至-${res}`;
      }
    }
  }