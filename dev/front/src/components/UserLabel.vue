<template>
  <li
    :class="[
      'userLabel',
      uid,
      { me: isMe }
    ]"
    :style="{ '--userColor': connected ? color : 'lightgrey' }"
    @mouseover="hovered=true"
    @mouseleave="hovered=false"
  >
    <!-- <span>
      ({{ x.toFixed(2) }},
       {{ y.toFixed(2) }})
    </span> -->
    <span>
      {{ connected ? name : name + ' (offline)' }} 
    </span>
    <span v-if="!isMe && hovered"> → </span> 
    <span v-else-if="isMe && hovered"> → edit your profile</span> 
  </li>
</template>

<script>
export default {
  name: 'UserLabel',
  components: {
  },
  props: [ 
    'uid',
    'name',
    'color',
    'isMe',
    'connected',
    'x',
    'y',
    'typing',
  ], 
  data() {
    return {
      hovered: false
    }
  },
  mounted() {
    // setInterval(() => {
    //   console.log(this.messages)
    // }, 1000)
  },
  methods: {
  }
}
</script>
<style scoped>
li {
  list-style: none;
  padding: 0;
  margin: 0.5vh 0.5vw;
  color: var(--userColor);
  font-weight: bold;
  cursor: pointer;
}
</style>