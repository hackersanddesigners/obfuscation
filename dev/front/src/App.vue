<template>
  <div id="app">
    <Home 
      :class="{ 
        mobile: isMobile,
      }" 
      :slug="slug"
    />
  </div>
</template>

<script>
import { EventBus } from './EventBus.js'
import smoothscroll from 'smoothscroll-polyfill'
import Home from './views/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  },
  data() {
    return {
      isMobile: Boolean,
      slug: window.location.pathname.replace(this.$publicPath, ''),
    }
  },
  created() {
    this.CheckForMobile()
    window.addEventListener('resize', this.CheckForMobile)
    smoothscroll.polyfill()
  },
  methods: {
    CheckForMobile() {
      if (window.innerWidth <= 760) {
        EventBus.$root.isMobile = true;
        this.isMobile = true
      } else { 
        EventBus.$root.isMobile = false;
        this.isMobile = false
      }
    },
  }
}
</script>

<style>
:root {
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  width: 100vw;
}
a, a:hover, a:active, a:visited {
}
</style>
