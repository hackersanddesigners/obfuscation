<template>
  <div 
    class="island"
    :style="{
      width: `${ 100 / 5 }vh`,
      height: `${ 100 / 5 }vh`,
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
  position: relative;
  /* flex: 0 1; */
  /* min-width: 20vw; */
  /* margin: 1.25vh 1.25vw; */
  margin: 1vh;
  padding: 2vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: var(--white-glass);
  box-shadow: var(--island-shadow);
  border-top-left-radius: var(--island-curve);
  border-bottom-right-radius: var(--island-curve);
  border-top-right-radius: var(--small-island-curve);
  border-bottom-left-radius: var(--small-island-curve);
  /* border-radius: var(--small-island-curve); */
  transition: all 0.2s ease;
  /* cursor: pointer; */
}

.island::before {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  content: '';
  background: var(--island-back);
  border-top-left-radius: inherit;
  border-bottom-right-radius: inherit;
  border-top-right-radius:inherit;
  border-bottom-left-radius: inherit;
  overflow: hidden;
}

.island:hover {
  background-color: var(--yellow-glass);
  /* border-top-left-radius: 0px; */
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