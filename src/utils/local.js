// 提供用户信息的相关的api
// 约定key
const KEY = 'news-toutiao-key'
const local = {
  // 存储
  setUser (user) {
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)// json字符串转对象
  },
  // 删除
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
export default local
