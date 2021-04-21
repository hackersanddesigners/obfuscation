<template>
 <section :class="{ isLibrary: !isGlossary }">
   <div v-if="sent" class="status">
    <p>Post received!</p>
    <p>A moderator will review your submission before publishing it.</p>
  </div>
  <div v-else-if="sending" class="status">
    <p>Posting...</p>
  </div>
  <form v-else>
    <input 
      v-if="!isGlossary"
      ref="author" 
      :class="[
        'ui', 'authors',
      ]"
      type="text" 
      required
      placeholder="Author(s)"
      @input="bodyShort = false"
    /> 
    <p v-if="bodyShort" class="error">This field is required</p>

    <input 
      ref="title" 
      :class="[
        'ui', 'title',
        { 
          invalid: titleShort,
          zxx: $store.state.desiresTexture,
        }
      ]"
      type="text" 
      required
      :placeholder="titlePlaceholder"
      @input="titleShort = false"
    /> 
    <p v-if="titleShort" class="error">This field is required</p>

    <textarea 
      v-if="isGlossary"
      ref="body" 
      :class="[
        'ui', 'body',
        { invalid: bodyShort }
      ]"
      :placeholder="bodyPlaceholder"
      required
      @input="adjustHeight"
    /> 
    <p v-if="bodyShort" class="error">This field is required</p>

    <input 
      ref="source" 
      :class="[
        'ui', 'footer',
        { invalid: sourceShort }
      ]"
      type="url" 
      placeholder="Enter source URL"
      @input="sourceShort = false"
    /> 
    <p v-if="sourceShort" class="error">This field is required</p>
    <div 
      v-if="!isGlossary"
      class="fileupload"
    >
      <span>Or upload a file:</span>
      <input 
        ref="file" 
        :class="['ui', 'footer']"
        type="file" 
        placeholder=""
        @input="handleFile"
      />
    </div>
    <p v-if="tooBig" class="error">File must be smaller than 20MB.</p>
  </form>
 </section>
</template>

<script>
export default {
  name: 'Upload',
  props: [
    'sending',
    'sent',
    'collection'
  ],
  data() {
    return {
      titleShort: false,
      bodyShort: false,
      sourceShort: false,
      tooBig: false,
    }
  },

  computed: {
    isGlossary() { return this.collection === 'glossary' },
    titlePlaceholder() { return this.isGlossary ? 'Enter Term' : 'Title to display' },
    bodyPlaceholder() { return this.isGlossary ? 'Enter definition' : 'Author(s)' }
  },
  watch: {
  },
  created() {
  },
  mounted() {

    if (this.isGlossary) {
      this.$refs.title.focus()
    } else {
      this.$refs.author.focus()
    }


  },
  methods: {

    submit() {
      if (this.isGlossary) {
        this.submitTerm()
      } else {
        this.submitResource()
      }
    },

    submitTerm() {
      if (this.sent) {
        this.$emit('sent')
        return
      }

      const 
        title = this.$refs.title.value,
        body = this.$refs.body.value,
        source = this.$refs.source.value

      if (title.length == 0) {
        this.titleShort = true
        return
      } 
      if (body.length == 0) {
        this.bodyShort = true
        return
      } 
      
      if (!this.titleShort && !this.bodyShort) {
        this.sendTerm(title, body, source)
      }

    },

    sendTerm(title, body, source) {
      this.$emit('sending')

      const 
        collection = 'glossaries',
        data = {
          Term: title,
          Definition: body,
          Source: source,
          published_at: null
        },
        formData = new FormData()

      formData.append('data', JSON.stringify(data))
      // formData.append('files.message', this.voiceMessage.data, this.voiceMessage.name)

      this.$http
        .post(`${ this.$apiURL }/${ collection }`, formData)
        .then(res => { 
          console.log(res.status) 
          this.$emit('sent')
        })
        .catch(err => { console.log(err) })
    },

    submitResource() {
      if (this.sent) {
        this.$emit('sent')
        return
      }

      const 
        author = this.$refs.author.value,
        name = this.$refs.title.value,
        source = this.$refs.source.value,
        file = this.$refs.file.files[0]

      if (name.length == 0) {
        this.titleShort = true
        return
      } 
      if (author.length == 0) {
        this.bodyShort = true
        return
      } 
      
      if (!this.titleShort && !this.bodyShort && !this.tooBig) {
        this.sendResource(author, name, source, file)
      }

    },

    sendResource(author, name, source, file) {
      this.$emit('sending')

      const 
        collection = 'libraries',
        data = {
          Name: name,
          author: author,
          URL: source,
          published_at: null
        },
        formData = new FormData()

      formData.append('data', JSON.stringify(data))
      if (file) {
        formData.append('files.File', file, file.name)
      }

      this.$http
        .post(`${ this.$apiURL }/${ collection }`, formData)
        .then(res => { 
          console.log(res.status) 
          this.$emit('sent')
        })
        .catch(err => { console.log(err) })
    },

    handleFile(e) {
      this.tooBig = (e.currentTarget.files[0].size > 20971520) // 20MB
    },

    adjustHeight() {
      this.bodyShort = false
      let 
        minHeight = 100,
        el = this.$refs.body,
        outerHeight = parseInt(window.getComputedStyle(el).height, 10),
        diff = outerHeight - el.clientHeight + 5

      el.style.height = 0 + 'px'
      el.style.height = Math.max(minHeight, el.scrollHeight + diff) + 'px'
    }

  }
}
</script>

<style scoped>
section {
  margin: 1vh;
  overflow: visible;
}
section .status {
  margin: 0vh 1vh;
}
section .title {  
  font-size: 25pt;
  font-weight: normal;
  padding: 2px 10px;
  margin-top: 0.6vh;
}
section.isLibrary .title { 
  font-family: 'Times New Roman', Times, serif;
  padding: 2px 6px;
} 

section .body {
  box-sizing: border-box;
  margin-top: 1vh;
  margin-bottom: 0;
  min-height: 100px;
  max-height: 500px;
  font-size: 12.5pt;
  font-family: 'auth', Helvetica, Arial, sans-serif;
  padding: 1vh;
  resize: none;
  transition: height 0s ease;
}
section .footer {
  margin-top: 1vh;
  font-size: 12.5pt;
}
section .fileupload {
  display: flex;
  align-items: center;
}
section .fileupload span {
  margin-top: 1.5vh;
  margin-right: 1vh;
  flex-shrink: 0;
  font-size: 12.5pt;
}
input,
textarea {
  flex-shrink: 1;
  width: 100%;
  outline: none;
  box-shadow: none;
  border-color: transparent;
}
input:hover,
textarea:hover,
input:active,
textarea:active,
input:focus,
textarea:focus {
  border-color: var(--front);
}
.invalid {
  border-color: red;
}

p.error  {
  margin: 5px;
  font-size: 12pt;
  color: red;
}
</style>