<template>
  <div>
    <Island
      v-for="section in content"
      :id="section.slug + 'Island'"
      :key="section.slug"
      :section="section"
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Exhibition',
  components: { Island },
  props: [ 'content' ],
}
</script>

<style scoped>
.exhibition {
  box-sizing: border-box;
  margin: 
    calc(5 * var(--one)) 
    calc(10 * var(--one)) 
  ;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: center;
  align-items: center;
  align-content: center;
}


</style>