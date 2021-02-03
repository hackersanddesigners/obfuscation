<template>
  <div id="options">
    <Register
      v-if="!registered || editing" 
      :registered="registered"
      :name="name"
      :color="color"
      :usernames="usernames"

      @newMe="$emit('newMe', $event)"
      @newColor="$emit('newColor', $event)"
      @register="$emit('register', $event)"
    />
    <span class="title"> options </span>
    <div class="grid">
      <input 
        type="button" 
        name="grid" 
        :value="grid ? 'hide grid' : 'show grid'" 

        @click.stop="$store.commit('toggleGrid')"
      />
    </div>
    <div class="edituser">
      <input
        type="button"
        name="edituser" 
        value="edit appearance"

        @click.stop="$emit('editMe')"
      />
    </div>
    <div class="storage">
      <input
        type="button"
        name="storage" 
        value="delete me"

        @click.stop="$emit('deleteMe')"
      />
    </div>
    <div class="db">
      <input
        type="button"
        name="db" 
        value="delete everything"

        @click.stop="$emit('deleteEverything')"
      />
    </div>
  </div>
</template>

<script>
import Register from './Register'

export default {
  name: 'Options',
  components: {
    Register
  },
  props: [ 
    'editing',
    'name',
    'color',
    'usernames'
  ], 
  data() {
    return {
    }
  },
  computed: {
    registered() { return this.$store.state.registered },
    grid() { return this.$store.state.grid },
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
#options {
  box-sizing: border-box;
  margin-top: 2vh;
  margin-left: 2vh;
  min-width: 10vw;
  /* height: 10vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  background: white;
  line-height: 1.9vh;

}
#options .title {
  box-sizing: border-box;
  padding: 0vh 0.5vw;
  line-height: 1.9vh;
  width: 100%;
  border-bottom: 1px solid grey;
}
#options div {
  margin: 2.5px 0.5vw;
  display: flex;
  align-items: center;
}
#options .db input {
  /* background: red; */
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