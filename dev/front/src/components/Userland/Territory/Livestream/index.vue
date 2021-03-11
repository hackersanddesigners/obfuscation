<template>
  <div>
    <Island />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Livestream',
  components: { Island },
}
</script>

<style scoped>
.livestream {
  box-sizing: border-box;
  margin: auto;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>