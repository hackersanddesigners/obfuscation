import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueMarkdown from 'vue-markdown'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

const socketConnection = SocketIO('https://io.karls.computer');
// const socketConnection = SocketIO('http://localhost:3090');

Vue.use(new VueSocketIO({
    debug: true,
    connection: socketConnection,
  })
)

VueMarkdown.props.anchorAttributes.default = () => ({
  target: '_blank',
  rel: 'noopener noreferrer nofollow'
})

Vue.component('vue-markdown', VueMarkdown)

Vue.prototype.$http = Axios
Vue.prototype.$apiURL = process.env.VUE_APP_API_URL

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')