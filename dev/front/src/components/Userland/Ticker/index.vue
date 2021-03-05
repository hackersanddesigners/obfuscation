<template>
  <div 
    id="tickerContainer"
    :class="{
      peak: peak,
      hover: hover,
      visible: visible,
    }"

    @mouseover.stop="peak ? hover = true : null"
    @mouseout.stop="peak ? hover = false : null"
    @mouseup.stop="peak && hover ? visible = true : null"
  >
    <div class="ticker">
      <div 
        class="content"
        ref="smarq"
      >
        {{ content }}
      </div>
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
    'content'
  ],
  data() {
    return {
      peak: true,
      hover: false,
      visible: false
    }
  },
  computed: {
    location() { return this.$store.state.location },
  },
  watch: {
  },
  mounted() {
    let smarquee = new Smarquee({
      element: this.$refs.smarq,
      iterationCount: 'infinite',
    })
    smarquee.init()
  },
  methods: {


  }
}
</script>

<style scoped>
#tickerContainer {
  /* cursor: auto; */
  box-sizing: border-box;
  position: absolute;
  /* bottom: ; */
  left: 0;
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.534);
  /* box-shadow: inset 0 0 20px 0 rgba(0, 0, 0, 0.534); */
  overflow: hidden;
  z-index: 1;
  transition: all 0.4s ease;
  font-size: 24pt;
  color: rgb(255, 51, 51);
}
#tickerContainer.peak {
  bottom: -25px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.534);
  /* box-shadow: inset 0 0 50px 0 rgba(0, 0, 0, 0.534); */
}
#tickerContainer.hover {
  bottom: -10px;
  font-size: 32pt;
  box-shadow:  0 0 50px 0 rgba(0, 0, 0, 0.534);
  /* box-shadow: inset 0 0 30px 0 rgba(0, 0, 0, 0.534); */
}
.ticker {
  height: 100%;
  width: 100%;
  overflow: scroll;
}
.ticker .content {
  text-align: center;
  /* font-weight: lighter; */
}
</style>