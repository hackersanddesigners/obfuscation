<template>
  <div class="library">
    <Island
      :ref="section.slug"
      v-for="section in content"
      :key="section.slug"
      :section="section"
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Library',
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
      // @mousedown.native.stop="handleClick(section)"


  },
  methods: {
    handleClick(section) {
      console.log(this.$refs[section.slug][0].$el)
      this.$refs[section.slug][0].$el.click()
    }
  }

}
</script>

<style scoped>
.library {
  box-sizing: border-box;
  margin: auto;
  margin-top: 20vh;
  /* height: 100%; */
  max-width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>