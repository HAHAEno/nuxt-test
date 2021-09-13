// import qs from 'qs'
import request from '@/plugins/request'

export const deletePropety = (params) => {
  return request({
    url: 'base/data/2.5/weather',
    // url: 'data/2.5/weather',
    method: 'get',
    params
  })
}
