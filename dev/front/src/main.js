import Vue from 'vue'
import Axios from 'axios'
import VueMarkdown from '@adapttive/vue-markdown'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import VueTour from 'vue-tour'

import smoothscroll from 'smoothscroll-polyfill'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip  = false

Vue.prototype.$http       = Axios
Vue.prototype.$apiURL     = process.env.VUE_APP_API_URL
Vue.prototype.$appURL     = process.env.VUE_APP_URL
Vue.prototype.$aanURL     = process.env.VUE_APP_AAN_URL
Vue.prototype.$publicPath = process.env.BASE_URL || '/'
Vue.prototype.$env        = process.env.NODE_ENV
Vue.prototype.$lifecycle  = process.env.VUE_APP_LIFECYCLE
Vue.prototype.$version    = process.env.VUE_APP_VERSION

Vue.use(
  VueSocketIOExt,
  io(Vue.prototype.$appURL, {
    transports: ['websocket']
  }),
  { store }
)

require('video.js/dist/video-js.css')

require('vue-tour/dist/vue-tour.css')
Vue.use(VueTour)

VueMarkdown.props.anchorAttributes.default = () => ({
  target: '_blank',
  rel: 'noopener noreferrer nofollow'
})
Vue.component('vue-markdown', VueMarkdown)

smoothscroll.polyfill()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')