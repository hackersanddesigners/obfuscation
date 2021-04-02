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
#backgroundIsland {
  top: 10%; left: 35%;
}
#tourIsland {
  top: 30%; left: 50%;
}
#care-riderIsland {
  top: 40%; left: 40%;
}
#layersIsland {
  top: 55%; left: 45%;
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