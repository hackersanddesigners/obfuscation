<template>
  <div 
    id="home" 
    :class="{ 
      hidden: !loaded
    }"
  >
    <h1>obfuscated platframe</h1>
    <!-- <IListenToSockets /> -->
    <!-- <Register
      v-if="!me" 
      @registered="saveMe"
    />
    <User
      v-if="me"
      :user="me"
    />
    <User 
      v-for="user in users"
      ref="users"
      :key="user.name"
      :user="user" 
    /> -->
    <Userland />
  </div>
</template>

<script>
import { EventBus } from '../EventBus.js'
// import IListenToSockets from '../components/IListenToSockets'
// import User from '../components/User'
// import Register from '../components/Register'
import Userland from '../components/Userland'

export default {
  name: 'Home',
  components: {
    // IListenToSockets,
    // User,
    // Register
    Userland
  },
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
  },
  mounted() {
    this.$router.afterEach((to) => { 
      this.slug = to.path.split('/')[1]
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
