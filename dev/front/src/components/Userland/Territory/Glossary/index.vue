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
  margin: auto;
  margin-top: 20vh;
  height: 100%;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>