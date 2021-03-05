<template>
  <div 
    :class="[
      'island',
      { active: active }
    ]"
    :style="{
      height: `${ 40 }vh`,
      width: `${ 40 }vw`,
    }"
  >
    
    <!-- <div class="header"> -->
      <!-- <h1
        class="title"
        @mousedown.stop="$router.push(`/videos/${ section.slug }`)"
      > 
        {{ section.Name }} 
      </h1>
      <h1
        class="play"
        @click.stop="play()"
      >
        {{ active ? 'pause' : 'play' }}
      </h1> -->
    <!-- </div> -->
    <div class="body">
      <!-- <video 
        ref="player"
        :controls="active"
        :loop="active"
        @mouseover.stop
        @mouseleave.stop
      >
        <source :src="src" type="video/mp4">
      </video> -->
    </div>


  </div>
</template>

<script>
export default {
  name: 'Island',
  components: {
  },
  props: [
    'section'
  ],
  data() {
    return {
      active: false
    }
  },
  computed: {
    src() {
      return this.$apiURL + this.section.File.url
    }
  },
  created() {
  },
  methods: {
    play() {
      if (!this.active) {
        this.$refs.player.play()
        this.active = true
      } else {
        this.$refs.player.pause()
        this.active = false
      
      }
    }

  }

}
</script>

<style scoped>
.island {
  box-sizing: border-box;
  position: relative;
  /* flex: 0 0; */
  /* flex-shrink: 0; */
  /* flex-grow: 1; */
  /* width: auto; */
  /* margin-bottom: 10vh;
  margin-right: 10vh; */
  margin: 10vh;
  padding: 0;


  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
/* 
  background-color: var(--white-glass);
  box-shadow: var(--island-shadow);
  border-top-left-radius: var(--small-island-curve);
  border-bottom-right-radius: var(--small-island-curve); */
  /* border-radius: var(--small-island-curve); */
  /* transition: border-radius 0.2s ease; */
}

.island:first-of-type {
  /* margin-left: 10vw; */
}
.island:hover {
  /* border-top-left-radius: 0px; */
}

.island .header {
  box-sizing: border-box;
  padding: 2vh 3vw;
  position: absolute;
  height: 100%;
  width: 100%;

  /* flex: 1; */
  /* margin: auto; */
  /* max-width: 30vw; */
  /* margin-bottom: unset; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(3pt * var(--scale));
  z-index: 1;
  background: rgba(255, 255, 255, 0.315);
  border-radius: inherit;
  /* transition: all 0.2s ease; */
}
.island .header h1 { 
  font-size: calc(5pt * var(--scale));
  font-family: 'zxx-noise';
  font-weight: normal;
  text-align: center;
  /* word-break: break-all; */
  cursor: pointer;
}

.island .header .title:hover {
  text-decoration: underline;
}
.island .header .play { 
  font-family: sans-serif;
}
.island .header .play:hover {
  text-decoration: underline;
}

.island .body {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  border-radius: inherit;
}

.island .body video {
  /* width: 100%; */

  height: 100%;
  max-width: 100%;
  max-height: 100%;
  /* filter: invert(100%); */
}


.island.active .header {
  height: 150%;
  top: -25%;
  background-color: transparent;
  justify-content: space-between;
}
</style>