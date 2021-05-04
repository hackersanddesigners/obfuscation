<template>
  <div :class="['pdfArt', artwork.Category ]">

    <a
      class="externalLink"
      target="_blank"
      :href="pdfURL"
    >
      <img
        :src="imgURL"
      />
    </a>

    <div class="controls">
      <a
        target="_blank"
        :href="pdfURL"
      >
        <h3 class="">↗</h3>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PdfArt',
  props: ['artwork'],
  computed: {
    pdfURL() { return this.$apiURL + this.artwork.File.url },
    imgURL() {
      return (
        this.artwork.Track ?
        this.$apiURL + this.artwork.Track.formats.small.url : null
      )
    },
  },

}
</script>

<style scoped>
.pdfArt a.externalLink,
.pdfArt {
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

.pdfArt a.externalLink,
.pdfArt img {
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

.pdfArt.SessionVideo img {
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
  max-width: calc(40 * var(--one));
  max-height: calc(40 * var(--one));
}
.pdfArt.Other img {
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
  max-width: calc(30 * var(--one));
  max-height: calc(30 * var(--one));
}
.pdfArt.Poster a.externalLink,
.pdfArt.Poster img {
  min-width: calc(10 * var(--one));
  min-height: calc(10 * var(--one));
  max-width: calc(15 * var(--one));
  max-height: calc(15 * var(--one));
}

.pdfArt .controls {
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
.pdfArt .controls a {
  flex-basis: 15%;
  cursor: pointer;
  text-decoration: none;
  text-align: right;
}

</style>