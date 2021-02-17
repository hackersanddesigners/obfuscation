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
  /* margin-left: 20vw; */
  /* margin-top: 20vh; */
  /* padding: 0vh 5vw; */
  margin: auto;
  padding: 0px 30%;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

</style>