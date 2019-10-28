import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入文件的时候,默认导入的是目录下的索引文件(index.js index.vue index.json)
// @是webpack指定的路径别名 @==‘/src’ 绝对路劲
import router from '@/router'
import axios from '@/api'
Vue.prototype.$http = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
