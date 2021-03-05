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

<style >
.island {
  position: relative;
  box-sizing: border-box;
  padding: 1vh;
  margin: auto;
  background-color: var(--white-glass);
  box-shadow: var(--island-shadow);
  border-top-right-radius: var(--island-curve);
  border-bottom-left-radius: var(--island-curve);
  border-top-left-radius: var(--small-island-curve);
  border-bottom-right-radius: var(--small-island-curve);
  transition: all 0.2s ease;
  z-index: 1;
}

.island::before {
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

.island:hover {
  background-color: rgba(0, 0, 0, 0.13);
  box-shadow: inset 0 0 2vh 0.5vh rgba(0, 0, 0, 0.267);
  /* border-top-left-radius: 0px; */
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