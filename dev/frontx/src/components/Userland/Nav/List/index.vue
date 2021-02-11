<template>
  <div 
    id="list"
    :class="{ hovered: hovered }"

    @mouseover="hovered=true"
    @mouseout="hovered=false"
  >

    <Territory
      v-for="territory in territories"
      :key='territory.id'
      :name="territory.name"
      :id="territory.id"
      :borders="territory.borders"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

import Territory from './Territory'

export default {

  name: 'List',

  components: {
    Territory,
  },

  props: [ 
  ], 

  data() {
    return {
      hovered: false
    }
  },

  computed: {
    ...mapState({

      territories: state => state.territories,
    
    }),
    ...mapGetters({


    })
  },

  methods: {

  }


}
</script>

<style scoped>
#list {
  box-sizing: border-box;
  position: relative;
  margin-top: 2vh;
  margin-left: 2vh;
  padding: 0.5vh 0.5vw;
  min-width: 20vw;
  font-size: 14pt;
  background: white;
  border: 1px solid grey;
}
</style>