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
      class="body"
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

    <div 
      class="body"
      v-else-if="mentors && mentors.length > 0"
    >
      <span class="hosts">
        <span> Mentor: </span>
        <span
          class="host"
          v-for="mentor in mentors"
          :key="mentor.Name"
        >
          <a 
            :href="`/contributors/${mentor.slug}`"
            class="name"
          >{{ mentor.Name }}</a>
        </span>
      </span>
    </div>

    <div class="body">
      <vue-markdown
        :source="body"
      />
    </div>

    <div 
      class="body"
      v-if="hosting || moderating || mentoring"
    >
      <span v-if="hosting.length > 0">
        <span> Hosting </span>
        <span
          v-for="session in hosting"
          :key="session.Title"
        >
          <a 
            :href="`/timetable/${session.slug}`"
            class="name"
          >{{ session.Title }}</a>
          <span>, </span>
        </span>
      </span>
      <span v-if="moderating.length > 0">
        <span> Moderating </span>
        <span
          v-for="session in moderating"
          :key="session.Name"
        >
          <span v-if="moderating.length > 1 && isLast(session, moderating)">and </span>
          <a 
            :href="`/timetable/${session.slug}`"
            class="name"
          >{{ session.Title }}</a>
          <span v-if="!isLast(session, moderating)">, </span>
          <span v-else>. </span>
        </span>
      </span>
      <span v-if="mentoring.length > 0">
        <span> Mentoring </span>
        <span
          v-for="session in mentoring"
          :key="session.Title"
        >
          <a 
            :href="`/study-room/${session.slug}`"
            class="name"
          >{{ session.Title }}</a>
        </span>
      </span>
    </div>

     <div 
      class="body"
      v-if="resources"
    >
      <div v-if="resources.length > 0">
        <p> References: </p>
        <ul
          v-for="resource in resources"
          :key="resource.Name"
        >
          <li>
            <a 
              :href="`/library/${resource.slug}`"
              class="name"
            >{{ resource.Name }}</a>
          </li>
        </ul>
      </div>
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
    mentors() { return this.section.Mentors },
    hosting() { return this.section.hosting },
    moderating() { return this.section.moderating },
    mentoring() { return this.section.Mentoring },
    resources() { return this.section.references }

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
          moment(this.section.Start).format('dddd, MMMM Do [at] HH:mm z') : ''
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
section .footer {
  font-size: 10pt;
}
</style>