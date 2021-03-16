<template>
  <div id="registerContainer">
    <div 
      id="register" 
      class="ui"
      @keyup.enter="save"
    >

      <div 
        class="introText" 
        v-if="!registered"
      >
        <h3>Welcome.</h3>
        <p>To join the conversation, please pick a display name and color. You can change these later.</p>
      </div>

      <div class="form">

          <input 
            class="ui"
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
              : tooshort ? 'Your display name must contain at least 2 characters.'
              : inuse ? 'This name has already been taken by someone else.'
              : null
            }}
          </p>

          <input 
            class="ui"
            ref="color" 
            type="text" 
            data-jscolor
            @input="updateColor"
          > 

          <input 
            class="ui"
            ref="submit" 
            type="button" 
            value="save"
            @click.stop="save" 
          >

      </div>
      <div 
        class="introText" 
        v-if="!registered"
      >
        <p>The information you are entering is stored on our server and sent to all the other users.</p>  
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
    
  },
  methods: {

    save() {
      const name = this.$refs.name.value
      const color = this.$refs.color.value

      if (!this.validateChars(name)) {
        this.invalid = true

      } else if (!this.validateLength(name)) {
        this.tooshort = true

      } else if (this.existingUser(name)) {
        this.inuse = true

      } else {
        this.register(name, color)

      }
    },

    cancel() {
      this.$emit('stopEdit')
    },

    register(name, color) {
      this.$store.dispatch('updateAppearance', {
        name: name,
        color: color,
      })
      this.$emit('stopEdit')
      this.$store.commit('register')
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
      return string.length > 1
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
  top: 0; left: 0;
  height: 100%; width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

#register {
  width: 360px;
  padding: 1vh;
}
#register h3 {
  margin-top: 0;
  font-size: calc(1 * var(--ui-font-size));
}
#register .introText:last-of-type p:last-of-type {
  margin-bottom: 0;
}

.form {
  display: flex;
  flex-direction: column;
}

input {
  outline: none;
  box-shadow: none;
  padding: 2px 10px;
  margin-bottom: 0.5vh;
}
input:last-of-type {
  margin-bottom: 0;
}
input[type="button"] {
  cursor: pointer;
}

p.error  {
  margin: 5px;
  font-size: calc(0.6 * var(--ui-font-size));
  color: red;
}

</style>