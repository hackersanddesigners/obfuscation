<template>
  <div 
    class="island"
    :style="{
      width: `${100 / 5}%`,
      height: `${100 / 5}%`,
    }"
  >

    <div class="header">
      <h1
        class="title"
        @click="$router.push(`#${slug}`)"
      > 
        {{ content.Title }} 
      </h1>
      <!-- <h1
        class="more"
        @click.stop="$emit('more')"
      >+</h1> -->
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
    'slug',
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
  background-color: var(--back);
  box-shadow: var(--island-shadow);
  border-top-left-radius: var(--island-curve);
  border-bottom-right-radius: var(--island-curve);
  /* color: white; */
  /* border-radius: 100px; */
}
.island:hover {
  border-top-left-radius: 0px;
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