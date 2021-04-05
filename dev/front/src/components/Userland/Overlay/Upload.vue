<template>
 <section>
   <div v-if="sent" class="status">
    <p>Post received!</p>
    <p>A moderator will review your submission before publishing it.</p>
  </div>
  <div v-else-if="sending" class="status">
    <p>Posting...</p>
  </div>
  <form v-else>
    <input 
      ref="title" 
      :class="[
        'ui', 'title',
        { invalid: titleShort }
      ]"
      type="text" 
      required
      placeholder="Enter term"
      @input="titleShort = false"
    /> 
    <p v-if="titleShort" class="error">This field is required</p>

    <textarea 
      ref="body" 
      :class="[
        'ui', 'body',
        { invalid: bodyShort }
      ]"
      placeholder="Enter definition"
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
      required
      placeholder="Enter source URL"
      @input="sourceShort = false"
    /> 
    <p v-if="sourceShort" class="error">This field is required</p>
  </form>
 </section>
</template>

<script>
export default {
  name: 'Upload',
  props: [
    'sending',
    'sent'
  ],
  data() {
    return {
      titleShort: false,
      bodyShort: false,
      sourceShort: false,
    }
  },

  computed: {

  },
  watch: {
  },
  created() {
  },
  mounted() {

    this.$refs.title.focus()


  },
  methods: {

    submit() {
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
      // if (source.length == 0) {
      //   this.sourceShort = true
      //   return
      // }
      
      if (!this.titleShort && !this.bodyShort) {
        this.send(title, body, source)
      }

    },

    send(title, body, source) {
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
  font-family: 'zxx-noise';
  font-weight: normal;
  padding: 2px 10px;
  margin-top: 0.6vh;
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
  font-size: 10pt;
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