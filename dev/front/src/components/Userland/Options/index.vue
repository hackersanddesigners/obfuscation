<template>
  <div id="options">
    <!-- <span class="title"> options </span> -->

    <!-- <div class="grid">
      <input 
        type="button" 
        :value="grid ? 'hide grid' : 'show grid'" 
        @click.stop="toggleGrid"
      />
    </div> -->

    <div class="participants">
      <input
        v-if="!showParticipants"
        type="button"
        value="participants"
        class="showParticipants"
        @click="showParticipants = true"
      />
      <Userslist
        v-else
        @goTo="$emit('goTo', $event)"
        @hide="showParticipants = false"
      />
    </div>

    <div class="edituser">
      <input
        type="button"
        value="edit appearance"
        @click.stop="$emit('startEdit')"
      />
    </div>

    <!-- <div class="db">
      <input
        type="button"
        value="delete everything"
        @click.stop="$socket.client.emit('clearDBs')"
      />
    </div> -->

    <div class="storage">
      <input
        type="button"
        value="delete me"
        @click.stop="$store.dispatch('deleteUser', me)"
      />
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import Userslist from './Users'

export default {

  name: 'Options',

  components: {
    Userslist
  },
  data() {
    return {
      showParticipants: false,
    }
  },

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
  margin-top: 0vh;
  margin-left: 1vh;
  width: 16vw;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  align-items: flex-start;
  /* justify-content: space-around; */
  line-height: 1.9vh;
  padding: 0.5vh;
  background: none;
  border: none;
  padding: 0;
  box-shadow: none;
}
#options .title {
  box-sizing: border-box;
  padding: 0vh 0.5vw;
  line-height: 1.9vh;
  width: 100%;
  border-bottom: 1px solid grey;
}
#options .edituser,
#options .storage,
#options .participants {
  margin-top: 1vh;
  /* margin: 2.5px; */
  margin-right: 1vh;
  display: flex;
  align-items: center;
  /* height: 2vh; */
  border: 1px solid grey;
  /* background: white; */
  color: var(--ui-front);
  background: var(--ui-back);
  border-radius: var(--ui-border-radius);
  box-shadow: var(--ui-box-shadow);
}
#options .db input {
  color: red;
}
.showParticipants {
  /* padding: 0.5vh 1vh; */
  cursor: pointer;
}
input {
  padding: 0.5vh 0.75vh;
  border: none;
  outline: none;
  font-size: 10pt;
  font-family: sans-serif;
  /* border: 0.5px solid lightgray; */
  /* padding: 2px 10px; */
  border-radius: 10px;
  background: none;
  margin: 0px;
  color: var(--ui-front);
}
input[type="button"] {
  cursor: pointer;
}
</style>