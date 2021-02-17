<template>
  <div class="reception">
    <Island
      v-for="section in content"
      :key="section.slug"
      :section="section"
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
    'content',
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
.reception {
  box-sizing: border-box;
  margin-left: 20vw;
  margin-top: 20vh;
  /* padding: 0vh 5vw; */
  /* width: 200%;  */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  /* align-items: stretch; */
  /* flex-wrap: wrap; */
}

</style>