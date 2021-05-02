<template>
  <div id="app" :class="{ mobile: isMobile }" >
    <Home :slug="slug" />
  </div>
</template>

<script>
import Home from './views/Home'

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

    console.log('*****************************************************')
    console.log(`* ENVIRONMENT : ${ this.$env }`)
    console.log(`* VERSION     : ${ localStorage.version }`)
    console.log(`* APP URL     : ${ this.$appURL }`)
    console.log(`* LIFECYCLE   : ${ this.$lifecycle }`)
    console.log('*****************************************************')


    // delete everything if local storage version is older than this
    // version. This is to prevent older users' data strutures from
    // conflicting with the most recent structure.

    if (localStorage.version != this.$version) {
      console.log('this version is outdated, clearing your storage.')

      localStorage.clear()
      localStorage.version = this.$version
    } 


    // get "slug"

    this.slug = window.location.pathname


    // check browser compatibility

    this.checkCompatibility()


    // mobile setters and listeners
  
    this.isMobile = this.checkIfMobile()
    if (this.isMobile) {
      this.$store.commit('setMobile', true)  
      this.$store.commit('setScale', 8)
      this.$store.commit('setWidthFactor', 3.4)
    }
    window.addEventListener('resize', () => {
      this.isMobile = this.checkIfMobile()
      this.$store.commit('setMobile', this.isMobile)  
      this.$store.commit('resize', {
        w: window.innerWidth,
        h: window.innerHeight,
      })
    })


    // prevent scroll restoration

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }


  },

  methods: {

    checkIfMobile: () => ( window.innerWidth < 750 ),

    checkCompatibility() {
      let 
        ua = navigator.userAgent,
        chrome = ua.indexOf("Chrome") > -1,
        firefox = ua.indexOf("Firefox") > -1,
        safari = ua.indexOf("Safari") < -1
      
      if (chrome && safari) {
        safari = false
      }

      this.$store.commit('setCompatibility', (chrome || firefox))
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
  src: url('./assets/fonts/jet/bold.ttf');
  font-weight: bold;
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
  --half-white: rgba(255, 255, 255, 0.5);


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


section img {
  max-width: 100%;
}
section a, 
section a:hover, 
section a:active, 
section a:visited {
  color: blue;
  text-decoration: underline;
}

h1 {
  font-size: 25pt;
  font-weight: normal;
}

.zxx {
  font-family: 'zxx-noise';
}

h2 {
  font-weight: normal;
}

h3,
time,
h4 { 
  font-size: 15pt;
  font-weight: normal;
}
pre, code {
  font-family: 'jet';
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
  line-height: 1.2;
}
#app.mobile {
  --ui-font-size: 16pt;
  font-size: 14pt;
}

</style>
