<template>
  <div>
    <Island
      v-for="section in content"
      :key="section.slug"
      :id="section.slug + 'Island'"
      :section="section"
      @click.native="$emit('moreInfo', `/readme/${section.slug}`)"
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Readme',
  components: { Island },
  props: [ 'content' ],
}
</script>

<style scoped>
.reception {
  width: 100%;
  height: 100%; 
}
.island:nth-of-type(1) {
  top: 5%; left: 25%;
}
.island:nth-of-type(2) {
  top: 15%; left: 40%;
}
.island:nth-of-type(3) {
  top: 20%; left: 30%;
}
.island:nth-of-type(4) {
  top: 30%; left: 45%;
}
.island:nth-of-type(5) {
  top: 35%; left: 20%;
}
.island:nth-of-type(6) {
  top: 40%; left: 55%;
}
.island:nth-of-type(7) {
  top: 50%; left: 40%;
}

</style>