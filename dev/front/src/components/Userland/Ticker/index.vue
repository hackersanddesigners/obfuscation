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
      <div class="content">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ticker',
  components: {
  },
  props: [
    'wantsToView'
  ],
  data() {
    return {
      content: null,
      type: null,

      peak: false,
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
  },
  methods: {


  }
}
</script>

<style scoped>
.tickerContainer {
  cursor: auto;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: white;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.534);
  /* box-shadow: inset 0 0 20px 0 rgba(0, 0, 0, 0.534); */
  overflow: hidden;
  z-index: 2;
  transition: all 0.4s ease;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.tickerContainer.peak {
  cursor: pointer;
  right: calc(20px - 40%);
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.534);
  /* box-shadow: inset 0 0 50px 0 rgba(0, 0, 0, 0.534); */
}
.tickerContainer.hover {
  cursor: pointer;
  right: calc(100px - 40%);
  box-shadow:  0 0 30px 0 rgba(0, 0, 0, 0.534);
  /* box-shadow: inset 0 0 30px 0 rgba(0, 0, 0, 0.534); */
}
.tickerContainer.visible {
  right: 0px;
}
.ticker {
  height: 100%;
  width: 100%;
  overflow: scroll;
}
.ticker .body {
  font-size: calc(2.5pt * var(--scale));
}
</style>