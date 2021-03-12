<template>
  <div>
    <Island
      v-for="section in content"
      :key="section.slug"
      :id="section.slug + 'Island'"
      :section="section"
      @mouseup.native="handleIslandClick(section)"
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Contributors',
  components: { Island },
  props: [ 'content' ],
  methods: {

    handleIslandClick(section) {
      const current = this.$router.history.current.path
      const next = `/contributors/${section.slug}`
      
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
.contributors {
  box-sizing: border-box;
  max-height: 100%;
  margin: auto;
  /* margin-top: calc(10 * var(--one)); */
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>