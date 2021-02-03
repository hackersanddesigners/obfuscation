import Vue from 'vue'
import Axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import VueMarkdown from 'vue-markdown'
// import smoothscroll from 'smoothscroll-polyfill'

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

// smoothscroll.polyfill()


const socketConnection = SocketIO('https://io.karls.computer')

Vue.use(new VueSocketIO({
    connection: socketConnection,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },    
  })
)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')