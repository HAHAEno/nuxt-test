import axios from 'axios'

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'text/plain;charset=UTF-8'
// create an axios instance
const service = axios.create({
  baseURL: 'http://api.openweathermap.org/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000 // request timeout
})
function data (obj) {
  obj = JSON.parse(JSON.stringify(obj))
  for (const i in obj) {
    if (obj[i] === '') {
      obj[i] = null
    }
    if (typeof obj[i] === 'string') {
      obj[i] = obj[i].replace(/^\s+|\s+$/g, '')
    } else if (typeof obj[i] === 'object') {
      data(obj[i])
    }
  }
}
// request interceptor
service.interceptors.request.use(

  (config) => {
    if (config.method === 'post') {
      if (typeof config.data === 'object') {
        data(config.data)
      }
    }

    return config
  },
  (error) => {
    // do something with request error

    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or code
   * Please return  response => response
  */

  /**
   * Determine the request code by custom code
   * Here is just an example
   * You can also judge the code by HTTP code Code
   */
  (response) => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || res.msg || '服务器错误请重试'))
    } else {
      return res
    }
  },
  (error) => {
    if (error.response && error.response.data) {
      // this.$toast({
      //   message: error.response.data.message || '服务器错误请重试',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
    } else {
      // this.$toast({
      //   message: '服务器错误请重试',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
    }

    return Promise.reject(error)
  }
)

export default service
