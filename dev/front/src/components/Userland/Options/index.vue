<template>
  <div id="options">

    <div class="registerAgain">
      <div
        class="ui button"
        @click="$emit('moreInfo', `/reception/register`)"
        tabindex="0"
      >
         register
      </div>
    </div>

    <div class="participants">
      <div
        v-if="!showParticipants"
        class="ui button showParticipants"
        @click="showParticipants = true"
        tabindex="0"
      >
        participants
      </div>
      <Userslist
        v-else
        @goTo="$emit('goTo', $event)"
        @hide="showParticipants = false"
        tabindex="0"
      />
    </div>

    <div class="edituser">
      <div
        class="ui button"
        @click="$emit('startEdit')"
        tabindex="0"
      > 
        options
      </div>
    </div>

    <div class="storage">
      <div
        class="ui button"
        @click="$store.dispatch('users/deleteUser', me)"
        tabindex="0"
      >
        delete self
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters('users', [
      'me'
    ])
  },

}
</script>

<style scoped>

#options {
  box-sizing: border-box;
  margin-left: 1vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.showParticipants {
  cursor: pointer;
}
.button {
  padding: 0.5vh 1vh;
  margin-top: 1vh;
  outline: none;
  cursor: pointer;
}
.button:focus {
  box-shadow: 0 0 10px 0 var(--back);
  outline: 2px solid blue;
}

</style>