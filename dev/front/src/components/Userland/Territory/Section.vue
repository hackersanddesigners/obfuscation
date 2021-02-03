<template>
 <section>
    <div class="header">
      <h3 class="subtitle"> 
        {{ section.Subtitle }} 
      </h3>
      <h1 class="title"> 
        {{ section.Title }} 
      </h1>
    </div>
    <div class="body">
      <vue-markdown
        :source="section.Body"
      />
    </div>
 </section>
</template>

<script>
export default {
  name: 'Section',
  props: [
    'section'
  ],
  data() {
    return {
    }
  },
  created() {
  }
}
</script>

<style scoped>
section {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 7%;
}
section .header {
}
section .header h3 { 
  font-size: calc(3pt * var(--scale));
  font-weight: normal;
}
section .header h1 { 
  font-size: calc(5pt * var(--scale));
  font-family: 'zxx-noise';
}
section .body {
  font-size: calc(2.5pt * var(--scale));
}
</style>