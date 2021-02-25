<template>
  <div class="glossary">
    <Island
      v-for="section in content"
      :key="section.slug"
      :section="section"
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


  }

}
</script>

<style scoped>
.glossary {
  box-sizing: border-box;
  margin-top: 20vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>