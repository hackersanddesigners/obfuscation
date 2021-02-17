<template>
  <div class="glossary">
    <Island
      v-for="section in extraContent"
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
    extraContent() {
      return (
        this.content.length <= 1 ? 
        this.getMoreTerms() :
        this.content
      )
      
    
    }


  },

  created() {

  },
  methods: {

      getMoreTerms() {
        const more = []
        for (let i = 0; i < 25; i++) {
          more.push(this.content[0])
        }
        return more
      }

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