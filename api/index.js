import {
    requestGet,
    requestPost,
  } from '../utils/request'
  
  // 精选好剧分页接口
  export function selectDramaChoiceList(data) {
    return requestGet({
      // 请求api
      url: '/playlet/playlet/selectDramaChoiceList',
      // 请求参数
      data: data,
      // 是否开启loading，可选 默认 true
      loading: true
    });
  }
  // 剧场初始化接口
  export function theatreInfo(data) {
    return requestGet({
      // 请求api
      url: '/playlet/playlet/theatreInfo',
      // 请求参数
      data: data,
      // 是否开启loading，可选 默认 true
      loading: true
    });
  }
  // 短剧排行接口
  export function selectDramaListBy(data) {
    return requestGet({
      // 请求api
      url: '/playlet/playlet/selectDramaListBy',
      // 请求参数
      data: data,
      // 是否开启loading，可选 默认 true
      loading: true
    });
  }
  
  //搜索短剧接口
  export function searchDramaList(data) {
    return requestGet({
      // 请求api
      url: '/playlet/playlet/searchDramaList',
      // 请求参数
      data: data,
      // 是否开启loading，可选 默认 true
      loading: true
    });
  }
  
  //开通会员，生成预支付订单
  export function prePayVip(data) {
    return requestPost({
      // 请求api
      url: '/playlet/wechat/recharge/prePayVip',
      // 请求参数
      data: data,
      // 是否开启loading，可选 默认 true
      loading: true
    });
  }
  
  //充值看点，生成预支付订单
  export function prePayViewPoint(data) {
    return requestPost({
      // 请求api
      url: '/playlet/wechat/recharge/prePayViewPoint',
      // 请求参数
      data: data,
      // 是否开启loading，可选 默认 true
      loading: true
    });
  }
  
  //充值项目列表
  export function selectRechargeProjectList(data) {
    return requestGet({
      // 请求api
      url: '/playlet/wechat/recharge/selectRechargeProjectList',
      // 请求参数
      data: data,
      // 是否开启loading，可选 默认 true
      loading: true
    });
  }