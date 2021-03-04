import Vue from 'vue'
import Axios from 'axios'
import VueMarkdown from 'vue-markdown'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import smoothscroll from 'smoothscroll-polyfill'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$http = Axios
Vue.prototype.$apiURL = process.env.VUE_APP_API_URL
Vue.prototype.$publicPath = '/'

VueMarkdown.props.anchorAttributes.default = () => ({
  target: '_blank',
  rel: 'noopener noreferrer nofollow'
})

Vue.component('vue-markdown', VueMarkdown)

smoothscroll.polyfill()


// const socket = io('https://io.karls.computer')

// Vue.use(VueSocketIOExt, socket, { store })


// const url = 'https://io.karls.computer'
// const url = 'localhost:3090'

// const url = 
//   window.location.hostname == 'localhost' ?
//   'http://localhost:3090/' : 'https://obfuscation.karls.computer'

const url = 'https://obfuscation.karls.computer'

console.log(url)

Vue.use(
  VueSocketIOExt, 
  io(url),
  { store }
)



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')