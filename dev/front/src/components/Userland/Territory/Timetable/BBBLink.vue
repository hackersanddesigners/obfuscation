<template>
  <a 
    target="_blank"
    :href="BBBLink"
    class="BBB-container"
  >
    <h3 class="BBB">
      Click here to join the BBB room.
    </h3>
  </a>
</template>

<script>
export default {
  name: 'BBBLink',
  components: {
  },
  props: [
    'BBBLink'
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
  flex: 0 1 25vh;
  box-sizing: border-box;
  position: relative;
  min-width: 10vh;
  margin: 1vh;
  padding: 1vh;

  display: flex;
  color: inherit;
  outline: none;
  background-color: var(--white-glass);
  box-shadow: var(--island-shadow);
  border-radius: inherit;
  transition: all 0.2s ease;
}

.BBB-container::before {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  content: '';
  background: var(--island-back);
  border-top-left-radius: inherit;
  border-bottom-right-radius: inherit;
  border-top-right-radius:inherit;
  border-bottom-left-radius: inherit;
  overflow: hidden;
}

.island:hover .BBB-container {
  border-radius: 12vh;
  border-top-left-radius: 2vh;
  transform: scale(1.03);
}

.BBB {
  margin: auto;
  font-size: 11pt;
  text-align: center;
  max-width: 10vh;

}
.break .BBB-container .BBB {
  margin-bottom: 4vh;
}
</style>