<template>
 <section>
    <div class="header">
      <h3 class="subtitle"> 
        {{ section.Subtitle || section.Start}} 
      </h3>
      <h1 class="title"> 
        {{ 
          section.Title || 
          section.title ||
          section.Name ||
          section.name ||
          section.Term 
        }} 
      </h1>
    </div>
    <div class="body">
      <vue-markdown
        :source="
          section.Body || 
          section.body || 
          section.Description ||
          section.description ||
          section.Definition
        "
      />
    </div>
    <div class="footer">
      <vue-markdown
        :source="
          section.Source || 
          ''
        "
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
    // console.log(this.section)
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
section .footer {
  /* position: absolute;
  bottom: 10px; */
}
</style>