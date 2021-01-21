import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VDragged from 'v-dragged'

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

import VueMarkdown from 'vue-markdown'

import { LMap, LTileLayer, LMarker, LGridLayer } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-grid-layer', LGridLayer)
Vue.component('l-marker', LMarker)

const socketConnection = SocketIO('https://io.karls.computer');
// const socketConnection = SocketIO('http://localhost:3090');

Vue.use(VDragged) 

Vue.use(new VueSocketIO({
    // debug: true,
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