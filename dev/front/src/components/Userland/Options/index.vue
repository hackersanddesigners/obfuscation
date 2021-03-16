<template>
  <div id="options">

    <!-- <div class="grid">
      <input 
        type="button" 
        :value="grid ? 'hide grid' : 'show grid'" 
        @click.stop="toggleGrid"
      />
    </div> -->

    <div class="participants">
      <div
        v-if="!showParticipants"
        class="ui button showParticipants"
        @click="showParticipants = true"
      >
        participants
      </div>
      <Userslist
        v-else
        @goTo="$emit('goTo', $event)"
        @hide="showParticipants = false"
      />
    </div>

    <div class="edituser">
      <div
        class="ui button"
        @click.stop="$emit('startEdit')"
      > 
        edit appearance
      </div>
    </div>

    <div class="storage">
      <div
        class="ui button"
        @click.stop="$store.dispatch('deleteUser', me)"
      >
        delete self
      </div>
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
      'grid',
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
  margin-left: 1vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.showParticipants {
  cursor: pointer;
}
.button {
  margin-top: 1vh;
  outline: none;
  cursor: pointer;

}

</style>