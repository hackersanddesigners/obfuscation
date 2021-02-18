<template>
  <div 
    class="island"
    :style="{
      height: `${ 15 }%`,
      width: `${ 20 }%`,
    }"
  >
    
    <div class="header">
      <h1
        class="title"
        @mousedown.stop="$router.push(`/videos/${ section.slug }`)"
      > 
        {{ section.Name }} 
      </h1>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Island',
  components: {
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
    console.log(this.section.File.url)
  },
  methods: {

  }

}
</script>

<style scoped>
.island {
  box-sizing: border-box;
  position: relative;
  /* flex: 0 0; */
  flex-shrink: 0;
  flex-grow: 0;
  /* width: auto; */
  margin-bottom: 2.5vh;
  margin-right: 5vw;
  padding: 2vh 3vw;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: var(--white-glass);
  box-shadow: var(--island-shadow);
  border-top-left-radius: var(--small-island-curve);
  border-bottom-right-radius: var(--small-island-curve);
  /* border-radius: var(--small-island-curve); */
  transition: border-radius 0.2s ease;
}
.island:hover {
  /* border-top-left-radius: 0px; */
}

.island .header {
  /* flex: 1; */
  /* margin: auto; */
  /* max-width: 30vw; */
  /* margin-bottom: unset; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(3pt * var(--scale));
}
.island .header h1 { 
  font-size: calc(5pt * var(--scale));
  font-family: 'zxx-noise';
  text-align: center;
  word-break: break-all;
  cursor: pointer;
}
.island .header .title:hover {
  text-decoration: underline;
}
</style>