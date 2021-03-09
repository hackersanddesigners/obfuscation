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
      @click.native.stop="handleTerritoryClick(territory)"
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


    }),

  },

  methods: {

    handleTerritoryClick(territory) {
      const current = this.$router.history.current.path.slice(1)
      const next = territory.slug
      
      console.log(current, next)

      if (current === next) {
        this.$emit('goTo', territory.borders)
      } else {
        this.$router.push(`/${next}`)
      }
    }

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
  /* min-width: 16vw; */
  font-size: 14pt;
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: flex-start; */
  color: var(--ui-front);
  background: var(--ui-back);
  border: 1px solid grey;
  border-radius: var(--ui-border-radius);
}
</style>