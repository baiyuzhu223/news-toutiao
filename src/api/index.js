// 导出一个配置好的axios对象
import axios from 'axios'
import local from '../utils/local'
import router from '../router'

// 对axios进行配置
// 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 设置默认的请求头
if (local.getUser()) {
  axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
}
// 请求拦截
axios.interceptors.request.use((config) => {
  // 拦截成功 往headers中加token
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (err) => {
  return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  if (err.response.status === 401) {
    // 如果是401跳转登录
    // 麻烦 window.location.href = 'http://localhost:8080/#/login'
    // 不推荐 window.location.hash = '#/login'
    // 使用vue-router进行跳转
    return router.push('/login')
  }
  return Promise.reject(err)
})
export default axios