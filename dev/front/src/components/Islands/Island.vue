<template>
  <div 
    class="island"
  >

    <div class="title">
      <h1> {{ content.Title }} </h1>
    </div>
    <div class="body">
      <vue-markdown
        :source="content.Body"
      />
    </div>

  </div>
</template>

<script>
export default {
  name: 'Island',
  components: {
  },
  props: [
    'content'
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
.island {
  box-sizing: border-box;
  max-width: 500px;
  max-height: 500px;
  /* position: absolute; */
  /* top: 30vh; */
  /* left: 30vw; */
  margin: auto;
  /* border: 1px dashed black; */
  padding: 1vh;
}
.island .title h1 {
  margin-top: 0px;
}
</style>