<template>
  <div id="app">
    <Home 
      :class="{ 
        mobile: isMobile,
      }" 
    />
  </div>
</template>

<script>
import Home from './views/Home.vue'
import { EventBus } from './EventBus.js'

export default {
  name: 'App',
  components: {
    Home
  },
  data() {
    return {
      isMobile: Boolean
    }
  },
  created() {
    this.CheckForMobile()
    window.addEventListener('resize', this.CheckForMobile)
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
  --palest-yellow: rgb(248, 247, 242);
  --paler-yellow: rgb(245, 214, 205);
  --palest-yellow: rgb(226, 247, 206);
  --dark-green: #02160f;
  --dark-green: #525252;
  --active: darkblue;
  --active: rgb(5, 5, 196);
}

html, body {
  /* margin: 0; */
  /* padding: 0; */
  height: 100%;
  /* background: linear-gradient(0deg, var(--paler-yellow) 0%, var(--palest-yellow) 50%, var(--palest-yellow) 100%); */
  overflow: hidden;
}
#app {
  font-size: 9pt;
  line-height: 1.1;
  height: 100%;
  width: 100vw;
  color: var(--dark-green);
}
a, a:hover, a:active, a:visited {
  color: var(--font-color);
  cursor: pointer;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
