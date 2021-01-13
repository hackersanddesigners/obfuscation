<template>
  <div
    v-if="uid"
    class="cursor"
    :class="{
      uid: uid
    }"
    :style="{ 
      background: color ,
      left: (100*x - 1) + '%',
      top: (100*y - 1) + '%'
    }"
  >
    <!-- <span> {{ name }} </span> -->
  </div>
</template>

<script>
export default {
  name: 'Cursorr',
  components: {
  },
  props: [ 
    'uid',
    'name',
    'color',
    'x',
    'y',
  ], 
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped>
div.cursor {
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  cursor: none;
  /* pointer-events: none; */
}

</style>