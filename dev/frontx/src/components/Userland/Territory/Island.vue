<template>
  <div 
    class="island"
    :style="{
      width: `${100 / 5}%`,
      height: `${100 / 2.5}%`,
    }"
  >

    <div class="header">
      <h1
        class="title"
        @click="$router.push(`#${id}`)"
      > 
        {{ content.Title }} 
      </h1>
      <h1 
        class="more"
        @click.stop="$emit('more')"
      >+</h1>
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
    'name',
    'id',
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
  padding: 1vh;
  /* max-width: 500px;
  max-height: 500px; */
  /* position: absolute; */
  /* top: 30vh; */
  /* left: 30vw; */
  /* margin: auto; */
  /* border: 1px dashed black; */
  /* --back: rgba(255, 255, 255, 0.774); */
  /* --back: rgb(0, 0, 0); */
  background-color: var(--back);
  box-shadow: 0px 0px 150px 150px  var(--back);
  /* color: white; */
  /* border-radius: 100px; */
}
.island .header {
  display: flex;
  align-items: center;
  font-size: calc(3pt * var(--scale));
}
.island .header h1 { 
  font-size: inherit;
  margin-top: 0px;
  cursor: pointer;
}
.island .header .title:hover {
  text-decoration: underline;
}
.island .header .more {
  margin-left: auto;
  cursor: pointer;
  font-size: calc(3pt * var(--scale));
  /* width: 35px;
  text-align: center;
  border: 1px solid;
  border-radius: 20px; */
}
</style>