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
  top: 10%; left: 35%;
}
.island:nth-of-type(2) {
  top: 30%; left: 50%;
}
.island:nth-of-type(3) {
  top: 40%; left: 40%;
}
.island:nth-of-type(4) {
  top: 55%; left: 45%;
}
.island:nth-of-type(5) {
  top: 65%; left: 20%;
}
.island:nth-of-type(6) {
  top: 70%; left: 65%;
}
.island:nth-of-type(7) {
  top: 80%; left: 60%;
}

</style>