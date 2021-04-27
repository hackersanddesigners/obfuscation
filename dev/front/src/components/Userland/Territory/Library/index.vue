<template>
  <div>
    <div class="posterListContainer">
      <div class="nonposters">
        <Island
          v-for="section in nonposters"
          :id="section.slug + 'Island'"
          :ref="section.slug"
          :key="section.slug"
          :section="section"
        />
      </div>
      <div class="posters">
        <Island
          v-for="section in posters"
          :id="section.slug + 'Island'"
          :ref="section.slug"
          :key="section.slug"
          :section="section"
        />
      </div>
    </div>
    <Island
      ref="upload"
      class="submit"
      :section="uploadSection"
      :id="uploadSection.slug + 'Island'"
      @click.native="$emit('moreInfo', `/library/${uploadSection.slug}`)"
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Library',
  components: { Island },
  props: [ 'content' ],
  computed: {
    nonposters() { return Object
      .values(this.content)
      .filter(l => l.Poster !== true) 
      .sort((a, b) => (new Date(b.updated_at)) - (new Date(a.updated_at)))
    },
    posters() { return Object
      .values(this.content)
      .filter(l => l.Poster === true) 
      .sort((a, b) => (new Date(b.updated_at)) - (new Date(a.updated_at)))
    },
    
  },
  data() {
    return {
      uploadSection: {
        Name: 'Submit a resource',
        slug: 'upload'
      }
    }
  }
}
</script>

<style scoped>
.library {
  box-sizing: border-box;
  max-height: 100%;
  width: 100%;
  margin: calc(20 * var(--one));;
  margin-top: calc(10 * var(--one));
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center; 
}
.posterListContainer {
  width: 100%;
  display: flex;
  align-items: flex-start; 
}
.posters,
.nonposters {
  flex-basis: 50%;
  box-sizing: border-box;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
}
.submit {
  margin-top: calc(3 * var(--one));
}
</style>