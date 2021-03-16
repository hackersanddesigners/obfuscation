<template>
  <div>
    <Island
      v-for="section in content"
      :key="section.slug"
      :id="section.slug + 'Island'"
      :section="section"
      @click.native="$emit('moreInfo', `/reception/${section.slug}`)"
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Reception',
  components: { Island },
  props: [ 'content' ],
}
</script>

<style scoped>
.reception {
  width: 100%;
  height: 100%; 
}
#aboutIsland {
  top: 3%; left: 35%;
}
#contactIsland {
  top: 30%; left: 30%;
}
#call-for-participationIsland {
  top: 40%; left: 45%;
}
#registerIsland {
  top: 55%; left: 35%;
}
#wo-2017Island {
  top: 15%; left: 40%;
}
#code-of-conductIsland {
  top: 60%; left: 65%;
}
#study-groupIsland {
  top: 20%; left: 60%;
}
</style>