import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueMarkdown from 'vue-markdown'

VueMarkdown.props.anchorAttributes.default = () => ({
  target: '_blank',
  rel: 'noopener noreferrer nofollow'
})

Vue.component('vue-markdown', VueMarkdown)

Vue.prototype.$http = Axios
Vue.prototype.$apiURL = process.env.API_URL

// Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')