<template>
 <section>
    <div class="header">
      <h3 class="subtitle"> 
        {{ subtitle }}
      </h3>
      <h1 class="title"> 
        {{ title }} 
      </h1>
    </div>
    <div class="body">
      <vue-markdown
        :source="body"
      />
    </div>
    <div class="footer">
      <vue-markdown
        v-if="source"
        :source="source"
      />
    </div>
 </section>
</template>

<script>
import moment from 'moment'


export default {
  name: 'Section',
  props: [
    'section',
  ],
  data() {
    return {
    }
  },

  computed: {

    subtitle() { return this.getSubtitle() },
    title() { return this.getTitle() },
    body() { return this.getBody() },
    source() { return this.getSource() }

  },
  created() {
  },
  mounted() {
  },
  methods: {
    getSubtitle() {
      return (
        this.section.Subtitle ? 
          this.section.Subtitle :
        this.section.Start ? 
          moment(this.section.Start).format('dddd, MMMM Do [at] HH:mm') : ''
      )
    },

    getTitle() {
      return (
        this.section.Title || 
        this.section.title ||
        this.section.Name ||
        this.section.name ||
        this.section.Term || ''
      )
    },

    getBody() {
      return (
        this.processBody(
          this.section.Body || 
          this.section.body || 
          this.section.Description ||
          this.section.description ||
          this.section.Definition || ''
        )
      )
    },

    getSource() {
      return this.section.Source
    },

    processBody(text) {
      if (text) text = text.replace(/\]\(\/uploads\//g, `](${this.$apiURL}/uploads/`)
      return text
    }
  }
}
</script>

<style scoped>
section {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 2vh;
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