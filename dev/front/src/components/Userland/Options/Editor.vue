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
            <label for="name">Name: </label>
            <input 
              ref="name" 
              name="name"
              class="ui"
              type="text" 
              placeholder="pick a display name"
              tabindex="0"
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
            <label for="color">Color: </label>
            <input 
              ref="color" 
              name="color"
              class="ui"
              type="text" 
              data-jscolor
              @input="updateColor"
              tabindex="0"
            /> 
          </div>

          <div class="messagesOptions">
            <label for="lifetime">Message lifetime (days): </label>
            <input
              ref="messageLifetime" 
              name="lifetime"
              class="ui"
              type="number"
              placeholder="30"
              tabindex="0"
            />
          </div>

          <div class="texture">
            <label for="texture">Obfuscated texture: </label>
            <input
              ref="texture" 
              name="texture"
              class="ui"
              type="checkbox"
              tabindex="0"
              :checked="desiresTexture"
              @click="$store.commit('toggleTexture')"
            />
          </div>

          <div class="contrast">
            <label for="contrast">Higher contrast: </label>
            <input
              ref="contrast" 
              name="contrast"
              class="ui"
              type="checkbox"
              tabindex="0"
              :checked="desiresContrast"
              @click="$store.commit('toggleContrast')"
            />
          </div>
      <div class="introText" v-if="!registered">
        <p>The messages you post will be visible to every other participant and remain available on the website.</p>  
      </div>

          <input 
            class="ui save"
            ref="submit" 
            type="button" 
            value="save"
            @click="save" 
            tabindex="0"
          >

      </div>
    </div>
    <div v-if="touring" id="jsonMe">
      <vue-markdown :source="jsonMe" />
    </div>
  </div>
</template>

<script>
import jscolor from '@eastdesire/jscolor'
import { mapGetters, mapState } from 'vuex'

export default {

  name: 'Editor',
  props: ['touring'],
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
      'registered',
      'desiresTexture',
      'desiresContrast',
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

    if (this.registered) {
      this.$refs.name.value = this.me.name
    }
    setTimeout(() => {
      this.$refs.name.select()
    }, 50)

    jscolor.presets.default = this.colorPickerOpts
    this.$refs.color.value = this.me.color
    new jscolor(this.$refs.color)  
    jscolor.init()

    this.$refs.messageLifetime.value = (this.me.messageLifetime / 86400000) || 30

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
        x: this.me.x,
        y: this.me.y,
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
      const 
        existing = this.userNames.find(n => (
          n.toLowerCase() === string.toLowerCase()
        )),
        isMe = string => string.toLowerCase() === this.me.name.toLowerCase()
      return (existing && !isMe(string))
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
  background-color: var(--half-white);
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
.form label {
  flex-shrink: 0;
}

.name,
.color,
.messagesOptions,
.texture,
.contrast {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5vh;
}

.messagesOptions {
  margin-top: 2vh;
}
.form .messagesOptions input {
  max-width: 100px;
  text-align: center;
}

.form .texture,
.form .contrast {
  justify-content: space-between;
} 

.form .texture input,
.form .contrast input {
  flex-shrink: 1;
  max-width: 2vh;
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
  margin-top: 2vh;
}
input[type="checkbox"] {
  margin-left: auto;
  height: 2vh;
  border: var(--ui-border);
  border-radius: var(--ui-border-radius);
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