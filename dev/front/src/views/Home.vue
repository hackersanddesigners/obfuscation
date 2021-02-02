<template>
  <div 
    id="home" 
    :class="{ 
      hidden: !loaded
    }"
  >
    <Mainland 
      v-if="!blocked"
      :wantsToView="wantsToView"
      @blocked="blocked=true"
    />
    <Nomansland
      v-else
    />
  </div>
</template>

<script>
import { EventBus } from '../EventBus.js'

import Mainland from '../components/Userland/Mainland'
import Nomansland from '../components/Userland/Nomansland'

export default {
  name: 'Home',
  components: {
    Mainland,
    Nomansland
  },
  props: [
    'slug'
  ],
  data() {
    return {
      loaded: false,
      status: 'loading...',
      isMobile: EventBus.$root.isMobile ? true : false,
      wantsToView: null,
      blocked: false,
    }
  },
  created() {
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
      const slug = to.fullPath.replace(this.$publicPath, '')
      this.handleRouting(slug)
    })
  },
  methods: {
    handleRouting(slug) {
      let type, name
      if (slug.startsWith("~")) {
        type = 'user'
      } else if (slug.startsWith("#")) {
        type = 'territory'
      } else {
        console.log('not found')
      }
      name = slug.slice(1)
      if (name) {
        console.log(name)
      } else {
        console.log('no username provided')
      }
      this.wantsToView = {
        type: type,
        name: name
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
  background: lightgray;
}
</style>
