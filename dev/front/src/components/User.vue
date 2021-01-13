<template>
  <div
    v-if="uid"
    class="user"
    :class="{
      uid: uid
    }"
    :style="{ color: color }"
  >
    <span> {{ name }} </span>
    <span>({{ (100*x).toFixed(2) }} , {{ (100*y).toFixed(2) }})</span>
    <Cursorr
      :uid="uid" 
      :name="name" 
      :color="color" 
      :x="x"
      :y="y"
    />
  </div>
</template>

<script>
import Cursorr from './Cursorr'

export default {
  name: 'User',
  components: {
    Cursorr
  },
  props: [ 
    'uid',
    'name',
    'color',
  ], 
  data() {
    return {
      x: null,
      y: null
    }
  },
  mounted() {
    // setInterval(() => {
      // console.log(this.x, this.y)
    // }, 1000)
  },
  methods: {
  }
}
</script>
<style scoped>
div.user {
  /* display: inline; */
  font-weight: bold;
}

</style>