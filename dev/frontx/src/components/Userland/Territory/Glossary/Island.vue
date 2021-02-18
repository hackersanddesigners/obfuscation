<template>
  <div 
    class="island"
    :style="{
      height: `${ 5 }vh`,
    }"
  >
    
    <div class="header">
      <h1
        class="title"
        @mousedown.stop="$router.push(`/glossaries/${ section.slug }`)"
      > 
        {{ section.Term }} 
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
  },
  methods: {

  }

}
</script>

<style scoped>
.island {
  box-sizing: border-box;
  position: relative;
  flex: 0 0;
  width: auto;
  margin-bottom: 2.5vh;
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
  font-weight: normal;
  word-break: break-all;
  cursor: pointer;
}
.island .header .title:hover {
  text-decoration: underline;
}
</style>