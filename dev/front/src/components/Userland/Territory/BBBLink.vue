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
  components: {
  },
  props: [
    'room',
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
.BBB-container {
  max-width: 20vh;
  box-sizing: border-box;
  margin: calc(1 * var(--one));
  padding: calc(2 * var(--one));
  color: inherit;
  outline: none;
  display: flex;
  background-color: var(--island-back-color);
  box-shadow: var(--island-shadow);
  border-radius: inherit;
  transition: all 0.2s ease;
}

.BBB-container::before {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  content: '';
  /* background: var(--island-back); */
  border-top-left-radius: inherit;
  border-bottom-right-radius: inherit;
  border-top-right-radius:inherit;
  border-bottom-left-radius: inherit;
  overflow: hidden;
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