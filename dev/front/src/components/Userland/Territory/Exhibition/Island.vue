<template>
  <div 
    :class="[
      'island',
      { active: active }
    ]"
  >
    
    <!-- <div class="header">
      <h1
        class="title"
        @mousedown.stop="$router.push(`/exhibition/${ section.slug }`)"
      > 
        {{ section.Name }} 
      </h1>
      <h1
        class="play"
        @click.stop="play()"
      >
        {{ active ? 'pause' : 'play' }}
      </h1>
    </div>
    <div class="body">
      <video 
        ref="player"
        :controls="active"
        :loop="active"
        @mouseover.stop
        @mouseleave.stop
      >
        <source :src="src" type="video/mp4">
      </video>
    </div> -->


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
  width: calc(4vw * var(--scale));
  height: calc(4vh * var(--scale));
  /* min-width: 15%; */
  /* height; */
  margin: calc(6 * var(--one));
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
}

.island .header {
  box-sizing: border-box;
  padding: 
    calc(2 * var(--one)) 
    calc(4 * var(--one))
  ;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(2 * var(--one));
  z-index: 1;
  background: rgba(255, 255, 255, 0.315);
  border-radius: inherit;
}
.island .header h1 { 
  font-size: calc(3 * var(--one));
  font-family: 'zxx-noise';
  font-weight: normal;
  text-align: center;
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
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}


.island.active .header {
  height: 150%;
  top: -25%;
  background-color: transparent;
  justify-content: space-between;
}
</style>