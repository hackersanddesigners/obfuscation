<template>
  <div id="options">
    <!-- <span class="title"> options </span> -->

    <div class="grid">
      <input 
        type="button" 
        :value="grid ? 'hide grid' : 'show grid'" 
        @click.stop="toggleGrid"
      />
    </div>

    <div class="edituser">
      <input
        type="button"
        value="edit appearance"
        @click.stop="$emit('startEdit')"
      />
    </div>

    <div class="storage">
      <input
        type="button"
        value="delete me"
        @click.stop="$store.dispatch('deleteUser', me)"
      />
    </div>

    <!-- <div class="db">
      <input
        type="button"
        value="delete everything"
        @click.stop="$socket.client.emit('clearDBs')"
      />
    </div> -->
    
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {

  name: 'Options',

  computed: {
    ...mapState([
      'grid'
    ]),
    ...mapGetters([
      'me'
    ])
  },

  methods: {
    ...mapMutations([
      'toggleGrid'
    ]),
  }
}
</script>

<style scoped>
#options {
  box-sizing: border-box;
  margin-top: 1vh;
  margin-left: 1vh;
  max-width: 16vw;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  /* align-items: center; */
  justify-content: space-around;
  border: 1px solid grey;
  background: white;
  line-height: 1.9vh;
  border-radius: var(--ui-border-radius);
  padding: 0.5vh;
}
#options .title {
  box-sizing: border-box;
  padding: 0vh 0.5vw;
  line-height: 1.9vh;
  width: 100%;
  border-bottom: 1px solid grey;
}
#options div {
  margin: 2.5px;
  display: flex;
  align-items: center;
}
#options .db input {
  color: red;
}
input {
  border: none;
  outline: none;
  border: 0.5px solid lightgray;
  padding: 2px 10px;
  border-radius: 10px;
  margin-top: 0px;
}
input[type="button"] {
  cursor: pointer;
}
</style>