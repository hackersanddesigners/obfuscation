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
  --ui-border: 1px solid grey;
  --ui-border-radius: 7.5px;
  --ui-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.199);

  --island-curve: 10vh;
  --island-shadow: inset 0 0 1vh 0.5vh rgba(0, 0, 0, 0.267);
  --small-island-curve: 5vh;
  --white-glass: rgba(0, 0, 0, 0.055);
  --island-back:
    url("assets/textures/1.png") repeat 100px
  , url("assets/textures/2.png") repeat 100px
  ;
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

h3 { 
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

.island {
  position: relative;
  box-sizing: border-box;
  padding: 1vh;
  margin: auto;
  background-color: var(--white-glass);
  box-shadow: var(--island-shadow);
  border-top-right-radius: var(--island-curve);
  border-bottom-left-radius: var(--island-curve);
  border-top-left-radius: var(--small-island-curve);
  border-bottom-right-radius: var(--small-island-curve);
  transition: all 0.2s ease;
  z-index: 1;
}

.island::before {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  content: '';
  background: var(--island-back);
  border-top-left-radius: inherit;
  border-bottom-right-radius: inherit;
  border-top-right-radius:inherit;
  border-bottom-left-radius: inherit;
  overflow: hidden;
  opacity: 0.5;
}

.island:hover {
  background-color: rgba(0, 0, 0, 0.13);
  box-shadow: inset 0 0 2vh 0.5vh rgba(0, 0, 0, 0.267);
  /* border-top-left-radius: 0px; */
}

.island .header {
  display: flex;
  align-items: center;
  font-size: calc(3pt * var(--scale));
}
.island .header h1 { 
  font-size: inherit;
  margin-top: 0px;
  cursor: pointer;
}
.island .header .title:hover {
  text-decoration: underline;
}
.island .header .more {
  margin-left: auto;
  cursor: pointer;
  font-size: calc(3pt * var(--scale));
  /* width: 35px;
  text-align: center;
  border: 1px solid;
  border-radius: 20px; */
}

#app.mobile {
  --ui-font-size: 12pt;
  font-size: 12pt;
}

</style>
