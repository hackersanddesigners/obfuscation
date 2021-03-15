<template>
  <div>
    <Island
      v-for="section in content"
      :key="section.slug"
      :id="section.slug + 'Island'"
      :section="section"
      @click.native="$emit('moreInfo', `/contributors/${section.slug}`)"
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Contributors',
  components: { Island },
  props: [ 'content' ],
}
</script>

<style scoped>
.contributors {
  box-sizing: border-box;
  max-height: 100%;
  /* margin: auto; */
  margin-top: calc(10 * var(--one));
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>