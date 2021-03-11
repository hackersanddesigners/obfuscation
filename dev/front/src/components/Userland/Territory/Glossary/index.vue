<template>
  <div class="glossary">
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
  name: 'Glossary',
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
      const next = `/glossary/${section.slug}`
      
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
.glossary {
  box-sizing: border-box;
  margin: auto;
  margin-top: 20vh;
  height: 100%;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  align-content: start;
  align-items: center;
}
</style>