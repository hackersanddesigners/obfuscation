<template>
  <div
    class="island"
    :style="{
    }"
  >
    
    <a
      target="_blank"
      :href="src"
      class="header"
    >
      <h1 class="title"> 
        {{ section.Name }} 
      </h1>
    </a>


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
    src() {
      return (
        this.section.File ? this.$apiURL + this.section.File.url :
        this.section.URL 
      )
    }
  },
  created() {
  },
  methods: {
    handleClick() {
      window.location.href = this.src
    }

  }

}
</script>

<style scoped>
.island {
  box-sizing: border-box;
  position: relative;
  flex: 0 0;
  width: auto;
  max-width: 70%;
  margin-bottom: 2.5vh;
  padding: 1vh 3vw;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: var(--white-glass);
  box-shadow: var(--island-shadow);
  border-top-left-radius: var(--small-island-curve);
  border-bottom-right-radius: var(--small-island-curve);
  transition: all 0.2s ease;
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
  z-index: 1;
  text-decoration: none;
}
.island .header:hover {
  text-decoration: none;
}
.island .header h1 { 
  color: black;
  margin: 0;
  font-size: calc(5pt * var(--scale));
  line-height: calc(5pt * var(--scale));
  font-family: 'zxx-noise';
  font-weight: normal;
  text-align: center;
  /* word-break: break-all; */
  cursor: pointer;
}
.island .header .title,
.island .header .title:hover {
  /* text-decoration: underline; */
  text-decoration: none;
}
</style>