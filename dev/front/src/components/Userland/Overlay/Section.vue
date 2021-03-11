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
  watch: {
    body() {
      this.handleLinks()
    }
  },
  created() {
  },
  mounted() {

    this.handleLinks()

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
      if (text) {
        text = text.replace(/\]\(\/uploads\//g, `](${this.$apiURL}/uploads/`)
      }
      return text
    },

    handleLinks() {
      setTimeout(() => {
        Array
        .from(document.querySelectorAll(`section a`))
        .forEach(a => {
          const href = a.attributes.href.value 
          if (href.startsWith('/')) {
            a.addEventListener('click', (e) => {
              this.$router.push(href)
              e.preventDefault()
            })
          }
        })
      }, 500)
    }
  }
}
</script>

<style scoped>
section {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 2vh;
}
section a {
}
section .header {
}
section .header h3 { 
}
section .header h1 {  
}
section .body {
  font-size: 12.5pt;
}
section .footer {
  /* position: absolute;
  bottom: 10px; */
}
</style>