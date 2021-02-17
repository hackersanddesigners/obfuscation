<template>
 <section>
    <div class="header">
      <h3 class="subtitle"> 
        {{ section.Subtitle || section.Start}} 
      </h3>
      <h1 class="title"> 
        {{ section.Title }} 
      </h1>
    </div>
    <div class="body">
      <vue-markdown
        v-if="section.Body || section.Description"
        :source="section.Body || section.Description"
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
  font-size: 15pt;
  font-weight: normal;
}
section .header h1 { 
  font-size: 25pt;
  font-family: 'zxx-noise';
}
section .body {
  font-size: 12.5pt;
}
</style>