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
  top: 5%; left: 35%;
}
#contactIsland {
  top: 35%; left: 30%;
}
#call-for-participationIsland {
  top: 50%; left: 45%;
}
#registerIsland {
  top: 75%; left: 35%;
}
#wo-2017Island {
  top: 20%; left: 40%;
}
#code-of-conductIsland {
  top: 65%; left: 65%;
}
#study-groupIsland {
  top: 30%; left: 60%;
}
</style>