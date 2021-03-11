<template>
  <div id="list" class="ui">

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
import Territory from './Territory'

export default {

  name: 'List',
  components: {
    Territory,
  },
  computed: {
    ...mapState({
      territories: state => state.territories,
    }),
  },
  methods: {

    handleTerritoryClick(territory) {
      this.$emit('goTo', territory.slug)
    }

  }


}
</script>

<style scoped>
#list {
  margin-top: 1vh;
  margin-left: 1vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>