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
  /* margin-left: 20vw; */
  /* margin-top: 20vh; */
  /* padding: 0vh 5vw; */
  margin: auto;
  padding: 0 30%;
  /* max-height: 100%; */
  width: 100%; 
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

</style>