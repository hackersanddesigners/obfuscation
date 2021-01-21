<template>
  <div id="registerContainer" :class="{
  }">
    <div id="register">
      <div class="form">
          <input ref="name" type="text" placeholder="pick a display name">
          <input ref="color" type="text" data-jscolor=""> 
          <input ref="submit" type="button" @click="save()" value="save">
      </div>
    </div>
  </div>
</template>

<script>
import jscolor from '@eastdesire/jscolor'

export default {
  name: 'EditUser',
  props: [
    'me',
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
      }
    }
  },
  mounted() {
    jscolor.presets.default = this.colorPickerOpts
    this.$refs.name.value = this.me.name
    this.$refs.color.value = this.me.color
  },
  methods: {
    save() {
      const newLook = {
        name: this.$refs.name.value,
        color: this.$refs.color.value,
      }
      this.$emit('editeduser', newLook)
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
  background: rgba(255, 255, 255, 0.603);
  z-index: 1000;
}
#register {
  max-width: 260px;
}
.form {
  display: flex;
  flex-direction: column;
}
input {
  background: rgb(245, 245, 245);
  border: none;
  outline: none;
  /* border: 0.5px solid lightgray; */
  padding: 2px 10px;
  border-radius: 10px;
  margin-top: 5px;
}
input[type="button"] {
  cursor: pointer;
}
</style>