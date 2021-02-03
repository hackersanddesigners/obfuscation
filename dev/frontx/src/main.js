import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

import VueMarkdown from 'vue-markdown'

Vue.prototype.$http = Axios
Vue.prototype.$apiURL = process.env.VUE_APP_API_URL
Vue.prototype.$publicPath = '/'

Vue.config.productionTip = false

VueMarkdown.props.anchorAttributes.default = () => ({
  target: '_blank',
  rel: 'noopener noreferrer nofollow'
})

Vue.component('vue-markdown', VueMarkdown)


const socketConnection = SocketIO('https://io.karls.computer')
// const socketConnection = SocketIO('http://localhost:3090')

Vue.use(new VueSocketIO({
    connection: socketConnection,
  })
)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')