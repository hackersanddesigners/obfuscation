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
      slug: null,
    }
  },

  created() {

    // get "slug", prefer a path over a hash

    const 
      path = window.location.pathname.replace(this.$publicPath, ''),
      hash = window.location.hash

    this.slug = path || hash

    // window dimensions: important for positioning!

    window.addEventListener('resize', () => {
      this.$store.commit('resize', {
        w: window.innerWidth,
        h: window.innerHeight,
      })
    })

  },

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
  --disconnected: rgb(156, 156, 156);
  --ui-border-radius: 7.5px;
  --ui-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.199);
  --island-curve: 100px;
  --island-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.267);
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
  font-family: Helvetica, Arial, sans-serif;
  font-size: 9pt;
}
a, a:hover, a:active, a:visited {
  color: blue;
}
</style>
