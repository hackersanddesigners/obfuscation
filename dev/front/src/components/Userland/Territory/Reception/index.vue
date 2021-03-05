<template>
  <div class="reception">
    <Island
      v-for="section in content"
      :key="section.slug"
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
      const next = `/statics/${section.slug}`
      
      if (current === next) {
        this.$emit('moreInfo', {
          name: next
        })
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
  top: 20%; left: 25%;
}
.reception .island:nth-of-type(2) {
  top: 20%; left: 40%;
}
.reception .island:nth-of-type(3) {
  top: 45%; left: 25%;
}
.reception .island:nth-of-type(4) {
  top: 70%; right: 35%;
}
.reception .island:nth-of-type(5) {
  top: 10%; right: 15%;
}
.reception .island:nth-of-type(6) {
  top: 60%; left: 65%;
}
</style>