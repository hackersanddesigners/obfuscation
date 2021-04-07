<template>
  <div id="notfoundContainer">
    <div id="notfound" class="">
      <span>Location not found.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notfound',
}
</script>
<style scoped>

#notfoundContainer {
  position: absolute;
  top: 0; left: 0;
  height: 100%; width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: var(--half-white);
}
#notfound {
  padding: 1vh;
  width: 450px;
  font-size: 14pt;
  text-align: center;
}

</style>