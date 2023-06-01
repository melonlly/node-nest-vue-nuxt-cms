import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/exam',
    method: 'get',
    params: query,
  })
}

export function remove(data) {
  return request({
    url: '/exam',
    method: 'delete',
    data,
  })
}

export function getDetail(id) {
  return request({
    url: '/exam/' + id,
    method: 'get',
  })
}

export function create(data) {
  return request({
    url: '/exam',
    method: 'post',
    data,
  })
}

export function update(data) {
  return request({
    url: '/exam/' + data.id,
    method: 'put',
    data,
  })
}
