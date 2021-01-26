<template>
  <div 
    id="home" 
    :class="{ 
      hidden: !loaded
    }"
  >
    <Userland 
      :wantsToView="wantsToView"
    />
  </div>
</template>

<script>
import { EventBus } from '../EventBus.js'
import smoothscroll from 'smoothscroll-polyfill'

import Userland from '../components/Userland'

export default {
  name: 'Home',
  components: {
    Userland
  },
  props: [
    'slug'
  ],
  data() {
    return {
      loaded: false,
      status: 'loading...',
      isMobile: EventBus.$root.isMobile ? true : false,
      wantsToView: null
    }
  },
  created() {
    if (EventBus.$root.isMobile) this.isMobile = true
    
    smoothscroll.polyfill()

    this.$http.get(this.$apiURL + '/hosts')
      .then((response) => { 
        this.hosts = response.data
        this.loaded = true
        this.msg = 'ready.'
      })
      .catch((error) => { 
        console.log(error)
        this.msg = 'there is an error :( contact karl <bonjour@moubarak.eu>'
      }) 

    if (this.slug) {
      this.handleRouting(this.slug)
    }
  },
  mounted() {
    this.$router.afterEach((to) => { 
      const slug = to.path.replace(this.$publicPath, '')
      this.handleRouting(slug)
    })
  },
  methods: {
    handleRouting(slug) {
      let type, name
      if (slug.startsWith("~")) {
        type = 'user'
        name = slug.slice(1)
        if (name) {
          console.log(name)
        } else {
          console.log('no username provided')
        }
      } else {
        console.log('not a user')
      }
      this.wantsToView = {
        type: type,
        name: name
      }
      // this.$refs.Userland.route(type, name)
    },
  }
}
</script>

<style>
#home {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  background: lightgray;
}
</style>
