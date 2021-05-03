<template>
  <div :class="['videoArt', artwork.Category ]">
    <div class="placeholder"></div>
    <div class="controls">
      <h3 class="play">play</h3>
      <h3 class="timeLeft">loading</h3>
      <h3 class="fullscreen">⤢</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoArtPlaholder',
  props: [ 'artwork'],

}
</script>

<style scoped>
.videoArt {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  overflow: visible;
}
.videoArt .placeholder {
  border-radius: inherit;
  /* box-sizing: border-box; */
  /* position: relative; */
  /* object-fit: cover; */
  /* width: 100%; */
  min-width: calc(40 * var(--one));
  min-height: calc(25 * var(--one));
  max-width: calc(40 * var(--one));
  max-height: calc(40 * var(--one));
}

.videoArt.SessionVideo .placeholder {
  min-width: calc(40 * var(--one));
  min-height: calc(25 * var(--one));
  max-width: calc(40 * var(--one));
  max-height: calc(40 * var(--one));
}
.videoArt.Other .placeholder {
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
  max-width: calc(30 * var(--one));
  max-height: calc(30 * var(--one));
}
.videoArt.Poster .placeholder {
  min-width: calc(10 * var(--one));
  min-height: calc(10 * var(--one));
  max-width: calc(15 * var(--one));
  max-height: calc(15 * var(--one));
}



.videoArt .controls {
  box-sizing: border-box;
  position: absolute;
  bottom: calc(-2.5 * var(--one));
  width: 110%;
  padding: 0 calc(1 * var(--one));
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.videoArt .controls h3 {
  flex-basis: 15%;
  cursor: pointer;
  /* text-align: center; */
}
.videoArt .controls h3.play {
  text-align: left;
}
.videoArt .controls h3.timeLeft {
  flex-basis: 35%;
  font-size: calc(1.5 * var(--one));
  padding-top: calc(0.4 * var(--one));
  text-align: center;
  cursor: unset;
}


</style>