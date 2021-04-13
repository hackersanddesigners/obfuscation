<template>
  <div class="island resource">
    <a
      class="header"
      :href="src"
      target="_blank"
    >
      <h3> {{ section.author }} </h3>
      <h1> {{ section.Name }} </h1>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Island',
  props: [ 'section' ],
  computed: {
    src() {
      return (
        this.section.File ? 
        this.$apiURL + this.section.File.url :
        this.section.URL 
      )
    }
  },
}
</script>

<style scoped>
.island.resource {
  --bevel:
    inset 0 
    calc(-0.7 * var(--one)) 
    calc(1 * var(--one))
    rgba(0, 0, 0, 0.4),
    inset 0 
    calc(0.7 * var(--one)) 
    calc(1 * var(--one))
    rgba(255, 255, 255, 0.4); 
  ;
  max-width: 60%;
  padding: 
    calc(1 * var(--one)) 
    calc(4 * var(--one)) 
  ;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: var(--bevel);
  border-radius: calc(1 * var(--one));
  transition: all 0.2s ease;
}
.island.resource .header {
  text-decoration: none;
  cursor: none;
  z-index: 1;
  color: var(--ui-front);
  text-align: center;
}
.island.resource .header h1 { 
  font-family: serif;
}
.island.resource .header h3 {
  font-family: sans-serif;
  font-weight: lighter;
}
.island.resource:before {
  background: none;
}
.island.resource:nth-of-type(1n) {
  background: rgb(179,198,186);
}
.island.resource:nth-of-type(2n) {
  background: rgb(189,179,174);
}
.island.resource:nth-of-type(3n) {
  background: rgb(138,121,111);
}
.island.resource:hover {
  transform: translateX(calc(2 * var(--one)));
  box-shadow: var(--bevel);
}

/* .LIFECYCLE0 .island {
  pointer-events: none;
}
.LIFECYCLE0 .island h3,
.LIFECYCLE0 .island h1 {
  visibility: hidden;
  pointer-events: none;
}

.LIFECYCLE1 .island {
  pointer-events: all;
}
.LIFECYCLE1 .island h3,
.LIFECYCLE1 .island h1 {
  visibility: visible;
} */
</style>