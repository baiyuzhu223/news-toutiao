import VueRooter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'

Vue.use(VueRooter)

const router = new VueRooter({
  routes: [
    { path: '/login', component: Login }
  ]
})
export default router
