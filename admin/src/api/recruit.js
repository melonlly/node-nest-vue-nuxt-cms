import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/recruit',
    method: 'get',
    params: query,
  })
}

export function remove(data) {
  return request({
    url: '/recruit',
    method: 'delete',
    data,
  })
}

export function getDetail(id) {
  return request({
    url: '/recruit/' + id,
    method: 'get',
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv },
  })
}

export function create(data) {
  return request({
    url: '/recruit',
    method: 'post',
    data,
  })
}

export function update(data) {
  return request({
    url: '/recruit/' + data.id,
    method: 'put',
    data,
  })
}
