<template>
  <div id="options">
    <Register
      v-if="!registered || editing" 
      :registered="registered"
      :name="name"
      :color="color"
      :usernames="usernames"

      @newMe="$emit('newMe', $event)"
      @updateColor="$emit('updateColor', $event)"
    />
    <span class="title"> options </span>
    <div class="grid">
      <input 
        type="button" 
        name="grid" 
        :value="grid ? 'hide grid' : 'show grid'" 

        @click.stop="$emit('grid')"
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
    'registered',
    'editing',
    'name',
    'color',
    'grid',
    'usernames'
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
#options {
  box-sizing: border-box;
  margin-top: 2vh;
  margin-left: 2vh;
  width: 10vw;
  height: 10vh;
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
  margin: 0.2vh 0.5vw;
  display: flex;
  align-items: center;
}
#options .db input {
  /* background: red; */
  color: red;
}
</style>