<template>
  <div class="semanticList body">
    <span :class="name + 's'">
      <span v-if="title"> {{ title }} </span>
      <span
        :class="name"
        v-for="item in list"
        :key="item.Name || item.Title"
      >
        <a 
          :href="`/${collection}/${item.slug}`"
          class="name"
        >{{ item.Name || item.Title }}</a>
        <span v-if="title && isLast(item, list)">. </span>
        <span v-else-if="isBeforeLast(item, list)"> and </span>
        <span v-else-if="title">, </span>
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
  computed: {
    title() { 
      return (
        this.name ? 
          this.name == 'Hosting' ? 'Participates in' :
          this.list.length === 1 ? this.name + `:` : this.name + `s:` 
        : null 
      )
    },
  },
  methods: {
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
    ),
    isBeforeLast: (item, array) => (
      array.indexOf(item) === array.length - 2
    ),
    alphabetical: array => (
      array.sort((a, b) => a.Name.length - b.Name.length)
    ),
  }
}
</script>

<style>
.semanticList {
  font-size: inherit;
}
a,
a:visited,
a:active,
a:hover {
  color: unset;
  /* text-decoration: none; */
}
</style>