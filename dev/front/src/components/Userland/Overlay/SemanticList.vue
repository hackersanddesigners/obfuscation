<template>
  <div class="body">
    <span :class="name + 's'">
      <span> {{ title }} </span>
      <span
        :class="name"
        v-for="item in list"
        :key="item.Name || item.Title"
      >
        <a 
          :href="`/${collection}/${item.slug}`"
          class="name"
        >{{ item.Name || item.Title }}</a>
        <span v-if="isLast(item, list)">. </span>
        <span v-else-if="isBeforeLast(item, list)"> and </span>
        <span v-else>, </span>
      </span>
    </span>
  </div>
</template>
<script>

export default {
  name: 'SemanticList',
  props: [
    'list',
    'name',
    'collection'
  ],
  data() {
    return {
    }
  },

  computed: {
    title() { return (
      this.name == 'Hosting' ? 'Participates in' :
      this.list.length === 1 ? this.name + `:` : this.name + `s:`  
    )},

  },
  created() {
  },
  methods: {
    isLast(item, array) {
      return array.indexOf(item) === array.length - 1
    },
    isBeforeLast(item, array) {
      return array.indexOf(item) === array.length - 2
    },

    alphabetical(array) {
      return array.sort((a, b) => a.Name.length - b.Name.length)
    },

  }
}
</script>

<style scoped>
.body {
  font-size: 12.5pt;
}
</style>