import request from '@/utils/request'


/**
 * 列表查询
 * @param {*} searchForm
 */
export function list(num,size,search) {
  return request({
    url: '/user',
    method: 'get',
    params:{
      pageNum: num,
      pageSize: size,
      search: search,
  }
  })
}

/**
 * 查询在线用户
 */
export function online() {
  return request({
    url: '/user/online',
    method: 'get'
  })
}

/**
 * 根据Id查询
 * @param {*} userId
 */
export function findById(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

/**
 * 新增用户
 * @param {*} data
 */
export function add(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

/**
 * 更新用户
 * @param {*} data
 */
export function update(data) {
  return request({
    url: baseURL,
    method: 'put',
    data
  })
}

/**
 * 删除用户
 * @param {*} id
 */
export function delById(id) {
  return request({
    url: baseURL + '/' + id,
    method: 'delete'
  })
}

/**
 * 踢出用户
 * @param {*} id
 */
export function onlineById(id) {
  return request({
    url: baseURL + '/online/' + id,
    method: 'delete'
  })
}

