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
  top: 20%; left: 35%;
}
#contactIsland {
  top: 50%; left: 27%;
}
#call-for-participationIsland {
  top: 40%; left: 45%;
}
#registerIsland {
  top: 10%; left: 25%;
}
#wo-2017Island {
  top: 65%; left: 45%;
}
#code-of-conductIsland {
  top: 30%; left: 30%;
}
#study-groupIsland {
  top: 20%; left: 60%;
}
#privacy-policyIsland {
  top: 52%; left: 50%;
}

</style>