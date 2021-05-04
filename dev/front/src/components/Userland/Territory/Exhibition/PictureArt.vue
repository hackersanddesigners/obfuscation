<template>
  <div :class="['pictureArt', artwork.Category ]">

   <a
      class="externalLink"
      target="_blank"
      :href="imgURL"
    >
      <img
        :src="icoURL"
      />
    </a>

    <div class="controls">
      <a
        target="_blank"
        :href="imgURL"
      >
        <h3>↗</h3>
      </a>
    </div>

  </div>
</template>

<script>

export default {
  name: 'PictureArt',
  props: ['artwork'],
  computed: {
    imgURL() { return this.$apiURL + this.artwork.File.url },
    icoURL() {
        return (
        this.artwork.File.formats ?
        this.$apiURL + this.artwork.File.formats.small.url :
        this.imgURL
      )
    }
  },
}
</script>

<style scoped>
.pictureArt a.externalLink,
.pictureArt {
  box-sizing: border-box;
  position: relative;
  max-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
}

.pictureArt img {
  border-radius: inherit;
  box-sizing: border-box;
  position: relative;
  object-fit: cover;
  width: 100%;
  cursor: pointer;
  min-width: calc(10 * var(--one));
  min-height: calc(10 * var(--one));
  max-width: calc(40 * var(--one));
  max-height: calc(40 * var(--one));
}

.pictureArt.SessionVideo img {
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
  max-width: calc(40 * var(--one));
  max-height: calc(40 * var(--one));
}
.pictureArt.Other a.externalLink,
.pictureArt.Other img {
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
  max-width: calc(30 * var(--one));
  max-height: calc(30 * var(--one));
}
.pictureArt.Poster a.externalLink,
.pictureArt.Poster img {
  min-width: calc(10 * var(--one));
  min-height: calc(10 * var(--one));
  max-width: calc(15 * var(--one));
  max-height: calc(15 * var(--one));
}
.pictureArt .controls {
  box-sizing: border-box;
  position: absolute;
  bottom: calc(-2.5 * var(--one));
  width: 110%;
  padding: 0 calc(1 * var(--one));
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
}
.pictureArt .controls a {
  text-align: right;
  text-decoration: none;
  flex-basis: 15%;
  cursor: pointer;
}

</style>