import request from '@/utils/request'

export function listTCompany(query) {
    return request({
      url: '/biz/transportCompany/list',
      method: 'get',
      params: query
    })
  }

// 新增运输企业
export function addCompany(data) {
    return request({
      url: '/biz/transportCompany',
      method: 'post',
      data: data
    })
  }

// 获取运输企业代码
export function getCompanyCode(data) {
    return request({
      url: '/biz/transportCompany/nextCode',
      method: 'post',
      data: data
    })
}