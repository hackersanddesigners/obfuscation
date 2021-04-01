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

          <div class="name">
            <span>Name: </span>
            <input 
              ref="name" 
              class="ui"
              type="text" 
              placeholder="pick a display name"
            />
          </div>

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

          <div class="color">
            <span>Color: </span>
            <input 
              ref="color" 
              class="ui"
              type="text" 
              data-jscolor
              @input="updateColor"
            /> 
          </div>

          <div class="messagesOptions">
            <span>Message lifetime (days): </span>
            <input
              ref="messageLifetime" 
              class="ui"
              type="number"
              placeholder="2"
            />
          </div>

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
        <p>The messages you post will be visible to every other participant and remain available on the website.</p>  
      </div>
    </div>
    <div id="jsonMe">
      <vue-markdown :source="jsonMe" />
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
    ]),
    jsonMe() {
      return "```json \n" + JSON.stringify(this.me, null, 2) + "\n```"
    }
  },

  mounted() {

    this.$refs.name.value = this.me.name
    setTimeout(() => {
      this.$refs.name.select()
    }, 50)

    jscolor.presets.default = this.colorPickerOpts
    this.$refs.color.value = this.me.color
    new jscolor(this.$refs.color)  
    jscolor.init()

    this.$refs.messageLifetime.value = this.me.messageLifetime / 86400000 || 2

  },
  methods: {

    save() {
      const 
        name = this.$refs.name.value,
        color = this.$refs.color.value,
        messageLifetime = this.$refs.messageLifetime.value * 86400000

      if (!this.validateChars(name)) {
        this.invalid = true

      } else if (!this.validateLength(name)) {
        this.tooshort = true

      } else if (this.existingUser(name)) {
        this.inuse = true

      } else {
        this.register(name, color, messageLifetime)

      }
    },

    cancel() {
      this.$emit('stopEdit')
    },

    register(name, color, messageLifetime) {
      this.$store.dispatch('updateAppearance', {
        name: name,
        color: color,
        messageLifetime: messageLifetime
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
  width: 450px;
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

.name,
.color,
.messagesOptions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5vh;
}

.messagesOptions {
  margin: 2vh 0vh;
}
.form .messagesOptions input {
  max-width: 100px;
  text-align: center;
}

input {
  flex-shrink: 1;
  width: 300px;
  outline: none;
  box-shadow: none;
  padding: 2px 10px;
}
.name input {
  /* margin-bottom: 0.5vh; */
}

input[type="button"] {
  width: 100%;
  cursor: pointer;
}

p.error  {
  margin: 5px;
  font-size: 12pt;
  color: red;
}

#jsonMe {
  font-size: 15pt;
  margin: 10vh;
  /* font-family: 'jet' !important; */
}

</style>