<template>
  <a
    target="_blank"
    :class="{ disabled: !room.url ? true : false }"
    :href="room.url ? room.url : null"
    class="BBB-container"
  >
    <h3 class="BBB">
      Click here to join {{ room.name }}.
    </h3>
  </a>
</template>

<script>
export default {
  name: 'BBBLink',
  props: [ 'room' ],
}
</script>

<style scoped>
.BBB-container {
  position: relative;
  max-width: 20vh;
  box-sizing: border-box;
  margin: calc(1 * var(--one));
  padding: calc(2 * var(--one));
  color: inherit;
  outline: none;
  display: flex;
  background-color: var(--island-back-color);
  box-shadow: var(--island-shadow);
  /* border-radius: inherit; */
  border-radius:
    var(--small-island-curve)
    var(--island-curve)
    var(--small-island-curve)
    var(--island-curve);
  transition: all 0.2s ease;
}

.BBB-container::before {
  box-sizing: border-box;
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  content: '';
  overflow: hidden;
  background: var(--island-back);
  border-radius: inherit;
}

.BBB-container.disabled {
  opacity: 0.2;
}

.island:hover .BBB-container {
  transform: scale(1.05);
}

.BBB {
  margin: auto;
  font-size: calc(1.3 * var(--one));
  text-align: center;
}
.break .BBB-container .BBB {
  margin-bottom: 4vh;
}
</style>