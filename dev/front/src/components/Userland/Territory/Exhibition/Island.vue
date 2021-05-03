<template>
  <div class="island" :class="type">

    <div class="body">
      <VideoArt
        v-if="type === 'video' && videoUrl"
        :artwork="artwork"
        :videoUrl="videoUrl"
      />
      <VideoArtLoading
        v-else-if="type === 'video'"
        :artwork="artwork"
      />
      <PdfArt
        v-else-if="type === 'pdf'"
        :artwork="artwork"
      />
      <PictureArt
        v-else-if="type === 'image'"
        :artwork="artwork"
      />
    </div>
    <div class="header">
      <h1
        class="title"
        :class="{ zxx: $store.state.desiresTexture }"
        @mousedown.stop="$emit('moreInfo', `/exhibition/${artwork.slug}`)"
      >
        {{ artwork.Name }}
      </h1>
      <h3 class="authors">
        <SemanticList
          v-if="authors && authors.length > 0"
          :list="authors"
          collection="contributors"
        />
      </h3>
    </div>


  </div>
</template>

<script>
import SemanticList from '../../SemanticList'
import VideoArt from './VideoArt'
import VideoArtLoading from './VideoArtLoading'
import PdfArt from './PdfArt'
import PictureArt from './PictureArt'

export default {
  name: 'Island',
  components: {
    SemanticList,
    VideoArt,
    VideoArtLoading,
    PdfArt,
    PictureArt,
  },
  props: [
    'artwork',
  ],
  data() {
    return {
      videoUrl: null
    }
  },
  computed: {
    type() { return (
        this.artwork.File ?
          this.artwork.File.mime.includes('video') ? 'video' :
          this.artwork.File.mime.includes('image') ? 'image' :
          this.artwork.File.mime.includes('pdf') ? 'pdf' : null : null
      )
    },
    authors() { return this.artwork.authors },
  },
  created() {
    console.log(this.artwork.File.url)
    if (this.type == 'video') {
      setTimeout(() => {
        this.videoUrl = this.$apiURL + this.artwork.File.url
      }, 100 * this.artwork.id)
    }
  },
  methods: {
  }

}
</script>

<style scoped>
.island {
  position: absolute;
  min-width: calc(10 * var(--one));
  min-height: calc(10 * var(--one));
  max-width: calc(40 * var(--one));
  max-height: calc(40 * var(--one));
  margin: calc(6 * var(--one));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow:
      0 0
      calc(1 * var(--one))
      calc(0.5 * var(--one))
    rgba(0, 0, 0, 0.267);;

}

.island .body {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  border-radius: inherit;
}

.island .header {
  box-sizing: border-box;
  position: absolute;
  bottom: calc(-6 * var(--one));
  width: 100%;
  min-width: calc(40 * var(--one));
  height: 0;
  padding:
    calc(2 * var(--one))
    calc(2 * var(--one))
  ;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.island .header h1 {
  font-size: calc(3 * var(--one));
  font-weight: normal;
  text-align: center;
  cursor: pointer;
  /* border-bottom: 1px solid; */
}

.island .header h3 {
  margin-top: calc(1 * var(--one));
}

.island .header .title:hover {
  text-decoration: underline;
}

</style>