<template>
  <div 
    id="list"
    :class="{ hovered: hovered }"

    @mouseover="hovered=true"
    @mouseout="hovered=false"
  >

    <Territory
      v-for="territory in territories"
      :key='territory.slug'
      :territory='territory'
      @click.native.stop="$router.push(`#${territory.slug}`)"
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
  margin-top: 1vh;
  margin-left: 1vh;
  padding: 0.5vh;
  width: 14vw;
  font-size: 14pt;
  background: white;
  border: 1px solid grey;
  border-radius: var(--ui-border-radius);
}
</style>