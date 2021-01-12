<template>
  <div 
    id="home" 
    :class="{ 
      hidden: !loaded
    }"
  >
  <h1>obfuscated platframe</h1>
  <IListenToSockets />
  </div>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill'
import { EventBus } from '../EventBus.js'
import IListenToSockets from '../components/IListenToSockets'

export default {
  name: 'Home',
  components: {
    IListenToSockets
  },
  data() {
    return {
      loaded: false,
      msg: 'loading...',
      isMobile: EventBus.$root.isMobile ? true : false,
      sessions: []
    }
  },
  created() {
    if (EventBus.$root.isMobile) this.isMobile = true

    this.$http.get(this.$apiURL + '/sessions')
      .then((response) => { 
        this.sessions = response.data
        this.loaded = true
        this.msg = 'ready.'
      })
      .catch((error) => { 
        console.log(error)
        this.msg = 'there is an error :( contact karl <bonjour@moubarak.eu>'
      }) 
  },
  mounted() {
    smoothscroll.polyfill()
    this.$router.afterEach((to) => { 
      let slug = to.path.split('/')[1]
      this.handleRouting(slug)
    })
  },
  methods: {
    handleRouting(slug) {
      this.stopEverything()
      if (slug) {
        this.slug = slug
      }
    },
  }
}
</script>

<style>
#home {
  box-sizing: border-box;
  /* height: 100%; */
  /* width: 100%; */
}
</style>
