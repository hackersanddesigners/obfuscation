<template>
  <div class="livestream">
    <Island
    />
  </div>
</template>

<script>
import Island from './Island'

export default {
  name: 'Reception',
  components: {
    Island
  },
  props: [
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
.livestream {
  box-sizing: border-box;
  /* margin-left: 20vw; */
  /* margin-top: 20vh; */
  /* padding: 0vh 5vw; */
  margin: auto;
  /* padding: 0px 20%; */
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

}

</style>