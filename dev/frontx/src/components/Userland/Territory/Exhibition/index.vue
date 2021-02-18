<template>
  <div class="exhibition">
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
  name: 'Exhibition',
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
        for (let i = 0; i < 30; i++) {
          more.push(this.content[0])
        }
        return more
      }

  }

}
</script>

<style scoped>
.exhibition {
  box-sizing: border-box;
  margin-top: 20vh;
  margin-left: 20vw;

  /* padding: 20vh 20vw; */
  min-height: 200%;
  min-width: 200%;
  height: 200%;
  width: 200%;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
}

</style>