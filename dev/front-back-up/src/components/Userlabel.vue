<template>
  <li
    :class="[
      'userLabel',
      user.uid,
      { 
        me: isMe 
      }
    ]"
    :style="{ 
      '--userColor': user.connected ? user.color : 'lightgrey' 
    }"

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
    <span>
      {{ isMe ? "me" : user.name }} 
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
    'isMe',
    'user'
  ], 
  data() {
    return {
      hovered: false
    }
  },
  mounted() {
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