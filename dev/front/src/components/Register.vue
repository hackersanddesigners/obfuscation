<template>
  <div id="registerContainer" :class="{
  }">
    <div id="register">
      <h3>Welcome.</h3>
      <p>To join the conversation, please pick a display name and color. You can change these later.</p>
      <div class="form">
          <input ref="name" type="text" placeholder="pick a display name">
          <input ref="color" type="text" data-jscolor=""> 
          <input ref="submit" type="button" @click="save()" value="save">
      </div>
      <p>This site does not use cookies. The information you are entering is stored in your browser and sent to all the other users.</p>
    </div>
  </div>
</template>

<script>
import jscolor from '@eastdesire/jscolor'
import { uid } from 'uid'

export default {
  name: 'RegisterUser',
  data() {
    return {
      me: null,
      colorPickerOpts: {
        format: 'rgba', 
        previewPosition: 'right', 
        previewSize: 30, 
        borderRadius: 0, 
        padding: 0, 
        controlBorderColor:'rgba(255,255,255,0)', 
        sliderSize: 13, 
        shadow: false
      }
    }
  },
  mounted() {
    jscolor.presets.default = this.colorPickerOpts
    this.$refs.color.value = this.randomColor()
  },
  methods: {
    randomColor() {
      const 
        r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256),
        a = 1,
        color = `rgb(${r}, ${g}, ${b}, ${a})`
      return color
    },
    save() {
      const me = {
        uid: uid(),
        name: this.$refs.name.value,
        color: this.$refs.color.value
      }
      this.me = me
      this.$emit('registered', me)
      localStorage.me = JSON.stringify(me)
    }
  }
}
</script>
<style scoped>
#registerContainer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(211, 211, 211, 0.801);
}
#register {
  max-width: 260px;
}
.form {
  display: flex;
  flex-direction: column;
}
input {
  border: none;
  margin-top: 5px;
}
</style>