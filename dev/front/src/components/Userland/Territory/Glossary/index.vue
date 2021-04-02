<template>
  <div>
    <Island
      v-for="section in content"
      :key="section.slug"
      :id="section.slug + 'Island'"
      :section="section"
      @click.native="$emit('moreInfo', `/glossary/${section.slug}`)"
    />
    <Island
      ref="upload"
      class="submit"
      :section="uploadSection"
      :id="uploadSection.slug + 'Island'"
      @click.native="$emit('moreInfo', `/glossary/${uploadSection.slug}`)"
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Glossary',
  components: { Island },
  props: [ 'content' ],
  data() {
    return {
      uploadSection: {
        Term: 'SUBMIT',
        slug: 'upload'
      }
    }
  }
}
</script>

<style scoped>
.glossary {
  box-sizing: border-box;
  max-height: 100%;
  margin: auto;
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