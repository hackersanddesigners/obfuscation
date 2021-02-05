<template>
  <div id="app">
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
      slug: window.location.pathname.replace(this.$publicPath, ''),
    }
  },

  created() {


    // window dimension are important for positioning of everything.
    
    window.addEventListener('resize', () => {
      this.$store.commit('resize', {
        w: window.innerWidth,
        h: window.innerHeight,
      })
    })

  },

  methods: {
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
  font-size: 10pt;
}
a, a:hover, a:active, a:visited {
  color: blue;
}
</style>
