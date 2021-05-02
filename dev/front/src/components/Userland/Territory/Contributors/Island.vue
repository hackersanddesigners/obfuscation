<template>
  <div class="island">
    <div class="header">
      <h1 :class="{ zxx: $store.state.desiresTexture }">
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
  padding:
    calc(1 * var(--one))
    calc(2 * var(--one))
  ;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>