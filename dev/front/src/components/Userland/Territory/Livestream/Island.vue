<template>
  <div 
    class="island"
    :style="{
      width: `${ 100 }%`,
      height: `${ 100 }%`,
    }"
  >
    

    <div class="body">
    
      <Video


      />


    </div>


  </div>
</template>

<script>
import Video from './Video'

export default {
  name: 'Island',
  components: {
    Video
  },
  props: [
    'section'
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
.island {
  box-sizing: border-box;
  position: relative;
  /* flex: 0 1; */
  /* min-width: 20vw; */
  /* margin: 1.25vh 1.25vw; */
  margin: 1vh;
  padding: 0vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

}

.island:hover {
  background-color: initial;
}

.island .body {
  height: 100%;
  width: 100%;
}
</style>