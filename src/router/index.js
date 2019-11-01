import VueRooter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import local from '@/utils/local'
import Article from '@/views/article'
import Image from '@/views/image'
Vue.use(VueRooter)

const router = new VueRooter({
  routes: [
    // 登录
    { path: '/login', component: Login },
    // 首页
    { path: '/',
      component: Home,
      children: [
        // 欢迎
        { path: '/', component: Welcome },
        // 内容
        { path: '/article', component: Article },
        { path: '/image', component: Image }
      ] },
    { path: '*', component: NotFound }
  ]
})
// 添加路由导航守卫
router.beforeEach((to, from, next) => {
  // 当每次跳转前触发
  // to 跳转到目标 路由对象
  // from 从哪里跳转过来 路由对象
  // next 下一步方法 next()放行 next('/login')
  const user = local.getUser()
  // 如果登录
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router
