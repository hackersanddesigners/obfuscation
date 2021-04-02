<template>
  <div class="island">
    <div class="header">
      <h1> 
        {{ section.Name }} 
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Island',
  props: [ 'section' ],
}
</script>

<style scoped>
.island {
  /* margin-bottom: calc(2.5 * var(--one)); */
  padding: 
    calc(1 * var(--one)) 
    calc(2 * var(--one)) 
  ;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


/* .LIFECYCLE0 .island {
  pointer-events: none;
}
.LIFECYCLE0 .island h1 {
  visibility: hidden;
}

.LIFECYCLE1 .island {
  pointer-events: all;
}
.LIFECYCLE1 .island h1 {
  visibility: visible;
} */
</style>