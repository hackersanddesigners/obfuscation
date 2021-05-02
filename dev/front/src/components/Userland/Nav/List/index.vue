<template>
  <div id="list" class="ui">
    <Territory
      v-for="territory in territories"
      :key='territory.slug'
      :territory='territory'
      @click.native="$emit('goTo', territory.slug)"
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
    ...mapState('territories', [
      'territories'
    ]),
  },
}
</script>

<style scoped>
#list {
  flex-shrink: 0;
  margin-top: 1vh;
  margin-left: 1vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>