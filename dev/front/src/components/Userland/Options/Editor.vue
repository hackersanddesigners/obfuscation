<template>
  <div id="registerContainer">
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

          <p 
            class="error"
            v-if="invalid || tooshort || inuse"
          >
            {{
                invalid ? 'Your display name cannot contain any spaces or special characters.'
              : tooshort ? 'Your display name must contain at least 3 characters.'
              : inuse ? 'This name has already been taken by someone else.'
              : null
            }}
          </p>

          <input 
            ref="color" 
            type="text" 
            data-jscolor
            @input="updateColor"
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
import { mapGetters, mapState } from 'vuex'

export default {

  name: 'Editor',

  data() {
    return {
    
      invalid: false,
      tooshort: false,
      inuse: false,

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

  computed: {
    ...mapState([
      'registered'
    ]),
    ...mapGetters([
      'me',
      'userNames',
    ])
  },

  mounted() {

    jscolor.presets.default = this.colorPickerOpts
    this.$refs.color.value = this.me.color
    new jscolor(this.$refs.color)  
    jscolor.init()

    if (this.registered) { 
      this.$refs.name.value = this.me.name
      this.$refs.name.select()
    }

    this.$nextTick(() => {
      if (this.registered) {
        new jscolor(this.$refs.color)   
      }
    })
    
  },
  methods: {

    save() {
      const name = this.$refs.name.value
      // const color = this.$refs.color.value

      if (!this.validateChars(name)) {
        this.invalid = true

      } else if (!this.validateLength(name)) {
        this.tooshort = true

      } else if (this.existingUser(name)) {
        this.inuse = true

      } else {
        this.register(name)

      }
    },

    cancel() {
      this.$emit('stopEdit')
    },

    register(name) {
      this.$store.dispatch('updateName', {
        name: name,
      })
      this.$emit('stopEdit')
    },

    updateColor() {
      this.$store.dispatch('updateColor', {
        color: this.$refs.color.value
      })
    },

    validateChars(string) {
      return /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(string)
    },

    validateLength(string) {
      return string.length > 2
    },

    existingUser(string) {
      return (this.userNames.indexOf(string) > -1 && string !== this.me.name)
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
  line-height: 1.2;
  z-index: 3;
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
.error  {
  margin: 5px;
  margin-bottom: 0px;
  font-size: 9pt;
  color: red;
}
</style>