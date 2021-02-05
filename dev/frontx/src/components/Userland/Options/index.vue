<template>
  <div id="options">
    <span class="title"> options </span>

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
        @click.stop="deleteSelf"
      />
    </div>

    <div class="db">
      <input
        type="button"
        value="delete everything"
        @click.stop="$socket.client.emit('clearDBs')"
      />
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {

  name: 'Options',

  computed: {
    ...mapState([
      'grid'
    ])
  },

  methods: {
    ...mapMutations([

      'toggleGrid'

    ]),
    ...mapActions([

      'deleteSelf'

    ])
  }
}
</script>

<style scoped>
#options {
  box-sizing: border-box;
  margin-top: 2vh;
  margin-left: 2vh;
  min-width: 10vw;
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