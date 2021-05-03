<template>
 <section>
    <div v-if="titleGoesFirst" class="header">
      <h1 class="title" :class="{ zxx: $store.state.desiresTexture }">{{ title }}</h1>
      <h3 class="byline subtitle">{{ subtitle }}</h3>
    </div>
    <div v-else class="header">
      <h3 class="byline subtitle">{{ subtitle }}</h3>
      <h1 class="title" :class="{ zxx: $store.state.desiresTexture }">{{ title }}</h1>
      <!-- <h3>
        <span
          v-if="sessionVideo"
          class="sessionVideoLink"
        >
          <a :href="sessionVideo">Watch video</a>
        </span>
        <span v-if="sessionVideo && sessionPoster">, </span>
        <span
          v-if="sessionPoster"
          class="sessionVideoLink"
        >
          <a :href="sessionPoster">See poster</a>
        </span>
        <span v-if="sessionPoster && bbbURL">, </span>
        <span
          v-if="bbbURL"
          class="bbbURL"
        >
          <a :href="bbbURL" target="_blank">Join session</a>
        </span>
        </h3> -->
    </div>


    <SemanticList
      v-if="chairs && chairs.length > 0"
      :collection="'contributors'"
      :list="chairs"
      :name="'Chair'"
    />
    <SemanticList
      v-if="sessions && sessions.length > 0"
      :collection="'schedule'"
      :list="sessions"
      :name="'Session'"
    />
    <SemanticList
      v-if="hosts && hosts.length > 0"
      :list="hosts"
      :collection="'contributors'"
      :name="'Speaker'"
    />
    <SemanticList
      v-if="moderators && moderators.length > 0"
      :list="moderators"
      :collection="'contributors'"
      :name="'Moderator'"
    />
    <SemanticList
      v-if="notetakers && notetakers.length > 0"
      :list="notetakers"
      :collection="'contributors'"
      :name="'Note-taker'"
    />
    <SemanticList
      v-if="sessionVideos && sessionVideos.length > 0"
      :list="sessionVideos"
      :collection="'exhibition'"
      :name="'Video'"
    />
    <SemanticList
      v-if="sessionPosters && sessionPosters.length > 0"
      :list="sessionPosters"
      :collection="'exhibition'"
      :name="'Poster'"
    />
    <SemanticList
      v-if="sessionArtwork && sessionArtwork.length > 0"
      :list="sessionArtwork"
      :collection="'exhibition'"
      :name="'Artwork'"
    />
    <SemanticList
      v-if="mentors && mentors.length > 0"
      :collection="'contributors'"
      :list="mentors"
      :name="'Mentor'"
    />

    <SemanticList
      v-if="artworks && artworks.length > 0"
      :collection="'exhibition'"
      :list="artworks"
      :name="'Artwork'"
    />
    <SemanticList
      v-if="chairing && chairing.length > 0"
      :collection="'schedule'"
      :list="chairing"
      :name="'Chairing'"
    />
    <SemanticList
      v-if="hosting && hosting.length > 0"
      :collection="'schedule'"
      :list="hosting"
      :name="'Hosting'"
    />
    <SemanticList
      v-if="moderating && moderating.length > 0"
      :collection="'schedule'"
      :list="moderating"
      :name="'Moderating'"
    />
    <SemanticList
      v-if="notetaking && notetaking.length > 0"
      :collection="'schedule'"
      :list="notetaking"
      :name="'Note-taking'"
    />
    <SemanticList
      v-if="mentoring && mentoring.length > 0"
      :collection="'study-room'"
      :list="mentoring"
      :name="'Mentoring'"
    />

    <div class="body">
      <vue-markdown
        :source="body"
      />
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
import SemanticList from '../SemanticList.vue'


export default {
  components: { SemanticList },
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
    bbbURL() { return this.section.bbbURL },
    chairs() { return this.section.chairs },
    hosts() { return this.section.hosts },
    moderators() { return this.section.moderators },
    notetakers() { return this.section.notetakers },
    mentors() { return this.section.Mentors },
    artworks() { return this.section.artworks },
    sessions() { return this.section.sessions },
    chairing() { return this.section.chairing },
    hosting() { return this.section.hosting },
    moderating() { return this.section.moderating },
    notetaking() { return this.section.notetaking },
    mentoring() { return this.section.Mentoring },
    resources() { return this.section.references },
    titleGoesFirst() { return this.section.Name },
    sessionMaterial() { return this.section.videos },
    sessionVideos() { return this
      .sessionMaterial
      .filter(s => (
        s.Category == 'SessionVideo'
      ))
    },
    sessionPosters() { return this
      .sessionMaterial
      .filter(s => (
        s.Category == 'Poster'
      ))
    },
    sessionArtwork() { return this
      .sessionMaterial
      .filter(s => (
        s.Category == 'Other'
      ))
    },
    // sessionVideo() {
    //   let url
    //   if (this.sessionMaterial && this.sessionMaterial.length > 0) {
    //     const video = this.sessionMaterial.find(v => v.Category == 'SessionVideo')
    //     if (video) {
    //       url = '/exhibition/' + video.slug
    //     }
    //   }
    //   return url
    // },
    // sessionPoster() {
    //   let url
    //   if (this.sessionMaterial && this.sessionMaterial.length > 0) {
    //     const poster = this.sessionMaterial.find(v => v.Category == 'Poster')
    //     if (poster) {
    //       url = '/exhibition/' + poster.slug
    //     }
    //   }
    //   return url
    // },

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
      return array.indexOf(item) === array.length - 1
    },
    isBeforeLast(item, array) {
      return array.indexOf(item) === array.length - 2
    },

    alphabetical(array) {
      return array.sort((a, b) => a.Name.length - b.Name.length)
    },

    handleLinks() {
      setTimeout(() => {
        Array
        .from(document.querySelectorAll(`section a`))
        .forEach(a => {
          const href = a.attributes.href.value
          if (href && (href.startsWith('/') || href.startsWith(this.$appURL))) {
            a.addEventListener('click', (e) => {
              const newhref = href.replace(this.$appURL, '/')
              this.$router.push(newhref)
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