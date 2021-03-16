<template>
  <li
    :id=" 'list-' + territory.slug"
    :class="[
      'list-territory',
      { active: isActive }
    ]"
    :style="{
      '--ground': territory.color,
      '--image': shape,
    }"
  >
    <span class="name">{{ territory.name }}</span>
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
    shape() { return `url("${this.$apiURL}${this.territory.shape.url}#svgView(preserveAspectRatio(none))")` },
    isActive() { return this.territory.slug === this.location.slug },
  },
  

}
</script>

<style>

.list-territory {
  list-style: none;
  margin: 0.5vh;
  margin-bottom: 0.3vh;
  font-size: 20pt;
}
.list-territory:last-of-type {
  /* margin-bottom: 0.5vh; */
}
.list-territory span {
  margin-right: 10px;
}
.list-territory .name {
  cursor: pointer;
  border-bottom: 0px solid;
  transition: all 0.2s ease;
}
.list-territory:hover .name {
  color: var(--ground);
}
.list-territory.active {
  color: var(--ground);
}
.list-territory.active .name {
  border-bottom: 1.5px solid;
}
</style>