  export const request = (options) => {
    options.method && (options.method = options.method.toUpperCase())
    return new Promise((resolve, reject) => {
      tt.request({
        url:  options.url,
        method: options.method || "GET",
        data: options.data || {},
        header: options.data || {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
        },
      });
    })
  }