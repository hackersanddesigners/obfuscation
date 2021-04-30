<template>
  <div>
    <Island
      v-for="section in resources"
      :id="section.slug + 'Island'"
      :ref="section.slug"
      :key="section.slug"
      :section="section"
    />
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
    resources() { return Object
      .values(this.content)
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
  margin-top: calc(10 * var(--one));
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center; 
}
.submit {
  margin-top: calc(3 * var(--one));
}
</style>