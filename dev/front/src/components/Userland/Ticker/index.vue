<template>
  <div 
    id="tickerContainer"
    :class="{
      hover: hover,
    }"

    @mouseover.stop="hover = true"
    @mousemove.stop="handleMousemove($event)"
    @mouseout.stop="hover = false"
  >
    <div class="ticker">
      <div 
        class="content"
        ref="smarq"
        :style="{ transform: 'translateX(' + x + 'px)' }"
      >
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
// import Smarquee from 'smarquee'

export default {
  name: 'Ticker',
  components: {
  },
  props: [
    'phrase'
  ],
  data() {
    return {
      hover: false,
      x: 0,
    }
  },
  computed: {
    location() { return this.$store.state.location },
    content() {
      let content = ''
      for (let i = 0; i < 20; i++ ) {
        content = content + this.phrase + ' || '
      }
      return content
    }
  },
  watch: {
  },
  mounted() {

    // let smarquee = new Smarquee({
    //   element: this.$refs.smarq,
    //   iterationCount: 'infinite',
    //   onAnimationStart() { console.log('smarquee start') },
    //   onAnimationIterate() { console.log('smarquee loop') },
    //   onAnimationEnd() { console.log('smarquee stop') },
    // })
    // smarquee.init()
    
  },
  methods: {

    handleMousemove(e) {
      this.x = e.clientX
      console.log(this.x)
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
  /* box-shadow: inset 0 0 30px 0 rgba(0, 0, 0, 0.534); */
}
.ticker {
  cursor: none;
  position: absolute;
  left: -100vw;
  height: 100%;
  overflow: visible;
  word-break: keep-all;
}
.ticker .content {
  text-align: center;
  /* font-weight: lighter; */
}
</style>