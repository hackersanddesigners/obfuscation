import Vue from 'vue'
import Axios from 'axios'
import VueMarkdown from '@adapttive/vue-markdown'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import smoothscroll from 'smoothscroll-polyfill'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$http = Axios
Vue.prototype.$apiURL = process.env.VUE_APP_API_URL
Vue.prototype.$publicPath = process.env.BASE_URL || '/'
// Vue.prototype.$env = 
//   window.location.host === "3rd.obfuscationworkshop.org" ?
//   'production' : 'development'

VueMarkdown.props.anchorAttributes.default = () => ({
  target: '_blank',
  rel: 'noopener noreferrer nofollow'
})

Vue.component('vue-markdown', VueMarkdown)

smoothscroll.polyfill()

Vue.use(
  VueSocketIOExt, 
  io('https://obfuscation.karls.computer'),
  { store }
)



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')