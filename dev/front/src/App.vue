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
      return window.innerWidth < 750
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




}

html, body {
  margin: 0; padding: 0;
  height: 100%; width: 100%;
  overflow: hidden;
}

#app {
  height: 100%; width: 100%;
  font-family: 'auth', Helvetica, Arial, sans-serif;
  font-size: 9pt;
  overflow: hidden;

  --disconnected: rgb(119, 119, 119);

  /* --ui-border-radius: 4px 7.5px 4px 7.5px; */
  --ui-padding: 0.5vh;
  --ui-back: white;
  --ui-front: black;
  --ui-font-size: 10pt;
  --ui-font-size: 20pt;
  --ui-border: 1px solid black;
  --ui-border-radius: 7.5px;
  --ui-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.199);

}

a, a:hover, a:active, a:visited {
  color: blue;
}

h1 {
  font-size: 25pt;
  font-family: 'zxx-noise';
  font-weight: normal;
}

h2 {
  font-weight: normal;
}

h3,
h4 { 
  font-size: 15pt;
  font-weight: normal;
}
.ui {
  box-sizing: border-box;
  position: relative;
  padding: var(--ui-padding);
  background: var(--ui-back);
  color: var(--ui-front);
  font-size: var(--ui-font-size);
  border: var(--ui-border);
  border-radius: var(--ui-border-radius);
  box-shadow: var(--ui-box-shadow);
  transition: all 0.2s ease;
}
#app.mobile {
  --ui-font-size: 14pt;
  font-size: 14pt;
}

</style>
