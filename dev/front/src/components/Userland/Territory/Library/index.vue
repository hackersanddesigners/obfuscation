<template>
  <div>
    <Island
      v-for="section in content"
      :id="section.slug + 'Island'"
      :ref="section.slug"
      :key="section.slug"
      :section="section"
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Library',
  components: { Island },
  props: [ 'content' ],
}
</script>

<style scoped>
.library {
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