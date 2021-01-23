<template>
  <div id="registerContainer" 
    :class="{
    }"
  >
    <div id="register">
      <div 
        class="introText" 
        v-if="!registered"
      >
        <h3>Welcome.</h3>
        <p>To join the conversation, please pick a display name and color. You can change these later.</p>
      </div>
      <div class="form">
          <input 
            ref="name" 
            type="text" 
            placeholder="pick a display name"
          >
          <input 
            ref="color" 
            type="text" 
            data-jscolor=""
            @input="updateColor"
          > 
          <input 
            v-if="registered"
            ref="cancel" 
            type="button" 
            value="cancel"
            @click.stop="cancel()" 
          >
          <input 
            ref="submit" 
            type="button" 
            value="save"
            @click.stop="save()" 
          >
      </div>
      <div 
        class="introText" 
        v-if="!registered"
      >
        <p>This site does not use cookies. The information you are entering is stored in your browser and sent to all the other users.</p>  
      </div>
    </div>
  </div>
</template>

<script>
import jscolor from '@eastdesire/jscolor'

export default {
  name: 'Register',
  props: [
    'name',
    'color',
    'registered'
  ],
  data() {
    return {
      colorPickerOpts: {
        format: 'rgba', 
        previewPosition: 'right', 
        previewSize: 30, 
        borderRadius: 0, 
        padding: 0, 
        controlBorderColor:'rgba(255,255,255,0)', 
        sliderSize: 13, 
        shadow: false
      },
    }
  },
  mounted() {

    jscolor.presets.default = this.colorPickerOpts
    this.$refs.color.value = this.color
    jscolor.init()

    this.$refs.name.value = this.name
    this.$refs.name.select()

    this.$nextTick(() => {
      new jscolor(this.$refs.color)
    })
    
  },
  methods: {

    save() {
      const newMe = {
        name: this.$refs.name.value,
        color: this.$refs.color.value,
        // slug: this.toSlug(this.$refs.name.value)
      }
      this.$emit('newMe', newMe)
    },

    cancel() {
      const sameMe = {
        name: this.name,
        color: this.color
      }
      this.$emit('newMe', sameMe)
    },

    updateColor() {
      const newMe = {
        color: this.$refs.color.value 
      }
      this.$emit('updateColor', newMe)
    },

    toSlug(str) {
      str = str.replace(/^\s+|\s+$/g, '')
      str = str.toLowerCase()

      var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
      var to   = "aaaaeeeeiiiioooouuuunc------"
      for (var i = 0, l = from.length; i < l; i ++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
      }

      str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

      return str
    }

  }
}
</script>
<style scoped>
#registerContainer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: rgba(255, 255, 255, 0.603); */
  /* z-index: 1000; */
  line-height: 1.2;
}
#register {
  width: 260px;
}
.form {
  display: flex;
  flex-direction: column;
}
input {
  background: rgb(245, 245, 245);
  border: none;
  outline: none;
  border: 0.5px solid lightgray;
  padding: 2px 10px;
  border-radius: 10px;
  margin-top: 5px;
}
input[type="button"] {
  cursor: pointer;
}
</style>