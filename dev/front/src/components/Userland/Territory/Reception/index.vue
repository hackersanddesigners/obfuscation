<template>
  <div>
    <Island
      v-for="section in content"
      :key="section.slug"
      :id="section.slug + 'Island'"
      :section="section"
      @mousedown.native.stop="handleIslandClick(section)"
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Reception',
  components: { Island },
  props: [ 'content' ],
  methods: {

    handleIslandClick(section) {
      const current = this.$router.history.current.path
      const next = `/reception/${section.slug}`
      
      if (current === next) {
        this.$emit('moreInfo', next)
      } else {
        this.$router.push(`${next}`)
      }
    }

  }

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