<template>
  <div
    id="tickerContainer"
    :class="{ hover: hover }"
    @mouseover.stop="hover = true"
    @mousemove.stop="handleMousemove($event)"
    @mouseout.stop="hover = false"
    @mouseup.stop="ticker.link ? $router.push(ticker.link) : null"
  >
    <div
      id="ticker"
      ref="smarq"
      :style="{ transform: 'translateX(' + x + 'px)' }"
    >
      <vue-markdown
        class="content"
        inline
        :source="content"
      >
      </vue-markdown>
    </div>
  </div>
</template>

<script>
import Smarquee from 'smarquee'
import { mapState } from 'vuex'

export default {
  name: 'Ticker',
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
    ...mapState('territories', [
      'currentLiveSession'
    ]),
    ticker() { return (
      this.currentLiveSession ? {
        phrase: `Watch the livestream: "${this.currentLiveSession.Title}".`,
        link: '/livestream'
      } : this.$store.state.territories.ticker
    )},
    content() {
      let content = ''
      for (let i = 0; i < 20; i++ ) {
        content = content + this.ticker.phrase + ' '
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
    if (this.marquee) {
      this.smarquee = new Smarquee({
        element: this.$refs.smarq,
        iterationCount: 'infinite',
      })
      this.smarquee.init()
      this.handleSmarquee()
    }
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
  overflow: hidden;
  color: var(--ui-front);
  background: var(--ui-back);
  z-index: 2;
  transition: all 0.4s ease;
  font-size: 24pt;
  bottom: -25px;
  border-top: var(--ui-border);
  box-shadow: var(--ui-box-shadow);
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
  /* overflow: visible; */
  word-break: keep-all;
}
#ticker .content {
  text-align: center;
  /* overflow: vi≥sible; */
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