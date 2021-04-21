<template>
  <div>
    <Island
      v-for="section in content"
      :id="section.slug + 'Island'"
      :key="section.slug"
      :section="section"
      @moreInfo="$emit('moreInfo', `/exhibition/${section.slug}`)"
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
  height: 100%;
  width: 100%;
  /* margin: calc(2.5 * var(--one)); */
}

.exhibition .island:nth-last-of-type(1) {
  top: 10%; left: 0%;
}
.exhibition .island:nth-last-of-type(2) {
  top: 40%; left: 10%;
}
.exhibition .island:nth-last-of-type(3) {
  top: 0%; left: 20%;
}
.exhibition .island:nth-last-of-type(4) {
  top: 60%; left: 35%;
}
.exhibition .island:nth-last-of-type(5) {
  top: 70%; left: 55%;
}
.exhibition .island:nth-last-of-type(6) {
  top: 30%; left: 70%;
}
.exhibition .island:nth-last-of-type(7) {
  top: 60%; left: 85%;
}
.exhibition .island:nth-last-of-type(8) {
  top: 10%; left: 50%;
}


</style>