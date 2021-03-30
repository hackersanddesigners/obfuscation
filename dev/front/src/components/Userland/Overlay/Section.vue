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

    <div 
      class="body people"
      v-if="hosts && hosts.length > 0"
    >
      <span class="hosts">
        <span> with </span>
        <span
          class="host"
          v-for="host in hosts"
          :key="host.Name"
        >
          <a 
            :href="`/contributors/${host.slug}`"
            class="name"
          >{{ host.Name }}</a>
          <span>, </span>
        </span>
      </span>
      <span class="modertors">
        <span
          class="moderator"
          v-for="moderator in moderators"
          :key="moderator.Name"
        >
          <span v-if="isLast(moderator, moderators)">and </span>
          <a 
            :href="`/contributors/${moderator.slug}`"
            class="name"
          >{{ moderator.Name }}</a>
          <span> (moderator)</span>
          <span v-if="!isLast(moderator, moderators)">, </span>
          <span v-else>. </span>
        </span>
      </span>
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
    source() { return this.getSource() },
    hosts() { return this.section.hosts },
    moderators() { return this.section.moderators },

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
        this.section.Institution ? 
          this.section.Institution :
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
          this.section.Bio ||
          this.section.Definition || ''
        )
      )
    },

    getSource() {
      return (
        this.section.Source ||
        this.section.link
      )
    },

    processBody(text) {
      if (text) {
        text = text.replace(/\]\(\/uploads\//g, `](${this.$apiURL}/uploads/`)
      }
      return text
    },

    isLast(item, array) {
      return array.lastIndexOf(item) === 0
    },

    handleLinks() {
      setTimeout(() => {
        Array
        .from(document.querySelectorAll(`section a`))
        .forEach(a => {
          const href = a.attributes.href.value 
          if (href && href.startsWith('/')) {
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
  margin-top: 1.6vh;
}
section a {
}
section .header {
}
section .header h3 { 
}
section .header h1 {  
  margin-top: 0;
}
section .body {
  font-size: 12.5pt;
}
/* section .body .people {
  font-size: 12.5pt;
} */
section .footer {
  font-size: 10pt;
}
</style>