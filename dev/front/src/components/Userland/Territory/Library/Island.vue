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
      <h3 class="subtitle">
        {{ section.author }}
      </h3>
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
  margin-bottom: 0vh;
  padding: 1vh 3vw;

  display: flex;
  flex-direction: column;
  justify-content: center;

  /* background-color: var(--white-glass); */
  background: none;
  --bevel:
    0 0px 0px rgba(255,255,255,0.8), /*bottom external highlight */
    0 0px 0px #666, /*top external shadow*/ 
    inset 0 -5px 10px rgba(0, 0, 0, 0.4), /*bottom internal shadow*/ 
    inset 0 5px 10px rgba(255, 255, 255, 0.4); /*top internal highlight*/
  ;
  box-shadow: var(--bevel);
  border-radius: 1vh;
  transition: all 0.2s ease;
}
.island:before {
  background: none;
}

.island:nth-of-type(1n) {
  background: rgb(179,198,186);
}
.island:nth-of-type(2n) {
  background: rgb(189,179,174);
}
.island:nth-of-type(3n) {
  background: rgb(138,121,111);
}

.island:hover {
  transform: translateX(2vh);
  box-shadow: var(--bevel);
}


.island .header {
  /* flex: 1; */
  /* margin: auto; */
  /* max-width: 30vw; */
  /* margin-bottom: unset; */
  display: flex;
  flex-direction: column;
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
  /* font-family: 'zxx-noise'; */
  font-family: serif;
  font-weight: lighter;
  text-align: center;
  /* word-break: break-all; */
  cursor: pointer;
}
.island .header .subtitle {
  font-family: sans-serif;
  color: black;
  margin: 0;
  text-align: center;
  font-weight: lighter;
}
.island .header .title,
.island .header .title:hover {
  /* text-decoration: underline; */
  text-decoration: none;
}
</style>