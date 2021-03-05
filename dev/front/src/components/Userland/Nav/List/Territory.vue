<template>
  <li
    :class="[
      'list-territory',
      { active: isActive }
    ]"
    :id=" 'list-' + territory.slug"
    :style="{
      '--ground': territory.color,
      '--image': shape,
    }"
  >
    <!-- <span class="bullet"></span> -->
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
    
    shape() { return `url("${this.$apiURL}${this.territory.shape.url}#svgView(preserveAspectRatio(none))")` },

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
  align-items: center;
  justify-content: flex-start; */
}
.list-territory:last-of-type {
  margin-bottom: 0.5vh;
}
.list-territory span {
  margin-right: 10px;
  line-height: 1.2;
  /* display: inline; */
}
.list-territory .bullet {
  display: inline-block;
  vertical-align: middle;
  min-height: 20px; min-width: 20px;
  /* background-image: var(--image); */
  /* background-repeat: no-repeat; */
  /* background-size: contain; */
  background-color: var(--ground);
  mask-image: var(--image);
  -webkit-mask-image: var(--image);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center center;
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
  color: var(--ground);
}
.list-territory.active .name {
  /* border-bottom: 3px solid; */
  text-decoration: underline;
}
</style>