<template>
  <div 
    id="home" 
    :class="{ 
      hidden: !loaded
    }"
  >
    <Userland />
  </div>
</template>

<script>
import { EventBus } from '../EventBus.js'
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

    if (this.slug) {
      this.handleRouting(this.slug)
    }
  },
  mounted() {
    this.$router.afterEach((to) => { 
      this.slug = to.path.replace(this.$publicPath, '')
      this.handleRouting(this.slug)
    })
  },
  methods: {
    handleRouting(slug) {
      if (slug) {
        console.log(slug)
      }
    },
  }
}
</script>

<style>
#home {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
</style>
