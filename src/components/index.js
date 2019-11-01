import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
export default {
  install (Vue) {
    Vue.component('my-bread', MyBread)
    Vue.component('my-channel', MyChannel)
  }
}
