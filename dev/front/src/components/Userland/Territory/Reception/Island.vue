<template>
  <div 
    class="island"
    :style="{
    }"
  >
    
    <div class="header">
      <h1
        class="title"
      > 
        {{ section.Title }} 
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
  /* position: relative; */
  position: absolute;
  /* flex: 0 1; */
  /* min-width: 20vw; */
  /* margin: 1.25vh 1.25vw; */
  /* width: 20%; */
  height: 10%;
  margin: 1vh;
  padding: 2vh 3vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

}
.island .header {
  /* flex: 1; */
  /* margin: auto; */
  /* max-width: 30vw; */
  /* margin-bottom: unset; */
  display: flex;
  /* align-items: stretch; */
  justify-content: center;
  font-size: calc(3pt * var(--scale));
}
.island .header h1 { 
  font-size: calc(5pt * var(--scale));
  font-family: 'zxx-noise';
  text-align: center;
  /* word-break: break-all; */
  cursor: pointer;
  margin: 0;
}
.island .header .title:hover {
  text-decoration: underline;
}
</style>