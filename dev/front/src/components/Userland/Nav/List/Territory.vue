<template>
  <li
    :class="[
      'list-territory',
      { active: isActive }
    ]"
    :id=" 'list-' + territory.slug"
  >
    <span class="bullet"> ... </span>
    <span class="name"> {{ territory.name }} </span>
    <span class="goto"> → </span>
  </li>
</template>

<script>
export default {
  name: 'Territory',
  props: [ 
    'territory'
  ], 
  computed: {

    location() { return this.$store.state.location },

    isActive() { 
      return this.territory.slug === this.location.slug 
    },
  
  },
  methods: {
    toNearestX(num, X) {
      return Math.floor(100 * num / X) * X
    }
  }
}
</script>

<style>
.list-territory {
  list-style: none;
  margin: 0.5vh;
  margin-bottom: 1vh;
  /* display: flex;
  align-items: baseline;
  justify-content: flex-start; */
}
.list-territory span {
  margin-right: 10px;
  line-height: 1.2;
  /* display: inline; */
}
.list-territory .name {
  text-decoration: underline;
  cursor: pointer;
  /* border-bottom: 1px solid; */
  /* transition: border 0.2s ease; */
}

.list-territory:hover .name {
  /* border-bottom: 3px solid; */
  text-decoration: underline;
}

.list-territory.active {
  color: blue;
}
.list-territory.active .name {
  /* border-bottom: 3px solid; */
  text-decoration: underline;
}
</style>