<template>
  <div class="reception">
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
  components: {
    Island
  },
  props: [
    'content',
  ],
  data() {
    return {
    }
  },
  computed: {


  },

  created() {

  },
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
  box-sizing: border-box;
  margin: auto;
  /* padding: 0 30%; */
  width: 100vw;
  height: 100vh; 

  /* display: flex; */
  /* flex-wrap: wrap; */
  /* justify-content: center; */
  /* align-content: center; */
  /* align-items: center; */
}
.reception .island:nth-of-type(1) {
  top: 5%; left: 35%;
}
.reception .island:nth-of-type(2) {
  top: 35%; left: 30%;
}
.reception .island:nth-of-type(3) {
  top: 50%; left: 45%;
}
.reception .island:nth-of-type(4) {
  top: 75%; left: 35%;
}
.reception .island:nth-of-type(5) {
  top: 20%; left: 40%;
}
.reception .island:nth-of-type(6) {
  top: 65%; left: 65%;
}
.reception .island:nth-of-type(7) {
  top: 30%; left: 60%;
}
</style>