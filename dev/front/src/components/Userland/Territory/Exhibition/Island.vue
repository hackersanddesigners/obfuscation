<template>
  <div class="island">
    
    <div class="body">
      <VideoArt
        v-if="type === 'video'"
        :artwork="artwork"
      />
      <PdfArt
        v-else-if="type === 'pdf'"
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
import PdfArt from './PdfArt'
import VideoArt from './VideoArt'

export default {
  name: 'Island',
  components: {
    SemanticList,
    VideoArt,
    PdfArt
  },
  props: [
    'artwork'
  ],
  data() {
    return {
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
    authors() { return this.artwork.authors }
    
  },
  created() {
    console.log(this.type)
  },
  methods: {
  }

}
</script>

<style scoped>
.island {
  position: absolute;
  min-width: calc(20 * var(--one));
  min-height: calc(20 * var(--one));
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

.island .header {
  box-sizing: border-box;
  position: absolute;
  bottom: calc(-6 * var(--one));
  width: 100%;
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

.island .header h3 a,
.island .header h3 a:visited,
.island .header h3 a:hover,
.island .header h3 a:active {
  /* color: black !important; */
  /* text-decoration: underline; */
}

.island .header .title:hover {
  text-decoration: underline;
}


.island .body {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  border-radius: inherit;

}

</style>