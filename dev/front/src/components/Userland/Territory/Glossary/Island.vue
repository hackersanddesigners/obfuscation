<template>
  <div class="island">
    <div class="header">
      <h1> 
        {{ section.Term }} 
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
  margin-bottom: calc(2.5 * var(--one));
  padding: 
    calc(1 * var(--one)) 
    calc(2 * var(--one)) 
  ;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>