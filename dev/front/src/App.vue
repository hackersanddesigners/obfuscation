<template>
  <div 
    id="app"
    :class="{ mobile: isMobile }"    
  >
    <Home 
      :slug="slug"
    />
  </div>
</template>

<script>
import Home from './views/Home.vue'

export default {

  name: 'App',

  components: {
    Home
  },

  data() {
    return {
      slug: null,
      isMobile: null,
    }
  },

  created() {
  
    this.isMobile = this.checkIfMobile()
    if (this.isMobile) {
      this.$store.commit('makeMobile')  
    }

    // get "slug"

    this.slug = window.location.pathname


    // window dimensions: important for positioning!

    window.addEventListener('resize', () => {
      this.$store.commit('resize', {
        w: window.innerWidth,
        h: window.innerHeight,
      })
      this.isMobile = this.checkIfMobile()
      if (this.isMobile) {
        this.$store.commit('makeMobile')  
      } else {
        this.$store.commit('makeDesktop')  
      }
    })

  },

  methods: {

    checkIfMobile() {
      return window.innerWidth < 700
    },

  }

}
</script>

<style>

@font-face {
  font-family: 'zxx-false';
  src: url('./assets/fonts/zxx_false-webfont.ttf');
  font-weight: normal;
}
@font-face {
  font-family: 'zxx-noise';
  src: url('./assets/fonts/zxx_noise-webfont.ttf');
  font-weight: normal;
}
@font-face {
  font-family: 'terminal';
  src: url('./assets/fonts/terminal-grotesque.ttf');
  font-weight: normal;
}
@font-face {
  font-family: 'auth';
  src: url('./assets/fonts/auth.woff');
  font-weight: normal;
}


@font-face {
  font-family: 'jet';
  src: url('./assets/fonts/jet/mono.ttf');
  font-weight: normal;
}
@font-face {
  font-family: 'jet';
  src: url('./assets/fonts/jet/medium.ttf');
  font-weight: medium;
}
@font-face {
  font-family: 'jet';
  src: url('./assets/fonts/jet/bold.ttf');
  font-weight: bold;
}

:root {
  --disconnected: rgb(119, 119, 119);

  --ui-border-radius: 7.5px;
  /* --ui-border-radius: 4px 7.5px 4px 7.5px; */
  --ui-back: white;
  --ui-front: black;
  --ui-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.199);
  --ui-border: 1px solid grey;

  --island-curve: 10vh;
  --island-shadow: inset 0 0 1vh 0.5vh rgba(0, 0, 0, 0.267);
  --small-island-curve: 5vh;
  --white-glass: rgba(0, 0, 0, 0.055);
  --island-back:
    url("assets/textures/1.png") repeat 100px
  , url("assets/textures/2.png") repeat 100px
  ;



}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  width: 100%;
  /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
  font-family: 'auth', Helvetica, Arial, sans-serif;
  font-size: 9pt;
  overflow: hidden;
}
a, a:hover, a:active, a:visited {
  color: blue;
}
h1 {
  font-weight: normal;
}


#app.mobile {
  font-size: 12pt;
}

</style>
