import {
    deepMerge
  } from './help.js'
  
  import {
    urlRegExp
  } from './validate.js'
  
  class Http {
    constructor() {
      this.config = {
        // 请求的根域名
        baseUrl: '',
        // 默认的请求头
        header: {},
        method: 'POST',
        // 设置为json，返回后tt.request会对数据进行一次JSON.parse
        dataType: 'json',
        // 此参数无需处理
        responseType: 'text',
        // 默认请求是否开启loading
        loading: true,
      }
  
      // 拦截器
      this.interceptor = {
        // 请求前的拦截
        request: null,
        // 请求后的拦截
        response: null
      }
  
      // get请求
      this.get = (url, data = {}, loading = this.config.loading, header = {}) => {
        return this.request({
          method: 'GET',
          url,
          header,
          data
        }, loading)
      }
  
      // post请求
      this.post = (url, data = {}, loading = this.config.loading, header = {}) => {
        return this.request({
          url,
          method: 'POST',
          header,
          data
        }, loading)
      }
  
      // put请求
      this.put = (url, data = {}, loading = this.config.loading, header = {}) => {
        return this.request({
          url,
          method: 'PUT',
          header,
          data
        }, loading)
      }
  
      // delete请求
      this.delete = (url, data = {}, loading = this.config.loading, header = {}) => {
        return this.request({
          url,
          method: 'DELETE',
          header,
          data
        }, loading)
      }
    }
  
    // 设置全局默认配置
    create(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = deepMerge(this.config, customConfig);
    }
  
    // 主要请求部分
    request(options = {}, loading = this.config.loading) {
      options.loading = loading
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        let tmpConfig = {};
        let interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(() => {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign(this.config.header, options.header);
      options.method = options.method || this.config.method;
  
      return new Promise((resolve, reject) => {
        options.complete = (response) => {
          response.loading = loading
          // 判断是否存在拦截器
          if (this.interceptor.response && typeof this.interceptor.response === 'function') {
            let resInterceptors = this.interceptor.response(response);
            // 如果拦截器不返回false，直接接入then回调
            if (resInterceptors !== false) {
              resolve(resInterceptors);
            } else {
              // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
              reject(response.data || response);
            }
          } else {
            // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
            resolve(response);
          }
        }
        // 判断用户传递的URL是否/开头,如果不是,加上/，
        options.url = urlRegExp(options.url) ? options.url : (this.config.baseUrl + (options.url
          .indexOf('/') == 0 ?
          options.url : '/' + options.url));
  
        tt.request(options);
      })
    }
  }
  export default Http