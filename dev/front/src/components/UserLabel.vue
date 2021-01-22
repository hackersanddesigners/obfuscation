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
      ●
    </span>
    <!-- <span>
      {{ isMe ? "me" : connected ? name : name + ' (offline)' }} 
    </span> -->
    <span>
      {{ isMe ? "me" : name }} 
    </span>
    <span> {{ hovered ? '→' : ''  }}</span> 
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
  font-weight: bold;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  color: var(--userColor);
  cursor: pointer;
}
li span {
  margin-right: 0.5vw;
}
li span:last-of-type {
  margin-left: auto;
}
</style>