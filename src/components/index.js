import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'
export default {
  install (Vue) {
    Vue.component('my-bread', MyBread)
    Vue.component('my-channel', MyChannel)
    Vue.component('my-image', MyImage)
  }
}
