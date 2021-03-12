<template>
  <div 
    id="tickerContainer"
    :class="{
      hover: hover,
    }"

    @mouseover.stop="hover = true"
    @mousemove.stop="handleMousemove($event)"
    @mouseout.stop="hover = false"
    @mouseup.stop="href ? $router.push(href) : null"
  >
    <div 
      id="ticker"
      ref="smarq"
      :style="{ transform: 'translateX(' + x + 'px)' }"
    >
      <vue-markdown class="content" inline>
        {{ content }}
      </vue-markdown>
    </div>
  </div>
</template>

<script>
import Smarquee from 'smarquee'

export default {
  name: 'Ticker',
  components: {
  },
  props: [
    'marquee'
  ],
  data() {
    return {
      hover: false,
      x: 0,
    }
  },
  computed: {
    location() { return this.$store.state.location },
    phrase() { return this.$store.state.ticker.phrase },
    href() { return this.$store.state.ticker.link },
    content() {
      let content = ''
      for (let i = 0; i < 20; i++ ) {
        content = content + this.phrase + ' || '
      }
      return content
    }
  },
  watch: {
    marquee() {
      this.handleSmarquee()
    }
  },
  mounted() {

    this.smarquee = new Smarquee({
      element: this.$refs.smarq,
      iterationCount: 'infinite',
      onAnimationStart() { console.log('smarquee start') },
      onAnimationIterate() { console.log('smarquee loop') },
      onAnimationEnd() { console.log('smarquee stop') },
    })
    this.smarquee.init()
    this.handleSmarquee()

  },
  methods: {

    handleMousemove(e) {
      if (!this.marquee) {
        this.x = e.clientX
      }
    },

    handleSmarquee() {
      if (this.marquee) {
        this.smarquee.play()
      } else {
        this.smarquee.pause()
      }
    }

  }
}
</script>

<style scoped>
#tickerContainer {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  width: 100%;
  height: 50px;
  color: var(--ui-front);
  background: var(--ui-back);
  z-index: 2;
  transition: all 0.4s ease;
  font-size: 24pt;
  bottom: -25px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.534);
}
#tickerContainer.hover {
  bottom: -10px;
  font-size: 32pt;
  box-shadow:  0 0 50px 0 rgba(0, 0, 0, 0.534);
}
#ticker {
  cursor: none;
  position: absolute;
  left: -100vw;
  height: 100%;
  overflow: visible;
  word-break: keep-all;
}
#ticker .content {
  text-align: center;
  overflow: visible;
}

#ticker .content a,
#ticker .content a:active,
#ticker .content a:hover,
#ticker .content a:visited {
  color: var(--ui-front);
  text-decoration: none;
}

.mobile #tickerContainer.hover {
  bottom: unset;
  font-size: unset;
  box-shadow:  unset;
}
</style>