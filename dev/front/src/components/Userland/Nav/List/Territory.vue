<template>
  <li
    :id=" 'list-' + territory.slug"
    :class="[
      'list-territory',
      { active: isActive }
    ]"
    :style="{ '--ground': territory.color }"
    tabindex="0"
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
    location() { return this.$store.state.territories.location },
    isActive() { return this.territory.slug === this.location.slug },
  },
}
</script>

<style>

.list-territory {
  box-sizing: border-box;
  list-style: none;
  padding: 0.3vh 0.5vh;
  margin-bottom: 0vh;
  font-size: var(--ui-font-size);
  border: 2px solid transparent;
  border-radius: var(--ui-border-radius);
}
.list-territory:last-of-type {
}
.list-territory span {
  margin-right: 10px;
}
.list-territory .name {
  cursor: pointer;
  border-bottom: 0px solid;
  transition: all 0.2s ease;
}
.list-territory:focus .name,
.list-territory:hover .name {
  color: var(--ground);
}
.list-territory.active {
  color: var(--ground);
}
.list-territory.active .name {
  border-bottom: 1.5px solid;
}
.mobile .list-territory {
  font-size: 20pt;
}
</style>